import { FaceShape } from './hairstyle';

export interface FaceMeasurements {
  faceLength: number;
  faceWidth: number;
  jawWidth: number;
  foreheadWidth: number;
  jawAngle: number;
}

export interface FaceAnalysis {
  lengthWidthRatio: number;
  jawRatio: number;
  foreheadRatio: number;
  jawAngle: number;
  characteristics: string[];  // 脸型特征描述
  confidenceExplanation: string;  // 置信度解释
}

export interface DetectionResult {
  faceShape: FaceShape;
  confidence: number;
  measurements: FaceMeasurements;
  secondaryShape?: FaceShape;
  analysis?: FaceAnalysis;  // 详细分析
}

export interface DetectionState {
  status: 'idle' | 'loading' | 'detecting' | 'success' | 'error';
  result: DetectionResult | null;
  error: string | null;
  imageUrl: string | null;
}
