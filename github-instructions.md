# GitHub Üzerinden DiaDefense Projesini İndirme

## Adım 1: Emergent'te GitHub'a Bağlan

1. Emergent arayüzünde üst menüde **"Connect GitHub"** butonunu bulun
2. GitHub hesabınıza giriş yapın ve yetki verin
3. Yeni bir repository oluşturun: `diadefense-app`

## Adım 2: Push İşlemi

Emergent'te terminal açın ve:

```bash
cd /app
git init
git add .
git commit -m "Initial commit: DiaDefense app"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/diadefense-app.git
git push -u origin main
```

## Adım 3: Kendi Bilgisayarınızda Clone

Mac terminalinizde:

```bash
cd /Users/mahmutsahin/Desktop/
git clone https://github.com/KULLANICI_ADINIZ/diadefense-app.git diadefense-frontend
cd diadefense-frontend/frontend
yarn install
npx expo start
```

TAMAMLANDI! ✅
