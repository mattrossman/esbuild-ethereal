const esbuild = require("esbuild")
const { options } = require("./common")

const time = Date.now()
esbuild
  .build({
    ...options,
    entryPoints: ["src/hubs.jsx"],
    outdir: "build",
    minify: true,
    metafile: true,
  })
  .then((result) => {
    const diff = Date.now() - time
    console.log(`⚡ Done in ${diff} ms`)
    esbuild.analyzeMetafile(result.metafile).then((text) => console.log(text))
  })
