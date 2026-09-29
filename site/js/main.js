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

// Produktfanerne skifter illustrationen i det farvede panel.
var tabs = document.querySelectorAll(".tab[data-show]");
tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (other) {
      var active = other === tab;
      other.setAttribute("aria-pressed", active ? "true" : "false");
      var view = document.getElementById(other.getAttribute("data-show"));
      if (view) view.hidden = !active;
    });
  });
});
