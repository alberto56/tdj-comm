/** Services singleton. Contains all other singletons. */
class Services {
  /** Init all the singletons. */
  async init(settings) {
    this.membres = await new Membres(this).preload();
    this.activites = await new Activites(this).preload();
    this.articles = await new Articles(this).preload();
    this.vars = await new Vars(this).preload();

    [
      'membres',
      'activites',
      'articles',
    ].forEach((serviceName) => {
      this[serviceName].init2(settings[serviceName]);
    });

    return this;
  }
  /** Get a singleton. */
  get(name) {
    if (typeof this[name] == 'undefined') {
      throw new Error('Unknown service or services has not been initalized: ' + name);
    }
    return this[name];
  }
}
