$(function () {
  // Current year
  $("#year").text(new Date().getFullYear());

  // Mobile navigation
  $(".menu-toggle").on("click", function () {
    const open = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!open));
    $(this).attr("aria-label", open ? "Open menu" : "Close menu");
    $(this).toggleClass("is-open", !open);
    $(".mobile-nav").toggleClass("open", !open);
  });

  $(".mobile-nav a").on("click", function () {
    $(".mobile-nav").removeClass("open");
    $(".menu-toggle").attr("aria-expanded", "false");
    $(".menu-toggle").attr("aria-label", "Open menu");
    $(".menu-toggle").removeClass("is-open");
  });

  // Product filtering
  // Show only the selected category. The hidden class uses display:none,
  // so non-matching products are completely removed from the grid.
  $(".filter").on("click", function () {
    const filter = String($(this).data("filter")).toLowerCase();

    $(".filter").removeClass("active");
    $(this).addClass("active");

    $(".product-card").each(function () {
      const $card = $(this);
      const category = String($card.data("category")).toLowerCase();
      const show = filter === "all" || category === filter;

      if (show) {
        $card.removeClass("hidden");
      } else {
        $card.addClass("hidden");
      }
    });
  });

  // Header shadow on scroll
  $(window).on("scroll", function () {
    $(".site-header").css(
      "box-shadow",
      $(window).scrollTop() > 12 ? "0 8px 30px rgba(29,23,20,.07)" : "none"
    );
  });

  // Subtle parallax for hero artwork
  $(window).on("scroll", function () {
    const y = $(window).scrollTop();
    if (y < window.innerHeight * 1.1 && window.innerWidth > 760) {
      $(".hero-donut").css("transform", `rotate(${-16 + y * 0.025}deg) translateY(${y * 0.04}px)`);
      $(".hero-card-top").css("transform", `rotate(5deg) translateY(${y * 0.07}px)`);
      $(".hero-card-bottom").css("transform", `rotate(-4deg) translateY(${y * -0.04}px)`);
    }
  });

  // Reveal sections when they enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".product-card, .story-copy, .experience-item, .social-tile, .visit-copy, .map-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity .65s ease, transform .65s ease";
    observer.observe(el);
  });

  $("<style>")
    .prop("type", "text/css")
    .html(".is-visible{opacity:1!important;transform:none!important}")
    .appendTo("head");
});
