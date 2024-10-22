# FRAPPE : Front

This repository contains the front-end part of the FRAPPE project.

## Installation (to be modified)

First of all, clone the repository:

```bash
git clone https://gitlab-df.imt-atlantique.fr/frappe/front.git frappe-front-web
cd frappe-front-web
```

Then, install the dependencies:

```bash
npm install
```

Finally, you can run the project in dev mod:

```bash
npm run dev
```

The project should be live on `http://localhost:3000`.

## Dependencies

The list of dependencies/packages is described in the `package.json` file. The major packages used in the project are:

- `react` and `react-dom` for the front-end
- `vite` for the build
- `tailwindcss` for the CSS
- `shadcn` as a base to build the component library
- `eslint` and `prettier` for the code quality
