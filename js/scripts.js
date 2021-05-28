console.log ("Hola! I am Julián. Welcome to My Portfolio Site");

// This is the Javascript for the Toggle Menu

function menuToggle() {
var x = document.getElementById('myNavtoggle');
if (x.className === 'navtoggle' && screen.width < 640) {
x.className += ' responsive';
} else {
x.className = 'navtoggle';
}
}


// This is the Javascript for the Hero Animation

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


// This is the Javascript for the testimonials

// Get carousel elements

var tLeftButton = $("#testimonials-l");
var tRightButton = $("#testimonials-r");

// Get number of <li> elements in carousel

var tItemCount = document.getElementById('testimonials-ul').querySelectorAll('li').length;

// Set length based on that

var tWidth = tItemCount * 100 + "vw";
$(".testimonials ul").css("width", tWidth);

// Button functionality

var tPosition = 0;
console.log(tPosition);

tRightButton.click(function() {
  if (tPosition < (tItemCount - 1)) {
    tPosition++;
    var m = "-" + (100 * tPosition) + "vw";
    $(".testimonials ul").animate({
      "left": m
    }, 500);
    greyButton();
  }
});

tLeftButton.click(function() {
  if (tPosition > 0) {
    tPosition--;
    var m = "-" + (100 * tPosition) + "vw";
    $(".testimonials ul").animate({
      "left": m
    }, 500);
    greyButton();
  }
});

// Grey out buttons if not useable

var greyButton = function() {
  if (tPosition == 0) {
    tLeftButton.css("opacity", "0.3");
    tLeftButton.css("cursor", "default");
  } else if (tPosition == (tItemCount - 1)) {
    tRightButton.css("opacity", "0.3");
    tRightButton.css("cursor", "default");
  } else {
    tRightButton.css("opacity", "1");
    tRightButton.css("cursor", "pointer");
    tLeftButton.css("opacity", "1");
    tLeftButton.css("cursor", "pointer");
  }
}

greyButton();

// And finally, if there's only one quote, kill the buttons altogether

if ( tItemCount == 1 ) {
  $('.testimonials-control').css('display','none');
}
