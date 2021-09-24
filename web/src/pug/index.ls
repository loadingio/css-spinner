<-(->it.apply {}) _
mgr = new block.manager {
  registry: ({name,version,path,type}) -> "/assets/lib/@loadingio/css-spinner/dev/#name.html"
}
mgr.init!
  .then ~>

    view = new ldview do
      root: document.body
      init-render: false
      action: click:
        spinner: ({node}) ~>
          name = node.getAttribute(\data-name)
          @ldcv.toggle true
            .then ->
              mgr.get({name: name, version: 'master', path: 'index.html'})
            .then (bc) ~> bc.create {}
            .then (bi) ~>
              if @bi => @bi.detach!
              @bi = bi
              root = view.get('preview')
              root.innHTML = ''
              bi.attach {root: view.get('preview')}
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

    @ldcv = new ldcover root: view.get('ldcv')
