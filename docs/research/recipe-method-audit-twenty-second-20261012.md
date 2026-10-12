# Recipe method audit — twenty-second batch (2026-10-12)

## Coverage

Base commit: `6592ed4f4660324501356b36ecfca1d8efd2ced4` on `codex/recipe-methods-twenty-second-20261012`.

The registry remains at 353 existing recipes. The shared deep-review list grows from 84 to 88 unique recipes, leaving 247 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Chicken karaage (`chicken-karaage`) | Four servings had no explicit raw-chicken share, the coating setup was not overlapped with the marinade wait, and the endpoint did not clearly apply to every small fry batch. The 15-minute cook estimate was tight for two sequential frying passes. | Keep four servings and 40 minutes prep; set cook/total to 25/65 minutes. Divide the 600 g raw chicken into four roughly 150 g portions, set out coating dishes while it marinates, and fry in small batches. Check the thickest piece in every batch to 74°C / 165°F. Divide the 60 g cabbage as 15 g per plate. |
| Chawanmushi (`chawanmushi`) | The method assigned a poultry endpoint of 74°C / 165°F to an egg custard. Four cups had no measured egg, dashi, or mushroom split, and the prep estimate did not say that cooled dashi was assumed ready. | Keep four servings and 15/20/35-minute prep/cook/total estimates. Divide the 40 g each of shiitake and enoki as 10 g each per cup; each cup receives about 37.5 g raw egg and 112.5 ml dashi. Steam 12–15 minutes, then check the thickest cup and continue in 1-minute increments until it reaches 71°C / 160°F with no liquid egg. The 15-minute prep estimate assumes the dashi is already prepared and cooled. Leftover reheating remains a separate 74°C / 165°F instruction. |
| Kimchi fried rice (`kimchi-fried-rice`) | “Chilled overnight” did not explain rapid cooling, the safe storage window, or the single-reheat limit for rice. The two bowls had no measured split, and the final heating cue did not say to check the whole pan. | Keep two servings and 10 minutes prep; set cook/total to 18/28 minutes. Cool cooked rice quickly, ideally within 1 hour, refrigerate promptly, use within 24 hours, and reheat only once. Divide the finished pan into two bowls, each representing about 200 g cooked rice, 125 g kimchi, and 20 g scallions. Check that it is steaming hot throughout; no numeric temperature is added to rice. |
| Pork souvlaki (`pork-souvlaki`) | Eight skewers and four pita breads were listed, but the raw pork and sides were not allocated per person. The 10-minute room-temperature wait for raw skewers was unnecessary, and preparation of the serving vegetables and grill was left until late. | Keep four servings and 40 minutes prep; set cook/total to 20/60 minutes. Divide 800 g pork among eight skewers at about 100 g raw pork each. Slice and portion the onion and tomato during the refrigerated 30-minute marinade, and preheat the grill during its final 10 minutes. Grill until the thickest pork piece reaches 63°C / 145°F, then rest 5 minutes (more than the official 3-minute whole-cut rest). Serve two skewers, one pita, and one-quarter each of the onion and tomato per person. Divide the remaining 20 ml oil as about 5 ml per serving. |

The site's ingredient amounts, portion math, and time estimates are editorial adaptations. The recipe references support dish identity and common method; they are not presented as the source of this site's exact quantities, ratios, timings, or serving allocations.

## Recipe references

- Chicken karaage: [Kikkoman — Crispy Karaage Recipe](https://www.kikkoman.com/en/cookbook/washoku/karaage.html) and [Just One Cookbook — Karaage](https://www.justonecookbook.com/karaage/). These support the seasoned chicken, soy/sake/ginger marinade, starch coating, and fried method.
- Chawanmushi: [Just One Cookbook — Chawanmushi](https://www.justonecookbook.com/chawanmushi-savory-steamed-egg-custard/) and [Japanese Cooking 101 — Chawanmushi](https://japanesecooking101.com/chawanmushi/). These support the Japanese steamed egg custard, cup assembly, dashi, mushrooms, and gentle steaming method.
- Kimchi fried rice: [Maangchi — Kimchi-bokkeumbap](https://www.maangchi.com/recipe/kimchi-bokkeumbap) and [Korean Bapsang — Kimchi fried rice](https://www.koreanbapsang.com/kimchi-fried-rice-kimchi-bokkeum-bap/). These support mature kimchi, cooked rice, pan-frying, and the customary sauce and garnish context.
- Pork souvlaki: [My Greek Dish — Pork Souvlaki with Tzatziki](https://www.mygreekdish.com/recipe/pork-souvlaki-skewers-with-tzatziki/) and [The Guardian — How to cook the perfect souvlaki](https://www.theguardian.com/food/2019/sep/04/how-to-cook-the-perfect-souvlaki-greek-kebab). These support pork cubes, citrus/herb marinade, skewering, grilling, and pita service.

## Official food-safety guidance

These official sources are listed separately from dish references:

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry to 74°C / 165°F; egg dishes to 71°C / 160°F; pork steaks, roasts, and chops to 63°C / 145°F followed by a 3-minute rest. The recipes use the applicable endpoint and rest, rather than assigning one temperature to every dish.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg dishes should be cooked thoroughly; the guide gives 160°F / 71°C for casseroles and other egg dishes. Leftover egg dishes are reheated to 165°F / 74°C, which is kept distinct from the initial custard endpoint.
- [UK Food Standards Agency — Home food fact checker: rice](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker): cool rice as quickly as possible, ideally within one hour; refrigerate and use within 24 hours; when reheating, reheat only once and check that it is steaming hot throughout.

## Translation and review

Method text was prepared in English, Traditional Chinese, Japanese, Korean, and Thai. The five versions were self-translated and self-reviewed in one model pass; this is not independent translation review. No second model or external translation API was used. The execution environment did not expose model selection or a model ID, so this report does not claim that the pass was specifically routed to GPT-6 Luna.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 88 unique deep-reviewed IDs for recipe-detail route checks across all five locales. The new [twenty-second-batch tests](../../test/recipe-method-twenty-second.test.mjs) cover the four existing IDs, the unchanged 353-recipe registry, the standing 18 exclusions, five-locale completeness, portion arithmetic, time arithmetic, step order, applicable doneness endpoints, and official source attribution.

Validation passed: `npm test` completed all 20 cuisine draft audits, the static audit (10,816 files and 1,885 indexable routes), and 89/89 Node tests. A separate `npm run build` completed with 1,885 indexable URLs, and `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
