const esbuild = require("esbuild")
const server = require("live-server")

esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    watch: true,
    outdir: "public/build",
  })
  .then(() => {
    server.start({
      port: 8080,
      root: "public",
      open: false,
    })
  })
