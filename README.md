# School Launch Frontend

This project is a SvelteKit application designed to display meal notifications on a TV for Siji High School. It includes the current date and meal information, ensuring students and staff are updated with the latest meal schedule.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Deploying](#deploying)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Displays the current date in a localized format.
- Shows meal information for the current date.
- Responsive design suitable for large TV displays.
- Easy to customize and extend.

## Prerequisites

Make sure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.io/)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Inforum8/school-launch-frontend.git
cd school-launch-frontend
pnpm install
```

## Development

To start the development server with hot module replacement and other development features, run:

```bash
pnpm dev
```

Then open your browser and navigate to `http://localhost:3000`.

## Building

To create an optimized production build of the project, run:

```bash
pnpm build
```

The build artifacts will be stored in the `build` directory.

## Deploying

SvelteKit applications can be deployed to various environments. For static site hosting or serverless deployment, you can use adapters. Follow the official SvelteKit [deployment documentation](https://kit.svelte.dev/docs/adapters) for detailed instructions.

## Usage

Once the application is running, the current date and meal information will be displayed in a clear and concise manner. This application is specifically designed for Siji High School to be shown on a TV in the school premises.

### Configuration

To customize the application, you can edit the component files located in the `src` directory. Below are some key files you may want to modify:

- `src/routes/+page.svelte`: Main page component displaying the date and meal information.
- `src/lib/images/siji.png`: Image resource for the Siji High School logo.

### Styling

You can modify the styles in the `src/app.css` or add additional styles in the Svelte components using the `<style>` tag.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

## License

Distributed under the GPL3 License. See `LICENSE` for more information.

## Contact

나이준 - [naijun0403@gmail.com](mailto:naijun0403@gmail.com)

Project Link: [https://github.com/Inforum8/school-launch-frontend](https://github.com/Inforum8/school-launch-frontend)