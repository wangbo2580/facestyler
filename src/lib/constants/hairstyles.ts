import { FaceShape, Gender, Hairstyle, HairstyleData } from '@/types/hairstyle';

// Import all hairstyle data
import femaleOval from '@/data/hairstyles/female/oval.json';
import femaleRound from '@/data/hairstyles/female/round.json';
import femaleSquare from '@/data/hairstyles/female/square.json';
import femaleHeart from '@/data/hairstyles/female/heart.json';
import femaleOblong from '@/data/hairstyles/female/oblong.json';
import femaleDiamond from '@/data/hairstyles/female/diamond.json';

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
    // Placeholder - will use female data for now
    oval: femaleOval as HairstyleData,
    round: femaleRound as HairstyleData,
    square: femaleSquare as HairstyleData,
    heart: femaleHeart as HairstyleData,
    oblong: femaleOblong as HairstyleData,
    diamond: femaleDiamond as HairstyleData,
  },
};

export function getHairstylesForFaceShape(
  faceShape: FaceShape,
  gender: Gender = 'female'
): Hairstyle[] {
  return hairstyleData[gender][faceShape]?.hairstyles || [];
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
