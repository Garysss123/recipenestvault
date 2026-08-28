(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-nav]");
  if (menuButton && nav) {
    const close = () => { menuButton.setAttribute("aria-expanded", "false"); nav.removeAttribute("data-open"); };
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(open));
      nav.toggleAttribute("data-open", open);
    });
    nav.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 980) close(); }, { passive: true });
  }

  document.addEventListener("click", (event) => {
    document.querySelectorAll("details.language-menu[open]").forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.querySelectorAll("details.language-menu[open]").forEach((details) => details.removeAttribute("open"));
  });

  const languagePrompt = document.querySelector("[data-language-prompt]");
  if (languagePrompt) {
    const preferenceKey = "rnv-language-preference-v1";
    const activeLocale = languagePrompt.dataset.activeLocale || "en";
    const readPreference = () => {
      try { return localStorage.getItem(preferenceKey); } catch { return null; }
    };
    const savePreference = (value) => {
      try { localStorage.setItem(preferenceKey, value); } catch { /* Private browsing can disable storage. */ }
    };
    const closePrompt = () => {
      savePreference(activeLocale);
      if (typeof languagePrompt.close === "function") languagePrompt.close();
      else languagePrompt.removeAttribute("open");
    };

    languagePrompt.querySelectorAll("[data-language-choice]").forEach((link) => {
      link.addEventListener("click", () => savePreference(link.dataset.languageChoice || activeLocale));
    });
    languagePrompt.querySelectorAll("[data-language-dismiss]").forEach((button) => button.addEventListener("click", closePrompt));
    languagePrompt.addEventListener("cancel", () => savePreference(activeLocale));
    languagePrompt.addEventListener("close", () => document.documentElement.removeAttribute("data-language-dialog-open"));

    if (!readPreference()) {
      document.documentElement.setAttribute("data-language-dialog-open", "");
      if (typeof languagePrompt.showModal === "function") languagePrompt.showModal();
      else languagePrompt.setAttribute("open", "");
    }
  }

  document.querySelectorAll(".adsbygoogle").forEach(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch { /* Google script may still be loading. */ }
  });

  const notFoundSections = [...document.querySelectorAll("[data-not-found-locale]")];
  if (notFoundSections.length) {
    const supported = notFoundSections.map((section) => section.dataset.notFoundLocale);
    const pathLocale = location.pathname.split("/").filter(Boolean)[0]?.toLowerCase();
    const browserLocale = (navigator.language || "en").toLowerCase();
    const selected = supported.includes(pathLocale) ? pathLocale : browserLocale.startsWith("zh") ? "zh-hant" : supported.find((locale) => browserLocale.startsWith(locale)) || "en";
    notFoundSections.forEach((section) => section.toggleAttribute("hidden", section.dataset.notFoundLocale !== selected));
    document.documentElement.lang = selected === "zh-hant" ? "zh-Hant" : selected;
  }
})();
