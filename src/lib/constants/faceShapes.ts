import { FaceShapeInfo, FaceShape } from '@/types/hairstyle';

export const FACE_SHAPES: Record<FaceShape, FaceShapeInfo> = {
  oval: {
    id: 'oval',
    name: 'Oval',
    description: 'The oval face shape is considered the most versatile and well-balanced. It\'s characterized by a face length that is about 1.5 times the width, with a gently rounded jawline and forehead that are similar in width.',
    characteristics: [
      'Face length is 1.3-1.5 times the width',
      'Forehead and jaw are similar width',
      'Softly rounded jawline',
      'Widest at the cheekbones',
      'Gently curved chin'
    ],
    celebrities: ['Beyoncé', 'Jessica Alba', 'Julia Roberts', 'George Clooney', 'Ryan Gosling'],
    tips: [
      'You can pull off almost any hairstyle',
      'Avoid covering your forehead too much',
      'Experiment with different lengths and styles',
      'Both side and center parts work well',
      'Try adding volume at the crown for added dimension'
    ]
  },
  round: {
    id: 'round',
    name: 'Round',
    description: 'A round face has soft angles with the width and length being almost equal. The cheeks are usually the widest part of the face, giving it a youthful, friendly appearance.',
    characteristics: [
      'Face width and length are nearly equal',
      'Full, prominent cheeks',
      'Rounded chin without angular features',
      'Soft, curved jawline',
      'Widest at the cheekbones'
    ],
    celebrities: ['Selena Gomez', 'Chrissy Teigen', 'Miranda Kerr', 'Leonardo DiCaprio', 'Elijah Wood'],
    tips: [
      'Add height and volume at the crown',
      'Try side-swept bangs to create angles',
      'Long layers can help elongate your face',
      'Avoid chin-length bobs that add width',
      'Opt for styles that create the illusion of length'
    ]
  },
  square: {
    id: 'square',
    name: 'Square',
    description: 'A square face shape features a strong, angular jawline with the forehead, cheekbones, and jaw being roughly the same width. This face shape often conveys strength and confidence.',
    characteristics: [
      'Strong, angular jawline',
      'Forehead, cheekbones, and jaw similar in width',
      'Face length and width are nearly equal',
      'Prominent jaw corners',
      'Relatively straight sides'
    ],
    celebrities: ['Angelina Jolie', 'Olivia Wilde', 'Demi Moore', 'Brad Pitt', 'Henry Cavill'],
    tips: [
      'Soften angular features with layered cuts',
      'Side-parted styles work beautifully',
      'Add volume at the temples and crown',
      'Avoid blunt, one-length cuts',
      'Soft waves and curls complement your features'
    ]
  },
  heart: {
    id: 'heart',
    name: 'Heart',
    description: 'A heart-shaped face is wider at the forehead and tapers down to a narrow, pointed chin. This creates a romantic, delicate appearance often associated with beauty.',
    characteristics: [
      'Wide forehead, the widest part of the face',
      'Narrow, sometimes pointed chin',
      'High, prominent cheekbones',
      'Face tapers from forehead to jaw',
      'Often has a widow\'s peak hairline'
    ],
    celebrities: ['Reese Witherspoon', 'Scarlett Johansson', 'Taylor Swift', 'Ryan Reynolds', 'Nick Jonas'],
    tips: [
      'Add width at the jaw level to balance',
      'Side-swept bangs soften a wide forehead',
      'Chin-length bobs work wonderfully',
      'Avoid excessive volume at the crown',
      'Layers around the chin add balance'
    ]
  },
  oblong: {
    id: 'oblong',
    name: 'Oblong',
    description: 'An oblong (or long) face shape is longer than it is wide, with the forehead, cheekbones, and jawline being similar in width. The face appears elongated and elegant.',
    characteristics: [
      'Face is noticeably longer than it is wide',
      'Length is more than 1.5 times the width',
      'Forehead, cheeks, and jaw similar in width',
      'Long, straight cheek line',
      'May have a long nose or high forehead'
    ],
    celebrities: ['Sarah Jessica Parker', 'Liv Tyler', 'Cate Blanchett', 'Adam Levine', 'Ben Affleck'],
    tips: [
      'Add width and volume at the sides',
      'Bangs can help shorten the appearance of your face',
      'Avoid very long, straight styles',
      'Layered cuts with volume work great',
      'Chin to shoulder length styles are ideal'
    ]
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    description: 'A diamond face shape features high, dramatic cheekbones with a narrow forehead and jawline. This creates an angular, striking appearance that\'s relatively rare.',
    characteristics: [
      'High, wide cheekbones - the widest point',
      'Narrow forehead',
      'Narrow, pointed chin',
      'Angular, defined features',
      'Face tapers at both top and bottom'
    ],
    celebrities: ['Rihanna', 'Taylor Swift', 'Vanessa Hudgens', 'Robert Pattinson', 'Johnny Depp'],
    tips: [
      'Add fullness at the forehead and chin',
      'Side-swept bangs add width at the forehead',
      'Chin-length styles balance the cheekbones',
      'Avoid slicked-back styles',
      'Soft layers around the face work well'
    ]
  }
};

export const FACE_SHAPE_LIST = Object.values(FACE_SHAPES);

export const FACE_SHAPE_ROUTES = {
  oval: '/hairstyle-for-oval-face',
  round: '/hairstyle-for-round-face',
  square: '/hairstyle-for-square-face',
  heart: '/hairstyle-for-heart-face',
  oblong: '/hairstyle-for-oblong-face',
  diamond: '/hairstyle-for-diamond-face'
};
