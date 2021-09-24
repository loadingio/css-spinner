mgr = new block.manager registry: ({name,version,path,type}) -> "/assets/lib/@loadingio/css-spinner/dev/entries/#name"
mgr.init!
  .then ->

    view = new ldview do
      root: document.body
      init-render: false
      action: click:
        spinner: -> console.log \ok123
      init:
        color: ({node}) ->
          ldcp = new ldcolorpicker node
          ldcp.on \change, ->
            node.style.background = ldcolor.web(it)
            view.get('gallery').style.color = ldcolor.web(it)
          node.style.background = ldcolor.web(ldcp.get-color!)
        slider: ({node}) ->
          ldrs = new ldslider root: node, min: 0.1, max: 1, step: 0.01, from: 1
          ldrs.on \change, (v) ->
            view.get-all \spinner .map -> it.style.transform = "scale(#{v})"
      handler: colorbox: (->), gallery: (->)
    view.render!

