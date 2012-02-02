
jQuery(function($) {

  var slideWidth = 1200,
      slideHeight = 700,
      content = $('#content'),
      slides = content.children('.slide'),
      currentSlide = 0,
      currentX = 0,
      currentY = 0,
      direction = 'right',
      currentSlideInGroup = -1,
      slideGroup,
      slidesInGroup = [];


  var translateTo = function(x, y) {
    currentX = x;
    currentY = y;
    var value = 'translate('+ x +'px, '+ y +'px)';
    content.css({
      '-webkit-transform': value,
      '-moz-transform': value,
      '-o-transform': value,
      'transform': value
    });
  };


  var goRight = function() {
    currentSlide += 1;

    // return to the very first slide when we reached the end
    if (currentSlide === slides.length) {
      currentSlide = currentX = currentY;
      translateTo(0, 0);
      return;
    }

    // change the direction if the slide contains a slide group
    slideGroup = $(slides[currentSlide]).find('.slide_group');
    if (slideGroup.length > 0) {
      direction = $(slideGroup).data('direction');
      slidesInGroup = slideGroup.find('.slide');
    }
    translateTo(currentX - slideWidth, 0);
  };


  $(window).on('keydown', function(e) {
    if (e.keyCode === 32) { // space
      if (direction === 'right') {
        goRight();
      }
      else if (direction === 'down') {
        if (currentSlideInGroup < slidesInGroup.length - 1) { // go down
          translateTo(currentX, currentY - slideHeight);
          currentSlideInGroup += 1;
        }
        else {  // reset direction & go to the next top level slide
          direction = 'right';
          currentSlideInGroup = -1;
          goRight();
        }
      }
      e.preventDefault();
    }
  });

});


