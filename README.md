# React + Vite + Lightweight-charts-react-components.

This template provides a minimal setup to get React working in Vite with Lightweight-charts-react-components

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Step 1. 
run Command: npm create vite@latest lwc-react -- --template react
For example:
 D:\vsc-workspace> npm create vite@latest lwc-react -- --template react

> npx
> create-vite lwc-react --template react


◇  Scaffolding project in D:\vsc-workspace\lwc-react...
│
└  Done.
Step 2:
D:\vsc-workspace> cd .\lwc-react\
D:\vsc-workspace\lwc-react> npm install
added 152 packages, and audited 153 packages in 5s

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS D:\vsc-workspace\lwc-react> npm install lightweight-charts-react-components                   

added 3 packages, and audited 156 packages in 1s

33 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


Step 3: copy App.jsx and then copy all files in /components/ to src/ folder.

Step 4: D:\vsc-workspace\lwc-react> npm run dev

> lwc-react@0.0.0 dev
> vite


  VITE v7.0.6  ready in 237 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

  You should now be able to view the charts examples.