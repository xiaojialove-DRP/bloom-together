// Comprehensive flower database with 100+ flower types from botanical encyclopedias
// Based on RHS Encyclopedia of Plants & Flowers, Encyclopedia Britannica, and global botanical gardens

export interface FlowerInfo {
  id: string;
  name: string;
  nameZh: string; // Chinese name
  family: string;
  symbolism: string;
  colors: string[];
  origin: string;
}

// Visual flower types that can be rendered
export type VisualFlowerType = 'iris' | 'poppy' | 'rose' | 'wildflower' | 'lavender' | 'daisy';

// Extended flower database (100+ species)
export const FLOWER_DATABASE: FlowerInfo[] = [
  // Rose family (Rosaceae)
  { id: 'rose', name: 'Rose', nameZh: '玫瑰', family: 'Rosaceae', symbolism: 'Love, romance', colors: ['red', 'pink', 'white'], origin: 'Asia' },
  { id: 'peony', name: 'Peony', nameZh: '牡丹', family: 'Paeoniaceae', symbolism: 'Prosperity, honor', colors: ['pink', 'red', 'white'], origin: 'China' },
  { id: 'cherry_blossom', name: 'Cherry Blossom', nameZh: '樱花', family: 'Rosaceae', symbolism: 'Renewal, beauty', colors: ['pink', 'white'], origin: 'Japan' },
  { id: 'plum_blossom', name: 'Plum Blossom', nameZh: '梅花', family: 'Rosaceae', symbolism: 'Perseverance, hope', colors: ['pink', 'white', 'red'], origin: 'China' },
  { id: 'apple_blossom', name: 'Apple Blossom', nameZh: '苹果花', family: 'Rosaceae', symbolism: 'New beginnings', colors: ['white', 'pink'], origin: 'Central Asia' },
  { id: 'hawthorn', name: 'Hawthorn', nameZh: '山楂花', family: 'Rosaceae', symbolism: 'Hope, happiness', colors: ['white', 'pink'], origin: 'Europe' },
  
  // Lily family (Liliaceae)
  { id: 'lily', name: 'Lily', nameZh: '百合', family: 'Liliaceae', symbolism: 'Purity, majesty', colors: ['white', 'orange', 'pink'], origin: 'Asia' },
  { id: 'tulip', name: 'Tulip', nameZh: '郁金香', family: 'Liliaceae', symbolism: 'Perfect love', colors: ['red', 'yellow', 'purple'], origin: 'Turkey' },
  { id: 'daylily', name: 'Daylily', nameZh: '萱草', family: 'Liliaceae', symbolism: 'Mother\'s love', colors: ['orange', 'yellow'], origin: 'Asia' },
  { id: 'hyacinth', name: 'Hyacinth', nameZh: '风信子', family: 'Asparagaceae', symbolism: 'Rebirth, sport', colors: ['purple', 'blue', 'pink'], origin: 'Mediterranean' },
  { id: 'fritillaria', name: 'Fritillaria', nameZh: '贝母', family: 'Liliaceae', symbolism: 'Perseverance', colors: ['purple', 'white'], origin: 'Asia' },
  
  // Orchid family (Orchidaceae)
  { id: 'orchid', name: 'Orchid', nameZh: '兰花', family: 'Orchidaceae', symbolism: 'Elegance, refinement', colors: ['purple', 'white', 'pink'], origin: 'Tropical' },
  { id: 'phalaenopsis', name: 'Moth Orchid', nameZh: '蝴蝶兰', family: 'Orchidaceae', symbolism: 'Love, beauty', colors: ['white', 'pink', 'purple'], origin: 'Southeast Asia' },
  { id: 'cymbidium', name: 'Cymbidium', nameZh: '蕙兰', family: 'Orchidaceae', symbolism: 'Nobility, virtue', colors: ['green', 'yellow', 'pink'], origin: 'Asia' },
  { id: 'dendrobium', name: 'Dendrobium', nameZh: '石斛兰', family: 'Orchidaceae', symbolism: 'Friendship', colors: ['purple', 'white', 'yellow'], origin: 'Asia' },
  { id: 'cattleya', name: 'Cattleya', nameZh: '嘉德丽雅兰', family: 'Orchidaceae', symbolism: 'Mature charm', colors: ['purple', 'pink', 'white'], origin: 'South America' },
  
  // Daisy family (Asteraceae)
  { id: 'daisy', name: 'Daisy', nameZh: '雏菊', family: 'Asteraceae', symbolism: 'Innocence, purity', colors: ['white', 'yellow'], origin: 'Europe' },
  { id: 'sunflower', name: 'Sunflower', nameZh: '向日葵', family: 'Asteraceae', symbolism: 'Adoration, loyalty', colors: ['yellow'], origin: 'Americas' },
  { id: 'chrysanthemum', name: 'Chrysanthemum', nameZh: '菊花', family: 'Asteraceae', symbolism: 'Longevity, joy', colors: ['yellow', 'white', 'pink'], origin: 'China' },
  { id: 'gerbera', name: 'Gerbera', nameZh: '非洲菊', family: 'Asteraceae', symbolism: 'Cheerfulness', colors: ['orange', 'pink', 'red'], origin: 'South Africa' },
  { id: 'aster', name: 'Aster', nameZh: '紫菀', family: 'Asteraceae', symbolism: 'Patience, elegance', colors: ['purple', 'blue', 'pink'], origin: 'North America' },
  { id: 'dahlia', name: 'Dahlia', nameZh: '大丽花', family: 'Asteraceae', symbolism: 'Dignity, elegance', colors: ['red', 'orange', 'pink'], origin: 'Mexico' },
  { id: 'zinnia', name: 'Zinnia', nameZh: '百日草', family: 'Asteraceae', symbolism: 'Thoughts of friends', colors: ['red', 'yellow', 'pink'], origin: 'Mexico' },
  { id: 'marigold', name: 'Marigold', nameZh: '万寿菊', family: 'Asteraceae', symbolism: 'Passion, creativity', colors: ['orange', 'yellow'], origin: 'Americas' },
  { id: 'cosmos', name: 'Cosmos', nameZh: '秋英', family: 'Asteraceae', symbolism: 'Order, harmony', colors: ['pink', 'white', 'red'], origin: 'Mexico' },
  { id: 'echinacea', name: 'Echinacea', nameZh: '紫锥菊', family: 'Asteraceae', symbolism: 'Strength, healing', colors: ['purple', 'pink'], origin: 'North America' },
  
  // Iris family (Iridaceae)
  { id: 'iris', name: 'Iris', nameZh: '鸢尾', family: 'Iridaceae', symbolism: 'Wisdom, hope', colors: ['purple', 'blue', 'white'], origin: 'Europe' },
  { id: 'gladiolus', name: 'Gladiolus', nameZh: '唐菖蒲', family: 'Iridaceae', symbolism: 'Strength, honor', colors: ['red', 'pink', 'white'], origin: 'South Africa' },
  { id: 'crocus', name: 'Crocus', nameZh: '番红花', family: 'Iridaceae', symbolism: 'Cheerfulness', colors: ['purple', 'yellow', 'white'], origin: 'Mediterranean' },
  { id: 'freesia', name: 'Freesia', nameZh: '小苍兰', family: 'Iridaceae', symbolism: 'Innocence, trust', colors: ['yellow', 'white', 'pink'], origin: 'South Africa' },
  
  // Mint family (Lamiaceae)
  { id: 'lavender', name: 'Lavender', nameZh: '薰衣草', family: 'Lamiaceae', symbolism: 'Serenity, grace', colors: ['purple', 'blue'], origin: 'Mediterranean' },
  { id: 'salvia', name: 'Salvia', nameZh: '鼠尾草', family: 'Lamiaceae', symbolism: 'Wisdom, longevity', colors: ['blue', 'purple', 'red'], origin: 'Americas' },
  { id: 'rosemary', name: 'Rosemary', nameZh: '迷迭香', family: 'Lamiaceae', symbolism: 'Remembrance', colors: ['blue', 'purple'], origin: 'Mediterranean' },
  
  // Poppy family (Papaveraceae)
  { id: 'poppy', name: 'Poppy', nameZh: '罂粟', family: 'Papaveraceae', symbolism: 'Remembrance, peace', colors: ['red', 'orange', 'white'], origin: 'Europe' },
  { id: 'california_poppy', name: 'California Poppy', nameZh: '花菱草', family: 'Papaveraceae', symbolism: 'Success', colors: ['orange', 'yellow'], origin: 'California' },
  { id: 'bloodroot', name: 'Bloodroot', nameZh: '血根草', family: 'Papaveraceae', symbolism: 'Purity', colors: ['white'], origin: 'North America' },
  
  // Buttercup family (Ranunculaceae)
  { id: 'ranunculus', name: 'Ranunculus', nameZh: '毛茛', family: 'Ranunculaceae', symbolism: 'Radiant charm', colors: ['red', 'pink', 'white'], origin: 'Asia' },
  { id: 'anemone', name: 'Anemone', nameZh: '银莲花', family: 'Ranunculaceae', symbolism: 'Anticipation', colors: ['white', 'pink', 'purple'], origin: 'Mediterranean' },
  { id: 'clematis', name: 'Clematis', nameZh: '铁线莲', family: 'Ranunculaceae', symbolism: 'Mental beauty', colors: ['purple', 'pink', 'white'], origin: 'China' },
  { id: 'delphinium', name: 'Delphinium', nameZh: '飞燕草', family: 'Ranunculaceae', symbolism: 'Open heart', colors: ['blue', 'purple', 'pink'], origin: 'Northern Hemisphere' },
  { id: 'columbine', name: 'Columbine', nameZh: '耧斗菜', family: 'Ranunculaceae', symbolism: 'Courage', colors: ['purple', 'blue', 'red'], origin: 'North America' },
  { id: 'hellebore', name: 'Hellebore', nameZh: '嚏根草', family: 'Ranunculaceae', symbolism: 'Serenity', colors: ['white', 'pink', 'purple'], origin: 'Europe' },
  
  // Carnation family (Caryophyllaceae)
  { id: 'carnation', name: 'Carnation', nameZh: '康乃馨', family: 'Caryophyllaceae', symbolism: 'Love, distinction', colors: ['red', 'pink', 'white'], origin: 'Mediterranean' },
  { id: 'dianthus', name: 'Dianthus', nameZh: '石竹', family: 'Caryophyllaceae', symbolism: 'Divine love', colors: ['pink', 'red', 'white'], origin: 'Europe' },
  { id: 'baby_breath', name: "Baby's Breath", nameZh: '满天星', family: 'Caryophyllaceae', symbolism: 'Everlasting love', colors: ['white', 'pink'], origin: 'Europe' },
  
  // Mallow family (Malvaceae)
  { id: 'hibiscus', name: 'Hibiscus', nameZh: '木槿', family: 'Malvaceae', symbolism: 'Delicate beauty', colors: ['red', 'pink', 'yellow'], origin: 'Asia' },
  { id: 'hollyhock', name: 'Hollyhock', nameZh: '蜀葵', family: 'Malvaceae', symbolism: 'Ambition', colors: ['pink', 'red', 'yellow'], origin: 'Asia' },
  { id: 'cotton_rose', name: 'Cotton Rose', nameZh: '芙蓉', family: 'Malvaceae', symbolism: 'Delicate beauty', colors: ['white', 'pink'], origin: 'China' },
  
  // Water lily family (Nymphaeaceae)
  { id: 'lotus', name: 'Lotus', nameZh: '荷花', family: 'Nelumbonaceae', symbolism: 'Purity, enlightenment', colors: ['pink', 'white'], origin: 'Asia' },
  { id: 'water_lily', name: 'Water Lily', nameZh: '睡莲', family: 'Nymphaeaceae', symbolism: 'Rebirth', colors: ['white', 'pink', 'purple'], origin: 'Worldwide' },
  
  // Magnolia family (Magnoliaceae)
  { id: 'magnolia', name: 'Magnolia', nameZh: '玉兰', family: 'Magnoliaceae', symbolism: 'Nobility, dignity', colors: ['white', 'pink', 'purple'], origin: 'Asia' },
  { id: 'yulan', name: 'Yulan Magnolia', nameZh: '白玉兰', family: 'Magnoliaceae', symbolism: 'Purity', colors: ['white'], origin: 'China' },
  
  // Camellia family (Theaceae)
  { id: 'camellia', name: 'Camellia', nameZh: '山茶', family: 'Theaceae', symbolism: 'Admiration, perfection', colors: ['red', 'pink', 'white'], origin: 'Asia' },
  
  // Primrose family (Primulaceae)
  { id: 'primrose', name: 'Primrose', nameZh: '报春花', family: 'Primulaceae', symbolism: 'Young love', colors: ['yellow', 'pink', 'purple'], origin: 'Europe' },
  { id: 'cyclamen', name: 'Cyclamen', nameZh: '仙客来', family: 'Primulaceae', symbolism: 'Resignation, goodbye', colors: ['pink', 'white', 'red'], origin: 'Mediterranean' },
  
  // Amaryllis family (Amaryllidaceae)
  { id: 'amaryllis', name: 'Amaryllis', nameZh: '朱顶红', family: 'Amaryllidaceae', symbolism: 'Pride, splendor', colors: ['red', 'pink', 'white'], origin: 'South America' },
  { id: 'narcissus', name: 'Narcissus', nameZh: '水仙', family: 'Amaryllidaceae', symbolism: 'Self-love, rebirth', colors: ['white', 'yellow'], origin: 'Mediterranean' },
  { id: 'daffodil', name: 'Daffodil', nameZh: '黄水仙', family: 'Amaryllidaceae', symbolism: 'New beginnings', colors: ['yellow', 'white'], origin: 'Europe' },
  { id: 'snowdrop', name: 'Snowdrop', nameZh: '雪花莲', family: 'Amaryllidaceae', symbolism: 'Hope, consolation', colors: ['white'], origin: 'Europe' },
  { id: 'agapanthus', name: 'Agapanthus', nameZh: '百子莲', family: 'Amaryllidaceae', symbolism: 'Love letters', colors: ['blue', 'purple', 'white'], origin: 'South Africa' },
  
  // Nightshade family (Solanaceae)
  { id: 'petunia', name: 'Petunia', nameZh: '矮牵牛', family: 'Solanaceae', symbolism: 'Resentment, anger', colors: ['purple', 'pink', 'white'], origin: 'South America' },
  { id: 'nicotiana', name: 'Flowering Tobacco', nameZh: '烟草花', family: 'Solanaceae', symbolism: 'Awareness', colors: ['white', 'pink', 'red'], origin: 'South America' },
  
  // Bindweed family (Convolvulaceae)
  { id: 'morning_glory', name: 'Morning Glory', nameZh: '牵牛花', family: 'Convolvulaceae', symbolism: 'Affection, love', colors: ['blue', 'purple', 'pink'], origin: 'Americas' },
  { id: 'moonflower', name: 'Moonflower', nameZh: '月光花', family: 'Convolvulaceae', symbolism: 'Dreaming', colors: ['white'], origin: 'Americas' },
  
  // Bellflower family (Campanulaceae)
  { id: 'bellflower', name: 'Bellflower', nameZh: '风铃草', family: 'Campanulaceae', symbolism: 'Gratitude, constancy', colors: ['blue', 'purple', 'white'], origin: 'Northern Hemisphere' },
  { id: 'lobelia', name: 'Lobelia', nameZh: '山梗菜', family: 'Campanulaceae', symbolism: 'Malevolence', colors: ['blue', 'purple'], origin: 'Americas' },
  
  // Honeysuckle family (Caprifoliaceae)
  { id: 'honeysuckle', name: 'Honeysuckle', nameZh: '金银花', family: 'Caprifoliaceae', symbolism: 'Devoted love', colors: ['white', 'yellow', 'pink'], origin: 'Asia' },
  { id: 'scabiosa', name: 'Scabiosa', nameZh: '山萝卜', family: 'Caprifoliaceae', symbolism: 'Unfortunate love', colors: ['blue', 'purple', 'pink'], origin: 'Europe' },
  
  // Jasmine family (Oleaceae)
  { id: 'jasmine', name: 'Jasmine', nameZh: '茉莉', family: 'Oleaceae', symbolism: 'Grace, elegance', colors: ['white', 'yellow'], origin: 'Asia' },
  { id: 'lilac', name: 'Lilac', nameZh: '丁香', family: 'Oleaceae', symbolism: 'First love', colors: ['purple', 'white', 'pink'], origin: 'Europe' },
  { id: 'osmanthus', name: 'Osmanthus', nameZh: '桂花', family: 'Oleaceae', symbolism: 'Love, romance', colors: ['yellow', 'orange', 'white'], origin: 'China' },
  
  // Hydrangea family (Hydrangeaceae)
  { id: 'hydrangea', name: 'Hydrangea', nameZh: '绣球', family: 'Hydrangeaceae', symbolism: 'Gratitude, grace', colors: ['blue', 'pink', 'white'], origin: 'Asia' },
  
  // Verbena family (Verbenaceae)
  { id: 'verbena', name: 'Verbena', nameZh: '马鞭草', family: 'Verbenaceae', symbolism: 'Enchantment', colors: ['purple', 'pink', 'white'], origin: 'Americas' },
  { id: 'lantana', name: 'Lantana', nameZh: '马缨丹', family: 'Verbenaceae', symbolism: 'Rigor, severity', colors: ['orange', 'yellow', 'pink'], origin: 'Americas' },
  
  // Geranium family (Geraniaceae)
  { id: 'geranium', name: 'Geranium', nameZh: '天竺葵', family: 'Geraniaceae', symbolism: 'Comfort, friendship', colors: ['pink', 'red', 'white'], origin: 'South Africa' },
  
  // Snapdragon family (Plantaginaceae)
  { id: 'snapdragon', name: 'Snapdragon', nameZh: '金鱼草', family: 'Plantaginaceae', symbolism: 'Graciousness', colors: ['pink', 'red', 'yellow'], origin: 'Mediterranean' },
  { id: 'foxglove', name: 'Foxglove', nameZh: '毛地黄', family: 'Plantaginaceae', symbolism: 'Insincerity', colors: ['purple', 'pink', 'white'], origin: 'Europe' },
  { id: 'penstemon', name: 'Penstemon', nameZh: '钓钟柳', family: 'Plantaginaceae', symbolism: 'You are protected', colors: ['purple', 'pink', 'red'], origin: 'North America' },
  
  // Balsam family (Balsaminaceae)
  { id: 'impatiens', name: 'Impatiens', nameZh: '凤仙花', family: 'Balsaminaceae', symbolism: 'Motherly love', colors: ['pink', 'red', 'white'], origin: 'Africa' },
  
  // Begonia family (Begoniaceae)
  { id: 'begonia', name: 'Begonia', nameZh: '秋海棠', family: 'Begoniaceae', symbolism: 'Caution, beware', colors: ['pink', 'red', 'white'], origin: 'South America' },
  
  // Passion flower family (Passifloraceae)
  { id: 'passion_flower', name: 'Passion Flower', nameZh: '西番莲', family: 'Passifloraceae', symbolism: 'Faith, spirituality', colors: ['purple', 'white', 'blue'], origin: 'Americas' },
  
  // Violet family (Violaceae)
  { id: 'violet', name: 'Violet', nameZh: '紫罗兰', family: 'Violaceae', symbolism: 'Modesty, faithfulness', colors: ['purple', 'blue', 'white'], origin: 'Northern Hemisphere' },
  { id: 'pansy', name: 'Pansy', nameZh: '三色堇', family: 'Violaceae', symbolism: 'Loving thoughts', colors: ['purple', 'yellow', 'blue'], origin: 'Europe' },
  
  // Mustard family (Brassicaceae)
  { id: 'stock', name: 'Stock', nameZh: '紫罗兰', family: 'Brassicaceae', symbolism: 'Lasting beauty', colors: ['purple', 'pink', 'white'], origin: 'Mediterranean' },
  { id: 'sweet_alyssum', name: 'Sweet Alyssum', nameZh: '香雪球', family: 'Brassicaceae', symbolism: 'Worth beyond beauty', colors: ['white', 'purple', 'pink'], origin: 'Mediterranean' },
  
  // Pea family (Fabaceae)
  { id: 'sweet_pea', name: 'Sweet Pea', nameZh: '香豌豆', family: 'Fabaceae', symbolism: 'Delicate pleasures', colors: ['pink', 'purple', 'white'], origin: 'Mediterranean' },
  { id: 'wisteria', name: 'Wisteria', nameZh: '紫藤', family: 'Fabaceae', symbolism: 'Welcome, devotion', colors: ['purple', 'blue', 'white'], origin: 'Asia' },
  { id: 'lupine', name: 'Lupine', nameZh: '羽扇豆', family: 'Fabaceae', symbolism: 'Imagination', colors: ['purple', 'blue', 'pink'], origin: 'Americas' },
  { id: 'acacia', name: 'Acacia', nameZh: '金合欢', family: 'Fabaceae', symbolism: 'Friendship, secret love', colors: ['yellow', 'white'], origin: 'Australia' },
  
  // Saxifrage family (Saxifragaceae)
  { id: 'astilbe', name: 'Astilbe', nameZh: '落新妇', family: 'Saxifragaceae', symbolism: 'I will still be waiting', colors: ['pink', 'white', 'red'], origin: 'Asia' },
  { id: 'heuchera', name: 'Coral Bells', nameZh: '矾根', family: 'Saxifragaceae', symbolism: 'Challenge', colors: ['pink', 'red', 'white'], origin: 'North America' },
  
  // Bougainvillea family (Nyctaginaceae)
  { id: 'bougainvillea', name: 'Bougainvillea', nameZh: '三角梅', family: 'Nyctaginaceae', symbolism: 'Passion, enthusiasm', colors: ['pink', 'purple', 'orange'], origin: 'South America' },
  
  // Gardenia family (Rubiaceae)
  { id: 'gardenia', name: 'Gardenia', nameZh: '栀子花', family: 'Rubiaceae', symbolism: 'Purity, sweet love', colors: ['white'], origin: 'Asia' },
  { id: 'ixora', name: 'Ixora', nameZh: '龙船花', family: 'Rubiaceae', symbolism: 'Passion', colors: ['red', 'orange', 'yellow'], origin: 'Asia' },
  
  // Plumbago family (Plumbaginaceae)
  { id: 'statice', name: 'Statice', nameZh: '补血草', family: 'Plumbaginaceae', symbolism: 'Remembrance', colors: ['purple', 'blue', 'pink'], origin: 'Mediterranean' },
  
  // Protea family (Proteaceae)
  { id: 'protea', name: 'Protea', nameZh: '帝王花', family: 'Proteaceae', symbolism: 'Transformation, courage', colors: ['pink', 'red', 'white'], origin: 'South Africa' },
  { id: 'banksia', name: 'Banksia', nameZh: '班克木', family: 'Proteaceae', symbolism: 'Resilience', colors: ['yellow', 'orange', 'red'], origin: 'Australia' },
  
  // Bird of Paradise family (Strelitziaceae)
  { id: 'bird_of_paradise', name: 'Bird of Paradise', nameZh: '天堂鸟', family: 'Strelitziaceae', symbolism: 'Freedom, joyfulness', colors: ['orange', 'blue'], origin: 'South Africa' },
  
  // Ginger family (Zingiberaceae)
  { id: 'ginger_lily', name: 'Ginger Lily', nameZh: '姜花', family: 'Zingiberaceae', symbolism: 'Wealth, prosperity', colors: ['white', 'yellow', 'orange'], origin: 'Asia' },
  { id: 'turmeric_flower', name: 'Turmeric Flower', nameZh: '姜黄花', family: 'Zingiberaceae', symbolism: 'Good fortune', colors: ['white', 'pink'], origin: 'South Asia' },
  
  // Wildflowers and others
  { id: 'wildflower', name: 'Wildflower', nameZh: '野花', family: 'Various', symbolism: 'Freedom, spontaneity', colors: ['various'], origin: 'Worldwide' },
  { id: 'thistle', name: 'Thistle', nameZh: '蓟', family: 'Asteraceae', symbolism: 'Devotion, protection', colors: ['purple', 'pink'], origin: 'Europe' },
  { id: 'clover', name: 'Clover', nameZh: '三叶草', family: 'Fabaceae', symbolism: 'Good luck', colors: ['white', 'pink', 'red'], origin: 'Europe' },
  { id: 'buttercup', name: 'Buttercup', nameZh: '毛茛', family: 'Ranunculaceae', symbolism: 'Childishness, humility', colors: ['yellow'], origin: 'Northern Hemisphere' },
  { id: 'forget_me_not', name: 'Forget-me-not', nameZh: '勿忘我', family: 'Boraginaceae', symbolism: 'True love, memories', colors: ['blue', 'pink'], origin: 'Europe' },
  { id: 'cornflower', name: 'Cornflower', nameZh: '矢车菊', family: 'Asteraceae', symbolism: 'Delicacy', colors: ['blue', 'pink', 'white'], origin: 'Europe' },
  { id: 'bluebell', name: 'Bluebell', nameZh: '蓝铃花', family: 'Asparagaceae', symbolism: 'Humility, constancy', colors: ['blue', 'purple'], origin: 'Europe' },
  { id: 'heather', name: 'Heather', nameZh: '石楠', family: 'Ericaceae', symbolism: 'Admiration, solitude', colors: ['purple', 'pink', 'white'], origin: 'Europe' },
  { id: 'azalea', name: 'Azalea', nameZh: '杜鹃', family: 'Ericaceae', symbolism: 'Temperance, passion', colors: ['pink', 'red', 'white'], origin: 'Asia' },
  { id: 'rhododendron', name: 'Rhododendron', nameZh: '杜鹃花', family: 'Ericaceae', symbolism: 'Caution, danger', colors: ['pink', 'purple', 'red'], origin: 'Asia' },
];

// All flower type IDs that the AI can generate
export const ALL_FLOWER_TYPES = FLOWER_DATABASE.map(f => f.id);

// Map any flower type to a visual rendering type
export const mapToVisualType = (flowerType: string): VisualFlowerType => {
  // Direct matches
  const directMatches: VisualFlowerType[] = ['iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy'];
  if (directMatches.includes(flowerType as VisualFlowerType)) {
    return flowerType as VisualFlowerType;
  }

  // Mapping based on appearance/family
  const mappings: Record<string, VisualFlowerType> = {
    // Rose-like flowers
    peony: 'rose', cherry_blossom: 'rose', plum_blossom: 'rose', apple_blossom: 'rose',
    camellia: 'rose', carnation: 'rose', dianthus: 'rose', ranunculus: 'rose',
    tulip: 'rose', magnolia: 'rose', yulan: 'rose', begonia: 'rose', gardenia: 'rose',
    
    // Daisy-like flowers (composite)
    sunflower: 'daisy', chrysanthemum: 'daisy', gerbera: 'daisy', aster: 'daisy',
    dahlia: 'daisy', zinnia: 'daisy', marigold: 'daisy', cosmos: 'daisy',
    echinacea: 'daisy', thistle: 'daisy', cornflower: 'daisy',
    
    // Iris-like flowers (elegant, tall)
    orchid: 'iris', phalaenopsis: 'iris', cymbidium: 'iris', dendrobium: 'iris',
    cattleya: 'iris', lily: 'iris', gladiolus: 'iris', freesia: 'iris',
    amaryllis: 'iris', agapanthus: 'iris', bird_of_paradise: 'iris', lotus: 'iris',
    water_lily: 'iris', hyacinth: 'iris', fritillaria: 'iris', daylily: 'iris',
    
    // Poppy-like flowers (bold, simple petals)
    hibiscus: 'poppy', hollyhock: 'poppy', anemone: 'poppy', california_poppy: 'poppy',
    passion_flower: 'poppy', protea: 'poppy', cotton_rose: 'poppy', bloodroot: 'poppy',
    
    // Lavender-like flowers (spiky, clustered)
    salvia: 'lavender', rosemary: 'lavender', delphinium: 'lavender', foxglove: 'lavender',
    snapdragon: 'lavender', lilac: 'lavender', wisteria: 'lavender', lupine: 'lavender',
    hydrangea: 'lavender', verbena: 'lavender', heather: 'lavender', statice: 'lavender',
    bellflower: 'lavender', lobelia: 'lavender', astilbe: 'lavender', penstemon: 'lavender',
    
    // Wildflower-like (varied, casual)
    primrose: 'wildflower', cyclamen: 'wildflower', violet: 'wildflower', pansy: 'wildflower',
    impatiens: 'wildflower', petunia: 'wildflower', morning_glory: 'wildflower',
    honeysuckle: 'wildflower', jasmine: 'wildflower', osmanthus: 'wildflower',
    geranium: 'wildflower', lantana: 'wildflower', bougainvillea: 'wildflower',
    sweet_pea: 'wildflower', clover: 'wildflower', buttercup: 'wildflower',
    forget_me_not: 'wildflower', bluebell: 'wildflower', crocus: 'wildflower',
    narcissus: 'wildflower', daffodil: 'wildflower', snowdrop: 'wildflower',
    baby_breath: 'wildflower', stock: 'wildflower', sweet_alyssum: 'wildflower',
    acacia: 'wildflower', hawthorn: 'wildflower', nicotiana: 'wildflower',
    moonflower: 'wildflower', scabiosa: 'wildflower', heuchera: 'wildflower',
    ixora: 'wildflower', banksia: 'wildflower', ginger_lily: 'wildflower',
    turmeric_flower: 'wildflower', azalea: 'wildflower', rhododendron: 'wildflower',
    columbine: 'wildflower', hellebore: 'wildflower', clematis: 'wildflower',
  };

  return mappings[flowerType] || 'wildflower';
};

// Get flower info by ID
export const getFlowerInfo = (id: string): FlowerInfo | undefined => {
  return FLOWER_DATABASE.find(f => f.id === id);
};

// Get emoji for a flower type
export const getFlowerEmoji = (type: string): string => {
  const emojiMap: Record<string, string> = {
    rose: '🌹', cherry_blossom: '🌸', tulip: '🌷', sunflower: '🌻',
    hibiscus: '🌺', lotus: '🪷', daisy: '🌼', iris: '🪻',
    lavender: '💜', poppy: '🌺', wildflower: '🌸', orchid: '🪻',
    lily: '🪷', carnation: '🌸', chrysanthemum: '🌼', peony: '🌸',
  };
  return emojiMap[type] || '🌸';
};
