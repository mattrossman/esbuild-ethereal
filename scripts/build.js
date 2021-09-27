const esbuild = require("esbuild")

const time = Date.now()
esbuild
  .build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outdir: "build",
    minify: true,
    metafile: true,
  })
  .then((result) => {
    const diff = Date.now() - time
    console.log(`⚡ Done in ${diff} ms`)
    esbuild.analyzeMetafile(result.metafile).then((text) => console.log(text))
  })
