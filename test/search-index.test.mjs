import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const searchIndex = JSON.parse(await readFile(join(root, "dist", "search-index.json"), "utf8"));
const searchSource = await readFile(join(root, "public", "assets", "search.js"), "utf8");

function createElement(tagName = "") {
  return {
    tagName,
    className: "",
    href: "",
    textContent: "",
    dataset: {},
    children: [],
    append(...children) {
      this.children.push(...children);
    },
    replaceChildren(...children) {
      this.children = [...children];
    }
  };
}

async function renderSearch(locale, query) {
  const container = createElement("div");
  Object.assign(container.dataset, {
    locale,
    cuisineLabel: "Cuisine",
    recipeLabel: "Recipe",
    previewLabel: "Featured",
    start: "Enter a search term",
    emptyTitle: "No recipes found",
    emptyBody: "Try another query",
    countTemplate: "{count} results"
  });
  const input = { value: "" };
  const form = {
    elements: { q: input },
    addEventListener() {}
  };
  const location = new URL(
    "https://recipenestvault.com/" + locale + "/search/?q=" + encodeURIComponent(query)
  );
  const document = {
    querySelector(selector) {
      if (selector === "[data-search-results]") return container;
      if (selector === "[data-search-form]") return form;
      return null;
    },
    createElement(tagName) {
      return createElement(tagName);
    }
  };

  runInNewContext(searchSource, {
    document,
    fetch: async (url) => {
      assert.equal(url, "/search-index.json");
      return { ok: true, json: async () => searchIndex };
    },
    location,
    history: { replaceState() {} },
    URL,
    URLSearchParams,
    Intl
  }, { filename: "search.js" });

  await new Promise((resolve) => setImmediate(resolve));
  return { container, input };
}

test("the English common name finds Black Forest cake without changing its original title", async () => {
  const { container } = await renderSearch("en", "black forest cake");
  const grid = container.children.find((child) => child.className === "result-grid");
  assert.ok(grid, "expected recipe search results");
  const result = grid.children.find((child) => child.href === "/en/recipes/black-forest-cake/");
  assert.ok(result, "expected the Black Forest recipe in the results");
  const englishRecord = searchIndex.find((item) =>
    item.locale === "en" && item.type === "recipe" && item.url.endsWith("/black-forest-cake/")
  );
  assert.ok(englishRecord);
  assert.equal(result.children[1].textContent, englishRecord.title);
  assert.match(englishRecord.title, /Kirschtorte$/);
});

test("the English alias does not leak into localized search results", async () => {
  for (const locale of ["zh-hant", "ja", "ko", "th"]) {
    const record = searchIndex.find((item) =>
      item.locale === locale && item.type === "recipe" && item.url.endsWith("/black-forest-cake/")
    );
    assert.ok(record, "expected a localized Black Forest recipe record for " + locale);
    assert.notEqual(record.title, "Black Forest cake");

    const { container } = await renderSearch(locale, "black forest cake");
    assert.equal(container.children.length, 1);
    assert.equal(container.children[0].className, "empty-state");
  }
});

test("a non-matching English query still follows the no-results flow", async () => {
  const { container } = await renderSearch("en", "no-such-recipe-query-97531");
  assert.equal(container.children.length, 1);
  const emptyState = container.children[0];
  assert.equal(emptyState.className, "empty-state");
  assert.equal(emptyState.children[0].textContent, "No recipes found");
  assert.equal(emptyState.children[1].textContent, "Try another query");
});

test("an empty query still shows the initial search prompt", async () => {
  const { container } = await renderSearch("en", "");
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0].tagName, "p");
  assert.equal(container.children[0].textContent, "Enter a search term");
});