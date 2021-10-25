const alias = require("esbuild-plugin-alias")
const path = require("path")

/** @type {import("esbuild").BuildOptions} */
module.exports.options = {
  bundle: true,
  inject: [path.resolve(__dirname, "./react-inject.js")],
  format: "esm",
  plugins: [
    alias({
      "@": path.resolve(__dirname, "../"),
      react: require.resolve("preact/compat"),
      "react-dom": require.resolve("preact/compat"),
    }),
  ],
}
