import { DayPlan } from '../../types';

// 90 günlük program - şimdilik 7 günlük örnek
// Kullanıcı bu dosyayı doldurarak program içeriğini genişletebilir

export const TR_PROGRAM: DayPlan[] = [
  {
    dayIndex: 1,
    label: 'Gün 1 - Başlangıç',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: '2 yumurta (haşlanmış), 1 dilim kepekli ekmek, domates, salatalık, 5-6 zeytin'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: '1 porsiyon yoğurt (200ml), 5-6 çiğ badem'
      },
      {
        slot: 'lunch',
        title: 'Öğle Yemeği',
        description: 'Izgara tavuk (150g), bulgur pilavı (3 yemek kaşığı), bol yeşillik salata'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: '1 orta boy elma'
      },
      {
        slot: 'dinner',
        title: 'Akşam Yemeği',
        description: 'Sebzeli balık (150g), haşlanmış brokoli ve havuç'
      }
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      {
        id: 'sup2',
        time: '12:00',
        name: 'Vitamin D3',
        dose: '2000 IU'
      },
      {
        id: 'sup3',
        time: '20:00',
        name: 'Omega-3',
        dose: '1000mg'
      }
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 8000,
      sleepHours: 7
    }
  },
  {
    dayIndex: 2,
    label: 'Gün 2',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: 'Yulaf ezmesi (5 kaşık), süt (200ml), çilek (5-6 adet)'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: '1 avuç çiğ ceviz'
      },
      {
        slot: 'lunch',
        title: 'Öğle Yemeği',
        description: 'Etli kuru fasulye (et 100g), cacık, salata'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: 'Ayran (1 bardak)'
      },
      {
        slot: 'dinner',
        title: 'Akşam Yemeği',
        description: 'Tavuklu sebze sote (150g tavuk), yeşil salata'
      }
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      {
        id: 'sup2',
        time: '12:00',
        name: 'Vitamin D3',
        dose: '2000 IU'
      },
      {
        id: 'sup3',
        time: '20:00',
        name: 'Omega-3',
        dose: '1000mg'
      }
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 8000,
      sleepHours: 7
    }
  },
  {
    dayIndex: 3,
    label: 'Gün 3',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: 'Omlet (2 yumurta), tam buğday ekmeği (1 dilim), avokado (yarım)'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: '1 orta boy armut'
      },
      {
        slot: 'lunch',
        title: 'Öğle Yemeği',
        description: 'Izgara köfte (100g), kinoa salatası'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: 'Bitter çikolata (2 kare, %70)'
      },
      {
        slot: 'dinner',
        title: 'Akşam Yemeği',
        description: 'Sebze yemeği (patlıcan, kabak), yoğurt'
      }
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      {
        id: 'sup2',
        time: '12:00',
        name: 'Vitamin D3',
        dose: '2000 IU'
      },
      {
        id: 'sup3',
        time: '20:00',
        name: 'Omega-3',
        dose: '1000mg'
      }
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 9000,
      sleepHours: 7.5
    }
  },
  {
    dayIndex: 4,
    label: 'Gün 4',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: 'Yulaf ezmesi bowl (muz, chia tohumları, fındık)'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: 'Kefir (1 bardak), 3-4 ceviz'
      },
      {
        slot: 'lunch',
        title: 'Öğle Yemeği',
        description: 'Sebzeli tavuk güveç (150g), salata'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: '1 küçük boy muz'
      },
      {
        slot: 'dinner',
        title: 'Akşam Yemeği',
        description: 'Izgara somon (120g), buharda sebze'
      }
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      {
        id: 'sup2',
        time: '12:00',
        name: 'Vitamin D3',
        dose: '2000 IU'
      },
      {
        id: 'sup3',
        time: '20:00',
        name: 'Omega-3',
        dose: '1000mg'
      }
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 8500,
      sleepHours: 7
    }
  },
  {
    dayIndex: 5,
    label: 'Gün 5',
    meals: [
      {
        slot: 'breakfast',
        title: 'Kahvaltı',
        description: 'Peynir (50g), tam buğday ekmeği (2 dilim), domates, salatalık'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: 'Portakal (1 orta boy)'
      },
      {
        slot: 'lunch',
        title: 'Öğle Yemeği',
        description: 'Mercimek çorbası, tavuk şiş (100g), bulgur pilavı (3 kaşık)'
      },
      {
        slot: 'snack',
        title: 'Ara Öğün',
        description: 'Yoğurt (150ml), 1 tatlı kaşığı bal'
      },
      {
        slot: 'dinner',
        title: 'Akşam Yemeği',
        description: 'Sebze sote, çorba'
      }
    ],
    supplements: [
      {
        id: 'sup1',
        time: '08:00',
        name: 'Magnezyum',
        dose: '400mg'
      },
      {
        id: 'sup2',
        time: '12:00',
        name: 'Vitamin D3',
        dose: '2000 IU'
      },
      {
        id: 'sup3',
        time: '20:00',
        name: 'Omega-3',
        dose: '1000mg'
      }
    ],
    defenseTargets: {
      waterLiters: 2.5,
      steps: 8000,
      sleepHours: 7.5
    }
  }
  // Gün 6-90 buraya eklenecek
  // Kullanıcı bu formatı kullanarak tüm programı doldurabilir
];
