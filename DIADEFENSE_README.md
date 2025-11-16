# 🛡️ DiaDefense - Diyabet Savunma Sistemi

## 📖 Genel Bakış

DiaDefense, diyabet yönetimini kolaylaştıran kapsamlı bir mobil uygulamadır. 90 günlük özelleştirilmiş program, animasyonlu geri bildirim sistemi ve akıllı izleme özellikleriyle diyabet hastalarına günlük yaşamlarında rehberlik eder.

## ✨ Ana Özellikler

### 1. **Savunma Program Context'i (Merkezi Beyin)**
- `DefenseProgramContext` tüm uygulamanın state yönetimini sağlar
- AsyncStorage ile kalıcı veri saklama
- Otomatik günlük reset (gece yarısı)
- Gerçek zamanlı savunma skoru hesaplama

### 2. **90 Günlük Program**
- Config-driven içerik sistemi
- Günlük öğün planları
- Supplement programı
- Aktivite, su ve uyku hedefleri
- **İçerik ekleme:** `src/config/program/tr-program.ts` dosyasını düzenleyin

### 3. **Animasyonlu Karakterler**
- **Diyabet Canavarı:** 3 durum (weak/neutral/angry)
  - Savunma skoruna göre değişir
  - Lottie animasyonları: `assets/animations/monster_*.json`
- **Defi (Koruyucu):** 4 ruh hali (idle/happy/concerned/warning)
  - Akıllı mesaj sistemi
  - Kullanıcıyı yönlendirir ve motive eder
  - Lottie animasyonları: `assets/animations/defi_*.json`

### 4. **Modüller**

#### 📱 Bugün Ekranı (TodayScreen)
- Günlük özet dashboard
- Canavar ve Defi animasyonları
- Savunma skoru göstergesi
- Görev kartları (öğünler, supplement, su, spor, uyku)

#### 🍽️ Menüler (MenusScreen)
- Günlük öğün listesi (kahvaltı, öğle, akşam, ara öğün)
- Checkbox ile tamamlama
- Gerçek zamanlı progress tracking

#### 💊 Supplementler (SupplementsScreen)
- Zamana göre düzenlenmiş supplement listesi
- Dozu ve zamanı gösterir
- Tamamlama işaretleme

#### 📸 Akıllı Tabak (SmartPlateScreen)
- Kamera veya galeri ile fotoğraf
- Dummy AI analizi (gerçek AI entegrasyonu için hazır)
- Besin değerleri tahmini
- Glisemik yük hesaplama

#### 🛡️ Savunma Paneli (DefensePanelScreen)
- Büyük savunma skoru göstergesi
- Mini canavar animasyonu
- 5 oran kartı (öğün, supplement, su, aktivite, uyku)
- Defi yorumu

#### 📊 İzleme (TrackingScreen)
- Su içme tracker (+ ekle butonu)
- Aktivite skoru (0-100)
- Uyku saatleri
- Kan değerleri (glikoz, tansiyon)

#### 📚 Bilgi & Eğitim (InfoScreen + EducationDetailScreen)
- Kritik uyarılar (hipoglisemi, ayak bakımı, ilaç saatleri)
- Eğitim dersleri (diyabet nedir, GI, egzersiz, stres)
- İçerik: `src/config/education/tr-education.ts`
- Kritik içerik için onay checkbox'ı (AsyncStorage)

#### ⚙️ Ayarlar (SettingsScreen)
- Program başlatma / sıfırlama
- Başlangıç tarihi gösterimi
- Uygulama hakkında bilgiler

## 📂 Proje Yapısı

```
/app/frontend/
├── app/                          # Expo Router (file-based routing)
│   ├── (tabs)/                   # Tab navigation
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── today.tsx            # Ana ekran
│   │   ├── program.tsx          # Program hub
│   │   ├── defense.tsx          # Savunma paneli
│   │   ├── tracking.tsx         # İzleme
│   │   └── info.tsx             # Bilgi merkezi
│   ├── education/
│   │   └── [id].tsx             # Dinamik eğitim detay
│   ├── menus.tsx                # Menüler
│   ├── supplements.tsx          # Supplementler
│   ├── smartplate.tsx           # Akıllı tabak
│   ├── settings.tsx             # Ayarlar
│   ├── _layout.tsx              # Root layout + Context Provider
│   └── index.tsx                # Splash screen
├── src/
│   ├── components/              # Yeniden kullanılabilir bileşenler
│   │   ├── Card.tsx
│   │   ├── ProgressCircle.tsx
│   │   ├── MonsterAnimation.tsx
│   │   └── DefiAnimation.tsx
│   ├── config/                  # İçerik dosyaları
│   │   ├── program/
│   │   │   └── tr-program.ts   # 90 günlük program
│   │   └── education/
│   │       └── tr-education.ts  # Eğitim içerikleri
│   ├── context/
│   │   └── DefenseProgramContext.tsx  # Merkezi state yönetimi
│   ├── logic/
│   │   └── defiMessages.ts      # Defi mesaj sistemi
│   └── types/
│       └── index.ts             # TypeScript tipleri
└── assets/
    └── animations/              # Lottie JSON dosyaları
        ├── monster_rest.json
        ├── monster_think.json
        ├── monster_angry.json
        ├── defi_idle.json
        ├── defi_happy.json
        ├── defi_concerned.json
        └── defi_warning.json
```

## 🔧 İçerik Güncelleme Rehberi

### 90 Günlük Programı Genişletme

**Dosya:** `/app/frontend/src/config/program/tr-program.ts`

```typescript
export const TR_PROGRAM: DayPlan[] = [
  // Mevcut 5 gün var, 85 gün daha ekleyebilirsiniz
  {
    dayIndex: 6,
    label: 'Gün 6',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: 'Yumurta, ekmek, sebze...'
      },
      // ... diğer öğünler
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      // ... diğer supplementler
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 8000,
      sleepHours: 7
    }
  },
  // Gün 7, 8, 9... 90
];
```

### Eğitim İçeriği Ekleme

**Dosya:** `/app/frontend/src/config/education/tr-education.ts`

```typescript
export const TR_EDUCATION: EducationSection[] = [
  {
    id: 'lesson5',
    type: 'lesson', // veya 'warning'
    title: '📚 Yeni Ders',
    shortDescription: 'Kısa açıklama',
    content: 'Uzun içerik metni...',
    isCritical: false, // true ise onay checkbox gösterir
    order: 8
  },
  // ... diğer içerikler
];
```

### Animasyon Değiştirme

Gerçek Lottie animasyonlarınızı şu klasöre ekleyin:
`/app/frontend/assets/animations/`

Dosya adları:
- `defi_idle.json`
- `defi_happy.json`
- `defi_concerned.json`
- `defi_warning.json`
- `monster_rest.json` (zaten mevcut)
- `monster_think.json` (zaten mevcut)
- `monster_angry.json` (zaten mevcut)

## 🎨 Tasarım Sistemi

### Renkler
- **Primary (Zümrüt Yeşili):** `#10B981`
- **Accent (Altın/Amber):** `#F59E0B`
- **Danger (Kırmızı):** `#EF4444`
- **Info (Mavi):** `#3B82F6`
- **Violet:** `#8B5CF6`
- **Indigo:** `#6366F1`
- **Background:** `#F3F4F6`

### Tipografi
- Başlıklar: 20-32pt, bold
- Paragraf: 14-16pt
- Caption: 12pt

## 🧮 Savunma Skoru Hesaplama

```
Temel Skor = 
  Öğün Oranı * 30 +
  Supplement Oranı * 20 +
  Su Oranı * 15 +
  Aktivite Oranı * 20 +
  Uyku Oranı * 15

Kan Değeri Bonus:
  - Glikoz < 70: -10
  - Glikoz > 180: -5
  - Glikoz 80-120: +5

Final Skor = Temel Skor + Kan Bonus (0-100 arası)
```

### Canavar State'leri
- **weak:** Skor ≥ 70
- **neutral:** Skor 40-69
- **angry:** Skor < 40

### Defi Ruh Halleri
- **happy:** Skor ≥ 80
- **idle/concerned:** Skor 40-79
- **warning:** Skor < 40

## 🚀 Çalıştırma

```bash
# Frontend'i yeniden başlat
sudo supervisorctl restart expo

# Logları görüntüle
tail -f /var/log/supervisor/expo.out.log
tail -f /var/log/supervisor/expo.err.log
```

## 📱 Test

- **Web Preview:** Expo loglarında görünen URL'yi açın
- **Expo Go:** QR kodu ile mobil cihazda test edin

## 🔮 Gelecek Geliştirmeler

### AI Entegrasyonu
`SmartPlateScreen` dummy analiz yapıyor. Gerçek AI entegrasyonu için:
1. OpenAI Vision API veya benzeri servis
2. `analyzeImage()` fonksiyonunu güncelleyin
3. Backend endpoint oluşturun (opsiyonel)

### Backend Entegrasyonu (Opsiyonel)
Şu anda tüm veri lokal (AsyncStorage). Uzak senkronizasyon için:
1. MongoDB/Backend API endpoint'leri
2. Context'te API çağrıları
3. Offline-first stratejisi

### Bildirimler
- `expo-notifications` kullanın
- Supplement hatırlatmaları
- Günlük motivasyon mesajları

### Çoklu Dil
- Halihazırda dosya yapısı hazır
- `src/config/program/de-program.ts` ve `en-program.ts` ekleyin
- Context'te dil seçim logic'i

## 📄 Lisans

Bu proje size özeldir. İçerikleri dilediğiniz gibi düzenleyebilirsiniz.

## 🤝 Destek

Sorularınız için:
1. Bu README'yi inceleyin
2. TypeScript type tanımlarına bakın (`src/types/index.ts`)
3. Context logic'ini inceleyin (`src/context/DefenseProgramContext.tsx`)

---

**Hazırlayan:** AI Assistant
**Tarih:** 2025
**Versiyon:** 1.0.0

İyi şanslar! 🎉 DiaDefense ile diyabet yönetimi artık çok daha kolay! 💪
