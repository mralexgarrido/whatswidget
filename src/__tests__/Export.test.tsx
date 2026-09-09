import { render } from '@testing-library/react';
import ts from 'typescript';
import { CodeModal } from '../components/CodeModal';
import { DEFAULT_CONFIG } from '../constants';

describe('GTM export', () => {
  it('emits ES5 syntax and mounts once when fired repeatedly', () => {
    const view = render(
      <CodeModal config={DEFAULT_CONFIG} onClose={() => undefined} />,
    );
    const code = view.container.querySelector('pre code')?.textContent || '';
    const script = code.replace(/^<script>/, '').replace(/<\/script>$/, '');
    expect(script.length).toBeGreaterThan(1000);
    const ast = ts.createSourceFile('export.js', script, ts.ScriptTarget.ES5);
    function check(node: ts.Node) {
      expect(ts.isArrowFunction(node)).toBe(false);
      expect(ts.isTemplateExpression(node)).toBe(false);
      expect(ts.isNoSubstitutionTemplateLiteral(node)).toBe(false);
      if (ts.isVariableDeclarationList(node)) {
        expect(node.flags & ts.NodeFlags.BlockScoped).toBe(0);
      }
      ts.forEachChild(node, check);
    }
    check(ast);
    const run = new Function(script);
    run();
    run();
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(
      document.querySelectorAll('#whatsapp-widget-container'),
    ).toHaveLength(1);
    document.getElementById('wa-bubble')?.click();
    expect(document.getElementById('wa-window')).toHaveClass('wa-open');
    document.getElementById('wa-close-btn')?.click();
    expect(document.getElementById('wa-window')).not.toHaveClass('wa-open');
    document.getElementById('whatsapp-widget-container')?.remove();
  });
});
