import { FaceShape, Gender, Hairstyle, HairstyleData, Ethnicity } from '@/types/hairstyle';

// Import all hairstyle data - Female
import femaleOval from '@/data/hairstyles/female/oval.json';
import femaleRound from '@/data/hairstyles/female/round.json';
import femaleSquare from '@/data/hairstyles/female/square.json';
import femaleHeart from '@/data/hairstyles/female/heart.json';
import femaleOblong from '@/data/hairstyles/female/oblong.json';
import femaleDiamond from '@/data/hairstyles/female/diamond.json';

// Import all hairstyle data - Male
import maleOval from '@/data/hairstyles/male/oval.json';
import maleRound from '@/data/hairstyles/male/round.json';
import maleSquare from '@/data/hairstyles/male/square.json';
import maleHeart from '@/data/hairstyles/male/heart.json';
import maleOblong from '@/data/hairstyles/male/oblong.json';
import maleDiamond from '@/data/hairstyles/male/diamond.json';

// Type assertion for JSON imports
const hairstyleData: Record<Gender, Record<FaceShape, HairstyleData>> = {
  female: {
    oval: femaleOval as HairstyleData,
    round: femaleRound as HairstyleData,
    square: femaleSquare as HairstyleData,
    heart: femaleHeart as HairstyleData,
    oblong: femaleOblong as HairstyleData,
    diamond: femaleDiamond as HairstyleData,
  },
  male: {
    oval: maleOval as HairstyleData,
    round: maleRound as HairstyleData,
    square: maleSquare as HairstyleData,
    heart: maleHeart as HairstyleData,
    oblong: maleOblong as HairstyleData,
    diamond: maleDiamond as HairstyleData,
  },
};

export function getHairstylesForFaceShape(
  faceShape: FaceShape,
  gender: Gender = 'female',
  ethnicity?: Ethnicity
): Hairstyle[] {
  const hairstyles = hairstyleData[gender][faceShape]?.hairstyles || [];

  // 如果没有指定ethnicity或选择'all'，返回所有发型
  if (!ethnicity || ethnicity === 'all') {
    return hairstyles;
  }

  // 过滤适合该民族特征的发型
  return hairstyles.filter(hairstyle => {
    // 如果发型没有指定ethnicity，默认显示（向后兼容）
    if (!hairstyle.ethnicity || hairstyle.ethnicity.length === 0) {
      return true;
    }
    // 如果发型标记为'all'或包含指定的ethnicity，则显示
    return hairstyle.ethnicity.includes('all') || hairstyle.ethnicity.includes(ethnicity);
  });
}

export function getAllHairstyles(gender: Gender = 'female'): Hairstyle[] {
  const allHairstyles: Hairstyle[] = [];
  const faceShapes: FaceShape[] = ['oval', 'round', 'square', 'heart', 'oblong', 'diamond'];

  for (const shape of faceShapes) {
    const data = hairstyleData[gender][shape];
    if (data?.hairstyles) {
      allHairstyles.push(...data.hairstyles);
    }
  }

  return allHairstyles;
}

export function getHairstyleById(id: string): Hairstyle | undefined {
  const allHairstyles = getAllHairstyles('female');
  return allHairstyles.find(h => h.id === id);
}

export { hairstyleData };
