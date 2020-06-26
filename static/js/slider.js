let currentSlide = 0;
let slideHeight = null;
let slides = "";
let slideshow="";
let initialX = null;
let initialY = null;

function startSlider() {
  slideshow = document.querySelector('.slide-wrap');
  slides = document.querySelectorAll('.slide-entry');
  slideCount = slides.length;
  currentSlide = 0;
  slideHeight = null;
  let initialHeight = slides[0].clientHeight;

  slides[0].classList.add('active');

  let slideHandlers = {
    nextSlide: function(element){
      document.querySelector(element).addEventListener('click',nextSlide);
      document.body.addEventListener('keydown',nextSlide, false);
    },
    prevSlide: function(element){
      document.querySelector(element).addEventListener('click',prevSlide);
      document.body.addEventListener('keydown',prevSlide, false);
    }
  }

  slideHandlers.nextSlide('#next-slide');
  slideHandlers.prevSlide('#prev-slide');

  slideshow.style.height = initialHeight + 'px';

  slideshow.addEventListener("touchstart", startTouch, false);
  slideshow.addEventListener("touchmove", moveTouch, false);  
}

function undoSlider() {
  currentSlide = 0,
  slideHeight = null;
  slides = "";
  slideshow="";
  initialX = null;
  initialY = null;
}


function moveToSlide(n) {
  slides[currentSlide].className = 'slide-entry';
  currentSlide = (n+slideCount)%slideCount;
  slides[currentSlide].className = 'slide-entry active';
  slideHeight = slides[currentSlide].clientHeight;
  slideshow.style.height = slideHeight + 'px';
  window.addEventListener('resize', function(){
    resizedSlideHeight = slides[currentSlide].clientHeight;
    slideshow.style.height = resizedSlideHeight + 'px';
  });
}

function nextSlide(e){
  moveToSlide(currentSlide+1);
  let code = e.keyCode;
  if( code == 39 ) {
    moveToSlide(currentSlide+1);
  }
};
function prevSlide(e){
  moveToSlide(currentSlide+-1);
  let code = e.keyCode;
  if( code == 37 ) {
    moveToSlide(currentSlide+-1);
  }
};

window.addEventListener('resize', function(){
  let resizedHeight = slides[0].clientHeight;
  slideshow.style.height = resizedHeight + 'px';
});


function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }
  if (initialY === null) {
    return;
  }
  let currentX = e.touches[0].clientX;
  let currentY = e.touches[0].clientY;
  let diffX = initialX - currentX;
  let diffY = initialY - currentY;
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
    moveToSlide(currentSlide+1);
    } else {

    moveToSlide(currentSlide+-1);
    }
  }
  initialX = null;
  initialY = null;
  e.preventDefault();
};

