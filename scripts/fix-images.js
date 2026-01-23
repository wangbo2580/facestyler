const https = require('https');
const fs = require('fs');
const path = require('path');

// 修复下载失败的图片 - 使用不同的图片URL
const fixImages = {
  'bangs-2.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  'bob-1.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
  'bob-2.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    const request = https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Fixed: ${filepath}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function fixBrokenImages() {
  const baseDir = path.join(__dirname, '..', 'public', 'hairstyles', 'female');

  console.log('Fixing broken images...\n');

  for (const [filename, url] of Object.entries(fixImages)) {
    const filepath = path.join(baseDir, filename);

    // 删除损坏的文件
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    try {
      await downloadImage(url, filepath);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`Failed to fix ${filename}:`, err.message);
    }
  }

  console.log('\nDone!');
}

fixBrokenImages().catch(console.error);
