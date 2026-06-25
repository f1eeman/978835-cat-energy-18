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

var catSlim = document.querySelector(".product-package__cat--slim");
var catPro = document.querySelector(".product-package__cat--pro");

if (catSlim && catPro && window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.gsap.timeline({ repeat: -1 })
    .to(catSlim, { y: -40, duration: 0.35, ease: "power2.out" })
    .to(catSlim, { y: -40, duration: 0.15, ease: "none" })
    .to(catSlim, { y: 0, duration: 0.30, ease: "bounce.out" })
    .to(catSlim, { y: 0, duration: 1.20, ease: "none" });

  window.gsap.timeline({ repeat: -1 })
    .to(catPro, { x: 12, y: -6, duration: 0.22, ease: "sine.inOut" })
    .to(catPro, { x: 0, y: 0, duration: 0.22, ease: "sine.inOut" })
    .to(catPro, { x: -5, y: -3, duration: 0.18, ease: "sine.inOut" })
    .to(catPro, { x: 0, y: 0, duration: 0.18, ease: "sine.inOut" });
}
