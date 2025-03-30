class Pays extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/pays.json';
  }

  fetchResponseParsed(response, options) {
    console.log(response);
  }

}
