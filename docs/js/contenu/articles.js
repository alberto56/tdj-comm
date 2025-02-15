class Articles extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/all.json';
  }

  populateArticles(callback) {
    this._callback = callback;
    this.init();
  }

  fetchResponseParsed(response) {
    const callback = this._callback;
    let articles = [];


    response.forEach((node) => {
      articles.push({
        title: node.title,
        description: node.excerpt,
        image: 'https://contenu.terredesjeunes.org' + node.img[0],
        url: 'https://contenu.terredesjeunes.org' + node.url,
      });
    });
    callback(articles);
  }
}
