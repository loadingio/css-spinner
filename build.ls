require! <[fs fs-extra progress colors stylus pug]>

console.log "Build all CSS-spinners..."

progress-bar = (total = 10, text = "converting") ->
  bar = new progress(
    "   #text [#{':bar'.yellow}] #{':percent'.cyan} :etas",
    { total: total, width: 60, complete: '#' }
  )

spinners = fs.readdir-sync \src/
  .filter ->  fs.lstat-sync "src/#it" .is-directory!

bar = progress-bar spinners.length, "Build Spinners"
vars = fs.read-file-sync "vars.styl" .toString!
all-css = ""
all-pug = ""

spinners.map -> 
  src = do
    stylus: [vars, fs.read-file-sync("src/#it/index.styl").toString!].join(\\n)
    pug: fs.read-file-sync "src/#it/index.pug" .toString!
  css = stylus src.stylus .render!
  all-css += css
  html = pug.render src.pug
  html-css = """
  <style type="text/css">
  #css
  </style>
  #html
  """
  fs-extra.ensure-dir-sync "dist/entries/#it"
  fs.write-file-sync "dist/entries/#it/index.css", css
  fs.write-file-sync "dist/entries/#it/index.html", html
  fs.write-file-sync "dist/#it.html", html-css
  all-pug += """
  mixin lds-#it()
  #{src.pug.split(\\n).filter(->it).map(->"  #it").join(\\n)}\n
  """
  bar.tick!

fs.write-file-sync "dist/index.css", all-css
fs.write-file-sync "web/static/assets/index.css", all-css
fs.write-file-sync "dist/mixin.pug", all-pug
console.log "\nFinished."
