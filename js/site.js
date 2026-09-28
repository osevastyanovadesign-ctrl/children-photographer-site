(function () {
  const menuBtn = document.querySelector("[data-menu]");
  const mobile = document.querySelector("[data-mobile]");
  if (menuBtn && mobile) {
    menuBtn.addEventListener("click", () => {
      const open = mobile.classList.toggle("open");
      menuBtn.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });
  }

  const lb = document.querySelector(".lightbox");
  if (!lb) return;
  const img = lb.querySelector("[data-lb-img]");
  const cap = lb.querySelector("[data-lb-cap]");
  const count = lb.querySelector("[data-lb-count]");
  let photos = [];
  let index = 0;

  function show(i) {
    index = (i + photos.length) % photos.length;
    const p = photos[index];
    img.src = p.src;
    img.alt = p.alt;
    cap.textContent = p.caption || "";
    count.innerHTML = (index + 1) + ' <span style="color:#9a7468">/ ' + photos.length + "</span>";
  }
  function open(list, i) {
    photos = list;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    show(i);
  }
  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = JSON.parse(btn.getAttribute("data-open"));
      const i = Number(btn.getAttribute("data-index") || 0);
      open(list, i);
    });
  });
  lb.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
  lb.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
  lb.querySelector("[data-next]").addEventListener("click", () => show(index + 1));
  lb.querySelector("[data-prev-m]").addEventListener("click", () => show(index - 1));
  lb.querySelector("[data-next-m]").addEventListener("click", () => show(index + 1));
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
  });

  const form = document.querySelector("[data-booking]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.style.display = "none";
      document.querySelector(".thanks").classList.add("show");
    });
  }
})();
