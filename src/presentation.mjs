export function hasPublishedCuisineRecipes(cuisineRecipes) {
  return Array.isArray(cuisineRecipes) && cuisineRecipes.length > 0;
}

export function featuredCuisineHref(locale, cuisineId) {
  return `/${locale}/cuisines/${cuisineId}/`;
}
