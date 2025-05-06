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

  getConfirmationId() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is 0-indexed, so add 1
    const day = today.getDate();
    const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const confirmationId = year + '-' + month + '-' + day + '-' + random;
    return confirmationId;
  }

  showItemsAtLevel(level) {
    $('.my-contact-hide-on-reset').css('background-color', 'green');
    const that = this;
    this.itemsAtLevel(level).each(function() {
      $( this ).css('background-color', 'yellow');
      if ($( this ).attr('data-show-form')) {
        $('.my-contact-form').css('background-color', 'yellow');
        $('.my-form-confirmation-id').val(that.getConfirmationId());
        if ($( this ).attr('data-show-subject')) {
          $('.my-form-subject').val($( this ).attr('data-show-subject'));
        }
        if ($( this ).attr('data-hint')) {
          $('.my-form-message').attr(
            'placeholder',
            $( this ).attr('data-hint')
          );
        }
      }
    });
  }

  selectorLevel(level) {
    const ret = '.my-contact-funnel-level-' + level;
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
