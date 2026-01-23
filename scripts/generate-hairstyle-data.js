const fs = require('fs');
const path = require('path');

// 发型名称库
const FEMALE_STYLES = {
  long: [
    { name: 'Classic Long Layers', style: 'classic', desc: 'Soft, flowing layers that frame the face beautifully.' },
    { name: 'Beachy Waves', style: 'casual', desc: 'Effortless, tousled waves with a relaxed, summery vibe.' },
    { name: 'Sleek Straight', style: 'classic', desc: 'Super straight, glossy hair that looks polished and professional.' },
    { name: 'Voluminous Curls', style: 'formal', desc: 'Big, bouncy curls that add drama and glamour.' },
    { name: 'Side Part Glamour', style: 'formal', desc: 'Deep side part with cascading waves for Old Hollywood glamour.' },
    { name: 'Natural Texture', style: 'casual', desc: 'Embrace your natural hair texture with this low-maintenance style.' },
    { name: 'Long Shag', style: 'trendy', desc: 'A modern long shag with lots of layers and movement.' },
    { name: 'Half Up Half Down', style: 'casual', desc: 'The best of both worlds - elegant yet effortless.' },
    { name: 'Romantic Waves', style: 'formal', desc: 'Soft, romantic waves perfect for special occasions.' },
    { name: 'Face Framing Layers', style: 'classic', desc: 'Strategic layers that highlight your best features.' },
  ],
  medium: [
    { name: 'Textured Lob', style: 'trendy', desc: 'A long bob with textured ends for a modern look.' },
    { name: 'Curtain Bangs', style: 'trendy', desc: 'Soft bangs that part in the middle and frame the face.' },
    { name: 'Shoulder Length Waves', style: 'casual', desc: 'Soft waves at shoulder length for everyday elegance.' },
    { name: 'Layered Medium Cut', style: 'classic', desc: 'Versatile medium length with flattering layers.' },
    { name: 'Textured Shag', style: 'trendy', desc: 'Modern take on the classic shag with lots of movement.' },
    { name: 'Side Swept Style', style: 'classic', desc: 'Deep side part creating asymmetry and elegance.' },
    { name: 'Soft Layers', style: 'classic', desc: 'Gentle face-framing layers for a polished look.' },
    { name: 'Wispy Fringe', style: 'trendy', desc: 'Light, wispy bangs that add softness to any cut.' },
    { name: 'Tousled Texture', style: 'casual', desc: 'Messy, tousled texture for a carefree vibe.' },
    { name: 'Volume at Crown', style: 'formal', desc: 'Added height at the crown for sophisticated style.' },
  ],
  short: [
    { name: 'Blunt Bob', style: 'trendy', desc: 'Sharp, chin-length bob for a sleek modern look.' },
    { name: 'Textured Bob', style: 'trendy', desc: 'Bob with textured ends for softness and movement.' },
    { name: 'Pixie Cut', style: 'trendy', desc: 'Bold, short cut that highlights facial features.' },
    { name: 'Layered Bob', style: 'classic', desc: 'Classic bob with layers for volume and shape.' },
    { name: 'Asymmetrical Bob', style: 'trendy', desc: 'Edgy bob with one side longer for a modern look.' },
    { name: 'Soft Pixie', style: 'trendy', desc: 'Feminine pixie with soft, textured styling.' },
    { name: 'Chin Length Cut', style: 'classic', desc: 'Sophisticated cut hitting right at the chin.' },
    { name: 'Angular Bob', style: 'trendy', desc: 'Bob cut at an angle for a striking silhouette.' },
  ],
};

const MALE_STYLES = {
  short: [
    { name: 'Classic Crew Cut', style: 'classic', desc: 'Timeless short cut that works for any occasion.' },
    { name: 'Modern Fade', style: 'trendy', desc: 'Clean fade with longer top for a contemporary look.' },
    { name: 'Textured Crop', style: 'trendy', desc: 'Short crop with textured top for a modern edge.' },
    { name: 'Buzz Cut', style: 'classic', desc: 'Low-maintenance buzz cut that looks sharp and clean.' },
    { name: 'Short Sides Long Top', style: 'trendy', desc: 'Versatile cut with faded sides and styled top.' },
    { name: 'Ivy League', style: 'classic', desc: 'Refined cut with tapered sides and styled top.' },
  ],
  medium: [
    { name: 'Textured Quiff', style: 'trendy', desc: 'Modern quiff with natural texture and volume.' },
    { name: 'Side Part', style: 'classic', desc: 'Sophisticated side part for professional settings.' },
    { name: 'Slicked Back', style: 'formal', desc: 'Polished slicked back style for formal occasions.' },
    { name: 'Messy Top', style: 'casual', desc: 'Relaxed, tousled style with natural movement.' },
    { name: 'Modern Pompadour', style: 'trendy', desc: 'Updated pompadour with contemporary styling.' },
    { name: 'Natural Waves', style: 'casual', desc: 'Embrace natural wave pattern for effortless style.' },
  ],
  long: [
    { name: 'Long Layers', style: 'casual', desc: 'Flowing layers for those who like longer hair.' },
    { name: 'Man Bun Ready', style: 'trendy', desc: 'Length that can be worn down or tied up.' },
    { name: 'Shoulder Length', style: 'casual', desc: 'Relaxed shoulder-length style with natural texture.' },
  ],
};

// 脸型特定的发型建议和tips
const FACE_SHAPE_TIPS = {
  oval: {
    tips: ['You can pull off almost any hairstyle', 'Experiment with different lengths', 'Both side and center parts work well'],
    avoid: [],
  },
  round: {
    tips: ['Add height and volume at the crown', 'Try side-swept bangs', 'Long layers elongate your face'],
    avoid: ['Avoid chin-length cuts that add width'],
  },
  square: {
    tips: ['Soften angular features with layered cuts', 'Side-parted styles work beautifully', 'Soft waves complement your features'],
    avoid: ['Avoid blunt, one-length cuts'],
  },
  heart: {
    tips: ['Add width at the jaw level to balance', 'Side-swept bangs soften a wide forehead', 'Chin-length bobs work wonderfully'],
    avoid: ['Avoid excessive volume at the crown'],
  },
  oblong: {
    tips: ['Add width and volume at the sides', 'Bangs can shorten your face appearance', 'Layered cuts with volume work great'],
    avoid: ['Avoid very long, straight styles'],
  },
  diamond: {
    tips: ['Add fullness at the forehead and chin', 'Side-swept bangs add width at forehead', 'Chin-length styles balance cheekbones'],
    avoid: ['Avoid slicked-back styles'],
  },
};

// 获取已下载的图片列表
function getAvailableImages(gender) {
  const dir = path.join(__dirname, '..', 'public', 'hairstyles', gender);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.jpg') && fs.statSync(path.join(dir, f)).size > 1000)
    .sort();
}

// 生成发型数据
function generateHairstyles(faceShape, gender, imageCount) {
  const hairstyles = [];
  const styles = gender === 'female' ? FEMALE_STYLES : MALE_STYLES;
  const tips = FACE_SHAPE_TIPS[faceShape];

  const allStyles = [
    ...styles.short.map(s => ({ ...s, length: 'short' })),
    ...styles.medium.map(s => ({ ...s, length: 'medium' })),
    ...(styles.long || []).map(s => ({ ...s, length: 'long' })),
  ];

  for (let i = 0; i < imageCount; i++) {
    const styleIndex = i % allStyles.length;
    const style = allStyles[styleIndex];
    const imageNum = String(i + 1).padStart(3, '0');

    const styleTips = [...style.desc ? [] : [], ...tips.tips.slice(0, 2)];
    if (style.style === 'trendy') styleTips.push('Great for modern, fashion-forward looks');
    if (style.style === 'classic') styleTips.push('Timeless style that never goes out of fashion');
    if (style.style === 'formal') styleTips.push('Perfect for special occasions and events');
    if (style.style === 'casual') styleTips.push('Easy to maintain for everyday wear');

    hairstyles.push({
      id: `${gender === 'female' ? 'f' : 'm'}-${faceShape}-${imageNum}`,
      name: style.name,
      faceShapes: [faceShape],
      gender: gender,
      style: style.style,
      length: style.length,
      image: `/hairstyles/${gender}/${gender}-${imageNum}.jpg`,
      description: `${style.desc} This style is particularly flattering for ${faceShape} face shapes.`,
      tips: styleTips.slice(0, 3),
      suitableFor: ['straight', 'wavy', 'medium', 'thick'],
      maintenanceLevel: style.style === 'formal' ? 'high' : style.style === 'casual' ? 'low' : 'medium',
    });
  }

  return hairstyles;
}

// 主函数
function main() {
  const faceShapes = ['oval', 'round', 'square', 'heart', 'oblong', 'diamond'];
  const femaleImages = getAvailableImages('female');
  const maleImages = getAvailableImages('male');

  console.log(`找到 ${femaleImages.length} 张女性图片`);
  console.log(`找到 ${maleImages.length} 张男性图片\n`);

  // 每种脸型分配的图片数
  const femalePerShape = Math.floor(femaleImages.length / faceShapes.length);
  const malePerShape = Math.floor(maleImages.length / faceShapes.length);

  console.log(`每种脸型: 女性 ${femalePerShape} 张, 男性 ${malePerShape} 张\n`);

  // 生成女性数据
  const femaleDir = path.join(__dirname, '..', 'src', 'data', 'hairstyles', 'female');
  if (!fs.existsSync(femaleDir)) fs.mkdirSync(femaleDir, { recursive: true });

  faceShapes.forEach((shape, index) => {
    const startIndex = index * femalePerShape;
    const hairstyles = [];

    for (let i = 0; i < femalePerShape; i++) {
      const imageIndex = startIndex + i;
      if (imageIndex >= femaleImages.length) break;

      const styles = [...FEMALE_STYLES.long, ...FEMALE_STYLES.medium, ...FEMALE_STYLES.short];
      const style = styles[i % styles.length];
      const tips = FACE_SHAPE_TIPS[shape];

      hairstyles.push({
        id: `f-${shape}-${String(i + 1).padStart(3, '0')}`,
        name: style.name,
        faceShapes: [shape],
        gender: 'female',
        style: style.style,
        length: i < 4 ? 'long' : i < 8 ? 'medium' : 'short',
        image: `/hairstyles/female/${femaleImages[imageIndex]}`,
        description: `${style.desc} Especially flattering for ${shape} face shapes.`,
        tips: [...tips.tips.slice(0, 2), 'Consult with your stylist for personalized advice'],
        suitableFor: ['straight', 'wavy', 'medium', 'thick'],
        maintenanceLevel: style.style === 'formal' ? 'high' : style.style === 'casual' ? 'low' : 'medium',
      });
    }

    const data = {
      faceShape: shape,
      gender: 'female',
      hairstyles: hairstyles,
    };

    fs.writeFileSync(
      path.join(femaleDir, `${shape}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`生成: female/${shape}.json (${hairstyles.length} 款发型)`);
  });

  // 生成男性数据
  const maleDir = path.join(__dirname, '..', 'src', 'data', 'hairstyles', 'male');
  if (!fs.existsSync(maleDir)) fs.mkdirSync(maleDir, { recursive: true });

  faceShapes.forEach((shape, index) => {
    const startIndex = index * malePerShape;
    const hairstyles = [];

    for (let i = 0; i < malePerShape; i++) {
      const imageIndex = startIndex + i;
      if (imageIndex >= maleImages.length) break;

      const styles = [...MALE_STYLES.short, ...MALE_STYLES.medium, ...(MALE_STYLES.long || [])];
      const style = styles[i % styles.length];
      const tips = FACE_SHAPE_TIPS[shape];

      hairstyles.push({
        id: `m-${shape}-${String(i + 1).padStart(3, '0')}`,
        name: style.name,
        faceShapes: [shape],
        gender: 'male',
        style: style.style,
        length: i < 4 ? 'short' : i < 7 ? 'medium' : 'long',
        image: `/hairstyles/male/${maleImages[imageIndex]}`,
        description: `${style.desc} Works great for ${shape} face shapes.`,
        tips: [...tips.tips.slice(0, 2), 'Ask your barber for styling advice'],
        suitableFor: ['straight', 'wavy', 'medium', 'thick'],
        maintenanceLevel: style.style === 'formal' ? 'high' : style.style === 'casual' ? 'low' : 'medium',
      });
    }

    const data = {
      faceShape: shape,
      gender: 'male',
      hairstyles: hairstyles,
    };

    fs.writeFileSync(
      path.join(maleDir, `${shape}.json`),
      JSON.stringify(data, null, 2)
    );
    console.log(`生成: male/${shape}.json (${hairstyles.length} 款发型)`);
  });

  console.log('\n所有数据文件已更新!');
}

main();
