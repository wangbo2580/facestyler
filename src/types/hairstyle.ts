export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'oblong' | 'diamond';

export type Gender = 'female' | 'male';

export type Ethnicity = 'asian' | 'caucasian' | 'african' | 'hispanic' | 'mixed' | 'all';

export type HairstyleStyle = 'casual' | 'formal' | 'trendy' | 'classic';

export type HairstyleLength = 'short' | 'medium' | 'long';

export interface Hairstyle {
  id: string;
  name: string;
  faceShapes: FaceShape[];
  gender: Gender;
  ethnicity?: Ethnicity[];  // 适合的民族特征
  style: HairstyleStyle;
  length: HairstyleLength;
  image: string;
  description: string;
  tips: string[];
  suitableFor?: string[];
  maintenanceLevel?: 'low' | 'medium' | 'high';
}

export interface HairstyleData {
  faceShape: FaceShape;
  gender: Gender;
  hairstyles: Hairstyle[];
}

export interface FaceShapeInfo {
  id: FaceShape;
  name: string;
  description: string;
  characteristics: string[];
  celebrities: string[];
  tips: string[];
}
