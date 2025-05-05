class Funnel extends Service {

  init2() {
    if (this.existsOnPage()) {
      this.initExisting();
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
      that.s('funnel').showItemsAtLevel(
        $( this ).attr('data-level') + '-' + $( this ).attr('data-id')
      );
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
    });
  }

  showItemsAtLevel(level) {
    $('.my-contact-funnel-level').css('background', 'green');
    this.itemsAtLevel(level).each(function() {
      $( this ).css('background', 'yello');
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
