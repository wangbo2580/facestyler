/**
 * 发型图片自动下载脚本 v2
 * 使用Unsplash Source API（无需API key，完全免费）
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'hairstyles');
const TARGET_FEMALE = 120;
const TARGET_MALE = 80;

// Unsplash Source API
// 格式: https://source.unsplash.com/800x1000/?keyword
// 每次请求会返回不同的随机图片

const KEYWORDS = {
  female: [
    'woman,hairstyle,portrait',
    'woman,short,hair',
    'woman,bob,haircut',
    'woman,long,hair,straight',
    'woman,wavy,hair',
    'woman,curly,hair',
    'woman,bangs,hairstyle',
    'woman,layered,hair',
    'woman,pixie,cut',
    'woman,lob,haircut',
    'asian,woman,hairstyle',
    'woman,shoulder,length,hair',
    'woman,hair,updo',
    'woman,textured,hair',
    'woman,sleek,hair',
  ],
  male: [
    'man,hairstyle,portrait',
    'man,short,haircut',
    'man,fade,haircut',
    'man,crew,cut',
    'man,undercut,hairstyle',
    'man,pompadour,hair',
    'man,side,part',
    'man,textured,hair',
    'man,wavy,hair',
    'man,long,hair',
    'asian,man,hairstyle',
    'man,modern,haircut',
    'man,classic,hairstyle',
    'man,businessman,hairstyle',
    'man,casual,hair',
  ],
};

// 下载图片（支持重定向）
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      // 处理重定向
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(true);
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// 检查图片是否已存在且有效
function isValidImage(filepath) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size > 10000; // 至少10KB
  } catch {
    return false;
  }
}

// 获取当前图片数量
function getCurrentCount(dir) {
  try {
    const files = fs.readdirSync(dir);
    return files.filter(f => {
      const filepath = path.join(dir, f);
      return f.match(/\.(jpg|jpeg|png|webp)$/i) && isValidImage(filepath);
    }).length;
  } catch {
    return 0;
  }
}

// 下载发型图片
async function downloadHairstyles(gender, keywords, targetCount) {
  const dir = path.join(OUTPUT_DIR, gender);

  // 确保目录存在
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const currentCount = getCurrentCount(dir);
  const needed = targetCount - currentCount;

  if (needed <= 0) {
    console.log(`✅ ${gender}: 已达到目标 (${currentCount}/${targetCount})\n`);
    return 0;
  }

  console.log(`📥 ${gender}: 需要下载 ${needed} 张图片 (当前 ${currentCount}/${targetCount})`);

  let downloaded = 0;
  let attempts = 0;
  const maxAttempts = needed * 3; // 最多尝试3倍次数

  while (downloaded < needed && attempts < maxAttempts) {
    attempts++;

    // 选择关键词（循环使用）
    const keyword = keywords[attempts % keywords.length];
    const filename = `${gender}-${String(currentCount + downloaded + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(dir, filename);

    // 跳过已存在的文件
    if (fs.existsSync(filepath) && isValidImage(filepath)) {
      downloaded++;
      console.log(`⏭️  Skip: ${filename} (already exists)`);
      continue;
    }

    // Unsplash Source URL（每次返回不同图片）
    const url = `https://source.unsplash.com/800x1000/?${keyword}&sig=${Date.now() + attempts}`;

    try {
      console.log(`⬇️  Downloading: ${filename} (${keyword})...`);
      await downloadImage(url, filepath);

      // 验证下载的图片
      if (isValidImage(filepath)) {
        downloaded++;
        console.log(`✅ Success: ${filename} (${downloaded}/${needed})`);
      } else {
        console.log(`❌ Invalid: ${filename} (too small, retrying...)`);
        fs.unlinkSync(filepath);
      }

      // 延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`❌ Failed: ${filename} - ${err.message}`);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }
  }

  console.log(`\n✨ ${gender}: 下载完成 (+${downloaded})\n`);
  return downloaded;
}

// 主函数
async function main() {
  console.log('🚀 开始下载发型图片...\n');
  console.log('📌 使用Unsplash Source API（免费，无需API key）\n');

  const startFemale = getCurrentCount(path.join(OUTPUT_DIR, 'female'));
  const startMale = getCurrentCount(path.join(OUTPUT_DIR, 'male'));

  console.log(`📊 当前统计:`);
  console.log(`   Female: ${startFemale}/${TARGET_FEMALE}`);
  console.log(`   Male: ${startMale}/${TARGET_MALE}`);
  console.log(`   Total: ${startFemale + startMale}\n`);

  // 下载女性发型
  console.log('👩 ===== 女性发型 =====');
  await downloadHairstyles('female', KEYWORDS.female, TARGET_FEMALE);

  // 下载男性发型
  console.log('👨 ===== 男性发型 =====');
  await downloadHairstyles('male', KEYWORDS.male, TARGET_MALE);

  // 最终统计
  const finalFemale = getCurrentCount(path.join(OUTPUT_DIR, 'female'));
  const finalMale = getCurrentCount(path.join(OUTPUT_DIR, 'male'));
  const total = finalFemale + finalMale;

  console.log('🎉 ===== 完成 =====');
  console.log(`\n📊 最终统计:`);
  console.log(`   Female: ${startFemale} → ${finalFemale} (+${finalFemale - startFemale})`);
  console.log(`   Male: ${startMale} → ${finalMale} (+${finalMale - startMale})`);
  console.log(`   Total: ${startFemale + startMale} → ${total} (+${total - startFemale - startMale})\n`);

  if (total >= 200) {
    console.log('✅ 成功！已达到目标200+张图片！');
  } else {
    console.log(`⚠️  当前${total}张，距离目标还差${200 - total}张`);
    console.log('💡 提示: 可以再次运行此脚本继续下载\n');
  }
}

// 运行
main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
