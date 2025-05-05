class Funnel extends Service {

  init2() {
    if (this.existsOnPage()) {
      this.initExisting();
      const that = this;
      // Back / forward button
      window.addEventListener('popstate', () => {
        that.initExisting();
      });
    }
  }

  existsOnPage() {
    return $('.my-contact-funnel').length > 0;
  }

  initExisting() {
    const level = this.getLevel();
    this.showItemsAtLevel(level);
    this.armSteps();
    this.armSelections();
  }

  armSelections() {
    const that = this;
    $('.my-contact-funnel-item').off().on('click', function() {
      const level = $( this ).attr('data-level') + '-' + $( this ).attr('data-id');
      that.updateHash(level);
      that.s('funnel').showItemsAtLevel(level);
    });
  }

  armSteps() {
    const that = this;
    $('.my-step-previous').off().on('click', function() {
      const all = $( this ).attr('data-level')
        .split('-')
        .slice(0, $( this ).attr('data-index'))
        .join('-');

      that.showItemsAtLevel(all);
      that.updateHash(all);
    });
  }

  updateHash(level) {
    const hash = this.s('url').setParam('level', level);
    if (this.s('url').getHash() !== hash) {
      this.s('url').setHash(hash);
    }
  }

  showItemsAtLevel(level) {
    $('.my-contact-funnel-level').hide();
    $('#my-form').hide();
    this.itemsAtLevel(level).each(function() {
      $( this ).show();
      if ($( this ).attr('data-show-form')) {
        $('#my-form').show();
      }
    });
  }

  selectorLevel(level) {
    const ret = '.my-contact-funnel-level-' + level;
    console.log('selectorLevel', ret);
    return ret;
  }

  itemsAtLevel(level) {
    return $(this.selectorLevel(level));
  }

  getLevel() {
    const defaultLevel = 'start';
    const candidate = this.s('url').var('level', defaultLevel);
    if (this.itemsAtLevel(candidate).length > 0) {
      return candidate;
    }
    return defaultLevel;
  }

}
