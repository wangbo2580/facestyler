#!/bin/bash

# Pexels图片直接下载脚本
# 使用curl从Pexels下载发型图片

FEMALE_DIR="../public/hairstyles/female"
MALE_DIR="../public/hairstyles/male"

# 创建目录（如果不存在）
mkdir -p "$FEMALE_DIR"
mkdir -p "$MALE_DIR"

# 统计当前数量
CURRENT_FEMALE=$(ls -1 "$FEMALE_DIR"/*.jpg 2>/dev/null | wc -l)
CURRENT_MALE=$(ls -1 "$MALE_DIR"/*.jpg 2>/dev/null | wc -l)

echo "📊 当前统计:"
echo "   Female: $CURRENT_FEMALE 张"
echo "   Male: $CURRENT_MALE 张"
echo "   Total: $((CURRENT_FEMALE + CURRENT_MALE)) 张"
echo ""

# Pexels女性发型图片URL（高质量，1000x1500）
FEMALE_URLS=(
  "https://images.pexels.com/photos/3678466/pexels-photo-3678466.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/4926671/pexels-photo-4926671.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3697829/pexels-photo-3697829.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/4926684/pexels-photo-4926684.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3448813/pexels-photo-3448813.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3674231/pexels-photo-3674231.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3756941/pexels-photo-3756941.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/20821081/pexels-photo-20821081.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/20821085/pexels-photo-20821085.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/20821084/pexels-photo-20821084.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/20821086/pexels-photo-20821086.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/4926692/pexels-photo-4926692.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3780537/pexels-photo-3780537.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/3690663/pexels-photo-3690663.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/20821087/pexels-photo-20821087.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
)

# 下载女性发型图片
echo "👩 下载女性发型图片..."
COUNTER=$CURRENT_FEMALE

for url in "${FEMALE_URLS[@]}"; do
  COUNTER=$((COUNTER + 1))
  FILENAME=$(printf "female-%03d.jpg" $COUNTER)
  FILEPATH="$FEMALE_DIR/$FILENAME"

  if [ -f "$FILEPATH" ]; then
    echo "⏭️  Skip: $FILENAME (已存在)"
    continue
  fi

  echo "⬇️  Downloading: $FILENAME..."
  curl -s -L -o "$FILEPATH" "$url"

  # 检查文件大小
  if [ -f "$FILEPATH" ]; then
    SIZE=$(stat -f%z "$FILEPATH" 2>/dev/null || stat -c%s "$FILEPATH" 2>/dev/null)
    if [ "$SIZE" -gt 10000 ]; then
      echo "✅ Success: $FILENAME ($SIZE bytes)"
    else
      echo "❌ Failed: $FILENAME (文件太小，删除)"
      rm -f "$FILEPATH"
    fi
  else
    echo "❌ Failed: $FILENAME"
  fi

  sleep 1
done

echo ""

# Pexels男性发型图片URL
MALE_URLS=(
  "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1484801/pexels-photo-1484801.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1516808/pexels-photo-1516808.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1516806/pexels-photo-1516806.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1121806/pexels-photo-1121806.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1436131/pexels-photo-1436131.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1580272/pexels-photo-1580272.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1516541/pexels-photo-1516541.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
  "https://images.pexels.com/photos/1681013/pexels-photo-1681013.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200"
)

# 下载男性发型图片
echo "👨 下载男性发型图片..."
COUNTER=$CURRENT_MALE

for url in "${MALE_URLS[@]}"; do
  COUNTER=$((COUNTER + 1))
  FILENAME=$(printf "male-%03d.jpg" $COUNTER)
  FILEPATH="$MALE_DIR/$FILENAME"

  if [ -f "$FILEPATH" ]; then
    echo "⏭️  Skip: $FILENAME (已存在)"
    continue
  fi

  echo "⬇️  Downloading: $FILENAME..."
  curl -s -L -o "$FILEPATH" "$url"

  # 检查文件大小
  if [ -f "$FILEPATH" ]; then
    SIZE=$(stat -f%z "$FILEPATH" 2>/dev/null || stat -c%s "$FILEPATH" 2>/dev/null)
    if [ "$SIZE" -gt 10000 ]; then
      echo "✅ Success: $FILENAME ($SIZE bytes)"
    else
      echo "❌ Failed: $FILENAME (文件太小，删除)"
      rm -f "$FILEPATH"
    fi
  else
    echo "❌ Failed: $FILENAME"
  fi

  sleep 1
done

# 最终统计
FINAL_FEMALE=$(ls -1 "$FEMALE_DIR"/*.jpg 2>/dev/null | wc -l)
FINAL_MALE=$(ls -1 "$MALE_DIR"/*.jpg 2>/dev/null | wc -l)
TOTAL=$((FINAL_FEMALE + FINAL_MALE))

echo ""
echo "🎉 下载完成！"
echo ""
echo "📊 最终统计:"
echo "   Female: $CURRENT_FEMALE → $FINAL_FEMALE (+$((FINAL_FEMALE - CURRENT_FEMALE)))"
echo "   Male: $CURRENT_MALE → $FINAL_MALE (+$((FINAL_MALE - CURRENT_MALE)))"
echo "   Total: $((CURRENT_FEMALE + CURRENT_MALE)) → $TOTAL (+$((TOTAL - CURRENT_FEMALE - CURRENT_MALE)))"
echo ""

if [ "$TOTAL" -ge 200 ]; then
  echo "✅ 成功！已达到目标200+张图片！"
else
  echo "⚠️  当前${TOTAL}张，距离目标还差$((200 - TOTAL))张"
fi
