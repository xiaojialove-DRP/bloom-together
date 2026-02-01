// Internationalization support for Cosmic Garden

export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'ar';

export interface Translations {
  // Header
  appName: string;
  tagline: string;
  
  // Stats & Map
  flowersCount: string;
  flowersSingular: string;
  worldMap: string;
  globalGarden: string;
  flowersFromWorld: string;
  noLocationData: string;
  plantToAdd: string;
  eachDotRepresents: string;
  totalFlowers: string;
  
  // Chat Dialog
  plantFlower: string;
  shareMoodPlaceholder: string;
  yourNamePlaceholder: string;
  aiChooseFlower: string;
  plantedFlower: string;
  thankYouPlanting: string;
  
  // Empty Garden
  emptyGardenTitle: string;
  emptyGardenSubtitle: string;
  
  // Flower Card
  saveCard: string;
  share: string;
  spreadKindness: string;
  saving: string;
  messageCopied: string;
  downloadFailed: string;
  
  // General
  close: string;
  loading: string;
  error: string;
  anonymous: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: 'Cosmic Garden',
    tagline: 'Encouragement and kindness from around the world, blooming into flowers',
    flowersCount: 'flowers',
    flowersSingular: 'flower',
    worldMap: 'World Map',
    globalGarden: 'Global Garden',
    flowersFromWorld: 'flowers from around the world',
    noLocationData: 'No location data yet',
    plantToAdd: 'Plant a flower to add your location!',
    eachDotRepresents: 'Each dot represents flowers planted from that region',
    totalFlowers: 'Total',
    plantFlower: 'Plant a Flower',
    shareMoodPlaceholder: 'Share your mood or encouragement...',
    yourNamePlaceholder: 'Your name (optional)',
    aiChooseFlower: 'AI will choose a flower based on your message ✨',
    plantedFlower: 'Planted a beautiful',
    thankYouPlanting: 'Thank you for adding beauty to the garden',
    emptyGardenTitle: 'This garden is waiting for its first flower...',
    emptyGardenSubtitle: 'Click below to plant your encouragement',
    saveCard: 'Save Card',
    share: 'Share',
    spreadKindness: 'Spread kindness • Share love',
    saving: 'Saving...',
    messageCopied: 'Message copied to clipboard!',
    downloadFailed: 'Failed to download card',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    anonymous: 'Anonymous',
  },
  zh: {
    appName: '宇宙花园',
    tagline: '来自世界各地的鼓励与善意，绽放成花',
    flowersCount: '朵花',
    flowersSingular: '朵花',
    worldMap: '世界地图',
    globalGarden: '全球花园',
    flowersFromWorld: '朵来自世界各地的花',
    noLocationData: '暂无位置数据',
    plantToAdd: '种一朵花来添加您的位置！',
    eachDotRepresents: '每个点代表该地区种植的花朵',
    totalFlowers: '总计',
    plantFlower: '种一朵花',
    shareMoodPlaceholder: '分享您的心情或鼓励话语...',
    yourNamePlaceholder: '您的名字（选填）',
    aiChooseFlower: 'AI 将根据您的信息选择一朵花 ✨',
    plantedFlower: '种下了美丽的',
    thankYouPlanting: '感谢您为花园增添美丽',
    emptyGardenTitle: '这片花园正等待它的第一朵花...',
    emptyGardenSubtitle: '点击下方种下您的鼓励',
    saveCard: '保存卡片',
    share: '分享',
    spreadKindness: '传递善意 • 分享爱',
    saving: '保存中...',
    messageCopied: '消息已复制到剪贴板！',
    downloadFailed: '下载卡片失败',
    close: '关闭',
    loading: '加载中...',
    error: '错误',
    anonymous: '匿名',
  },
  ja: {
    appName: 'コスミックガーデン',
    tagline: '世界中からの励ましと優しさが、花となって咲きます',
    flowersCount: '本の花',
    flowersSingular: '本の花',
    worldMap: '世界地図',
    globalGarden: 'グローバルガーデン',
    flowersFromWorld: '本の花が世界中から',
    noLocationData: '位置情報がありません',
    plantToAdd: '花を植えて位置を追加しましょう！',
    eachDotRepresents: '各点はその地域で植えられた花を表します',
    totalFlowers: '合計',
    plantFlower: '花を植える',
    shareMoodPlaceholder: '気持ちや励ましを共有...',
    yourNamePlaceholder: 'お名前（任意）',
    aiChooseFlower: 'AIがメッセージに基づいて花を選びます ✨',
    plantedFlower: '美しい花を植えました',
    thankYouPlanting: '庭に美しさを加えてくれてありがとう',
    emptyGardenTitle: 'この庭園は最初の花を待っています...',
    emptyGardenSubtitle: '下をクリックして励ましを植えましょう',
    saveCard: 'カードを保存',
    share: '共有',
    spreadKindness: '優しさを広める・愛を分かち合う',
    saving: '保存中...',
    messageCopied: 'メッセージをコピーしました！',
    downloadFailed: 'カードのダウンロードに失敗しました',
    close: '閉じる',
    loading: '読み込み中...',
    error: 'エラー',
    anonymous: '匿名',
  },
  ko: {
    appName: '코스믹 가든',
    tagline: '전 세계의 격려와 친절함이 꽃으로 피어납니다',
    flowersCount: '송이의 꽃',
    flowersSingular: '송이의 꽃',
    worldMap: '세계 지도',
    globalGarden: '글로벌 가든',
    flowersFromWorld: '송이의 꽃이 전 세계에서',
    noLocationData: '위치 데이터가 없습니다',
    plantToAdd: '꽃을 심어 위치를 추가하세요!',
    eachDotRepresents: '각 점은 해당 지역에서 심은 꽃을 나타냅니다',
    totalFlowers: '총',
    plantFlower: '꽃 심기',
    shareMoodPlaceholder: '기분이나 격려 메시지를 공유하세요...',
    yourNamePlaceholder: '이름 (선택사항)',
    aiChooseFlower: 'AI가 메시지에 따라 꽃을 선택합니다 ✨',
    plantedFlower: '아름다운 꽃을 심었습니다',
    thankYouPlanting: '정원에 아름다움을 더해주셔서 감사합니다',
    emptyGardenTitle: '이 정원은 첫 번째 꽃을 기다리고 있습니다...',
    emptyGardenSubtitle: '아래를 클릭하여 격려를 심으세요',
    saveCard: '카드 저장',
    share: '공유',
    spreadKindness: '친절을 퍼뜨리기 • 사랑 나누기',
    saving: '저장 중...',
    messageCopied: '메시지가 클립보드에 복사되었습니다!',
    downloadFailed: '카드 다운로드 실패',
    close: '닫기',
    loading: '로딩 중...',
    error: '오류',
    anonymous: '익명',
  },
  es: {
    appName: 'Jardín Cósmico',
    tagline: 'Aliento y bondad de todo el mundo, floreciendo en flores',
    flowersCount: 'flores',
    flowersSingular: 'flor',
    worldMap: 'Mapa Mundial',
    globalGarden: 'Jardín Global',
    flowersFromWorld: 'flores de todo el mundo',
    noLocationData: 'Sin datos de ubicación',
    plantToAdd: '¡Planta una flor para añadir tu ubicación!',
    eachDotRepresents: 'Cada punto representa flores plantadas de esa región',
    totalFlowers: 'Total',
    plantFlower: 'Plantar una Flor',
    shareMoodPlaceholder: 'Comparte tu estado de ánimo o aliento...',
    yourNamePlaceholder: 'Tu nombre (opcional)',
    aiChooseFlower: 'La IA elegirá una flor según tu mensaje ✨',
    plantedFlower: 'Plantaste una hermosa',
    thankYouPlanting: 'Gracias por añadir belleza al jardín',
    emptyGardenTitle: 'Este jardín está esperando su primera flor...',
    emptyGardenSubtitle: 'Haz clic abajo para plantar tu aliento',
    saveCard: 'Guardar Tarjeta',
    share: 'Compartir',
    spreadKindness: 'Difundir bondad • Compartir amor',
    saving: 'Guardando...',
    messageCopied: '¡Mensaje copiado al portapapeles!',
    downloadFailed: 'Error al descargar la tarjeta',
    close: 'Cerrar',
    loading: 'Cargando...',
    error: 'Error',
    anonymous: 'Anónimo',
  },
  fr: {
    appName: 'Jardin Cosmique',
    tagline: "L'encouragement et la gentillesse du monde entier, fleurissant en fleurs",
    flowersCount: 'fleurs',
    flowersSingular: 'fleur',
    worldMap: 'Carte du Monde',
    globalGarden: 'Jardin Global',
    flowersFromWorld: 'fleurs du monde entier',
    noLocationData: 'Pas de données de localisation',
    plantToAdd: 'Plantez une fleur pour ajouter votre emplacement!',
    eachDotRepresents: 'Chaque point représente les fleurs plantées de cette région',
    totalFlowers: 'Total',
    plantFlower: 'Planter une Fleur',
    shareMoodPlaceholder: 'Partagez votre humeur ou encouragement...',
    yourNamePlaceholder: 'Votre nom (optionnel)',
    aiChooseFlower: "L'IA choisira une fleur selon votre message ✨",
    plantedFlower: 'Vous avez planté une belle',
    thankYouPlanting: "Merci d'ajouter de la beauté au jardin",
    emptyGardenTitle: 'Ce jardin attend sa première fleur...',
    emptyGardenSubtitle: 'Cliquez ci-dessous pour planter votre encouragement',
    saveCard: 'Sauvegarder la Carte',
    share: 'Partager',
    spreadKindness: "Répandre la gentillesse • Partager l'amour",
    saving: 'Sauvegarde...',
    messageCopied: 'Message copié dans le presse-papiers!',
    downloadFailed: 'Échec du téléchargement de la carte',
    close: 'Fermer',
    loading: 'Chargement...',
    error: 'Erreur',
    anonymous: 'Anonyme',
  },
  de: {
    appName: 'Kosmischer Garten',
    tagline: 'Ermutigung und Freundlichkeit aus der ganzen Welt, die zu Blumen erblühen',
    flowersCount: 'Blumen',
    flowersSingular: 'Blume',
    worldMap: 'Weltkarte',
    globalGarden: 'Globaler Garten',
    flowersFromWorld: 'Blumen aus der ganzen Welt',
    noLocationData: 'Keine Standortdaten',
    plantToAdd: 'Pflanze eine Blume, um deinen Standort hinzuzufügen!',
    eachDotRepresents: 'Jeder Punkt repräsentiert gepflanzte Blumen aus dieser Region',
    totalFlowers: 'Gesamt',
    plantFlower: 'Blume Pflanzen',
    shareMoodPlaceholder: 'Teile deine Stimmung oder Ermutigung...',
    yourNamePlaceholder: 'Dein Name (optional)',
    aiChooseFlower: 'KI wählt eine Blume basierend auf deiner Nachricht ✨',
    plantedFlower: 'Du hast eine wunderschöne gepflanzt',
    thankYouPlanting: 'Danke, dass du dem Garten Schönheit hinzufügst',
    emptyGardenTitle: 'Dieser Garten wartet auf seine erste Blume...',
    emptyGardenSubtitle: 'Klicke unten, um deine Ermutigung zu pflanzen',
    saveCard: 'Karte Speichern',
    share: 'Teilen',
    spreadKindness: 'Freundlichkeit verbreiten • Liebe teilen',
    saving: 'Speichern...',
    messageCopied: 'Nachricht in die Zwischenablage kopiert!',
    downloadFailed: 'Karte konnte nicht heruntergeladen werden',
    close: 'Schließen',
    loading: 'Laden...',
    error: 'Fehler',
    anonymous: 'Anonym',
  },
  pt: {
    appName: 'Jardim Cósmico',
    tagline: 'Encorajamento e bondade de todo o mundo, florescendo em flores',
    flowersCount: 'flores',
    flowersSingular: 'flor',
    worldMap: 'Mapa Mundial',
    globalGarden: 'Jardim Global',
    flowersFromWorld: 'flores de todo o mundo',
    noLocationData: 'Sem dados de localização',
    plantToAdd: 'Plante uma flor para adicionar sua localização!',
    eachDotRepresents: 'Cada ponto representa flores plantadas dessa região',
    totalFlowers: 'Total',
    plantFlower: 'Plantar uma Flor',
    shareMoodPlaceholder: 'Compartilhe seu humor ou encorajamento...',
    yourNamePlaceholder: 'Seu nome (opcional)',
    aiChooseFlower: 'A IA escolherá uma flor com base na sua mensagem ✨',
    plantedFlower: 'Você plantou uma linda',
    thankYouPlanting: 'Obrigado por adicionar beleza ao jardim',
    emptyGardenTitle: 'Este jardim está esperando sua primeira flor...',
    emptyGardenSubtitle: 'Clique abaixo para plantar seu encorajamento',
    saveCard: 'Salvar Cartão',
    share: 'Compartilhar',
    spreadKindness: 'Espalhar bondade • Compartilhar amor',
    saving: 'Salvando...',
    messageCopied: 'Mensagem copiada para a área de transferência!',
    downloadFailed: 'Falha ao baixar o cartão',
    close: 'Fechar',
    loading: 'Carregando...',
    error: 'Erro',
    anonymous: 'Anônimo',
  },
  ru: {
    appName: 'Космический Сад',
    tagline: 'Поддержка и доброта со всего мира, расцветающая цветами',
    flowersCount: 'цветов',
    flowersSingular: 'цветок',
    worldMap: 'Карта Мира',
    globalGarden: 'Глобальный Сад',
    flowersFromWorld: 'цветов со всего мира',
    noLocationData: 'Нет данных о местоположении',
    plantToAdd: 'Посадите цветок, чтобы добавить свое местоположение!',
    eachDotRepresents: 'Каждая точка представляет цветы, посаженные в этом регионе',
    totalFlowers: 'Всего',
    plantFlower: 'Посадить Цветок',
    shareMoodPlaceholder: 'Поделитесь своим настроением или поддержкой...',
    yourNamePlaceholder: 'Ваше имя (необязательно)',
    aiChooseFlower: 'ИИ выберет цветок на основе вашего сообщения ✨',
    plantedFlower: 'Вы посадили прекрасный',
    thankYouPlanting: 'Спасибо за добавление красоты в сад',
    emptyGardenTitle: 'Этот сад ждет своего первого цветка...',
    emptyGardenSubtitle: 'Нажмите ниже, чтобы посадить свою поддержку',
    saveCard: 'Сохранить Открытку',
    share: 'Поделиться',
    spreadKindness: 'Распространять доброту • Делиться любовью',
    saving: 'Сохранение...',
    messageCopied: 'Сообщение скопировано в буфер обмена!',
    downloadFailed: 'Не удалось загрузить открытку',
    close: 'Закрыть',
    loading: 'Загрузка...',
    error: 'Ошибка',
    anonymous: 'Аноним',
  },
  ar: {
    appName: 'الحديقة الكونية',
    tagline: 'التشجيع واللطف من جميع أنحاء العالم، يتفتح زهوراً',
    flowersCount: 'زهور',
    flowersSingular: 'زهرة',
    worldMap: 'خريطة العالم',
    globalGarden: 'الحديقة العالمية',
    flowersFromWorld: 'زهور من جميع أنحاء العالم',
    noLocationData: 'لا توجد بيانات موقع',
    plantToAdd: 'ازرع زهرة لإضافة موقعك!',
    eachDotRepresents: 'كل نقطة تمثل الزهور المزروعة من تلك المنطقة',
    totalFlowers: 'المجموع',
    plantFlower: 'ازرع زهرة',
    shareMoodPlaceholder: 'شارك مزاجك أو تشجيعك...',
    yourNamePlaceholder: 'اسمك (اختياري)',
    aiChooseFlower: 'سيختار الذكاء الاصطناعي زهرة بناءً على رسالتك ✨',
    plantedFlower: 'زرعت زهرة جميلة',
    thankYouPlanting: 'شكراً لإضافة الجمال إلى الحديقة',
    emptyGardenTitle: 'هذه الحديقة تنتظر زهرتها الأولى...',
    emptyGardenSubtitle: 'انقر أدناه لزراعة تشجيعك',
    saveCard: 'حفظ البطاقة',
    share: 'مشاركة',
    spreadKindness: 'انشر اللطف • شارك الحب',
    saving: 'جاري الحفظ...',
    messageCopied: 'تم نسخ الرسالة إلى الحافظة!',
    downloadFailed: 'فشل في تحميل البطاقة',
    close: 'إغلاق',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    anonymous: 'مجهول',
  },
};

// Detect browser language
export const detectLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in translations) {
    return browserLang as Language;
  }
  return 'en';
};

// Get translations for a language
export const getTranslations = (lang: Language): Translations => {
  return translations[lang] || translations.en;
};

// Language display names
export const languageNames: Record<Language, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ru: 'Русский',
  ar: 'العربية',
};
