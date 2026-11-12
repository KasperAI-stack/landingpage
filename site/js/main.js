// Siden virker uden JavaScript. Dette er kun små forbedringer.

// Forhindrer dobbelt afsendelse af formularen.
document.querySelectorAll("form[data-netlify]").forEach(function (form) {
  form.addEventListener("submit", function () {
    var button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = "Sender";
    }
  });
});

// Svarfeltet i toppen hopper ned til formularen og sætter markøren i beskedfeltet.
document.querySelectorAll("[data-focus]").forEach(function (link) {
  link.addEventListener("click", function () {
    var field = document.getElementById(link.getAttribute("data-focus"));
    if (field) {
      setTimeout(function () { field.focus({ preventScroll: true }); }, 400);
    }
  });
});

// Chatten i toppen venter med at spille, til den besøgende kan se den.
(function () {
  var demo = document.querySelector(".demo");
  if (!demo || !("IntersectionObserver" in window)) return;
  demo.classList.add("venter");
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      demo.classList.remove("venter");
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(demo);
})();

// Skærmbillederne fra værktøjet driver lidt rundt, når man scroller, og står lige midt på skærmen.
// Intet sker ved prefers-reduced-motion, og uden JavaScript står gitteret bare stille.
(function () {
  var grid = document.querySelector("[data-shots]");
  if (!grid || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ticking = false;
  var update = function () {
    ticking = false;
    var box = grid.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (box.top + box.height / 2 - vh / 2) / vh;
    p = Math.max(-1, Math.min(1, p));
    grid.style.setProperty("--p", p.toFixed(3));
  };
  var onScroll = function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    } else {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }).observe(grid);
  grid.classList.add("is-live");
})();

// Godkendelseskøen i "En uge med Hey Otto": man kan selv godkende udkastene.
(function () {
  var queue = document.querySelector("[data-queue]");
  if (!queue) return;
  var count = queue.querySelector("[data-queue-count]");
  var items = queue.querySelectorAll(".queue-item");
  var update = function () {
    var waiting = queue.querySelectorAll(".queue-item:not(.is-done)").length;
    count.textContent = waiting ? waiting + " venter" : "Alt er godkendt";
  };
  items.forEach(function (item) {
    var btn = item.querySelector("[data-approve]");
    var state = item.querySelector(".queue-state");
    btn.hidden = false;
    btn.setAttribute("aria-label", "Godkend " + item.querySelector("strong").textContent.toLowerCase());
    btn.addEventListener("click", function () {
      item.classList.add("is-done");
      state.textContent = "Godkendt";
      var next = queue.querySelector(".queue-item:not(.is-done) [data-approve]");
      update();
      // Fokus flytter til næste udkast, så tastaturbrugere ikke mister deres plads.
      if (next) {
        next.focus();
      } else {
        count.setAttribute("tabindex", "-1");
        count.focus();
      }
    });
  });
  queue.classList.add("js-queue");
  var hint = document.querySelector("[data-queue-hint]");
  if (hint) hint.hidden = false;
})();

// Knappen i toppen skifter mellem lyst og mørkt tema og husker valget i browseren.
var toggle = document.querySelector("[data-theme-toggle]");
if (toggle) {
  var root = document.documentElement;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  var current = function () {
    return root.getAttribute("data-theme") || (prefersDark.matches ? "dark" : "light");
  };
  var render = function () {
    var dark = current() === "dark";
    toggle.setAttribute("data-active", dark ? "dark" : "light");
    toggle.setAttribute("aria-label", dark ? "Skift til lyst tema" : "Skift til mørkt tema");
  };
  toggle.hidden = false;
  render();
  prefersDark.addEventListener("change", render);
  toggle.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tema", next); } catch (e) {}
    render();
  });
}

// Kontakt: skift mellem forespørgsel og booking. Uden JavaScript vises begge dele under hinanden.
var contactSwitch = document.querySelector("[data-contact-switch]");
var setContactMode = function () {};
if (contactSwitch) {
  var modeButtons = contactSwitch.querySelectorAll("[data-mode]");
  var panels = document.querySelectorAll(".contact-mode[data-panel]");
  setContactMode = function (mode) {
    modeButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-mode") === mode ? "true" : "false");
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== mode;
    });
  };
  modeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { setContactMode(btn.getAttribute("data-mode")); });
  });
  contactSwitch.hidden = false;
  document.getElementById("book").classList.add("js-switch");
  setContactMode("forespoergsel");
}

// Svarfeltet i toppen skal altid åbne formularen, også hvis booking er valgt.
document.querySelectorAll("[data-focus]").forEach(function (link) {
  link.addEventListener("click", function () { setContactMode("forespoergsel"); });
});

// Konvertering: klik på "Åbn min kalender". GTM lytter efter eventet "booking_klik".
document.querySelectorAll('[data-track="booking"]').forEach(function (link) {
  link.addEventListener("click", function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "booking_klik" });
  });
});

// Booking-klik til Meta, hvis pixlen er indlæst (kun med samtykke til marketing).
document.querySelectorAll('[data-track="booking"]').forEach(function (link) {
  link.addEventListener("click", function () {
    if (typeof window.fbq === "function") window.fbq("trackCustom", "BookingKlik");
  });
});

// "Cookieindstillinger" i footeren genåbner CookieScript-banneret. Linket vises kun, når CookieScript er indlæst.
(function () {
  var holders = document.querySelectorAll(".cookie-link");
  if (!holders.length) return;
  var ready = function () {
    return window.CookieScript && window.CookieScript.instance && typeof window.CookieScript.instance.show === "function";
  };
  var show = function () {
    if (!ready()) return false;
    holders.forEach(function (h) { h.hidden = false; });
    return true;
  };
  if (!show()) {
    window.addEventListener("CookieScriptLoaded", show);
    window.addEventListener("load", function () { setTimeout(show, 1500); });
  }
  document.querySelectorAll("[data-cookie-settings]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (ready()) window.CookieScript.instance.show();
    });
  });
})();

