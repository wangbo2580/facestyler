const https = require('https');
const fs = require('fs');
const path = require('path');

// 更多女性发型图片URL（来自Unsplash，免费商用）
const FEMALE_IMAGES = [
  // 长发波浪系列 (15张)
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1512310604669-443f26c35f52?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1488716820149-c2d0c3993e0b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1464863979621-258859e62245?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&h=500&fit=crop',

  // Bob和中长发系列 (15张)
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1485893226355-9a1c32a0c81e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1502767882618-34d02c47eb5c?w=400&h=500&fit=crop',

  // 卷发和自然纹理系列 (15张)
  'https://images.unsplash.com/photo-1523264653568-d3d4032d1476?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518577915332-c2a19f149a75?w=400&h=500&fit=crop',

  // 短发和精灵系列 (15张)
  'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1505640070685-77d20ed47dff?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1543357480-c60d40007a3f?w=400&h=500&fit=crop',

  // 正式/优雅发型系列 (15张)
  'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1557555187-23d685287bc3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1546961342-ea1f71ccc08a?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1533973860717-d49dfd14cf64?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1521252659862-eec69941b071?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1523307730650-594bc63f9d67?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1491130165606-ece95e98e356?w=400&h=500&fit=crop',

  // 刘海系列 (15张)
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1484328256775-c77c8a35c285?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1530577197743-7adf14294584?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1546961342-ea1f71ccc08a?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1509868918748-a554ad25f858?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=500&fit=crop',
];

// 男性发型图片URL (60张+)
const MALE_IMAGES = [
  // 经典商务风格 (15张)
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1488161628813-04466f0bb590?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&h=500&fit=crop',

  // 现代时尚风格 (15张)
  'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1508341591423-4347099e1f19?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',

  // 短发/渐变风格 (15张)
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1521341957697-b93449760f30?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1530884698386-d42ad3199b1f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504199367641-aba8151af406?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=500&fit=crop',

  // 中长发/自然风格 (15张)
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1499996860823-5f9c0c0c0c0c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541855492-581f618f69a0?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1518977676601-b53f82ber7c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    const request = https.get(url, { timeout: 15000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });

    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(new Error('Timeout'));
    });
  });
}

async function downloadAll() {
  const femaleDir = path.join(__dirname, '..', 'public', 'hairstyles', 'female');
  const maleDir = path.join(__dirname, '..', 'public', 'hairstyles', 'male');

  // 确保目录存在
  if (!fs.existsSync(femaleDir)) fs.mkdirSync(femaleDir, { recursive: true });
  if (!fs.existsSync(maleDir)) fs.mkdirSync(maleDir, { recursive: true });

  console.log('开始下载女性发型图片...\n');

  let femaleCount = 0;
  for (let i = 0; i < FEMALE_IMAGES.length; i++) {
    const filename = `female-${String(i + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(femaleDir, filename);

    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
      console.log(`跳过: ${filename} (已存在)`);
      continue;
    }

    try {
      await downloadImage(FEMALE_IMAGES[i], filepath);
      femaleCount++;
      console.log(`下载成功 [${femaleCount}]: ${filename}`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.log(`下载失败: ${filename} - ${err.message}`);
    }
  }

  console.log(`\n女性图片下载完成: ${femaleCount} 张\n`);
  console.log('开始下载男性发型图片...\n');

  let maleCount = 0;
  for (let i = 0; i < MALE_IMAGES.length; i++) {
    const filename = `male-${String(i + 1).padStart(3, '0')}.jpg`;
    const filepath = path.join(maleDir, filename);

    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
      console.log(`跳过: ${filename} (已存在)`);
      continue;
    }

    try {
      await downloadImage(MALE_IMAGES[i], filepath);
      maleCount++;
      console.log(`下载成功 [${maleCount}]: ${filename}`);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.log(`下载失败: ${filename} - ${err.message}`);
    }
  }

  console.log(`\n男性图片下载完成: ${maleCount} 张`);
  console.log(`\n========================================`);
  console.log(`总计: 女性 ${femaleCount} 张, 男性 ${maleCount} 张`);
  console.log(`========================================\n`);
}

downloadAll().catch(console.error);
