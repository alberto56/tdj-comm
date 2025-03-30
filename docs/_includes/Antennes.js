class Antennes extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/antennes.json';
  }

  activeForCountry(country) {
    let ret = [];
    this._data.forEach((node) => {
      if (node.active && node.country2.includes(country)) {
        ret.push(node);
      }
    });
    return ret;
  }

}
