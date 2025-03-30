class Articles extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/all.json';
  }

  init2(options) {
    this.populateArticles(
      options.callback,
      options,
    )
  }

  populateArticles(callback, options) {
    this._callback = callback;
    this.init(options);
  }

  fetchResponseParsed(response, options) {
    const callback = this._callback;
    let articles = [];

    response.forEach((node) => {
      let show = true;

      if (typeof options !== 'undefined' && typeof options.not !== 'undefined') {
        node.categories.forEach((category) => {
          options.not.forEach((not) => {
            if (category === not) {
              show = false;
            }
          });
        });
      }

      if (!show) {
        return;
      }
      let article = {
        title: node.title,
        description: node.excerpt,
      }

      if (typeof node.img[0] != 'undefined') {
        article.image = 'https://contenu.terredesjeunes.org' + node.img[0];
      }
      if (typeof node.url != 'undefined') {
        article.url = 'https://contenu.terredesjeunes.org' + node.url;
      }

      articles.push(article);
    });
    callback(articles);
  }
}
