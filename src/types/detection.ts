import { FaceShape } from './hairstyle';

export interface FaceMeasurements {
  faceLength: number;
  faceWidth: number;
  jawWidth: number;
  foreheadWidth: number;
  jawAngle: number;
}

export interface DetectionResult {
  faceShape: FaceShape;
  confidence: number;
  measurements: FaceMeasurements;
  secondaryShape?: FaceShape;
}

export interface DetectionState {
  status: 'idle' | 'loading' | 'detecting' | 'success' | 'error';
  result: DetectionResult | null;
  error: string | null;
  imageUrl: string | null;
}
