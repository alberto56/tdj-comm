class ConditionalFieldChecker {
  run() {
    const that = this;
    this.findAllHints(function (hints) {
      that.processHints(hints);
    });
  }
  processHints(hints) {
    const that = this;
    hints.each(function () {
      const hint = $(this);
      that.processSingleHint(hint);
    });
  }
  processSingleHint(hint) {
    // This is where you would figure out if the hint contains
    // [use-only-for-xxxx: yyyy;zzzz;...], and find the parent
    // element xxxx and see if it it selected to yyyy or zzzz,
    // then hide this if it is not that.
  }
  findAllHints(callback) {
    const that = this;
    const hints = $('[class*="ControlHint"]');
    if (!hints.length) {
      setTimeout(() => {
        that.findAllHints(callback);
      }, 300);
    }
    else {
      callback(hints);
    }
  }
}

$( document ).ready(function() {
  (new ConditionalFieldChecker()).run();
});
