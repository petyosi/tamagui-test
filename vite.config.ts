import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { tamaguiExtractPlugin, tamaguiPlugin } from "@tamagui/vite-plugin";

const ext = {
  cjs: "cjs",
  es: "js",
} as const;

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8")) as {
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
};

const externalPackages = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];
const tamaguiConfig = {
  components: ["tamagui"],
  config: "tamagui.config.ts",
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    tamaguiPlugin(tamaguiConfig),
    tamaguiExtractPlugin(tamaguiConfig),
  ],

  build: {
    minify: "terser",
    lib: {
      entry: ["src/index.tsx"],
      formats: ["es", "cjs"],
      fileName: (format) => `index.${ext[format as "cjs" | "es"]}`,
    },
    rollupOptions: {
      external: externalPackages,
    },
  },
});
