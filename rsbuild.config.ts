// import { spawn, type ChildProcess } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";

import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginEslint } from "@rsbuild/plugin-eslint";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";

const { publicVars } = loadEnv({ prefixes: ["APP_"], processEnv: import.meta.env });

const config = defineConfig({
  dev: {
    cliShortcuts: {
      help: false,
    },
    lazyCompilation: {
      entries: true,
      imports: true,
    },
    progressBar: true,
  },
  html: {
    template: "./public/index.html",
    templateParameters: {
      sprite: readFileSync(resolve(import.meta.dirname, "public/images/sprite.svg"), "utf-8"),
    },
  },
  performance: {
    removeConsole: ["log"],
  },
  plugins: [
    pluginEslint({
      enable: true,
      eslintPluginOptions: {
        configType: "flat",
        cwd: import.meta.dirname,
        exclude: ["dist", "node_modules"],
      },
    }),
    pluginReact(),
    pluginTypeCheck(),
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "src"),
    },
    extensions: [".js", ".ts", ".tsx"],
  },
  // server: {
  //   setup: ({ action }) => {
  //     if (action !== "dev") return;
  //     const sim: ChildProcess = spawn("node", ["./src/ros/bridge.ts"], {
  //       stdio: "inherit",
  //     });

  //     return (): void => {
  //       process.on("exit", () => sim.kill());
  //       process.on("SIGINT", () => {
  //         sim.kill();
  //         process.exit(0);
  //       });
  //     };
  //   },
  // },
  source: {
    define: publicVars,
    entry: {
      index: "./src/index.tsx",
    },
    exclude: [resolve(import.meta.dirname, "dist")],
  },
  tools: {
    rspack: (config, { appendPlugins, isDev }) => {
      appendPlugins([new VanillaExtractPlugin()]);

      if (isDev) {
        config.optimization = {
          ...config.optimization,
          splitChunks: false,
        };
      }
    },
  },
});

export default config;
