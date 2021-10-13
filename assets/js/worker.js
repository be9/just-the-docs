onmessage = function(e) {
  importScripts('vendor/lunr.min.js')

  var docs = JSON.parse(e.data);

  lunr.tokenizer.separator = {{ site.search.tokenizer_separator | default: site.search_tokenizer_separator | default: "/[\s\-/]+/" }}

  var index = lunr(function(){
    this.ref('id');
    this.field('title', { boost: 200 });
    this.field('content', { boost: 2 });
    {%- if site.search.rel_url != false %}
    this.field('relUrl');
    {%- endif %}

    this.metadataWhitelist = ['position']

    for (var i in docs) {
      this.add({
        id: i,
        title: docs[i].title,
        content: docs[i].content,
        relUrl: docs[i].relUrl
      });
    }
  });
  postMessage({'docs': docs, 'index': index.toJSON()})
}

