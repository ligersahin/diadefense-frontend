# DiaDefense Manuel Dosya Transfer Rehberi

## ADIM 1: Mac'inizde Klasörleri Oluşturun

Terminal'de:

```bash
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/{app,src,assets}
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/app/\(tabs\)
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/app/education
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/src/{types,config,context,logic,components}
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/src/config/{program,education}
mkdir -p /Users/mahmutsahin/Desktop/diadefense-frontend/assets/animations
```

## ADIM 2: Kopyalanacak Dosyalar

### Kritik Dosyalar (Emergent VS Code'dan kopyalayın):

**Root Klasörü:**
- `package.json`
- `app.json`
- `tsconfig.json`
- `metro.config.js`
- `.env` (varsa)

**app/ klasörü:**
- `app/_layout.tsx`
- `app/index.tsx`
- `app/(tabs)/_layout.tsx`
- `app/(tabs)/today.tsx`
- `app/(tabs)/program.tsx`
- `app/(tabs)/defense.tsx`
- `app/(tabs)/tracking.tsx`
- `app/(tabs)/info.tsx`
- `app/menus.tsx`
- `app/supplements.tsx`
- `app/smartplate.tsx`
- `app/settings.tsx`
- `app/education/[id].tsx`

**src/ klasörü:**
- `src/types/index.ts`
- `src/config/program/tr-program.ts`
- `src/config/education/tr-education.ts`
- `src/context/DefenseProgramContext.tsx`
- `src/logic/defiMessages.ts`
- `src/components/Card.tsx`
- `src/components/ProgressCircle.tsx`
- `src/components/MonsterAnimation.tsx`
- `src/components/DefiAnimation.tsx`

**assets/ klasörü:**
- `assets/animations/monster_rest.json`
- `assets/animations/monster_think.json`
- `assets/animations/monster_angry.json`
- `assets/animations/defi_idle.json`
- `assets/animations/defi_happy.json`
- `assets/animations/defi_concerned.json`
- `assets/animations/defi_warning.json`

## ADIM 3: Paketleri Kurun

Mac'inizde terminal:

```bash
cd /Users/mahmutsahin/Desktop/diadefense-frontend
yarn install
# veya
npm install
```

## ADIM 4: Çalıştırın

```bash
npx expo start
```

TAMAMLANDI! ✅
