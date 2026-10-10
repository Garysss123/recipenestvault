import assert from "node:assert/strict";
import test from "node:test";
import { findBrokenFragmentLinks } from "../scripts/fragment-links.mjs";

const origin = "https://recipenestvault.com";

test("accepts same-page targets and URL-encoded IDs", () => {
  const pages = [{
    path: "/en/index.html",
    html: '<a href="#ingredients%20%26%20method">Jump</a><section id="ingredients &amp; method"></section>'
  }];

  assert.deepEqual(findBrokenFragmentLinks(pages, origin), []);
});

test("accepts cross-page clean routes and same-origin absolute fragment URLs", () => {
  const pages = [
    {
      path: "/en/index.html",
      html: '<a href="/en/about/#privacy%20policy">Privacy</a><a href="https://recipenestvault.com/en/about/#privacy%20policy">Privacy, absolute</a>'
    },
    {
      path: "/en/about/index.html",
      html: '<h2 id="privacy policy">Privacy</h2>'
    }
  ];

  assert.deepEqual(findBrokenFragmentLinks(pages, origin), []);
});

test("reports links whose target ID is absent", () => {
  const pages = [{
    path: "/en/index.html",
    html: '<a href="#missing-section">Missing section</a><section id="present"></section>'
  }];

  assert.deepEqual(findBrokenFragmentLinks(pages, origin), [{
    sourcePath: "/en/index.html",
    href: "#missing-section",
    targetPath: "/en/index.html",
    fragment: "missing-section",
    reason: "fragment target id is missing"
  }]);
});

test("ignores empty fragments and non-local URL schemes", () => {
  const pages = [{
    path: "/en/index.html",
    html: '<a href="#">Empty same-page fragment</a><a href="/en/#">Empty route fragment</a><a href="https://other.example/page#missing">External</a><a href="mailto:hello@example.com#missing">Email</a>'
  }];

  assert.deepEqual(findBrokenFragmentLinks(pages, origin), []);
});

test("reports malformed percent-encoded fragments", () => {
  const pages = [{ path: "/en/index.html", html: '<a href="#bad%ZZ">Malformed</a>' }];
  const [issue] = findBrokenFragmentLinks(pages, origin);

  assert.equal(issue.reason, "invalid fragment encoding");
  assert.equal(issue.fragment, "bad%ZZ");
});
