const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash 图片 URL 列表 - 这些都是免费商用的发型图片
const HAIRSTYLE_IMAGES = {
  female: {
    // 长发波浪
    'long-waves': [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
    ],
    // Bob 发型
    'bob': [
      'https://images.unsplash.com/photo-1595163153587-2989c4f89b10?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1605980625478-ab76baaef69b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop',
    ],
    // 卷发
    'curly': [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop',
    ],
    // 直发
    'straight': [
      'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=400&h=500&fit=crop',
    ],
    // 扎发
    'updo': [
      'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
    ],
    // 短发
    'pixie': [
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    ],
    // 刘海
    'bangs': [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1488716820149-c2d0c3993e0b?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=400&h=500&fit=crop',
    ],
    // 层次感
    'layers': [
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop',
    ],
  },
  male: {
    'classic': [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    ],
    'modern': [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop',
    ],
  }
};

// 发型图片映射 - 为每种脸型的每种发型定义对应图片
const FACE_SHAPE_STYLES = {
  oval: ['long-waves', 'bob', 'curly', 'straight', 'updo', 'pixie', 'bangs', 'layers'],
  round: ['long-waves', 'layers', 'pixie', 'bangs', 'straight'],
  square: ['long-waves', 'curly', 'layers', 'bangs', 'bob'],
  heart: ['bob', 'curly', 'layers', 'long-waves', 'bangs'],
  oblong: ['bob', 'curly', 'bangs', 'layers', 'long-waves'],
  diamond: ['bob', 'curly', 'layers', 'bangs', 'long-waves'],
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // 处理重定向
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

async function downloadAllImages() {
  const baseDir = path.join(__dirname, '..', 'public', 'hairstyles');

  // 创建目录
  for (const gender of ['female', 'male']) {
    const dir = path.join(baseDir, gender);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  console.log('Starting download...');

  let count = 0;

  // 下载女性发型图片
  for (const [style, urls] of Object.entries(HAIRSTYLE_IMAGES.female)) {
    for (let i = 0; i < urls.length; i++) {
      const filename = `${style}-${i + 1}.jpg`;
      const filepath = path.join(baseDir, 'female', filename);

      if (!fs.existsSync(filepath)) {
        try {
          await downloadImage(urls[i], filepath);
          count++;
          // 延迟避免请求过快
          await new Promise(r => setTimeout(r, 500));
        } catch (err) {
          console.error(`Failed to download ${filename}:`, err.message);
        }
      }
    }
  }

  // 下载男性发型图片
  for (const [style, urls] of Object.entries(HAIRSTYLE_IMAGES.male)) {
    for (let i = 0; i < urls.length; i++) {
      const filename = `${style}-${i + 1}.jpg`;
      const filepath = path.join(baseDir, 'male', filename);

      if (!fs.existsSync(filepath)) {
        try {
          await downloadImage(urls[i], filepath);
          count++;
          await new Promise(r => setTimeout(r, 500));
        } catch (err) {
          console.error(`Failed to download ${filename}:`, err.message);
        }
      }
    }
  }

  console.log(`\nDownload complete! ${count} images downloaded.`);
}

downloadAllImages().catch(console.error);
