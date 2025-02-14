class Infos {
  init() {
    this.fetchData();
  }

  url() {
    throw new Error('SVP utiliser une sous-classe comme Membres.');
  }

  variables() {
    throw new Error('SVP utiliser une sous-classe comme Membres.');
  }

  template() {
    throw new Error('SVP utiliser une sous-classe comme Membres.');
  }

  selecteur() {
    throw new Error('SVP utiliser une sous-classe comme Membres.');
  }

  /** voir https://github.com/tdjeunes/website/blob/master/docs/scripts/fetch-new-content.js  */
  fetchData() {
    const that = this;
    this.fetch((response) => {
      that.fetchResponseParsed(JSON.parse(response));
    });
  }

  /** voir https://github.com/tdjeunes/website/blob/master/docs/scripts/fetch-new-content.js  */
  fetchResponseParsed(response) {
    response.forEach((node) => {
      this.fetchResponseSingle(node);
    });
  }

  fetchResponseSingle(node) {
    let template = this.template();
    const obj = this.variables();
    const that = this;
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        template = that.replaceVariable(template, prop, node[prop], obj[prop]);
      }
    }

    console.log('appending node');
    console.log(template);
    $(this.selecteur()).append(template);
  }

  replaceVariable(template, prop, value, type) {
    let prefix = '';
    if (type == 'image') {
      prefix = 'https://contenu.terredesjeunes.org';
    }
    const valueAndPrefix = prefix + value;
    return template.replace(new RegExp('{{' + prop + '}}', 'g'), valueAndPrefix);
  }

  /** voir https://github.com/tdjeunes/website/blob/master/docs/scripts/fetch-new-content.js  */
  cacheBuster() {
    return Math.floor(Date.now()/300000);
  }

  /** voir https://github.com/tdjeunes/website/blob/master/docs/scripts/fetch-new-content.js  */
  fetch(callback) {
    // Changes every 5 minutes.
    const cachebuster = this.cacheBuster();
    const that = this;
    const url = that.url() + '?cache-buster=' + cachebuster;

    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    }
    xhr.send();
  }

}
