(function () {
  var LOCAL_STORAGE_KEY = "minimal-dark-mode";

  function isDark() {
    return document.documentElement.classList.contains("theme-dark");
  }

  function setToggleLabels(btn) {
    if (!btn) return;
    var dark = isDark();
    var label = dark ? "Switch to light mode" : "Switch to dark mode";
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle("theme-dark");
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(isDark()));
    } catch (e) {}
    setToggleLabels(document.getElementById("theme-toggle"));
    return isDark();
  }

  window.toggleDarkMode = toggleDarkMode;

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    setToggleLabels(btn);
    if (btn) btn.addEventListener("click", toggleDarkMode);
  });
})();
