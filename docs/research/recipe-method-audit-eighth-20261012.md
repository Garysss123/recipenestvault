# Recipe method audit — eighth batch (2026-10-12)

## Coverage

Base: `c3430045c48c7bf20063cf3d1487a258c989c3e8` on `codex/recipe-methods-seventh-20261012`.

The published registry contains 353 recipes with 353 unique IDs. The first seven batches have deeply reviewed 28 recipes. The 18 recipes listed as excluded in the sixth-batch audit remain out of scope and were not changed. That leaves 307 eligible IDs before this batch and 303 after it. Coverage counts refer to distinct recipe IDs, not automated assertion counts.

This batch adds four new IDs to the regression coverage: `mole-poblano`, `bunny-chow`, `cuban-ropa-vieja`, and `maultaschen`. The cumulative deep-review total is 32. The four recipes were chosen from scan leads after inspecting their actual methods: two left most of a listed fat unassigned; Bunny Chow and Ropa Vieja had long, substantial cooking stages with no step durations despite cook estimates; Maultaschen specified serving size but did not state the resulting parcel count and timed ground-meat cooking without a center-temperature safety check. Scan flags were treated as leads, not defects by themselves.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Mole Poblano | The recipe listed 80 ml oil or lard without dividing it among the nuts, bread, and mole; 80 g sesame had no garnish allocation. The chicken step had no safe endpoint. | In all five locales, allocate the existing 80 ml as 20 ml for nuts/seeds, 20 ml for tortilla/bread, and the remaining 40 ml for the puree. Split the existing 80 g sesame into 60 g for the second blender batch and 20 g garnish. Time chicken at 25–35 minutes as a guide and check the thickest piece with a thermometer at 74°C / 165°F, continuing as needed. Cook estimate is now 115 minutes. The oil and sesame partitions are site allocations of existing quantities, not quantities recovered from source variants. |
| Durban Mutton Bunny Chow | The listed 60 ml oil was not assigned between browning and aromatics. The 1 kg bone-in lamb curry had no stage durations even though the recipe estimated 90 minutes of cooking. | Allocate the existing oil 30 ml to browning and 30 ml to onions. Add localized times for browning (8–10 minutes), onions and spice blooming (8–10 plus 1 minute), tomato reduction (5–8 minutes), covered lamb braise (60–90 minutes), and potatoes (15–20 minutes). The 60–90 minute lamb range is an explicit site timing choice for this 1 kg version; the MasterChef South Africa recipe is a smaller 500 g variant and does not establish this exact range. Cook estimate is now 120 minutes and total time 150 minutes. The pre-existing 71°C lamb endpoint was retained; it is not described as FoodSafety.gov’s minimum for lamb. |
| Cuban Ropa Vieja | The method estimated 190 minutes but gave no durations for its 1 kg braise, broth reduction, sofrito, or sauce. It left much of the 1.5 L liquid and other listed amounts unspecified, and called for salt and pepper that were not listed. | Add five-language times for a 90–135 minute braise, 20–30 minute broth reduction, 8–10 minute sofrito, and short sauce/beef finishing stages. Allocate the existing liquid and all listed aromatics, sauce, rice, and beans. Add 6 g fine salt split as 3 g for beef and up to 3 g to finish, plus 1 g black pepper. Those seasoning amounts are explicitly site-selected because the prior method used unlisted salt and pepper; they are not represented as source quantities. The existing 190-minute cook estimate remains. |
| Swabian Maultaschen | Six servings and three parcels per bowl implied 18 parcels, but the method did not say how many to make. Its beef-and-pork filling was simmered only by a timer, without a center-temperature endpoint. | State that this six-serving site version makes 18 equal parcels, three per serving. Simmer in three batches of six for 10–12 minutes per batch, check the thickest parcel in every batch, and continue/recheck until 71°C / 160°F. This ground-meat endpoint follows FoodSafety.gov. The parcel count is a site portion plan derived from the existing yield and three-per-bowl direction. |

## Source verification

Official safety source:

- FoodSafety.gov, [Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry reaches 165°F / 74°C; ground meats reach 160°F / 71°C. The table lists 145°F / 63°C plus a three-minute rest for lamb steaks, chops, and roasts. It does not prescribe a cook duration for a braise. The retained Bunny Chow 71°C value is an existing recipe endpoint, not the official lamb minimum.

Method and dish references:

- Pati Jinich, [Mole Poblano: Yes You Can!](https://patijinich.com/mole_poblano_de_los_angeles/), and México in My Kitchen, [How to Make Mole Poblano](https://www.mexicoinmykitchen.com/how-to-make-mole-poblano/): checked for the sequence of frying/toasting and blending; their variant amounts do not establish the site recipe's 80 ml fat partition.
- South African Tourism, [Bunny Chow 101](https://www.southafrica.net/uk/en/travel/article/bunny-chow-101), and MasterChef South Africa, [Bunny Chow](https://masterchef.co.za/bunny-chow.php): checked for the curry method and a smaller meat quantity; the site's 60–90 minute range is stated as an editorial timing choice.
- Food Network, [Ropa Vieja](https://www.foodnetwork.com/recipes/michael-chiarello/ropa-vieja-recipe-1945066), and Hispanic Food Network, [Ropa Vieja — Shredded Beef](https://hispanicfoodnetwork.com/ropa-vieja-shredded-beef/): braising variants support the fork-tender range; the site keeps its existing 190-minute estimate and explicitly treats its exact salt and pepper additions as house choices.
- Kitchen Stories, [Swabian Maultaschen](https://www.kitchenstories.com/en/recipes/swabian-maultaschen), and The Daring Gourmet, [Authentic German Maultaschen](https://www.daringgourmet.com/maultaschen/): checked for the filled-pasta shaping and simmering method. FoodSafety.gov is the safety basis for the ground-meat endpoint.

Luna reviewed the four recipe diffs, the five-language method text, source mapping, and safety attributions. Luna flagged that FoodSafety.gov's lamb row did not support the recipe's retained 71°C endpoint; the recipe source link and test assertion were removed, and Luna confirmed the final diff had no remaining blocker. The audit above records the lamb guidance's actual scope.

## Regression coverage and limits

The regression ID list now contains 32 distinct recipes. New assertions cover the four additions' allocations, timing/portion choices, safety-source attribution, and key five-locale text. The existing cross-locale rendering assertion checks authored ingredients and instructions against generated HTML and Recipe JSON-LD. No `localdrafts` content was changed. This is a source, translation, and automated regression review; no UI validation or actual cooking is claimed.
