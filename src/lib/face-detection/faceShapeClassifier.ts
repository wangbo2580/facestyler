import { FaceShape } from '@/types/hairstyle';
import { FaceMeasurements, DetectionResult } from '@/types/detection';

// MediaPipe Face Mesh landmark indices for face shape calculation
const LANDMARKS = {
  // Forehead
  FOREHEAD_TOP: 10,
  FOREHEAD_LEFT: 109,
  FOREHEAD_RIGHT: 338,

  // Cheekbones
  LEFT_CHEEK: 234,
  RIGHT_CHEEK: 454,

  // Jaw
  JAW_LEFT: 172,
  JAW_RIGHT: 397,
  CHIN: 152,

  // Additional jaw points for angle calculation
  JAW_LEFT_UPPER: 132,
  JAW_RIGHT_UPPER: 361,
};

interface Point {
  x: number;
  y: number;
  z?: number;
}

function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calculateAngle(p1: Point, vertex: Point, p2: Point): number {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

  const cosAngle = dot / (mag1 * mag2);
  const angle = Math.acos(Math.min(Math.max(cosAngle, -1), 1));

  return angle * (180 / Math.PI);
}

export function extractMeasurements(landmarks: Point[]): FaceMeasurements {
  // Get key points
  const foreheadTop = landmarks[LANDMARKS.FOREHEAD_TOP];
  const foreheadLeft = landmarks[LANDMARKS.FOREHEAD_LEFT];
  const foreheadRight = landmarks[LANDMARKS.FOREHEAD_RIGHT];
  const leftCheek = landmarks[LANDMARKS.LEFT_CHEEK];
  const rightCheek = landmarks[LANDMARKS.RIGHT_CHEEK];
  const jawLeft = landmarks[LANDMARKS.JAW_LEFT];
  const jawRight = landmarks[LANDMARKS.JAW_RIGHT];
  const chin = landmarks[LANDMARKS.CHIN];
  const jawLeftUpper = landmarks[LANDMARKS.JAW_LEFT_UPPER];
  const jawRightUpper = landmarks[LANDMARKS.JAW_RIGHT_UPPER];

  // Calculate measurements
  const faceLength = distance(foreheadTop, chin);
  const faceWidth = distance(leftCheek, rightCheek);
  const jawWidth = distance(jawLeft, jawRight);
  const foreheadWidth = distance(foreheadLeft, foreheadRight);

  // Calculate jaw angle (average of both sides)
  const leftJawAngle = calculateAngle(jawLeftUpper, jawLeft, chin);
  const rightJawAngle = calculateAngle(jawRightUpper, jawRight, chin);
  const jawAngle = (leftJawAngle + rightJawAngle) / 2;

  return {
    faceLength,
    faceWidth,
    jawWidth,
    foreheadWidth,
    jawAngle,
  };
}

export function classifyFaceShape(measurements: FaceMeasurements): DetectionResult {
  const { faceLength, faceWidth, jawWidth, foreheadWidth, jawAngle } = measurements;

  const lengthWidthRatio = faceLength / faceWidth;
  const jawRatio = jawWidth / faceWidth;
  const foreheadRatio = foreheadWidth / faceWidth;

  let faceShape: FaceShape;
  let confidence: number;
  let secondaryShape: FaceShape | undefined;

  // Classification rules based on facial proportions
  if (lengthWidthRatio > 1.5) {
    // Long face (Oblong)
    faceShape = 'oblong';
    confidence = Math.min(0.7 + (lengthWidthRatio - 1.5) * 0.3, 0.95);
    if (jawAngle < 115) {
      secondaryShape = 'square';
    }
  } else if (lengthWidthRatio >= 1.3 && lengthWidthRatio <= 1.5) {
    // Could be Oval or Diamond
    if (faceWidth > foreheadWidth * 1.1 && faceWidth > jawWidth * 1.1) {
      // Cheekbones wider than both forehead and jaw
      faceShape = 'diamond';
      confidence = 0.80;
      secondaryShape = 'oval';
    } else if (jawRatio >= 0.7 && jawRatio <= 0.85 && foreheadRatio >= 0.85) {
      // Balanced proportions - Oval
      faceShape = 'oval';
      confidence = 0.85;
    } else if (foreheadRatio > jawRatio + 0.1) {
      // Forehead wider than jaw - Heart
      faceShape = 'heart';
      confidence = 0.80;
      secondaryShape = 'oval';
    } else {
      faceShape = 'oval';
      confidence = 0.75;
    }
  } else if (lengthWidthRatio >= 0.9 && lengthWidthRatio <= 1.3) {
    // Shorter faces - Round, Square, Heart, or Diamond
    if (jawAngle > 125) {
      // Soft, rounded jaw - Round face
      faceShape = 'round';
      confidence = 0.80 + Math.min((jawAngle - 125) * 0.01, 0.15);
    } else if (jawAngle < 110) {
      // Angular jaw - Square face
      faceShape = 'square';
      confidence = 0.80 + Math.min((110 - jawAngle) * 0.01, 0.15);
    } else if (foreheadRatio > jawRatio + 0.15) {
      // Prominent forehead, narrow jaw - Heart
      faceShape = 'heart';
      confidence = 0.80;
    } else if (faceWidth > foreheadWidth * 1.15 && faceWidth > jawWidth * 1.15) {
      // Wide cheekbones - Diamond
      faceShape = 'diamond';
      confidence = 0.75;
    } else {
      // Default to round for soft features
      faceShape = 'round';
      confidence = 0.65;
      secondaryShape = 'oval';
    }
  } else {
    // Very short face - likely round
    faceShape = 'round';
    confidence = 0.60;
  }

  return {
    faceShape,
    confidence,
    measurements,
    secondaryShape,
  };
}

// Simplified detection without MediaPipe for initial testing
export function detectFaceShapeSimple(imageWidth: number, imageHeight: number): DetectionResult {
  // This is a placeholder that returns a random face shape for testing
  // Will be replaced with actual MediaPipe detection
  const shapes: FaceShape[] = ['oval', 'round', 'square', 'heart', 'oblong', 'diamond'];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  return {
    faceShape: randomShape,
    confidence: 0.75 + Math.random() * 0.2,
    measurements: {
      faceLength: imageHeight * 0.6,
      faceWidth: imageWidth * 0.5,
      jawWidth: imageWidth * 0.4,
      foreheadWidth: imageWidth * 0.45,
      jawAngle: 115 + Math.random() * 20,
    },
  };
}
