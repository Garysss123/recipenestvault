export const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, ...(imageScene ? { imageScene } : {}) });

export function makeVietnameseRecipe(recipe) {
  return { cuisine: "vietnamese", region: ml("Vietnam", "越南", "ベトナム", "베트남", "เวียดนาม"), ...recipe };
}
