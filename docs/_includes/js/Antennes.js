class Antennes extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/antennes.json';
  }

  getPays(antenne) {
    antenne = this.getStruct(antenne);

    if (typeof antenne.country2 != 'undefined') {
      return antenne.country2[0];
    }
    return '';
  }

  getPaysAsArray(antenne) {
    antenne = this.getStruct(antenne);

    if (typeof antenne.country2 != 'undefined') {
      return antenne.country2;
    }

    return [];
  }

  getDrapeau(antenne) {
    const pays = this.getPays(antenne);
    return this.s('pays').getFlag(pays);
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
