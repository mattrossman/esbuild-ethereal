const alias = require("esbuild-plugin-alias")
const stylePlugin = require("esbuild-style-plugin")
const path = require("path")

/** @type {import("esbuild").BuildOptions} */
module.exports.options = {
  entryPoints: ["src/index.jsx"],
  bundle: true,
  inject: [path.resolve(__dirname, "./react-inject.js")],
  plugins: [
    alias({
      "@": path.resolve(__dirname, "../"),
      react: require.resolve("preact/compat"),
      "react-dom": require.resolve("preact/compat"),
    }),
  ],
}
