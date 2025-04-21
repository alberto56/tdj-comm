class Membres extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/bios.json';
  }

  init2(options) {
    this.populateTeamMembers(
      options.callback,
      options,
    )
  }

  populateTeamMembers(callback, options) {
    this._callback = callback;
    this.init(options);
  }

  fetchResponseParsed(response, options) {
    let teamMembers = [];
    response.forEach((node) => {
      teamMembers.push({
        name: node.nom,
        role: node.title,
        image: 'https://contenu.terredesjeunes.org' + node.image,
      });
    });

    const callback = this._callback;
    if (callback) {
      callback(teamMembers);
    }
  }

}
