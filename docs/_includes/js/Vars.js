class Vars extends Infos {
  url() {
    // Voir https://contenu.terredesjeunes.org/api/v1 pour détais.
    return 'https://contenu.terredesjeunes.org/api/v1/vars.json';
  }

  init2() {
    this.init();
  }

  fetchResponseParsed(response, options) {
    if(typeof response.variable == 'undefined') {
      console.log('No variables found in response');
      return;
    }
    response.variable.forEach((elem) => {
      const selector = '[data-var="' + elem.title + '"]';
      $(selector).text(elem.val);
    });
  }

}
