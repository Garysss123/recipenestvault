(() => {
  const container = document.querySelector("[data-search-results]");
  const form = document.querySelector("[data-search-form]");
  if (!container || !form) return;

  const input = form.elements.q;
  const locale = container.dataset.locale;
  let records = [];

  const normalize = (value) => String(value).normalize("NFKC").toLocaleLowerCase(locale);
  const createResult = (record) => {
    const link = document.createElement("a");
    link.className = "result-card";
    link.href = record.url;
    const type = document.createElement("span");
    type.textContent = record.type === "cuisine" ? container.dataset.cuisineLabel : record.type === "recipe" ? (record.label || container.dataset.recipeLabel) : container.dataset.previewLabel;
    const title = document.createElement("strong");
    title.textContent = record.title;
    const subtitle = document.createElement("small");
    subtitle.textContent = record.subtitle;
    link.append(type, title, subtitle);
    return link;
  };

  const render = (query, updateUrl = false) => {
    const cleanQuery = query.trim();
    if (updateUrl) {
      const next = new URL(location.href);
      cleanQuery ? next.searchParams.set("q", cleanQuery) : next.searchParams.delete("q");
      history.replaceState({}, "", next);
    }
    container.replaceChildren();
    if (!cleanQuery) {
      const message = document.createElement("p");
      message.textContent = container.dataset.start;
      container.append(message);
      return;
    }
    const needle = normalize(cleanQuery);
    const matches = records.filter((record) => normalize(`${record.title} ${record.subtitle} ${record.text}`).includes(needle)).slice(0, 24);
    if (!matches.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const heading = document.createElement("h2");
      heading.textContent = container.dataset.emptyTitle;
      const body = document.createElement("p");
      body.textContent = container.dataset.emptyBody;
      empty.append(heading, body);
      container.append(empty);
      return;
    }
    const summary = document.createElement("p");
    summary.className = "result-summary";
    summary.textContent = container.dataset.countTemplate.replace("{count}", new Intl.NumberFormat(locale).format(matches.length));
    const grid = document.createElement("div");
    grid.className = "result-grid";
    matches.forEach((record) => grid.append(createResult(record)));
    container.append(summary, grid);
  };

  fetch("/search-index.json", { credentials: "same-origin" })
    .then((response) => {
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      return response.json();
    })
    .then((items) => {
      records = items.filter((item) => item.locale === locale);
      const query = new URLSearchParams(location.search).get("q") || "";
      input.value = query;
      render(query);
    })
    .catch(() => {
      container.replaceChildren();
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const heading = document.createElement("h2");
      heading.textContent = container.dataset.emptyTitle;
      const body = document.createElement("p");
      body.textContent = container.dataset.emptyBody;
      empty.append(heading, body);
      container.append(empty);
    });

  form.addEventListener("submit", (event) => { event.preventDefault(); render(input.value, true); });
})();
