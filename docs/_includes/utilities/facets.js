/**
 * Pour tester ce code:
 *
 * * Aller à /articles/
 * * Ouvrir la console
 * * services.get('facets').addToFacet('categories', 'Eau');
 */

class Facet extends Service {

  constructor(services) {
    super(services);
    this._value = [];
  }

  addToHashObject(obj) {
    if (this._value.length === 0) {
      delete obj[this.id()];
    }
    else if (this.toHashValue()) {
      obj[this.id()] = this.s('textUtilities').sanitizeString(
        this.toHashValue(),
      );
    }
    return obj;
  }

  add(value) {
    this.addSanitized(this.s('textUtilities').sanitizeString(value));
  }

  remove(value) {
    this.removeSanitized(this.s('textUtilities').sanitizeString(value));
  }

  addSanitized(value) {
    throw "please use subclass";
  }

  putInButtons(filtered) {
  }

  removeSanitized(value) {
    throw "please use subclass";
  }

  hide(article) {
    if (this._value.length === 0) {
      return false;
    }
    return !this.articleMatches(article);
  }

  articleMatches(article) {
    throw "please use subclass";
  }

  filter(articles) {
    return articles;
  }

  toHashValue() {
    if (this._value.length === 0) {
      return '';
    }
    return this.preprocessHashValue(this._value);
  }

  preprocessHashValue(value) {
    throw "please use subclass";
  }

  fetchFromUrl() {
    const raw = this.s('url').var(this.id());
    this._value = this.postProcess(raw);
  }

  id() {
    throw "please use subclass";
  }

  postProcess(raw) {
    throw "please use subclass";
  }

}

class ListFacet extends Facet {

  postProcess(raw) {
    if (!raw.startsWith('(')) {
      return [];
    }
    if (!raw.endsWith(')')) {
      return [];
    }
    return raw
      .substring(1, raw.length - 1)
      .split(')(');
  }

  addSanitized(value) {
    if (!this._value.includes(value)) {
      this._value.push(value);
    }
  }

  putInButtons(filtered) {
    const that = this;

    if (!that._value.length) {
      $('.my-category[data-facet=' + that.id() + ']').removeClass('my-selected');
    }

    $('.my-category').each(function() {
      if ($( this ).attr('data-facet') == that.id()) {
        const category = $( this ).attr('data-add-category');
        const decoded = decodeURI(category);
        for (const value of that._value) {
          if (that.s('textUtilities').sanitizeString(value) ==
            that.s('textUtilities').sanitizeString(decoded)) {
              $( this ).addClass('my-selected');
          }
        }
      }
    });
  }

  removeSanitized(value) {
    // https://stackoverflow.com/a/66956107/1207752
    this._value.includes(value) && this._value.splice(this._value.indexOf(value), 1);
  }

  preprocessHashValue(value) {
    return '(' + this._value.join(')(') + ')';
  }

}

class SearchWordFacet extends Facet {

  id() {
    return "recherche";
  }

  postProcess(raw) {
    return raw ? [raw] : [];
  }

  preprocessHashValue(value) {
    return value.join(' ')
  }

  addSanitized(value) {
    this._value = [value];
  }

  removeSanitized(value) {
    // Regardless of the value, reset the search word.
    this._value = [];
  }

  articleMatches(article) {
    return article.matchesSearchWord(this._value.join(' '));
  }

}

class CategoryFacet extends ListFacet {

  id() {
    return "categories";
  }

  articleMatches(article) {
    return article.categoriesOverlap(this._value);
  }

}

class CountryFacet extends ListFacet {

  id() {
    return "pays";
  }

  articleMatches(article) {
    return article.countriesOverlap(this._value);
  }

}

class Article extends Service {

  constructor(services, struct) {
    super(services);
    this._struct = struct;
  }

  articleId() {
    return this._struct.url;
  }

  matchesSearchWord(searchWord) {
    const needle = this.s('textUtilities').sanitizeString(searchWord);
    const haystack = ' ' + this.unaccentedTextToSearch() + ' ';

    for (const word of needle.split(' ')) {
      if (word) {
        if (haystack.includes(' ' + word + ' ')) {
          return true;
        }
      }
    }
    return false;
  }

  unaccentedTextToSearch() {
    const countries = this.countries();
    const categories = this.categories();
    const title = this.title();
    const content = this.content();

    const countriesAsPlainText =
      this.s('textUtilities').sanitizeString(countries.join(' '));
    const categoriesAsPlainText =
      this.s('textUtilities').sanitizeString(categories.join(' '));
    const titleAsPlainText =
      this.s('textUtilities').sanitizeString(title);
    const contentAsPlainText =
      this.s('textUtilities').sanitizeString(content);

    return [
      countriesAsPlainText,
      categoriesAsPlainText,
      titleAsPlainText,
      contentAsPlainText,
    ].join(' ');
  }

  content() {
    return this._struct.content ? this._struct.content : '';
  }

  title() {
    return this._struct.title ? this._struct.title : '';
  }

  antennes() {
    if (!this._struct.antenne2) {
      return [];
    };
    return this._struct.antenne2;
  }

  categories() {
    const toRemove = 'jekyll_blogposts';
    let categories = this._struct.categories ? this._struct.categories : [];

    categories.includes(toRemove) && categories.splice(categories.indexOf(toRemove), 1);

    return categories
  }

  countries() {
    let ret = [];
    for (const antenne of this.antennes()) {
      ret = ret.concat(this.s('antennes').getPaysAsArray(antenne));
    }
    return ret;
  }

  categoriesOverlap(categories) {
    return this.overlap(this.categories(), categories);
  }

  countriesOverlap(countries) {
    return this.overlap(this.countries(), countries);
  }

  overlap(arr1, arr2) {
    if (arr1.length === 0 || arr2.length === 0) {
      return false;
    }

    const asciiArr1 = this.s('textUtilities').sanitizeArray(arr1);
    const asciiArr2 = this.s('textUtilities').sanitizeArray(arr2);

    for (const item of asciiArr1) {
      if (asciiArr2.includes(item)) {
        return true;
      }
    }
    return false;
  }

  selector() {
    return '[data-url-for-filtering="' + this.articleId() + '"]';
  }

  visible() {
    return $(this.selector()).is(':visible');
  }

  setVisible(visible) {
    $(this.selector()).each(function() {
      if (visible) {
        $( this ).show();
      }
      else {
        $( this ).hide();
      }
    });
  }

}

class Facets extends Service {

  constructor(services) {
    super(services);
    this._facets = {
      categories: new CategoryFacet(services),
      pays: new CountryFacet(services),
      recherche: new SearchWordFacet(services),
    };
  }

  init2(addOrRemoveFilter = '') {
    this.armReinitButton();
    this
      .fetchFromUrl()
      .broadcast();
  }

  resetAll() {
    const that = this;
    Object.keys(that._facets).forEach(key => {
      that._facets[key]._value = [];
    });
    this.broadcast();
  }

  armReinitButton() {
    const that = this;
    $('.my-init-all-facets').off().on('click', function(e) {
      e.preventDefault();
      that.resetAll();
    });
  }

  fetchFromUrl() {
    const that = this;
    Object.keys(that._facets).forEach(key => {
      that._facets[key].fetchFromUrl();
    });
    return this;
  }

  addToFacet(facet, value) {
    if (this._facets[facet]) {
      this._facets[facet].add(value);
    }
    this.broadcast();
  }

  removeFromFacet(facet, value) {
    if (this._facets[facet]) {
      this._facets[facet].remove(value);
    }
    this.broadcast();
  }

  showOrHideReinitButton() {
    let hasValues = false;
    const that = this;
    Object.keys(that._facets).forEach(key => {
      if (that._facets[key]._value.length > 0) {
        hasValues = true;
      };
    });

    if (hasValues) {
      $('.my-init-all-facets').show();
    }
    else {
      $('.my-init-all-facets').hide();
    }
  }

  broadcast() {
    this.showOrHideReinitButton();
    this.putInUrl();
    this.putInDom();
    this.putInButtons();
  }

  putInUrl() {
    const that = this;
    const hash = this.s('url').getHash();
    let obj = this.s('url').hashToObject(hash);
    Object.keys(that._facets).forEach(key => {
      obj = that._facets[key].addToHashObject(obj);
    });
    this.s('url').setHash(this.s('url').objectToHash(obj));
  }

  putInDom() {
    this.showOrHideArticles();
    this.showOrHideReinitButton();
    this.fillSearchField();
  }

  fillSearchField() {
    $('.my-article-search').val(this._facets['recherche']._value.join(' '));
  }

  showOrHideArticles() {
    const articles = this.articles();

    for (const article of articles) {
      const that = this;
      let visible = true;

      Object.keys(that._facets).forEach(key => {
        if (that._facets[key].hide(article)) {
          visible = false;
        };
      });

      article.setVisible(visible);
    }

    this.setEmptyState(articles);
  }

  setEmptyState(articles) {
    if (this.atLeastOneArticleVisible(articles)) {
      $('.my-no-articles').hide();
    }
    else {
      $('.my-no-articles').show();
    }
  }

  atLeastOneArticleVisible(articles) {
    for (const article of articles) {
      if (article.visible()) {
        return true;
      }
    }
    return false;
  }

  putInButtons() {
    const that = this;
    Object.keys(that._facets).forEach(key => {
      that._facets[key].putInButtons(this.filtered());
    });
  }

  filtered() {
    const that = this;
    let articles = this.articles();

    Object.keys(that._facets).forEach(key => {
      articles = that._facets[key].filter(articles);
    });

    return articles;
  }

  articles() {
    let ret = [];
    for (const struct of this.s('articles')._data) {
      ret.push(new Article(this.services, struct));
    }
    return ret;
  }

}
