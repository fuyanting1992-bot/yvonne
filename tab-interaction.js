(function () {
  var tabWrap = document.querySelector(".top-nav-wrap");
  if (!tabWrap) return;

  var lastScrollY = window.scrollY;
  var ticking = false;
  var minDelta = 4;

  function setHidden(hidden) {
    tabWrap.classList.toggle("is-hidden", hidden);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    window.requestAnimationFrame(function () {
      var currentY = window.scrollY;
      var delta = currentY - lastScrollY;
      var passedFirstScreen = currentY >= window.innerHeight * 0.9;

      if (!passedFirstScreen) {
        setHidden(false);
      } else if (Math.abs(delta) > minDelta) {
        if (delta > 0) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastScrollY = currentY;
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
})();
