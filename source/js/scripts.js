var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
      navMain.classList.remove("main-nav--closed");
      navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

var promoImage = document.querySelector(".promo__image");
var promoSparkles = document.querySelectorAll(".promo__sparkle");

if (promoImage && window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.gsap.to(promoImage, { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
  window.gsap.to(promoImage, { rotation: 1.5, duration: 3.1, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5 });

  promoSparkles.forEach(function(sparkle, i) {
    window.gsap.fromTo(
      sparkle,
      { scale: 0.5, opacity: 0.15 },
      { scale: 1.3, opacity: 0.85, duration: 1.2 + i * 0.15, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 }
    );
  });
}
