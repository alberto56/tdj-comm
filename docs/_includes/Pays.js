class Pays extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/pays.json';
  }

  init2() {
    this.init();
  }

  getResponseSingle(node) {
    const contenu = 'https://contenu.terredesjeunes.org';
    const activeAntennes = this.s('antennes').activeForCountry(node.title);
    let url = contenu + node.url;
    switch (activeAntennes.length) {
      case 0:
        return;
      case 1:
        url = activeAntennes[0].page_url;
        break;
      default:
        break;
    }
    let ret = super.getResponseSingle(node);
    ret = ret.replace(new RegExp('__url__', 'g'), url);
    ret = ret.replace(new RegExp('__num__', 'g'), activeAntennes.length);
    return ret;
  }

  selecteur() {
    return '.mettre-pays-ici';
  }

  variables() {
    // Voir l'URL pour détais. Sont dans template, par exemple {{nom}}
    return {
      'title': 'string',
      'drapeau': 'image',
    };
  }

  template() {
    return `
<li>
  <img src="__drapeau__" alt="Drapeau: __title__" width="30">
  <a href="__url__">__title__ (__num__)</a>
</li>
`;
  }

}
