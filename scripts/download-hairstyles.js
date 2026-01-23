/**
 * 发型图片自动下载脚本
 * 从Unsplash免费下载发型图片
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 配置
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'hairstyles');
const TARGET_FEMALE = 120; // 目标女性发型数量
const TARGET_MALE = 80;    // 目标男性发型数量

// Unsplash图片URL列表（精选高质量发型图片）
const FEMALE_HAIRSTYLES = [
  // Short hairstyles
  'https://images.unsplash.com/photo-1595475884562-073c5c0e75e4?w=800&q=80', // short bob
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80', // pixie cut
  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=800&q=80', // short layers
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', // bob cut
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', // shoulder length

  // Medium hairstyles
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', // wavy medium
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80', // straight medium
  'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=800&q=80', // layered medium
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80', // textured medium
  'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=800&q=80', // beach waves

  // Long hairstyles
  'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=800&q=80', // long straight
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80', // long wavy
  'https://images.unsplash.com/photo-1499155286265-79a9dc9c6380?w=800&q=80', // long curly
  'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=800&q=80', // long layers
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', // long sleek
];

const MALE_HAIRSTYLES = [
  // Short hairstyles
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // crew cut
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', // short sides
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80', // fade
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80', // short textured
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&q=80', // classic short

  // Medium hairstyles
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80', // medium swept
  'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&q=80', // medium wavy
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80', // medium textured
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80', // medium side part
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', // medium modern

  // Long hairstyles
  'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=800&q=80', // long man bun
  'https://images.unsplash.com/photo-1531384370597-8590413be50a?w=800&q=80', // long flowing
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80', // long wavy
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80', // long swept
  'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=800&q=80', // long casual
];

// 下载单张图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // 检查文件是否已存在
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skip: ${path.basename(filepath)} (already exists)`);
      resolve(false);
      return;
    }

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 获取当前图片数量
function getCurrentCount(dir) {
  try {
    return fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i)).length;
  } catch (err) {
    return 0;
  }
}

// 主函数
async function main() {
  console.log('🚀 开始下载发型图片...\n');

  // 确保目录存在
  const femaleDir = path.join(OUTPUT_DIR, 'female');
  const maleDir = path.join(OUTPUT_DIR, 'male');

  if (!fs.existsSync(femaleDir)) fs.mkdirSync(femaleDir, { recursive: true });
  if (!fs.existsSync(maleDir)) fs.mkdirSync(maleDir, { recursive: true });

  // 检查当前数量
  const currentFemale = getCurrentCount(femaleDir);
  const currentMale = getCurrentCount(maleDir);

  console.log(`📊 当前统计:`);
  console.log(`   Female: ${currentFemale}/${TARGET_FEMALE}`);
  console.log(`   Male: ${currentMale}/${TARGET_MALE}\n`);

  // 下载女性发型
  console.log('👩 下载女性发型图片...');
  let femaleDownloaded = 0;
  const femaleNeeded = TARGET_FEMALE - currentFemale;

  for (let i = 0; i < Math.min(FEMALE_HAIRSTYLES.length, femaleNeeded); i++) {
    const url = FEMALE_HAIRSTYLES[i];
    const filename = `female-${String(currentFemale + i + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(femaleDir, filename);

    try {
      const downloaded = await downloadImage(url, filepath);
      if (downloaded) femaleDownloaded++;
      // 延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Failed to download ${filename}:`, err.message);
    }
  }

  console.log(`\n👨 下载男性发型图片...`);
  let maleDownloaded = 0;
  const maleNeeded = TARGET_MALE - currentMale;

  for (let i = 0; i < Math.min(MALE_HAIRSTYLES.length, maleNeeded); i++) {
    const url = MALE_HAIRSTYLES[i];
    const filename = `male-${String(currentMale + i + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(maleDir, filename);

    try {
      const downloaded = await downloadImage(url, filepath);
      if (downloaded) maleDownloaded++;
      // 延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      console.error(`❌ Failed to download ${filename}:`, err.message);
    }
  }

  // 最终统计
  const finalFemale = getCurrentCount(femaleDir);
  const finalMale = getCurrentCount(maleDir);

  console.log('\n✨ 下载完成！');
  console.log(`\n📊 最终统计:`);
  console.log(`   Female: ${currentFemale} → ${finalFemale} (+${femaleDownloaded})`);
  console.log(`   Male: ${currentMale} → ${finalMale} (+${maleDownloaded})`);
  console.log(`   Total: ${currentFemale + currentMale} → ${finalFemale + finalMale} (+${femaleDownloaded + maleDownloaded})\n`);

  if (finalFemale + finalMale >= 200) {
    console.log('🎉 已达到目标200+张图片！');
  } else {
    console.log(`⚠️  当前${finalFemale + finalMale}张，距离目标还差${200 - finalFemale - finalMale}张`);
    console.log('💡 提示: 你可以在FEMALE_HAIRSTYLES和MALE_HAIRSTYLES数组中添加更多URL');
  }
}

// 运行
main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
