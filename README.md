# WhatsApp Widget Generator

![GitHub License](https://img.shields.io/github/license/user/whatsapp-widget-generator)
![GitHub Issues](https://img.shields.io/github/issues/user/whatsapp-widget-generator)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/user/whatsapp-widget-generator)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/user/whatsapp-widget-generator/ci.yml)

A powerful, open-source web application that enables website owners to easily create, customize, and embed WhatsApp chat widgets on their sites at no cost. Built with React, Vite, and Tailwind CSS.

## Features

- **Customizable Interface:** Easily customize the chat widget's appearance, including colors, greeting messages, and avatar.
- **Instant Preview:** See real-time changes to the widget as you configure it.
- **Easy Integration:** Generate the copy-pasteable code snippet to embed directly into any HTML website.
- **No Dependencies:** The generated code snippet relies on vanilla JavaScript and CSS, ensuring maximum compatibility and fast loading times on your website.
- **Responsive Design:** Ensures the widget looks great on both desktop and mobile devices.

## Demo

[Link to Live Demo (GitHub Pages)](https://your-username.github.io/whatsapp-widget-generator) *(Coming soon)*

## Usage

You don't need to install anything to use the generator. Simply visit the live demo, configure your widget, and copy the generated code snippet!

### Embedding the Widget

1. Configure your widget using the online tool.
2. Click the "Get Code" button.
3. Copy the provided HTML/JS snippet.
4. Paste the snippet just before the closing `</body>` tag of your website's HTML file.

## Development Setup

If you want to run the generator app locally or contribute to the project:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/whatsapp-widget-generator.git
   cd whatsapp-widget-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Deployment

The application is designed to be easily hosted on static site hosting platforms.

### GitHub Pages (Recommended)

This repository includes a GitHub Action workflow that automatically builds and deploys the application to GitHub Pages whenever changes are merged into the `main` branch.

To enable this:
1. Go to your repository settings.
2. Navigate to "Pages" in the left sidebar.
3. Under "Build and deployment", set the source to "GitHub Actions".

### Docker

A Dockerfile is provided for self-hosted deployments.

```bash
# Build the image
docker build -t whatsapp-widget .

# Run the container
docker run -p 8080:80 whatsapp-widget
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for more details.

## Troubleshooting & FAQ

**Q: Does the generated widget require any external libraries (like React) on my website?**
A: No. The generated code is entirely standalone, using vanilla JavaScript and CSS.

**Q: Can I change the WhatsApp number later?**
A: You will need to regenerate the code snippet with the new number and replace the old snippet on your website.

**Q: The widget isn't showing up on my site.**
A: Ensure the code snippet is placed correctly inside the `<body>` tag, ideally near the bottom. Check your browser's developer console for any errors.

## Roadmap

- [ ] Add support for multiple agents/numbers.
- [ ] Implement opening hours/schedule.
- [ ] Add Google Analytics tracking integration for the widget.
- [ ] Create plugins for popular CMS platforms (WordPress, Shopify).

## License

Distributed under the MIT License. See `LICENSE` for more information.
