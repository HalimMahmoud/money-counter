import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  base: "teller",
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
