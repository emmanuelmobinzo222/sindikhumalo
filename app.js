(function () {
  const GRID_IMAGE_COUNT = 33;
  const GRID_PNG_START_INDEX = 19;
  const grid = document.getElementById("galleryGrid");
  const filterCount = document.getElementById("filterCount");
  const carouselImg = document.getElementById("galleryCarouselImg");
  const carouselPrev = document.getElementById("galleryPrev");
  const carouselNext = document.getElementById("galleryNext");
  const carouselIndexEl = document.getElementById("galleryCarouselIndex");
  const carouselTotalEl = document.getElementById("galleryCarouselTotal");
  const viewAllBtn = document.getElementById("galleryViewAll");
  const collapseBtn = document.getElementById("galleryCollapseAll");
  const gallerySection = document.getElementById("gallery");
  const carouselBlock = document.getElementById("galleryCarouselBlock");
  const allWrap = document.getElementById("galleryAllWrap");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CAROUSEL_AUTO_MS = 5500;
  let carouselAutoplayId = null;
  let carouselAutoplayPaused = false;

  function buildGalleryItems() {
    const items = [];
    for (let i = 1; i <= GRID_IMAGE_COUNT; i++) {
      const n = String(i).padStart(2, "0");
      const ext = i >= GRID_PNG_START_INDEX ? "png" : "jpg";
      items.push({
        src: `assets/grid/img${n}.${ext}`,
        alt: `Location and production still ${i}`,
      });
    }
    return items;
  }

  const GALLERY_ITEMS = buildGalleryItems();
  const GALLERY_TOTAL = GALLERY_ITEMS.length;

  let carouselIdx = 0;

  function initPageReady() {
    requestAnimationFrame(() => {
      document.body.classList.add("page-ready");
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageReady);
  } else {
    initPageReady();
  }

  function updateCarousel() {
    if (!carouselImg || !carouselIndexEl || !carouselTotalEl) return;
    const item = GALLERY_ITEMS[carouselIdx];
    carouselImg.src = item.src;
    carouselImg.alt = item.alt;
    carouselIndexEl.textContent = String(carouselIdx + 1);
    carouselTotalEl.textContent = String(GALLERY_TOTAL);
  }

  function goCarousel(delta) {
    carouselIdx = (carouselIdx + delta + GALLERY_TOTAL) % GALLERY_TOTAL;
    updateCarousel();
  }

  function stopCarouselAutoplay() {
    if (carouselAutoplayId != null) {
      clearInterval(carouselAutoplayId);
      carouselAutoplayId = null;
    }
  }

  function carouselAutoplayTick() {
    if (reduceMotion || carouselAutoplayPaused) return;
    if (carouselBlock && carouselBlock.hidden) return;
    if (document.visibilityState === "hidden") return;
    goCarousel(1);
  }

  function startCarouselAutoplay() {
    stopCarouselAutoplay();
    if (reduceMotion || !viewport) return;
    carouselAutoplayId = window.setInterval(carouselAutoplayTick, CAROUSEL_AUTO_MS);
  }

  function restartCarouselAutoplay() {
    startCarouselAutoplay();
  }

  if (carouselPrev) {
    carouselPrev.addEventListener("click", () => {
      goCarousel(-1);
      restartCarouselAutoplay();
    });
  }
  if (carouselNext) {
    carouselNext.addEventListener("click", () => {
      goCarousel(1);
      restartCarouselAutoplay();
    });
  }

  const viewport = document.querySelector(".gallery__viewport");
  if (viewport) {
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goCarousel(-1);
        restartCarouselAutoplay();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goCarousel(1);
        restartCarouselAutoplay();
      }
    });

    viewport.addEventListener("pointerenter", () => {
      carouselAutoplayPaused = true;
    });
    viewport.addEventListener("pointerleave", () => {
      carouselAutoplayPaused = false;
    });
    viewport.addEventListener("focusin", () => {
      carouselAutoplayPaused = true;
    });
    viewport.addEventListener("focusout", () => {
      requestAnimationFrame(() => {
        if (!viewport.contains(document.activeElement)) {
          carouselAutoplayPaused = false;
        }
      });
    });
  }

  function setGalleryExpanded(expanded) {
    if (!gallerySection) return;
    gallerySection.classList.toggle("gallery--expanded", expanded);
    if (allWrap) {
      allWrap.hidden = !expanded;
    }
    if (carouselBlock) {
      carouselBlock.toggleAttribute("hidden", expanded);
      carouselBlock.setAttribute("aria-hidden", expanded ? "true" : "false");
    }
    if (viewAllBtn) {
      viewAllBtn.hidden = expanded;
    }
    if (expanded && grid) {
      grid.querySelectorAll(".gallery__cell.reveal-on-scroll").forEach((el) => {
        el.classList.add("is-visible");
      });
    }
    if (!expanded) {
      updateCarousel();
      startCarouselAutoplay();
    } else {
      stopCarouselAutoplay();
    }
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => setGalleryExpanded(true));
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => setGalleryExpanded(false));
  }

  if (grid) {
    const frag = document.createDocumentFragment();
    GALLERY_ITEMS.forEach((item, i) => {
      const cell = document.createElement("div");
      cell.className = "gallery__cell reveal-on-scroll";
      cell.style.setProperty("--reveal-delay", reduceMotion ? "0ms" : `${i * 52}ms`);
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.loading = i > 6 ? "lazy" : "eager";
      cell.appendChild(img);
      frag.appendChild(cell);
    });
    grid.appendChild(frag);
  }

  updateCarousel();
  startCarouselAutoplay();

  if (filterCount) {
    filterCount.textContent = `${GALLERY_TOTAL} / ${GALLERY_TOTAL}`;
  }

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.add("reveal-on-scroll");
  });

  document.querySelectorAll(".ref-card").forEach((card, i) => {
    card.classList.add("reveal-on-scroll");
    card.style.setProperty("--ref-delay", reduceMotion ? "0ms" : `${i * 75}ms`);
  });

  document.querySelectorAll(".skills-columns li").forEach((li, i) => {
    li.classList.add("reveal-on-scroll");
    li.style.setProperty("--skill-delay", reduceMotion ? "0ms" : `${i * 65}ms`);
  });

  const galleryHeader = document.querySelector(".gallery__header");
  if (galleryHeader) {
    galleryHeader.classList.add("reveal-on-scroll");
  }

  if (!reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.09 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      if (allWrap && allWrap.contains(el)) return;
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  const sidebar = document.getElementById("siteSidebar");
  const backdrop = document.getElementById("navBackdrop");
  const openBtn = document.getElementById("openNav");
  const closeBtn = document.getElementById("closeNav");
  const mq = window.matchMedia("(max-width: 768px)");

  function mobileNavActive() {
    return mq.matches;
  }

  function setMenuOpen(open) {
    if (!mobileNavActive()) return;
    sidebar.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    sidebar.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function applyLayoutMode() {
    if (!mobileNavActive()) {
      sidebar.classList.remove("is-open");
      backdrop.classList.remove("is-visible");
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      sidebar.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "false");
    } else {
      const open = sidebar.classList.contains("is-open");
      sidebar.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("menu-open", open);
    }
  }

  if (openBtn) {
    openBtn.addEventListener("click", () => setMenuOpen(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => setMenuOpen(false));
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => setMenuOpen(false));
  }

  mq.addEventListener("change", applyLayoutMode);
  applyLayoutMode();

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavActive()) setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      mobileNavActive() &&
      sidebar.classList.contains("is-open")
    ) {
      setMenuOpen(false);
    }
  });

  const filterPill = document.getElementById("filterPill");
  if (filterPill) {
    filterPill.addEventListener("click", () => {
      document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
    });
  }
})();
