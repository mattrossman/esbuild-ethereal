const esbuild = require("esbuild")
const server = require("live-server")
const { options } = require("./common")

esbuild
  .build({
    ...options,
    entryPoints: ["src/index.jsx", "src/hubs.jsx"],
    outdir: "public/build",
    watch: true,
  })
  .then(() => {
    server.start({
      port: 8080,
      root: "public",
      open: false,
      cors: true,
    })
  })
