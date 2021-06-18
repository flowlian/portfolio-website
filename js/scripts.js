console.log("Hola! I am Julián. Welcome to My Portfolio Site");

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

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

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
  for (var i = 0; i < elements.length; i++) {
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

if (tItemCount == 1) {
  $('.testimonials-control').css('display', 'none');
}

// This is the Javascript for the Video-loop

var objectFitVideos = function(t) {
  "use strict";

  function e(t) {
    for (var e = getComputedStyle(t).fontFamily, o = null, i = {}; null !== (o = l.exec(e));) i[o[1]] = o[2];
    return i["object-position"] ? n(i) : i
  }

  function o(t) {
    var o = -1;
    t ? "length" in t || (t = [t]) : t = document.querySelectorAll("video");
    for (; t[++o];) {
      var n = e(t[o]);
      (n["object-fit"] || n["object-position"]) && (n["object-fit"] = n["object-fit"] || "fill", i(t[o], n))
    }
  }

  function i(t, e) {
    function o() {
      var o = t.videoWidth,
        n = t.videoHeight,
        d = o / n,
        a = r.clientWidth,
        c = r.clientHeight,
        p = a / c,
        l = 0,
        s = 0;
      i.marginLeft = i.marginTop = 0, (d < p ? "contain" === e["object-fit"] : "cover" === e["object-fit"]) ? (l = c * d, s = a / d, i.width = Math.round(l) + "px", i.height = c + "px", "left" === e["object-position-x"] ? i.marginLeft = 0 : "right" === e["object-position-x"] ? i.marginLeft = Math.round(a - l) + "px" : i.marginLeft = Math.round((a - l) / 2) + "px") : (s = a / d, i.width = a + "px", i.height = Math.round(s) + "px", "top" === e["object-position-y"] ? i.marginTop = 0 : "bottom" === e["object-position-y"] ? i.marginTop = Math.round(c - s) + "px" : i.marginTop = Math.round((c - s) / 2) + "px"), t.autoplay && t.play()
    }
    if ("fill" !== e["object-fit"]) {
      var i = t.style,
        n = window.getComputedStyle(t),
        r = document.createElement("object-fit");
      r.appendChild(t.parentNode.replaceChild(r, t));
      var d = {
        height: "100%",
        width: "100%",
        boxSizing: "content-box",
        display: "inline-block",
        overflow: "hidden"
      };
      "backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight left opacity margin position right top visibility".replace(/\w+/g, function(t) {
        d[t] = n[t]
      });
      for (var a in d) r.style[a] = d[a];
      i.border = i.margin = i.padding = 0, i.display = "block", i.opacity = 1, t.addEventListener("loadedmetadata", o), window.addEventListener("optimizedResize", o), t.readyState >= 1 && (t.removeEventListener("loadedmetadata", o), o())
    }
  }

  function n(t) {
    return ~t["object-position"].indexOf("left") ? t["object-position-x"] = "left" : ~t["object-position"].indexOf("right") ? t["object-position-x"] = "right" : t["object-position-x"] = "center", ~t["object-position"].indexOf("top") ? t["object-position-y"] = "top" : ~t["object-position"].indexOf("bottom") ? t["object-position-y"] = "bottom" : t["object-position-y"] = "center", t
  }

  function r(t, e, o) {
    o = o || window;
    var i = !1,
      n = null;
    try {
      n = new CustomEvent(e)
    } catch (t) {
      n = document.createEvent("Event"), n.initEvent(e, !0, !0)
    }
    var r = function() {
      i || (i = !0, requestAnimationFrame(function() {
        o.dispatchEvent(n), i = !1
      }))
    };
    o.addEventListener(t, r)
  }
  var d = navigator.userAgent.indexOf("Edge/") >= 0,
    a = new Image,
    c = "object-fit" in a.style && !d,
    p = "object-position" in a.style && !d,
    l = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
  c && p || (o(t), r("resize", "optimizedResize"))
};
"undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = objectFitVideos);


// This is the Javascript for the Contact Modal

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
