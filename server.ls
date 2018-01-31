require! <[chokidar http fs path jade pug stylus markdown js-yaml]>
require! 'uglify-js': uglify, LiveScript: lsc

useMarkdown = true
markdown = markdown.markdown

RegExp.escape = -> it.replace /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"

cwd = path.resolve process.cwd!
cwd-re = new RegExp RegExp.escape "#cwd#{if cwd[* - 1]=='/' => "" else \/}"

jade-extapi = do
  md: -> markdown.toHTML it
  yaml: -> js-yaml.safe-load fs.read-file-sync it
  yamls: (dir) ->
    ret = fs.readdir-sync dir
      .map -> "#dir/#it"
      .filter -> /\.yaml$/.exec(it)
      .map ->
        try
          js-yaml.safe-load(fs.read-file-sync it)
        catch e
          console.log "[ERROR@#it]: ", e
    return ret

pad = -> if "#it".length < 2 => "0#it" else "#it"
now = -> new Date! |> -> 
  "[#{pad(it.getMonth! + 1)}/#{pad(it.getDate!)}" +
  " #{pad(it.getHours!)}:#{pad(it.getMinutes!)}:#{pad(it.getSeconds!)}]"

_log = console.log
console.log = (...arg) -> _log.apply null, [now!] ++ arg
ignore-list = [/^server.ls$/, /^library.jade$/, /^\.[^/]+/, /^node_modules\//,/^assets\//]
ignore-func = (f) -> if f => ignore-list.filter(-> it.exec f.replace(cwd-re, "")replace(/^\.\/+/, ""))length else 0

type-table =
  "3gp":"video/3gpp",
  "aiff":"audio/x-aiff",
  "arj":"application/x-arj-compressed",
  "asf":"video/x-ms-asf",
  "asx":"video/x-ms-asx",
  "au":"audio/ulaw",
  "avi":"video/x-msvideo",
  "bcpio":"application/x-bcpio",
  "ccad":"application/clariscad",
  "cod":"application/vnd.rim.cod",
  "com":"application/x-msdos-program",
  "cpio":"application/x-cpio",
  "cpt":"application/mac-compactpro",
  "csh":"application/x-csh",
  "css":"text/css",
  "deb":"application/x-debian-package",
  "dl":"video/dl",
  "doc":"application/msword",
  "drw":"application/drafting",
  "dvi":"application/x-dvi",
  "dwg":"application/acad",
  "dxf":"application/dxf",
  "dxr":"application/x-director",
  "etx":"text/x-setext",
  "ez":"application/andrew-inset",
  "fli":"video/x-fli",
  "flv":"video/x-flv",
  "gif":"image/gif",
  "gl":"video/gl",
  "gtar":"application/x-gtar",
  "gz":"application/x-gzip",
  "hdf":"application/x-hdf",
  "hqx":"application/mac-binhex40",
  "html":"text/html",
  "ice":"x-conference/x-cooltalk",
  "ico":"image/x-icon",
  "ief":"image/ief",
  "igs":"model/iges",
  "ips":"application/x-ipscript",
  "ipx":"application/x-ipix",
  "jad":"text/vnd.sun.j2me.app-descriptor",
  "jar":"application/java-archive",
  "jpeg":"image/jpeg",
  "jpg":"image/jpeg",
  "js":"text/javascript",
  "json":"application/json",
  "latex":"application/x-latex",
  "lsp":"application/x-lisp",
  "lzh":"application/octet-stream",
  "m":"text/plain",
  "m3u":"audio/x-mpegurl",
  "m4v":"video/mp4",
  "man":"application/x-troff-man",
  "me":"application/x-troff-me",
  "midi":"audio/midi",
  "mif":"application/x-mif",
  "mime":"www/mime",
  "mkv":"  video/x-matrosk",
  "movie":"video/x-sgi-movie",
  "mp4":"video/mp4",
  "mp41":"video/mp4",
  "mp42":"video/mp4",
  "mpg":"video/mpeg",
  "mpga":"audio/mpeg",
  "ms":"application/x-troff-ms",
  "mustache":"text/plain",
  "nc":"application/x-netcdf",
  "oda":"application/oda",
  "ogm":"application/ogg",
  "pbm":"image/x-portable-bitmap",
  "pdf":"application/pdf",
  "pgm":"image/x-portable-graymap",
  "pgn":"application/x-chess-pgn",
  "pgp":"application/pgp",
  "pm":"application/x-perl",
  "png":"image/png",
  "pnm":"image/x-portable-anymap",
  "ppm":"image/x-portable-pixmap",
  "ppz":"application/vnd.ms-powerpoint",
  "pre":"application/x-freelance",
  "prt":"application/pro_eng",
  "ps":"application/postscript",
  "qt":"video/quicktime",
  "ra":"audio/x-realaudio",
  "rar":"application/x-rar-compressed",
  "ras":"image/x-cmu-raster",
  "rgb":"image/x-rgb",
  "rm":"audio/x-pn-realaudio",
  "rpm":"audio/x-pn-realaudio-plugin",
  "rtf":"text/rtf",
  "rtx":"text/richtext",
  "scm":"application/x-lotusscreencam",
  "set":"application/set",
  "sgml":"text/sgml",
  "sh":"application/x-sh",
  "shar":"application/x-shar",
  "silo":"model/mesh",
  "sit":"application/x-stuffit",
  "skt":"application/x-koan",
  "smil":"application/smil",
  "snd":"audio/basic",
  "sol":"application/solids",
  "spl":"application/x-futuresplash",
  "src":"application/x-wais-source",
  "stl":"application/SLA",
  "stp":"application/STEP",
  "sv4cpio":"application/x-sv4cpio",
  "sv4crc":"application/x-sv4crc",
  "svg":"image/svg+xml",
  "swf":"application/x-shockwave-flash",
  "tar":"application/x-tar",
  "tcl":"application/x-tcl",
  "tex":"application/x-tex",
  "texinfo":"application/x-texinfo",
  "tgz":"application/x-tar-gz",
  "tiff":"image/tiff",
  "tr":"application/x-troff",
  "tsi":"audio/TSP-audio",
  "tsp":"application/dsptype",
  "tsv":"text/tab-separated-values",
  "unv":"application/i-deas",
  "ustar":"application/x-ustar",
  "vcd":"application/x-cdlink",
  "vda":"application/vda",
  "vivo":"video/vnd.vivo",
  "vrm":"x-world/x-vrml",
  "wav":"audio/x-wav",
  "wax":"audio/x-ms-wax",
  "webm":"video/webm",
  "wma":"audio/x-ms-wma",
  "wmv":"video/x-ms-wmv",
  "wmx":"video/x-ms-wmx",
  "wrl":"model/vrml",
  "wvx":"video/x-ms-wvx",
  "xbm":"image/x-xbitmap",
  "xlw":"application/vnd.ms-excel",
  "xml":"text/xml",
  "xpm":"image/x-xpixmap",
  "xwd":"image/x-xwindowdump",
  "xyz":"chemical/x-pdb",
  "zip":"application/zip"

watch-path = \.

mkdir-recurse = (f) ->
  if fs.exists-sync f => return
  parent = path.dirname(f)
  if !fs.exists-sync parent => mkdir-recurse parent
  fs.mkdir-sync f

styl-tree = do
  down-hash: {}
  up-hash: {}
  parse: (filename) ->
    dir = path.dirname(filename)
    ret = fs.read-file-sync filename .toString!split \\n .map(-> /^ *@import (.+)/.exec it)filter(->it)map(->it.1)
    ret = ret.map -> path.join(dir, it.replace(/(\.styl)?$/, ".styl"))
    @down-hash[filename] = ret
    for it in ret => if not (filename in @up-hash.[][it]) => @up-hash.[][it].push filename
  find-root: (filename) ->
    work = [filename]
    ret = []
    while work.length > 0
      f = work.pop!
      if @up-hash.[][f].length == 0 => ret.push f
      else work ++= @up-hash[f]
    ret

ctype = (name=null) ->
  if useMarkdown and /\.md$/.exec(name) => return \text/html
  ret = /\.([^.]+)$/.exec name
  return \application/octet-stream if not ret or not ret.1 or not type-table[ret.1]
  return type-table[ret.1]

ftype = ->
  switch
  | /\.ls$/.exec it => "ls"
  | /\.styl/.exec it => "styl"
  | /\.jade$/.exec it => "jade"
  | /\.pug/.exec it => "pug"
  | otherwise => "other"

# assign functions to route-table for server side script routing
sample-cgi = (req, res) ->
  res.writeHead 200, {"Content-type": "text/html"}
  res.end "hello world!"
route-table = {"/sample-cgi": sample-cgi}

server = (req, res) ->
  req.url = req.url - /[?#].*$/
  file-path = path.resolve cwd, ".#{req.url}"
  if file-path.indexOf(cwd) < 0 =>
    res.writeHead 403, ctype!
    return res.end "#{req.url} forbidden"

  # custom server side script
  rel-path = file-path.replace cwd, ""
  if rel-path of route-table => return route-table[rel-path] req, res

  # directory: give index.html, or generate a list of files
  if fs.existsSync(file-path) and fs.lstatSync(file-path)isDirectory! =>
    dir = file-path.replace /\/$/,""
    file-path = "#{file-path}/index.html"
    if not fs.existsSync(file-path) =>
      files = fs.readdirSync dir
      dir = req.url.replace /\/$/,""
      res.writeHead 200, {"Content-type": \text/html}
      res.write "<h2>#{dir}<h2>\n<ul>\n"
      for it in files => res.write "<li><a href='#{dir}/#{it}'>#{it}</a></li>\n"
      return res.end \</ul>\n

  # file not exists: 404
  if not fs.existsSync(file-path) =>
    res.writeHead 404, ctype!
    return res.end "#{req.url} not found"
  console.log "[ GET ] #{file-path} (#{ctype file-path})"

  length = 0
  buf = fs.readFileSync file-path
  if useMarkdown =>
    if /\.md$/.exec(file-path) =>
      buf = markdown.toHTML(buf.toString!).toString!
      buf = [
        '<meta charset="utf-8">'
        '<link rel="stylesheet" type="text/css" href="/assets/markdown-air/air.css"></link>'
        buf
      ].join("")
      length = Buffer.byteLength buf, 'utf-8'

  res.writeHead 200, do
    "Content-Length": length or buf.length
    "Content-Type": ctype file-path
  res.end buf

log = (error, stdout, stderr) -> if "#{stdout}\n#{stderr}".trim! => console.log that
filecache = {}
update-file = ->
  if !it or /node_modules|\.swp$/.exec(it)=> return
  src = if it.0 != \/ => path.join(cwd,it) else it
  src = src.replace path.join(cwd,\/), ""
  [type,cmd,des] = [ftype(src), "",""]
  if /^src\/([^/]+)/.exec(src) and !/\.html$/.exec(src) =>
    ret = /^src\/([^/]+)/.exec(src)
    spinner-path = "src/#{ret.1}"
    build-path = "build/#{ret.1}"
    mkdir-recurse build-path
    html = pug.render fs.read-file-sync "#spinner-path/main.pug"
    stylus([
      fs.read-file-sync("vars.styl")toString!,
      fs.read-file-sync("basic.styl")toString!,
      fs.read-file-sync("#spinner-path/main.styl")toString!,
    ].join(\\n))
      .render (e, css) ->
        fs.write-file-sync "#build-path/main.css", css
        fs.write-file-sync "#build-path/main.html", html
        fs.write-file-sync "#build-path/sample.html", """
        <style type="text/css">
          #css
        </style>
        #html
        """

  if type == \other => return
  if type == \ls =>
    if /src\/ls/.exec src =>
      try
        files = fs.readdir-sync \src/ls/ .map -> "src/ls/#it"
        files = files.filter -> (/\/\./.exec it) == null
        #result = [uglify.minify(lsc.compile(fs.read-file-sync(file)toString!,{bare:true}),{fromString:true}).code for file in files].join("")
        # uglify gives undefined. debug this later...
        result = [lsc.compile(fs.read-file-sync(file)toString!,{bare:true}) for file in files].join("")
        fs.write-file-sync "build.min.js", result
        console.log "[BUILD] #src --> build.min.js"
      catch
        console.log "[BUILD] #src failed: "
        console.log e.message
      return
    else =>
      des = src.replace /\.ls$/, ".js"
      try
        mkdir-recurse path.dirname(des)
        fs.write-file-sync(
          des,
          # uglify gives undefined. debug this later...
          lsc.compile(fs.read-file-sync(src)toString!,{bare:true})
        )
        console.log "[BUILD] #src --> #des"
      catch
        console.log "[BUILD] #src failed: "
        console.log e.message
      return
  if type == \styl =>
    if /(basic|vars)\.styl/.exec it => return
    try
      styl-tree.parse src
      srcs = styl-tree.find-root src
    catch
      console.log "[BUILD] #src failed: "
      console.log e.message

    console.log "[BUILD] recursive from #src:"
    for src in srcs
      try
        des = src.replace(/src\/styl/, "static/css").replace(/\.styl$/, ".css")
        code = fs.read-file-sync(src)toString!
        if /^\/\/- ?(module) ?/.exec(code) => continue
        stylus code
          .set \filename, src
          .define 'index', (a,b) ->
            a = (a.string or a.val).split(' ')
            return new stylus.nodes.Unit(a.indexOf b.val)
          .render (e, css) ->
            if e =>
              console.log "[BUILD]   #src failed: "
              console.log "  >>>", e.name
              console.log "  >>>", e.message
            else => 
              mkdir-recurse path.dirname(des)
              fs.write-file-sync des, css
              console.log "[BUILD]   #src --> #des"
      catch
        console.log "[BUILD]   #src failed: "
        console.log e.message

  if type == \jade => 
    des = src.replace /\.jade$/, ".html"
    try 
      code = fs.read-file-sync src .toString!
      if /^\/\/- ?(module|view) ?/.exec(code) => return
      desdir = path.dirname(des)
      if !fs.exists-sync(desdir) or !fs.stat-sync(desdir).is-directory! => mkdir-recurse desdir
      fs.write-file-sync des, jade.render code, {filename: src, basedir: path.join(cwd)} <<< jade-extapi
      console.log "[BUILD] #src --> #des"
    catch
      console.log "[BUILD] #src failed: "
      console.log e.message
    return 

  if type == \pug => 
    des = src.replace /\.pug/, ".html"
    try 
      code = fs.read-file-sync src .toString!
      if /^\/\/- ?(module|view) ?/.exec(code) => return
      desdir = path.dirname(des)
      if !fs.exists-sync(desdir) or !fs.stat-sync(desdir).is-directory! => mkdir-recurse desdir
      fs.write-file-sync des, pug.render code, {filename: src, basedir: path.join(cwd)} <<< jade-extapi
      console.log "[BUILD] #src --> #des"
    catch
      console.log "[BUILD] #src failed: "
      console.log e.message
    return 


watcher = chokidar.watch watch-path, ignored: ignore-func, persistent: true
  .on \add, update-file
  .on \change, update-file

http.createServer server .listen 9999, \0.0.0.0

console.log "running server on 0.0.0.0:9999"
