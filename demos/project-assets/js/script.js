$(document).ready(function() {

  // Grid
  $('body')
    .on('click', '.grid-toggle', function(evt) {
      var $simple = $('.simple-demo'),
          $adv = $('.advanced-demo');

      if ($simple.is('.hide')) {
        $simple.removeClass('hide');
        $adv.addClass('hide');
        evt.target.innerHTML = 'Advanced';
      }
      else {
        $adv.removeClass('hide');
        $simple.addClass('hide');
        evt.target.innerHTML = 'Simple';
      }

      evt.preventDefault();
    });
});
