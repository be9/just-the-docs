onmessage = function(e) {
  importScripts('vendor/lunr.min.js')

  var docs = JSON.parse(e.data);

  lunr.tokenizer.separator = /[\s/]+/

  var index = lunr(function(){
    this.ref('id');
    this.field('title', { boost: 200 });
    this.field('content', { boost: 2 });
    this.field('relUrl');
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

