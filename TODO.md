# Recipe Nest Vault — deferred upgrades

## After all planned cuisine collections are complete

### Italian method-granularity upgrade

Status: deliberately deferred until the full site is complete. The current 21 Italian recipes remain published because their ingredients, quantities, sources, translations, photographs, cooking facts and illustration mappings passed the existing quality gates; the known issue is that method structure is overly concentrated at five steps.

- Re-review all 21 Italian methods against their existing source evidence without changing a recipe merely to hit a preferred step count.
- Split at meaningful changes in tool, heat, food-safety state, resting/fermentation stage, or irreversible technique; merge only trivial continuation actions that are naturally one cooking stage.
- Preserve exact quantities, times, temperatures, yields, doneness cues and source-backed technique while improving step granularity.
- Update all five languages only after the revised cooking-stage structure is stable, keeping measurable facts identical across locales.
- Rebuild the Italian illustration prompt records and manifests after the text structure is final, then create/review exactly one illustration per revised natural cooking step.
- Remove the Italian legacy method-distribution signature from `scripts/audit.mjs` once the revised collection passes the normal anti-template gate without an exemption.
- Run the full static audit, local desktop/mobile visual QA, Git delivery, Cloudflare deployment and production-domain QA after the upgrade.

Do not inflate or reduce step counts just to make the histogram look varied. The target is a faithful cooking process; distribution checks exist only to catch obvious batch-template convergence.
