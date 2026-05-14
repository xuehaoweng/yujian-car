import type { Car, FuelType, Transmission } from '../types/car';

const BRANDS: Record<string, string[]> = {
  丰田: [
    '卡罗拉',
    '凯美瑞',
    'RAV4荣放',
    '汉兰达',
    '亚洲龙',
    '威兰达',
    '雷凌',
    '普拉多',
  ],
  大众: ['朗逸', '帕萨特', '途观L', '迈腾', '速腾', '探岳', '高尔夫', '途昂'],
  本田: ['思域', '雅阁', 'CR-V', '皓影', '飞度', '冠道', '缤智', '奥德赛'],
  宝马: ['3系', '5系', 'X3', 'X5', 'X1', '7系', '4系', 'i3'],
  奔驰: ['C级', 'E级', 'GLC', 'GLE', 'A级', 'S级', 'GLA', 'EQB'],
  奥迪: ['A4L', 'A6L', 'Q5L', 'Q3', 'Q7', 'A3', 'Q8', 'e-tron'],
  比亚迪: [
    '秦PLUS',
    '汉',
    '宋PLUS',
    '唐',
    '海豚',
    '海豹',
    '元PLUS',
    '驱逐舰05',
  ],
  日产: ['轩逸', '天籁', '逍客', '奇骏', '途达', '劲客', '楼兰', '骐达'],
  吉利: ['博越', '星瑞', '帝豪', '缤越', '星越L', '豪越', '嘉际', '几何A'],
  长安: [
    'CS75 PLUS',
    '逸动',
    'UNI-V',
    'CS55 PLUS',
    '深蓝SL03',
    'UNI-K',
    '欧尚X5',
    '糯玉米',
  ],
  特斯拉: ['Model 3', 'Model Y', 'Model S', 'Model X'],
  蔚来: ['ET5', 'ET7', 'ES6', 'ES8', 'EC6', 'EC7'],
  小鹏: ['P7', 'P5', 'G6', 'G9', 'X9'],
  理想: ['L7', 'L8', 'L9', 'ONE'],
  领克: ['03', '05', '01', '09', '06', '02'],
  哈弗: ['H6', '大狗', '神兽', '赤兔', '初恋', 'H9', '猛龙'],
  别克: ['英朗', '君威', '昂科威', 'GL8', '威朗', '昂科旗', '微蓝6'],
  奇瑞: ['瑞虎8', '艾瑞泽8', '瑞虎7', '捷途X70', '星途揽月', '欧萌达'],
  马自达: ['马自达3', '马自达6', 'CX-5', 'CX-4', 'CX-30', '阿特兹'],
  现代: ['伊兰特', '索纳塔', '途胜', 'ix35', '库斯途', '胜达', '菲斯塔'],
  起亚: ['K3', 'K5', '狮铂拓界', '智跑', '嘉华', '赛图斯', '奕跑'],
  福特: ['蒙迪欧', '锐界', '探险者', '福克斯', '领裕', '锐际', '电马'],
  雪佛兰: ['科鲁泽', '迈锐宝XL', '探界者', '开拓者', '创酷', '星迈罗'],
  沃尔沃: ['XC60', 'S90', 'XC90', 'S60', 'XC40', 'V60', 'C40'],
  凯迪拉克: ['CT5', 'XT5', 'XT6', 'CT6', 'XT4', 'LYRIQ锐歌'],
  雷克萨斯: ['ES', 'RX', 'NX', 'UX', 'LS', 'LX', 'RZ'],
  保时捷: ['Cayenne', 'Macan', 'Panamera', '718', '911', 'Taycan'],
  路虎: ['揽胜', '揽胜极光', '发现运动版', '卫士', '揽胜运动版'],
  捷豹: ['XEL', 'XFL', 'E-PACE', 'F-PACE', 'I-PACE'],
  林肯: ['冒险家', '航海家', '飞行家', '领航员', '林肯Z'],
  红旗: ['H5', 'H9', 'HS5', 'E-HS9', 'H6', 'HS7', 'HQ9'],
  坦克: ['300', '500', '400', '700', '800'],
  广汽传祺: ['M8', 'GS8', '影豹', 'M6', '影酷', 'GS4', 'GA6'],
  五菱: ['宏光MINIEV', '缤果', '星辰', '佳辰', '星驰', '凯捷', 'Air ev'],
};

const FUEL_TYPES: FuelType[] = [
  '汽油',
  '柴油',
  '纯电动',
  '插电混动',
  '油电混动',
];
const TRANSMISSIONS: Transmission[] = ['手动', '自动', 'CVT', '双离合'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function clamp(val: number, min: number, max: number): number {
  return Math.round((min + val * (max - min)) * 10) / 10;
}

export function generateCars(seed = 42): Car[] {
  const rand = seededRandom(seed);
  const brands = Object.keys(BRANDS);
  const cars: Car[] = [];
  let id = 1;

  for (const brand of brands) {
    const models = BRANDS[brand];
    for (const model of models) {
      const variants = Math.floor(rand() * 3) + 1;
      for (let v = 0; v < variants; v++) {
        const fuelType = pick(FUEL_TYPES, rand);
        const vehicleType =
          model.includes('V') ||
          model.includes('S') ||
          model === 'X5' ||
          model === 'X3' ||
          model === 'X1' ||
          model === 'Q5L' ||
          model === 'Q3' ||
          model === 'GLC' ||
          model === 'GLE' ||
          model === 'GLA' ||
          model === 'RAV4' ||
          model === 'CR-V' ||
          model === '皓影' ||
          model === '汉兰达' ||
          model === '途观L' ||
          model === '探岳' ||
          model === '冠道' ||
          model === '途昂' ||
          model === '博越' ||
          model === 'CS75' ||
          model === '哈弗' ||
          model === 'XC60' ||
          model === 'XC90' ||
          model === 'XC40' ||
          model === 'XT5' ||
          model === 'XT6' ||
          model === 'XT4' ||
          model === 'RX' ||
          model === 'NX' ||
          model === 'Cayenne' ||
          model === 'Macan' ||
          model === '揽胜' ||
          model === '卫士' ||
          model === '冒险家' ||
          model === '航海家' ||
          model === '飞行家' ||
          model === 'HS5' ||
          model === 'HS7' ||
          model === 'GS8' ||
          model === '坦克' ||
          model === '大狗' ||
          model === '神兽' ||
          model === '瑞虎8' ||
          model === '瑞虎7' ||
          model === '逍客' ||
          model === '奇骏' ||
          model === '途达' ||
          model === '楼兰' ||
          model === '锐界' ||
          model === '探险者' ||
          model === '探界者' ||
          model === '开拓者' ||
          model === 'CX-5' ||
          model === 'CX-4' ||
          model === 'CX-30' ||
          model === 'UNI-K' ||
          model === '星越L' ||
          model === '豪越'
            ? 'SUV'
            : model.includes('MPV') ||
                model === '奥德赛' ||
                model === 'GL8' ||
                model === 'M8' ||
                model === 'M6' ||
                model === '嘉际' ||
                model === '库斯途' ||
                model === '嘉华' ||
                model === '凯捷' ||
                model === 'HQ9' ||
                model === 'X9' ||
                model === '佳辰'
              ? 'MPV'
              : model.includes('皮卡') || model === '猛龙'
                ? '皮卡'
                : model === '911' ||
                    model === '718' ||
                    model === '4系' ||
                    model === '影豹' ||
                    brand === '保时捷'
                  ? '跑车'
                  : '轿车';

        const price =
          brand === '保时捷' ||
          brand === '路虎' ||
          brand === '捷豹' ||
          brand === '雷克萨斯'
            ? clamp(rand(), 40, 200)
            : brand === '宝马' ||
                brand === '奔驰' ||
                brand === '奥迪' ||
                brand === '沃尔沃' ||
                brand === '凯迪拉克' ||
                brand === '林肯' ||
                brand === '红旗'
              ? clamp(rand(), 20, 80)
              : brand === '特斯拉' ||
                  brand === '蔚来' ||
                  brand === '理想' ||
                  brand === '小鹏'
                ? clamp(rand(), 15, 55)
                : clamp(rand(), 5, 40);

        const displacement =
          fuelType === '纯电动'
            ? 0
            : clamp(rand(), 1.0, fuelType === '柴油' ? 4.0 : 4.0);

        const year = Math.floor(rand() * 11) + 2015;

        cars.push({
          id: `car-${String(id).padStart(4, '0')}`,
          brand,
          model,
          year,
          price: Math.round(price * 10) / 10,
          vehicleType,
          fuelType,
          displacement,
          horsepower: Math.floor(
            clamp(rand(), 70, fuelType === '纯电动' ? 600 : 450),
          ),
          transmission: pick(TRANSMISSIONS, rand),
          imageUrl: `https://picsum.photos/seed/car${id}/400/300`,
          description: `${year}款 ${brand} ${model}，${fuelType}动力，${vehicleType}车型`,
        });
        id++;
      }
    }
  }

  return cars;
}

export const mockCars: Car[] = generateCars(42);
