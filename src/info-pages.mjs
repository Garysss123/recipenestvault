export const infoPages = {
  en: {
    about: {
      metaTitle: "About Recipe Nest Vault — Useful recipes, sourced with care",
      metaDescription: "Learn why Recipe Nest Vault is building a clear, multilingual recipe library for real kitchens and how its editorial standards guide every page.",
      eyebrow: "About Recipe Nest Vault",
      title: "A recipe library built for real kitchens.",
      intro: "Recipe Nest Vault is building a practical, multilingual home for global recipes—without burying the details cooks need.",
      onThisPage: "On this page",
      sections: [
        {
          id: "purpose", title: "Why this site exists",
          paragraphs: [
            "Ingredients, timing, substitutions, storage, and common mistakes should be easy to find. This library is designed to put those details first.",
            "The goal is not to publish the largest collection as quickly as possible. It is to build a smaller library that is clearer, more reliable, and easier to cook from."
          ]
        },
        {
          id: "collection", title: "How the collection grows",
          paragraphs: ["The first phase begins with 21 cuisine guides and a small set of collection previews in five languages. Complete recipes will be added only after their method, measurements, context, and sources are ready."],
          bullets: ["Practical information before long introductions", "Reliable sources checked against one another", "Consistent measurements, timing, and terminology", "Visible image credits and meaningful references"]
        },
        {
          id: "access", title: "Built for more readers",
          paragraphs: ["English, Traditional Chinese, Japanese, Korean, and Thai are part of the same site architecture—not separate afterthoughts. Layout, typography, navigation, and search are tested across desktop and mobile.", "The site is static-first and runs on Cloudflare Pages. Its main content needs no account, database, or always-on application server, and search filtering happens in the browser."]
        },
        {
          id: "credits", title: "Images and attribution",
          paragraphs: ["The homepage food photography and social preview are site-owned originals created with OpenAI image generation. Their source files remain linked in the homepage credits. Future third-party images will be used only with clear commercial-use permission and visible attribution."]
        }
      ],
      closingTitle: "Useful first, always.",
      closingBody: "Every new page should earn its place by helping someone choose, understand, or cook a dish with more confidence."
    },
    privacy: {
      metaTitle: "Privacy Policy — Recipe Nest Vault",
      metaDescription: "Read how Recipe Nest Vault handles hosting data, privacy-first analytics, browser-side search, cookies, and its currently inactive AdSense integration.",
      eyebrow: "Privacy policy",
      title: "Privacy, explained plainly.",
      intro: "Recipe Nest Vault is currently a read-only static website. It does not offer accounts, comments, contact forms, purchases, or a personal-data database.",
      updated: "Last updated: August 28, 2026",
      onThisPage: "On this page",
      sections: [
        {
          id: "overview", title: "The short version",
          paragraphs: ["The site does not ask you to create an account or directly submit personal information. We do not build individual visitor profiles or sell personal information."]
        },
        {
          id: "hosting", title: "Hosting and security",
          paragraphs: ["The site is delivered through Cloudflare Pages and Cloudflare's network. Cloudflare may process technical request information—such as an IP address, browser or device details, requested URLs, and timestamps—to deliver, cache, measure, and protect the site. Cloudflare handles that information under its own privacy policy."]
        },
        {
          id: "analytics", title: "Privacy-first analytics",
          paragraphs: ["Cloudflare Web Analytics provides aggregate page-view and performance information. Cloudflare states that this service does not use cookies or localStorage, does not fingerprint visitors, and does not collect or use visitors' personal data for Web Analytics."]
        },
        {
          id: "search", title: "Search",
          paragraphs: ["The search index is downloaded and filtered in your browser; there is no search backend or search-profile database. A search term can still appear in the page URL and may therefore be present in normal browser history, network requests, or security logs. Do not enter personal information into search."]
        },
        {
          id: "cookies-ads", title: "Cookies and advertising",
          paragraphs: ["Recipe Nest Vault's own code does not currently set analytics or advertising cookies. Cloudflare may set strictly necessary security cookies when protective features require them.", "Google AdSense components are prepared in the page templates but are inactive: no publisher ID is configured, no Google ad script is loaded, and no ad request is sent. Before advertising is enabled, this policy will be updated and any legally required consent controls will be added."]
        },
        {
          id: "links-updates", title: "External links and policy updates",
          paragraphs: ["Links to external services are governed by those services' own policies. This page will be updated when the site's data practices materially change. The current site has no account record or direct-submission database for the operator to retrieve or delete."]
        }
      ],
      referencesTitle: "Service privacy references",
      references: [
        { label: "Cloudflare Web Analytics data collection", href: "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" },
        { label: "Cloudflare Privacy Policy", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "Cloudflare cookie reference", href: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" },
        { label: "How Google AdSense uses cookies", href: "https://support.google.com/adsense/answer/7549925" }
      ],
      closingTitle: "No hidden account or search database.",
      closingBody: "The current experience stays deliberately simple: read the site, browse cuisines, and search the downloaded index without creating an identity."
    }
  },
  "zh-hant": {
    about: {
      metaTitle: "關於 Recipe Nest Vault — 實用優先，來源清楚",
      metaDescription: "了解 Recipe Nest Vault 為何建立適合真實廚房的五語食譜資料庫，以及每個頁面遵循的編輯標準。",
      eyebrow: "關於 Recipe Nest Vault",
      title: "為真實廚房打造的食譜資料庫。",
      intro: "Recipe Nest Vault 正在建立一個實用的多語全球食譜空間，讓真正重要的料理細節不再藏在冗長內容之後。",
      onThisPage: "本頁內容",
      sections: [
        {
          id: "purpose", title: "為什麼建立本站",
          paragraphs: ["食材、時間、替代方案、保存方式與常見錯誤都應該容易找到；這個資料庫因此把實用資訊放在最前面。", "目標不是用最快速度堆出最多內容，而是建立一個更清楚、更可靠，也更容易實際照著料理的精選資料庫。"]
        },
        {
          id: "collection", title: "內容如何擴充",
          paragraphs: ["第一階段從 21 個料理指南與少量內容預覽開始，並同步提供五種語言。完整食譜只有在做法、份量、背景與來源整理妥當後才會發布。"],
          bullets: ["實用資訊優先，不寫冗長前言", "交叉查核可靠來源", "統一份量、時間與用語", "清楚保留圖片授權與重要參考資料"]
        },
        {
          id: "access", title: "讓更多讀者都能使用",
          paragraphs: ["英文、繁體中文、日文、韓文與泰文共用同一套網站架構，而不是事後附加的翻譯頁。排版、字體、導覽與搜尋都會在桌機和手機上逐一測試。", "本站採靜態優先並部署於 Cloudflare Pages；主要內容不需要帳號、資料庫或常駐應用程式伺服器，搜尋篩選則在瀏覽器中完成。"]
        },
        {
          id: "credits", title: "圖片與來源",
          paragraphs: ["首頁食物照片與社群預覽圖是使用 OpenAI 圖像生成工具製作的本站原創素材，來源檔案保留在首頁授權區。未來如使用第三方圖片，只會採用商業使用權利清楚的素材，並顯示必要授權資訊。"]
        }
      ],
      closingTitle: "實用，永遠優先。",
      closingBody: "每個新增頁面都應該真正幫助讀者更有把握地選擇、理解或完成一道料理。"
    },
    privacy: {
      metaTitle: "隱私權政策 — Recipe Nest Vault",
      metaDescription: "了解 Recipe Nest Vault 如何處理網站託管資料、重視隱私的流量分析、瀏覽器端搜尋、Cookie，以及目前尚未啟用的 AdSense。",
      eyebrow: "隱私權政策",
      title: "用清楚方式說明隱私。",
      intro: "Recipe Nest Vault 目前是唯讀的靜態網站，不提供帳號、留言、聯絡表單、購買功能，也沒有個人資料資料庫。",
      updated: "最後更新：2026 年 8 月 28 日",
      onThisPage: "本頁內容",
      sections: [
        {
          id: "overview", title: "簡短說明",
          paragraphs: ["本站不要求建立帳號，也不會透過網站功能要求你直接提交個人資料。我們不建立個別訪客側寫，也不販售個人資料。"]
        },
        {
          id: "hosting", title: "託管與安全",
          paragraphs: ["本站透過 Cloudflare Pages 與 Cloudflare 網路提供內容。為了傳送、快取、衡量及保護網站，Cloudflare 可能處理 IP 位址、瀏覽器或裝置資訊、請求網址與時間等技術性請求資料；相關處理由 Cloudflare 自己的隱私權政策規範。"]
        },
        {
          id: "analytics", title: "重視隱私的流量分析",
          paragraphs: ["Cloudflare Web Analytics 提供彙總的瀏覽量與頁面效能資訊。Cloudflare 表示此服務不使用 Cookie 或 localStorage、不透過指紋辨識訪客，也不會為 Web Analytics 收集或使用訪客個人資料。"]
        },
        {
          id: "search", title: "搜尋功能",
          paragraphs: ["搜尋索引會下載到瀏覽器並在裝置上篩選，沒有搜尋後端或搜尋側寫資料庫。不過搜尋文字仍可能出現在頁面網址中，因此可能留在一般瀏覽紀錄、網路請求或安全日誌裡。請勿在搜尋欄輸入個人資料。"]
        },
        {
          id: "cookies-ads", title: "Cookie 與廣告",
          paragraphs: ["Recipe Nest Vault 自己的程式目前不會設定分析或廣告 Cookie。Cloudflare 的保護功能如有需要，可能設定維持安全所必需的 Cookie。", "頁面範本已預留 Google AdSense 元件，但目前完全停用：尚未設定 Publisher ID、不會載入 Google 廣告程式，也不會送出廣告請求。正式啟用廣告前，本站會更新本政策並加入法律要求的同意機制。"]
        },
        {
          id: "links-updates", title: "外部連結與政策更新",
          paragraphs: ["外部服務連結適用各服務自己的政策。當本站資料處理方式有重大變更時，本頁會同步更新。目前網站沒有帳號紀錄或由站方管理的直接提交資料庫可供查詢或刪除。"]
        }
      ],
      referencesTitle: "服務隱私參考資料",
      references: [
        { label: "Cloudflare Web Analytics 資料收集說明", href: "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" },
        { label: "Cloudflare 隱私權政策", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "Cloudflare Cookie 說明", href: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" },
        { label: "Google AdSense 如何使用 Cookie", href: "https://support.google.com/adsense/answer/7549925" }
      ],
      closingTitle: "沒有隱藏的帳號或搜尋資料庫。",
      closingBody: "目前的使用方式刻意維持單純：閱讀內容、瀏覽料理，並在不建立身分的情況下搜尋已下載的索引。"
    }
  },
  ja: {
    about: {
      metaTitle: "Recipe Nest Vault について — 実用性を第一に、出典は丁寧に",
      metaDescription: "Recipe Nest Vault が日々の台所で使える多言語レシピライブラリを目指す理由と、すべてのページを支える編集方針をご紹介します。",
      eyebrow: "Recipe Nest Vault について",
      title: "毎日の台所のためのレシピライブラリ。",
      intro: "Recipe Nest Vault は、料理に必要な情報を長い文章に埋もれさせず、世界のレシピを実用的に届ける多言語ライブラリです。",
      onThisPage: "このページの内容",
      sections: [
        {
          id: "purpose", title: "このサイトを作る理由",
          paragraphs: ["材料、時間、代替食材、保存方法、よくある失敗は、すぐに見つけられるべき情報です。このライブラリでは、そうした実用的な情報を最初に伝えます。", "できるだけ早く最大規模を目指すのではなく、わかりやすく、信頼でき、実際に作りやすいコレクションを丁寧に育てます。"]
        },
        {
          id: "collection", title: "コレクションの増やし方",
          paragraphs: ["第1段階では、21の料理ガイドと少数のコレクション予告を5言語で公開します。作り方、分量、背景、出典を確認できたレシピから順に追加します。"],
          bullets: ["長い前置きより実用情報を優先", "信頼できる情報を複数の出典で確認", "分量、時間、用語を統一", "画像クレジットと重要な参照元を明記"]
        },
        {
          id: "access", title: "より多くの読者のために",
          paragraphs: ["英語、繁体字中国語、日本語、韓国語、タイ語は、後から付け足した翻訳ではなく、同じサイト設計の一部です。レイアウト、文字、ナビゲーション、検索をデスクトップとモバイルで確認しています。", "サイトは静的生成を基本とし、Cloudflare Pages で配信しています。主要コンテンツにアカウントやデータベース、常時稼働するアプリサーバーは不要で、検索の絞り込みもブラウザ内で行います。"]
        },
        {
          id: "credits", title: "画像とクレジット",
          paragraphs: ["トップページの料理写真とソーシャルプレビューは、OpenAI の画像生成機能で制作したサイト独自素材です。元ファイルへのリンクはトップページのクレジット欄に残しています。今後、外部画像を使う場合は、商用利用条件が明確な素材だけを選び、必要な表示を行います。"]
        }
      ],
      closingTitle: "いつでも、役立つことを第一に。",
      closingBody: "新しいページは、料理を選び、理解し、自信を持って作るために本当に役立つものだけを追加します。"
    },
    privacy: {
      metaTitle: "プライバシーポリシー — Recipe Nest Vault",
      metaDescription: "Recipe Nest Vault のホスティングデータ、プライバシー重視の解析、ブラウザ内検索、Cookie、現在無効の AdSense について説明します。",
      eyebrow: "プライバシーポリシー",
      title: "プライバシーを、わかりやすく。",
      intro: "Recipe Nest Vault は現在、閲覧専用の静的サイトです。アカウント、コメント、問い合わせフォーム、購入機能、個人データのデータベースはありません。",
      updated: "最終更新日：2026年8月28日",
      onThisPage: "このページの内容",
      sections: [
        { id: "overview", title: "概要", paragraphs: ["アカウント作成や、サイト機能を通じた個人情報の直接入力は求めません。個々の訪問者プロフィールを作成したり、個人情報を販売したりすることもありません。"] },
        { id: "hosting", title: "ホスティングとセキュリティ", paragraphs: ["本サイトは Cloudflare Pages と Cloudflare のネットワークを通じて配信されます。配信、キャッシュ、計測、保護のため、Cloudflare は IP アドレス、ブラウザや端末の情報、リクエストURL、時刻などの技術情報を処理する場合があります。その取り扱いには Cloudflare のプライバシーポリシーが適用されます。"] },
        { id: "analytics", title: "プライバシー重視のアクセス解析", paragraphs: ["Cloudflare Web Analytics から、集計されたページ閲覧数とパフォーマンス情報を確認します。Cloudflare は、このサービスが Cookie や localStorage を使わず、訪問者をフィンガープリントせず、Web Analytics のために訪問者の個人データを収集・利用しないと説明しています。"] },
        { id: "search", title: "検索", paragraphs: ["検索インデックスはブラウザにダウンロードされ、端末上で絞り込まれます。検索用バックエンドや検索プロフィールのデータベースはありません。ただし、検索語はページURLに含まれる場合があり、通常の閲覧履歴、ネットワーク要求、セキュリティログに残る可能性があります。個人情報は入力しないでください。"] },
        { id: "cookies-ads", title: "Cookie と広告", paragraphs: ["Recipe Nest Vault 自身のコードは、現在、解析用または広告用 Cookie を設定しません。Cloudflare の保護機能が必要とする場合は、セキュリティ上不可欠な Cookie が設定されることがあります。", "Google AdSense の部品はテンプレートに準備されていますが、現在は無効です。Publisher ID は未設定で、Google の広告スクリプトも広告リクエストも読み込まれません。広告を有効にする前に本ポリシーを更新し、法令上必要な同意機能を追加します。"] },
        { id: "links-updates", title: "外部リンクと更新", paragraphs: ["外部サービスへのリンクには、各サービスのポリシーが適用されます。データの取り扱いが大きく変わる場合は、本ページを更新します。現在、運営者が検索・削除できるアカウント記録や直接送信データベースはありません。"] }
      ],
      referencesTitle: "サービスのプライバシー資料",
      references: [
        { label: "Cloudflare Web Analytics のデータ収集", href: "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" },
        { label: "Cloudflare プライバシーポリシー", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "Cloudflare Cookie リファレンス", href: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" },
        { label: "Google AdSense の Cookie 利用", href: "https://support.google.com/adsense/answer/7549925" }
      ],
      closingTitle: "隠れたアカウントや検索データベースはありません。",
      closingBody: "読む、料理を探す、ダウンロード済みの索引を検索する。現在の体験は、個人の識別情報を作らずに使えるシンプルな設計です。"
    }
  },
  ko: {
    about: {
      metaTitle: "Recipe Nest Vault 소개 — 실용성을 먼저, 출처는 꼼꼼하게",
      metaDescription: "Recipe Nest Vault가 실제 주방을 위한 다국어 레시피 라이브러리를 만드는 이유와 모든 페이지에 적용하는 편집 기준을 소개합니다.",
      eyebrow: "Recipe Nest Vault 소개",
      title: "실제 주방을 위해 만든 레시피 라이브러리.",
      intro: "Recipe Nest Vault는 요리에 꼭 필요한 정보를 긴 글 속에 숨기지 않고, 세계의 레시피를 실용적으로 전하는 다국어 공간을 만들고 있습니다.",
      onThisPage: "이 페이지의 내용",
      sections: [
        { id: "purpose", title: "이 사이트를 만든 이유", paragraphs: ["재료, 시간, 대체 재료, 보관법, 흔한 실수는 쉽게 찾을 수 있어야 합니다. 이 라이브러리는 그런 실용적인 정보를 가장 먼저 보여 줍니다.", "가장 큰 컬렉션을 빠르게 만드는 대신, 더 명확하고 신뢰할 수 있으며 실제로 따라 하기 쉬운 작은 라이브러리를 차근차근 키웁니다."] },
        { id: "collection", title: "컬렉션을 확장하는 방식", paragraphs: ["첫 단계에서는 21개의 요리 가이드와 소수의 컬렉션 미리 보기를 다섯 언어로 제공합니다. 조리법, 계량, 배경, 출처를 모두 정리한 레시피부터 공개합니다."], bullets: ["긴 서문보다 실용 정보를 우선", "신뢰할 수 있는 여러 출처를 교차 확인", "계량, 시간, 용어를 일관되게 정리", "이미지 크레딧과 중요한 참고 자료를 명확히 표시"] },
        { id: "access", title: "더 많은 독자를 위한 설계", paragraphs: ["영어, 번체 중국어, 일본어, 한국어, 태국어는 나중에 덧붙인 번역이 아니라 같은 사이트 구조의 일부입니다. 레이아웃, 글꼴, 탐색, 검색을 데스크톱과 모바일에서 함께 점검합니다.", "사이트는 정적 생성을 우선으로 하며 Cloudflare Pages에서 제공됩니다. 주요 콘텐츠에는 계정, 데이터베이스, 상시 실행되는 애플리케이션 서버가 필요하지 않고, 검색 필터링도 브라우저에서 처리됩니다."] },
        { id: "credits", title: "이미지와 출처", paragraphs: ["홈페이지 음식 사진과 소셜 미리보기는 OpenAI 이미지 생성 기능으로 만든 사이트 소유 원본입니다. 원본 파일 링크는 홈페이지 크레딧 영역에 남겨 둡니다. 앞으로 외부 이미지를 사용할 때는 상업적 이용 조건이 명확한 자료만 선택하고 필요한 출처를 표시합니다."] }
      ],
      closingTitle: "언제나 실용성을 먼저.",
      closingBody: "새 페이지는 요리를 고르고 이해하고 더 자신 있게 완성하는 데 실제로 도움이 될 때만 추가합니다."
    },
    privacy: {
      metaTitle: "개인정보 처리방침 — Recipe Nest Vault",
      metaDescription: "Recipe Nest Vault의 호스팅 데이터, 개인정보 보호 중심 분석, 브라우저 검색, 쿠키, 현재 비활성 상태인 AdSense를 설명합니다.",
      eyebrow: "개인정보 처리방침",
      title: "개인정보 보호 방식을 알기 쉽게 안내합니다.",
      intro: "Recipe Nest Vault는 현재 읽기 전용 정적 웹사이트입니다. 계정, 댓글, 문의 양식, 구매 기능 또는 개인 데이터 데이터베이스를 운영하지 않습니다.",
      updated: "최종 업데이트: 2026년 8월 28일",
      onThisPage: "이 페이지의 내용",
      sections: [
        { id: "overview", title: "간단히 보기", paragraphs: ["계정 생성을 요구하거나 사이트 기능을 통해 개인정보를 직접 제출받지 않습니다. 개별 방문자 프로필을 만들거나 개인정보를 판매하지 않습니다."] },
        { id: "hosting", title: "호스팅과 보안", paragraphs: ["이 사이트는 Cloudflare Pages와 Cloudflare 네트워크를 통해 제공됩니다. 사이트 제공, 캐시, 측정, 보호를 위해 Cloudflare는 IP 주소, 브라우저 또는 기기 정보, 요청 URL, 시간과 같은 기술적 요청 정보를 처리할 수 있습니다. 해당 정보에는 Cloudflare의 개인정보 보호정책이 적용됩니다."] },
        { id: "analytics", title: "개인정보 보호 중심 분석", paragraphs: ["Cloudflare Web Analytics로 집계된 페이지 조회 및 성능 정보를 확인합니다. Cloudflare는 이 서비스가 쿠키나 localStorage를 사용하지 않고, 방문자를 지문 식별하지 않으며, Web Analytics를 위해 방문자의 개인 데이터를 수집하거나 사용하지 않는다고 설명합니다."] },
        { id: "search", title: "검색", paragraphs: ["검색 색인은 브라우저로 내려받아 기기에서 필터링합니다. 검색 백엔드나 검색 프로필 데이터베이스는 없습니다. 다만 검색어가 페이지 URL에 포함될 수 있어 일반적인 브라우저 기록, 네트워크 요청 또는 보안 로그에 남을 수 있습니다. 개인정보를 검색창에 입력하지 마세요."] },
        { id: "cookies-ads", title: "쿠키와 광고", paragraphs: ["Recipe Nest Vault 자체 코드는 현재 분석 또는 광고 쿠키를 설정하지 않습니다. Cloudflare 보호 기능에 필요한 경우 필수 보안 쿠키가 설정될 수 있습니다.", "Google AdSense 구성 요소는 템플릿에 준비되어 있지만 현재 비활성 상태입니다. Publisher ID가 없고 Google 광고 스크립트나 광고 요청도 전송되지 않습니다. 광고를 활성화하기 전에 이 방침을 갱신하고 법적으로 필요한 동의 절차를 추가합니다."] },
        { id: "links-updates", title: "외부 링크와 방침 변경", paragraphs: ["외부 서비스 링크에는 각 서비스의 정책이 적용됩니다. 사이트의 데이터 처리 방식이 크게 바뀌면 이 페이지를 업데이트합니다. 현재 운영자가 조회하거나 삭제할 계정 기록 또는 직접 제출 데이터베이스는 없습니다."] }
      ],
      referencesTitle: "서비스 개인정보 보호 자료",
      references: [
        { label: "Cloudflare Web Analytics 데이터 수집", href: "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" },
        { label: "Cloudflare 개인정보 보호정책", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "Cloudflare 쿠키 안내", href: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" },
        { label: "Google AdSense의 쿠키 사용 방식", href: "https://support.google.com/adsense/answer/7549925" }
      ],
      closingTitle: "숨겨진 계정이나 검색 데이터베이스가 없습니다.",
      closingBody: "콘텐츠를 읽고, 요리를 둘러보고, 내려받은 색인을 검색하는 현재 경험은 개인 식별 정보를 만들지 않고 이용하도록 단순하게 설계했습니다."
    }
  },
  th: {
    about: {
      metaTitle: "เกี่ยวกับ Recipe Nest Vault — ใช้งานได้จริงและใส่ใจแหล่งที่มา",
      metaDescription: "ทำความรู้จักเหตุผลที่ Recipe Nest Vault สร้างคลังสูตรอาหารหลายภาษาสำหรับครัวจริง และมาตรฐานบรรณาธิการที่ใช้กับทุกหน้า",
      eyebrow: "เกี่ยวกับ Recipe Nest Vault",
      title: "คลังสูตรอาหารที่สร้างมาเพื่อครัวจริง",
      intro: "Recipe Nest Vault กำลังสร้างพื้นที่รวมสูตรอาหารทั่วโลกหลายภาษาที่ใช้งานได้จริง โดยไม่ซ่อนรายละเอียดสำคัญไว้หลังเนื้อหาที่ยืดยาว",
      onThisPage: "เนื้อหาในหน้านี้",
      sections: [
        { id: "purpose", title: "เหตุผลที่เราสร้างเว็บไซต์นี้", paragraphs: ["วัตถุดิบ เวลา ตัวเลือกทดแทน วิธีเก็บรักษา และข้อผิดพลาดที่พบบ่อยควรค้นหาได้ง่าย คลังนี้จึงนำข้อมูลที่ใช้ทำอาหารจริงมาไว้ก่อน", "เป้าหมายไม่ใช่การสร้างคลังที่ใหญ่ที่สุดให้เร็วที่สุด แต่คือการค่อย ๆ สร้างคลังขนาดพอดีที่ชัดเจน เชื่อถือได้ และทำตามได้ง่ายกว่า"] },
        { id: "collection", title: "วิธีที่คลังเนื้อหาเติบโต", paragraphs: ["ระยะแรกเริ่มจากคู่มืออาหาร 21 ประเภทและตัวอย่างคอลเลกชันจำนวนเล็กน้อยในห้าภาษา สูตรฉบับเต็มจะเผยแพร่เมื่อวิธีทำ ปริมาณ บริบท และแหล่งข้อมูลพร้อมแล้วเท่านั้น"], bullets: ["ให้ข้อมูลที่ใช้ได้จริงมาก่อนบทนำยาว ๆ", "ตรวจสอบข้อมูลกับแหล่งที่มาที่เชื่อถือได้หลายแห่ง", "จัดหน่วยวัด เวลา และคำศัพท์ให้สม่ำเสมอ", "แสดงเครดิตภาพและแหล่งอ้างอิงสำคัญอย่างชัดเจน"] },
        { id: "access", title: "ออกแบบเพื่อผู้อ่านที่หลากหลาย", paragraphs: ["ภาษาอังกฤษ จีนตัวเต็ม ญี่ปุ่น เกาหลี และไทยเป็นส่วนหนึ่งของโครงสร้างเดียวกัน ไม่ใช่คำแปลที่เพิ่มภายหลัง เราตรวจสอบเลย์เอาต์ ตัวอักษร การนำทาง และการค้นหาทั้งบนเดสก์ท็อปและมือถือ", "เว็บไซต์ใช้แนวทาง static-first และให้บริการผ่าน Cloudflare Pages เนื้อหาหลักไม่ต้องใช้บัญชี ฐานข้อมูล หรือเซิร์ฟเวอร์แอปที่ทำงานตลอดเวลา ส่วนการกรองผลค้นหาทำในเบราว์เซอร์"] },
        { id: "credits", title: "รูปภาพและการให้เครดิต", paragraphs: ["ภาพอาหารหน้าแรกและภาพตัวอย่างสำหรับโซเชียลเป็นผลงานต้นฉบับของเว็บไซต์ที่สร้างด้วยระบบสร้างภาพของ OpenAI โดยยังมีลิงก์ไฟล์ต้นฉบับในส่วนเครดิต หากใช้ภาพจากภายนอกในอนาคต เราจะเลือกเฉพาะภาพที่มีสิทธิ์ใช้เชิงพาณิชย์ชัดเจนและแสดงเครดิตตามข้อกำหนด"] }
      ],
      closingTitle: "ใช้งานได้จริงต้องมาก่อนเสมอ",
      closingBody: "ทุกหน้าใหม่ควรช่วยให้ผู้อ่านเลือก เข้าใจ หรือทำอาหารได้อย่างมั่นใจยิ่งขึ้นจริง ๆ"
    },
    privacy: {
      metaTitle: "นโยบายความเป็นส่วนตัว — Recipe Nest Vault",
      metaDescription: "อ่านวิธีที่ Recipe Nest Vault จัดการข้อมูลโฮสติ้ง การวิเคราะห์ที่ให้ความสำคัญกับความเป็นส่วนตัว การค้นหาในเบราว์เซอร์ คุกกี้ และ AdSense ที่ยังไม่เปิดใช้งาน",
      eyebrow: "นโยบายความเป็นส่วนตัว",
      title: "อธิบายความเป็นส่วนตัวอย่างตรงไปตรงมา",
      intro: "ปัจจุบัน Recipe Nest Vault เป็นเว็บไซต์แบบสแตติกสำหรับอ่านเท่านั้น ไม่มีบัญชี ความคิดเห็น แบบฟอร์มติดต่อ การซื้อสินค้า หรือฐานข้อมูลส่วนบุคคล",
      updated: "อัปเดตล่าสุด: 28 สิงหาคม 2026",
      onThisPage: "เนื้อหาในหน้านี้",
      sections: [
        { id: "overview", title: "สรุปสั้น ๆ", paragraphs: ["เว็บไซต์ไม่ขอให้สร้างบัญชีหรือส่งข้อมูลส่วนบุคคลโดยตรงผ่านฟังก์ชันของเว็บไซต์ เราไม่สร้างโปรไฟล์ผู้เข้าชมรายบุคคลและไม่ขายข้อมูลส่วนบุคคล"] },
        { id: "hosting", title: "โฮสติ้งและความปลอดภัย", paragraphs: ["เว็บไซต์ให้บริการผ่าน Cloudflare Pages และเครือข่ายของ Cloudflare เพื่อส่ง แคช วัดผล และปกป้องเว็บไซต์ Cloudflare อาจประมวลผลข้อมูลคำขอทางเทคนิค เช่น ที่อยู่ IP ข้อมูลเบราว์เซอร์หรืออุปกรณ์ URL ที่เรียก และเวลา โดยข้อมูลดังกล่าวอยู่ภายใต้นโยบายความเป็นส่วนตัวของ Cloudflare"] },
        { id: "analytics", title: "การวิเคราะห์ที่ให้ความสำคัญกับความเป็นส่วนตัว", paragraphs: ["Cloudflare Web Analytics ให้ข้อมูลยอดเข้าชมและประสิทธิภาพหน้าเว็บในภาพรวม Cloudflare ระบุว่าบริการนี้ไม่ใช้คุกกี้หรือ localStorage ไม่ทำ fingerprint ผู้เข้าชม และไม่เก็บหรือใช้ข้อมูลส่วนบุคคลของผู้เข้าชมเพื่อ Web Analytics"] },
        { id: "search", title: "การค้นหา", paragraphs: ["ดัชนีค้นหาจะถูกดาวน์โหลดและกรองในเบราว์เซอร์ ไม่มีระบบค้นหาฝั่งเซิร์ฟเวอร์หรือฐานข้อมูลโปรไฟล์การค้นหา อย่างไรก็ตาม คำค้นอาจปรากฏใน URL และอาจอยู่ในประวัติเบราว์เซอร์ คำขอเครือข่าย หรือบันทึกความปลอดภัยตามปกติ โปรดอย่าใส่ข้อมูลส่วนบุคคลในช่องค้นหา"] },
        { id: "cookies-ads", title: "คุกกี้และโฆษณา", paragraphs: ["โค้ดของ Recipe Nest Vault เองยังไม่ตั้งคุกกี้สำหรับการวิเคราะห์หรือโฆษณา Cloudflare อาจตั้งคุกกี้ด้านความปลอดภัยที่จำเป็นเมื่อฟังก์ชันป้องกันของระบบต้องใช้", "มีการเตรียมองค์ประกอบ Google AdSense ไว้ในเทมเพลต แต่ยังปิดใช้งาน ไม่มี Publisher ID ไม่มีการโหลดสคริปต์โฆษณาของ Google และไม่มีการส่งคำขอโฆษณา ก่อนเปิดโฆษณา เราจะอัปเดตนโยบายนี้และเพิ่มระบบขอความยินยอมที่กฎหมายกำหนด"] },
        { id: "links-updates", title: "ลิงก์ภายนอกและการอัปเดตนโยบาย", paragraphs: ["ลิงก์ไปยังบริการภายนอกอยู่ภายใต้นโยบายของบริการนั้น ๆ หน้านี้จะได้รับการอัปเดตเมื่อแนวทางจัดการข้อมูลของเว็บไซต์เปลี่ยนแปลงอย่างมีนัยสำคัญ ปัจจุบันไม่มีข้อมูลบัญชีหรือฐานข้อมูลที่ส่งตรงให้ผู้ดูแลเว็บไซต์เรียกดูหรือลบ"] }
      ],
      referencesTitle: "เอกสารอ้างอิงด้านความเป็นส่วนตัวของบริการ",
      references: [
        { label: "การเก็บข้อมูลของ Cloudflare Web Analytics", href: "https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/" },
        { label: "นโยบายความเป็นส่วนตัวของ Cloudflare", href: "https://www.cloudflare.com/privacypolicy/" },
        { label: "ข้อมูลคุกกี้ของ Cloudflare", href: "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" },
        { label: "วิธีที่ Google AdSense ใช้คุกกี้", href: "https://support.google.com/adsense/answer/7549925" }
      ],
      closingTitle: "ไม่มีบัญชีหรือฐานข้อมูลค้นหาที่ซ่อนอยู่",
      closingBody: "ประสบการณ์ปัจจุบันตั้งใจให้เรียบง่าย: อ่านเนื้อหา สำรวจอาหาร และค้นหาดัชนีที่ดาวน์โหลดมาโดยไม่ต้องสร้างตัวตน"
    }
  }
};
