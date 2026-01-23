import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { FaceShape } from "@/types/hairstyle";
import { FaceMeasurements, DetectionResult, FaceAnalysis } from "@/types/detection";

let faceLandmarker: FaceLandmarker | null = null;
let isInitializing = false;
let initPromise: Promise<FaceLandmarker> | null = null;

// MediaPipe Face Mesh landmark indices
const LANDMARKS = {
  // Forehead top center
  FOREHEAD_TOP: 10,
  // Forehead sides
  FOREHEAD_LEFT: 109,
  FOREHEAD_RIGHT: 338,
  // Cheekbones (widest part of face)
  LEFT_CHEEK: 234,
  RIGHT_CHEEK: 454,
  // Jaw points
  JAW_LEFT: 172,
  JAW_RIGHT: 397,
  // Chin
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

export async function initializeFaceLandmarker(): Promise<FaceLandmarker> {
  if (faceLandmarker) {
    return faceLandmarker;
  }

  if (initPromise) {
    return initPromise;
  }

  if (isInitializing) {
    // Wait for initialization to complete
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (faceLandmarker) {
          clearInterval(checkInterval);
          resolve(faceLandmarker);
        }
      }, 100);
    });
  }

  isInitializing = true;

  initPromise = (async () => {
    // Use latest stable version from CDN
    const wasmUrl = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
    const modelUrl = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

    try {
      console.log("Initializing MediaPipe FaceLandmarker...");
      const vision = await FilesetResolver.forVisionTasks(wasmUrl);
      console.log("FilesetResolver loaded successfully");

      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelUrl,
          delegate: "GPU",
        },
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
        runningMode: "IMAGE",
        numFaces: 1,
      });

      console.log("FaceLandmarker initialized with GPU");
      return faceLandmarker;
    } catch (error) {
      console.error("Failed to initialize FaceLandmarker with GPU:", error);
      // Fallback to CPU if GPU fails
      try {
        console.log("Trying CPU fallback...");
        const vision = await FilesetResolver.forVisionTasks(wasmUrl);

        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelUrl,
            delegate: "CPU",
          },
          outputFaceBlendshapes: false,
          outputFacialTransformationMatrixes: false,
          runningMode: "IMAGE",
          numFaces: 1,
        });

        console.log("FaceLandmarker initialized with CPU");
        return faceLandmarker;
      } catch (cpuError) {
        console.error("Failed to initialize FaceLandmarker with CPU:", cpuError);
        throw cpuError;
      }
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
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

function extractMeasurements(landmarks: Point[]): FaceMeasurements {
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

function generateCharacteristics(
  faceShape: FaceShape,
  lengthWidthRatio: number,
  jawAngle: number,
  foreheadRatio: number,
  jawRatio: number
): string[] {
  const characteristics: string[] = [];

  // 长宽比特征
  if (lengthWidthRatio > 1.5) {
    characteristics.push("脸部较长，长度明显大于宽度");
  } else if (lengthWidthRatio < 1.0) {
    characteristics.push("脸部较短，长度与宽度接近");
  } else {
    characteristics.push("脸部长宽比例适中");
  }

  // 下颌特征
  if (jawAngle > 130) {
    characteristics.push("下颌线条圆润柔和");
  } else if (jawAngle < 110) {
    characteristics.push("下颌线条分明，轮廓清晰");
  } else {
    characteristics.push("下颌线条适中");
  }

  // 额头特征
  if (foreheadRatio > 0.9) {
    characteristics.push("额头较宽");
  } else if (foreheadRatio < 0.75) {
    characteristics.push("额头较窄");
  }

  // 颧骨特征
  if (jawRatio < 0.7) {
    characteristics.push("下颌较窄，呈现收窄趋势");
  } else if (jawRatio > 0.9) {
    characteristics.push("下颌较宽");
  }

  // 脸型特定特征
  switch (faceShape) {
    case "oval":
      characteristics.push("整体轮廓流畅，线条柔和均衡");
      break;
    case "round":
      characteristics.push("脸颊丰满，整体呈现圆润感");
      break;
    case "square":
      characteristics.push("脸部轮廓硬朗，具有力量感");
      break;
    case "heart":
      characteristics.push("上宽下窄，呈倒三角形");
      break;
    case "oblong":
      characteristics.push("脸型较长，给人优雅修长的印象");
      break;
    case "diamond":
      characteristics.push("颧骨突出，额头和下颌较窄");
      break;
  }

  return characteristics;
}

function generateConfidenceExplanation(confidence: number): string {
  if (confidence >= 0.85) {
    return "非常确定 - 您的面部特征非常典型地符合该脸型的标准比例";
  } else if (confidence >= 0.75) {
    return "比较确定 - 您的面部特征较好地符合该脸型特征";
  } else if (confidence >= 0.65) {
    return "中等可信度 - 您的脸型介于多种类型之间，具有混合特征";
  } else {
    return "较低可信度 - 您的脸型特征不太典型，建议参考次要脸型";
  }
}

function classifyFaceShape(measurements: FaceMeasurements): DetectionResult {
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
    faceShape = "oblong";
    confidence = Math.min(0.7 + (lengthWidthRatio - 1.5) * 0.3, 0.95);
    if (jawAngle < 115) {
      secondaryShape = "square";
    }
  } else if (lengthWidthRatio >= 1.3 && lengthWidthRatio <= 1.5) {
    // Could be Oval or Diamond
    if (faceWidth > foreheadWidth * 1.1 && faceWidth > jawWidth * 1.1) {
      // Cheekbones wider than both forehead and jaw
      faceShape = "diamond";
      confidence = 0.8;
      secondaryShape = "oval";
    } else if (jawRatio >= 0.7 && jawRatio <= 0.85 && foreheadRatio >= 0.85) {
      // Balanced proportions - Oval
      faceShape = "oval";
      confidence = 0.85;
    } else if (foreheadRatio > jawRatio + 0.1) {
      // Forehead wider than jaw - Heart
      faceShape = "heart";
      confidence = 0.8;
      secondaryShape = "oval";
    } else {
      faceShape = "oval";
      confidence = 0.75;
    }
  } else if (lengthWidthRatio >= 0.9 && lengthWidthRatio <= 1.3) {
    // Shorter faces - Round, Square, Heart, or Diamond
    if (jawAngle > 125) {
      // Soft, rounded jaw - Round face
      faceShape = "round";
      confidence = 0.8 + Math.min((jawAngle - 125) * 0.01, 0.15);
    } else if (jawAngle < 110) {
      // Angular jaw - Square face
      faceShape = "square";
      confidence = 0.8 + Math.min((110 - jawAngle) * 0.01, 0.15);
    } else if (foreheadRatio > jawRatio + 0.15) {
      // Prominent forehead, narrow jaw - Heart
      faceShape = "heart";
      confidence = 0.8;
    } else if (faceWidth > foreheadWidth * 1.15 && faceWidth > jawWidth * 1.15) {
      // Wide cheekbones - Diamond
      faceShape = "diamond";
      confidence = 0.75;
    } else {
      // Default to round for soft features
      faceShape = "round";
      confidence = 0.65;
      secondaryShape = "oval";
    }
  } else {
    // Very short face - likely round
    faceShape = "round";
    confidence = 0.6;
  }

  // Generate detailed analysis
  const analysis: FaceAnalysis = {
    lengthWidthRatio,
    jawRatio,
    foreheadRatio,
    jawAngle,
    characteristics: generateCharacteristics(
      faceShape,
      lengthWidthRatio,
      jawAngle,
      foreheadRatio,
      jawRatio
    ),
    confidenceExplanation: generateConfidenceExplanation(confidence),
  };

  return {
    faceShape,
    confidence,
    measurements,
    secondaryShape,
    analysis,
  };
}

export async function detectFaceShape(
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): Promise<DetectionResult> {
  console.log("Starting face detection...");
  console.log("Image dimensions:", {
    width: imageElement instanceof HTMLCanvasElement ? imageElement.width : (imageElement as HTMLImageElement).naturalWidth,
    height: imageElement instanceof HTMLCanvasElement ? imageElement.height : (imageElement as HTMLImageElement).naturalHeight,
  });

  const landmarker = await initializeFaceLandmarker();
  console.log("Landmarker ready, detecting faces...");

  const results = landmarker.detect(imageElement);
  console.log("Detection results:", {
    faceLandmarksCount: results.faceLandmarks?.length || 0,
  });

  if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
    throw new Error("No face detected in the image");
  }

  // Get the first face's landmarks
  const landmarks = results.faceLandmarks[0];
  console.log("Landmarks count:", landmarks.length);

  // Convert normalized landmarks to points
  const points: Point[] = landmarks.map((landmark) => ({
    x: landmark.x,
    y: landmark.y,
    z: landmark.z,
  }));

  // Extract measurements and classify
  const measurements = extractMeasurements(points);
  console.log("Face measurements:", measurements);

  const result = classifyFaceShape(measurements);
  console.log("Classification result:", result);

  return result;
}

export function isMediaPipeReady(): boolean {
  return faceLandmarker !== null;
}
