/**
 * See https://stackoverflow.com/questions/5329201/jquery-move-elements-into-a-random-order
 *
 * jQuery Shuffle (/web/20120307220753/http://mktgdept.com/jquery-shuffle)
 * A jQuery plugin for shuffling a set of elements
 *
 * v0.0.1 - 13 November 2009
 *
 * Copyright (c) 2009 Chad Smith (/web/20120307220753/http://twitter.com/chadsmith)
 * Dual licensed under the MIT and GPL licenses.
 * /web/20120307220753/http://www.opensource.org/licenses/mit-license.php
 * /web/20120307220753/http://www.opensource.org/licenses/gpl-license.php
 *
 * Shuffle elements using: $(selector).shuffle() or $.shuffle(selector)
 *
 **/
(function(d){d.fn.shuffle=function(c){c=[];return this.each(function(){c.push(d(this).clone(true))}).each(function(a,b){d(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);c.splice(a,1)})};d.shuffle=function(a){return d(a).shuffle()}})(jQuery);

$( document ).ready(function() {
  $('video').on('click', function() {
    document.querySelectorAll('video').forEach(vid => vid.pause());
    $(this).get(0).play();
  });
  $('.my-collage-card').shuffle();
});
