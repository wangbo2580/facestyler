const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data', 'hairstyles', 'female');

// 可用的图片文件
const availableImages = [
  '/hairstyles/female/long-waves-1.jpg',
  '/hairstyles/female/long-waves-2.jpg',
  '/hairstyles/female/long-waves-3.jpg',
  '/hairstyles/female/bob-1.jpg',
  '/hairstyles/female/bob-2.jpg',
  '/hairstyles/female/bob-3.jpg',
  '/hairstyles/female/curly-1.jpg',
  '/hairstyles/female/curly-2.jpg',
  '/hairstyles/female/curly-3.jpg',
  '/hairstyles/female/straight-1.jpg',
  '/hairstyles/female/straight-2.jpg',
  '/hairstyles/female/straight-3.jpg',
  '/hairstyles/female/updo-1.jpg',
  '/hairstyles/female/updo-2.jpg',
  '/hairstyles/female/updo-3.jpg',
  '/hairstyles/female/pixie-1.jpg',
  '/hairstyles/female/pixie-2.jpg',
  '/hairstyles/female/pixie-3.jpg',
  '/hairstyles/female/bangs-1.jpg',
  '/hairstyles/female/bangs-2.jpg',
  '/hairstyles/female/bangs-3.jpg',
  '/hairstyles/female/layers-1.jpg',
  '/hairstyles/female/layers-2.jpg',
  '/hairstyles/female/layers-3.jpg',
];

// 根据发型特征选择合适的图片
function getImageForStyle(styleName, styleType, length, index) {
  const name = styleName.toLowerCase();

  if (name.includes('wave') || name.includes('beach')) {
    return availableImages[index % 3]; // long-waves
  }
  if (name.includes('bob') || name.includes('lob')) {
    return availableImages[3 + (index % 3)]; // bob
  }
  if (name.includes('curl')) {
    return availableImages[6 + (index % 3)]; // curly
  }
  if (name.includes('straight') || name.includes('sleek')) {
    return availableImages[9 + (index % 3)]; // straight
  }
  if (name.includes('updo') || name.includes('bun') || name.includes('ponytail') || name.includes('braid')) {
    return availableImages[12 + (index % 3)]; // updo
  }
  if (name.includes('pixie') || name.includes('short')) {
    return availableImages[15 + (index % 3)]; // pixie
  }
  if (name.includes('bang') || name.includes('fringe')) {
    return availableImages[18 + (index % 3)]; // bangs
  }
  if (name.includes('layer') || name.includes('shag')) {
    return availableImages[21 + (index % 3)]; // layers
  }

  // 根据长度选择
  if (length === 'long') {
    return availableImages[index % 3]; // long-waves
  }
  if (length === 'short') {
    return availableImages[3 + (index % 3)]; // bob
  }

  // 默认
  return availableImages[index % availableImages.length];
}

// 更新所有文件
const files = ['square.json', 'heart.json', 'oblong.json', 'diamond.json'];

files.forEach(filename => {
  const filepath = path.join(dataDir, filename);

  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    data.hairstyles.forEach((style, index) => {
      style.image = getImageForStyle(style.name, style.style, style.length, index);
    });

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log(`Updated: ${filename}`);
  } catch (err) {
    console.error(`Error updating ${filename}:`, err.message);
  }
});

console.log('\nAll files updated!');
