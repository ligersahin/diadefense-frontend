#!/bin/bash

# DiaDefense Otomatik Transfer Script
# Mac'inizde çalıştırın

echo "🚀 DiaDefense Transfer Başlıyor..."

TARGET_DIR="/Users/mahmutsahin/Desktop/diadefense-frontend"

# Klasörleri oluştur
echo "📁 Klasörler oluşturuluyor..."
mkdir -p "$TARGET_DIR"/{app,src,assets}
mkdir -p "$TARGET_DIR/app/(tabs)"
mkdir -p "$TARGET_DIR/app/education"
mkdir -p "$TARGET_DIR/src"/{types,config,context,logic,components}
mkdir -p "$TARGET_DIR/src/config"/{program,education}
mkdir -p "$TARGET_DIR/assets/animations"

echo "✅ Klasörler hazır!"
echo ""
echo "📝 ŞİMDİ YAPMANIZ GEREKENLER:"
echo ""
echo "1. Emergent'te VS Code görünümünü açın"
echo "2. Sol panelde /app/frontend/ klasörünü bulun"
echo "3. Aşağıdaki dosyaları tek tek açıp kopyalayın:"
echo ""
echo "=== ROOT DOSYALAR ==="
echo "   - package.json → $TARGET_DIR/package.json"
echo "   - app.json → $TARGET_DIR/app.json"
echo "   - tsconfig.json → $TARGET_DIR/tsconfig.json"
echo "   - metro.config.js → $TARGET_DIR/metro.config.js"
echo ""
echo "=== APP DOSYALARI (13 dosya) ==="
echo "   - app/_layout.tsx"
echo "   - app/index.tsx"
echo "   - app/(tabs)/_layout.tsx"
echo "   - app/(tabs)/today.tsx"
echo "   - app/(tabs)/program.tsx"
echo "   - app/(tabs)/defense.tsx"
echo "   - app/(tabs)/tracking.tsx"
echo "   - app/(tabs)/info.tsx"
echo "   - app/menus.tsx"
echo "   - app/supplements.tsx"
echo "   - app/smartplate.tsx"
echo "   - app/settings.tsx"
echo "   - app/education/[id].tsx"
echo ""
echo "=== SRC DOSYALARI (9 dosya) ==="
echo "   - src/types/index.ts"
echo "   - src/config/program/tr-program.ts"
echo "   - src/config/education/tr-education.ts"
echo "   - src/context/DefenseProgramContext.tsx"
echo "   - src/logic/defiMessages.ts"
echo "   - src/components/Card.tsx"
echo "   - src/components/ProgressCircle.tsx"
echo "   - src/components/MonsterAnimation.tsx"
echo "   - src/components/DefiAnimation.tsx"
echo ""
echo "=== ASSETS (7 JSON dosya) ==="
echo "   - assets/animations/*.json (7 dosya)"
echo ""
echo "4. Tüm dosyalar kopyalandıktan sonra:"
echo ""
echo "   cd $TARGET_DIR"
echo "   yarn install"
echo "   npx expo start"
echo ""
echo "🎉 İyi çalışmalar!"

