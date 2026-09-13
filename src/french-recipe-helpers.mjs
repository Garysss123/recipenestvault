import { frenchRecipeSources } from './french-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });
export function makeFrenchRecipe(recipe) {
  const { additionalSources = [], ...data } = recipe;
  return { cuisine: 'french', region: ml('France','法國','フランス','프랑스','ฝรั่งเศส'), sources: [...frenchRecipeSources[recipe.id], ...additionalSources], ...data };
}
export const stewStorage = ml(
  'Divide leftovers into shallow containers and refrigerate within 2 hours at 0–4°C for up to 3 days. Reheat only the portion needed to 74°C throughout.',
  '剩菜分裝淺盒，2 小時內放入 0–4°C 冰箱，最多保存 3 天；只取需要的份量，回熱至各處 74°C。',
  '残りは浅い容器に分け、2時間以内に0–4°Cで冷蔵し、3日以内に使います。食べる分だけ全体が74°Cになるまで再加熱します。',
  '남은 음식은 얕은 용기에 나눠 2시간 안에 0–4°C로 냉장해 3일 이내 먹으세요. 필요한 양만 전체가 74°C가 되도록 데우세요.',
  'แบ่งอาหารเหลือใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมงที่ 0–4°C ไม่เกิน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C'
);
