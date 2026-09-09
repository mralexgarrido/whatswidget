import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import ts from 'typescript';

// Compile only the exported script at build time. No compiler ships to visitors.
function compatibleWidgetExport(): Plugin {
  return {
    name: 'whatswidget-es5-export',
    enforce: 'pre',
    transform(source, id) {
      if (!id.replace(/\\\\/g, '/').endsWith('/src/components/CodeModal.tsx')) return;
      const ast = ts.createSourceFile(id, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      let result: string | undefined;
      function visit(node: ts.Node) {
        if (ts.isTemplateExpression(node) && node.head.text.startsWith('<script>')) {
          if (node.templateSpans.length !== 1) throw new Error('Unexpected widget export template');
          const span = node.templateSpans[0];
          const raw = node.head.text + '__WW_CONFIG_PLACEHOLDER__' + span.literal.text;
          const script = raw.replace(/^<script>/, '').replace(/<\/script>$/, '');
          const output = ts.transpileModule(script, {
            compilerOptions: { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.None },
          }).outputText;
          const parts = output.split('__WW_CONFIG_PLACEHOLDER__');
          if (parts.length !== 2) throw new Error('Widget config placeholder mismatch');
          const replacement = JSON.stringify('<script>\n' + parts[0]) + ' + (' + span.expression.getText(ast) + ') + ' + JSON.stringify(parts[1] + '</script>');
          result = source.slice(0, node.getStart(ast)) + replacement + source.slice(node.end);
          return;
        }
        ts.forEachChild(node, visit);
      }
      visit(ast);
      if (!result) throw new Error('Widget export template not found');
      return { code: result, map: null };
    },
  };
}

/// <reference types="vitest" />
export default defineConfig(() => {
  return {
    base: './',
    plugins: [compatibleWidgetExport(), react(), tailwindcss()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
