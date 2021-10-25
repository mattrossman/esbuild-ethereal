const esbuild = require("esbuild")
const { options } = require("./common")

const time = Date.now()
esbuild
  .build({
    ...options,
    outdir: "build",
    minify: true,
    metafile: true,
    external: ["three"],
  })
  .then((result) => {
    const diff = Date.now() - time
    console.log(`⚡ Done in ${diff} ms`)
    esbuild.analyzeMetafile(result.metafile).then((text) => console.log(text))
  })
