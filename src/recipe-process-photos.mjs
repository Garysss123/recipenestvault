const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

// Published preparation and process photographs. Each entry is independently
// approved for one exact recipe step; missing steps intentionally render text only.
export const recipeProcessPhotos = [
  {
    id: "mapo-tofu-step-01-soft-tofu",
    recipeId: "mapo-tofu",
    step: 1,
    relation: "separately-sourced-technique-reference",
    title: "厨师长教你川菜麻婆豆腐的正宗做法",
    author: "美食作家王刚",
    sourcePage: "https://commons.wikimedia.org/w/index.php?oldid=1036408226",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/42/%E5%8E%A8%E5%B8%88%E9%95%BF%E6%95%99%E4%BD%A0%E5%B7%9D%E8%8F%9C%E9%BA%BB%E5%A9%86%E8%B1%86%E8%85%90%E7%9A%84%E6%AD%A3%E5%AE%97%E5%81%9A%E6%B3%95.webm",
    originalPublication: "https://www.youtube.com/watch?v=RU-0vjjvSiI",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    frameTimestamp: "00:00:05.500",
    sourceAsset: "mapo-tofu/step-01-tofu-005500.png",
    sourceAssetSha256: "2ff1b24f6b3b819c71bacc1f46fcfa1341ff7bba3d321026196a244c3b986ba6",
    commercialUseVerified: true,
    adaptationAllowed: true,
    realPhoto: true,
    visualMatchApproved: true,
    alt: ml(
      "A cook holds 400 g of soft tofu cut into broad slabs over a round cutting board.",
      "料理者在圓形砧板上方托著切成寬片的 400 公克嫩豆腐。",
      "料理人が丸いまな板の上で、幅広く切った絹ごし豆腐400gを手に持っている。",
      "조리사가 둥근 도마 위에서 넓게 자른 연두부 400g을 손에 들고 있다.",
      "ผู้ปรุงถือเต้าหู้อ่อน 400 กรัมที่หั่นเป็นแผ่นกว้างเหนือเขียงกลม"
    ),
    caption: ml(
      "A separate reference for selecting 400 g soft tofu. The source demonstration later uses a different cube size, so follow this recipe's written instruction for 2 cm cubes. This is not the same cooking batch as the published recipe.",
      "這是取自另一份示範的 400 公克嫩豆腐選材參考。來源影片後續使用不同切塊尺寸，請以本站文字的 2 公分方塊為準；這不是本站配方的同一批實作。",
      "別の実演から引用した、絹ごし豆腐400gを選ぶための参考写真です。元動画では後に異なる大きさへ切るため、このレシピ本文の2cm角に従ってください。掲載レシピと同じ調理回ではありません。",
      "별도 시연에서 가져온 연두부 400g 선택 참고 사진이다. 원본 영상은 이후 다른 크기로 자르므로 이 레시피 본문의 2cm 정육면체 지시를 따른다. 공개 레시피와 같은 조리 회차가 아니다.",
      "ภาพอ้างอิงการเลือกเต้าหู้อ่อน 400 กรัมจากการสาธิตอีกชุดหนึ่ง วิดีโอต้นฉบับหั่นเป็นขนาดอื่นในภายหลัง จึงให้ทำตามข้อความของสูตรนี้ที่กำหนดลูกเต๋า 2 ซม. และภาพนี้ไม่ใช่การปรุงชุดเดียวกับสูตรที่เผยแพร่"
    ),
    modifications: ml(
      "Frame extracted at 00:00:05.500, then resized and compressed to WebP by Recipe Nest Vault; the food content was not altered.",
      "Recipe Nest Vault 於 00:00:05.500 擷取影格，再調整尺寸並壓縮為 WebP；未改動食物內容。",
      "Recipe Nest Vault が00:00:05.500のフレームを抽出し、WebPへリサイズ・圧縮しました。食品の内容は変更していません。",
      "Recipe Nest Vault가 00:00:05.500 프레임을 추출한 뒤 WebP로 크기 조정 및 압축했으며 음식 내용은 바꾸지 않았다.",
      "Recipe Nest Vault ดึงเฟรมที่ 00:00:05.500 แล้วปรับขนาดและบีบอัดเป็น WebP โดยไม่ได้เปลี่ยนเนื้อหาอาหาร"
    )
  }
];
