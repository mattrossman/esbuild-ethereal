const esbuild = require("esbuild")
const server = require("live-server")
const { options } = require("./common")

esbuild
  .build({
    ...options,
    outdir: "public/build",
    watch: true,
  })
  .then(() => {
    server.start({
      port: 8080,
      root: "public",
      open: false,
    })
  })
