import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

import { defineConfig, loadEnv, type Rspack } from "@rsbuild/core";
import { pluginEslint } from "@rsbuild/plugin-eslint";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";

const { publicVars } = loadEnv({ prefixes: ["APP_"], processEnv: import.meta.env });
const devCertPath = resolve(import.meta.dirname, "certificates/localhost-cert.pem");
const devKeyPath = resolve(import.meta.dirname, "certificates/localhost-key.pem");
const devCertExists = existsSync(devCertPath) && existsSync(devKeyPath);

const config = defineConfig(({ command }) => ({
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
  server:
    command === "dev" && devCertExists
      ? {
          https: {
            cert: readFileSync(devCertPath),
            key: readFileSync(devKeyPath),
          },
        }
      : undefined,
  source: {
    define: publicVars,
    entry: {
      index: "./src/index.tsx",
    },
    exclude: [resolve(import.meta.dirname, "dist")],
  },
  tools: {
    rspack: (config, { appendPlugins, isDev }): Rspack.Configuration | void => {
      appendPlugins([new VanillaExtractPlugin()]);

      if (isDev) {
        config.optimization = {
          ...config.optimization,
          splitChunks: false,
        };
      }
    },
  },
}));

export default config;
