export const products = [
  {
    id: "promax-ultra-x",
    name: "ProMax Ultra X",
    category: "Smartphones",
    icon: "📱",
    price: 79999,
    oldPrice: 99999,
    badge: "NEW",
    badgeType: "badge-new",
    desc: "6.7\" AMOLED, 200MP camera, 5G, 5000 mAh battery with 120W HyperCharge.",
    fullDesc: "The ProMax Ultra X defines next-generation smartphone performance. Powered by a custom 4nm flagship chipset, an edge-to-edge 6.7\" 120Hz dynamic AMOLED display, and a groundbreaking 200MP sensor with optical image stabilization, it captures lifelike photos in any lighting condition.",
    specs: [
      { label: "Display", value: "6.7\" Dynamic AMOLED 120Hz" },
      { label: "Processor", value: "Octa-Core Flagship 4nm" },
      { label: "Camera", value: "200MP Main + 50MP Ultra-Wide + 12MP Telephoto" },
      { label: "Battery", value: "5,000 mAh (120W HyperCharge)" },
      { label: "Storage", value: "256GB / 512GB UFS 4.0" },
      { label: "Connectivity", value: "5G Dual SIM, Wi-Fi 7, Bluetooth 5.4" }
    ],
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isFeatured: true
  },
  {
    id: "slatebook-pro-15",
    name: "SlateBook Pro 15",
    category: "Laptops",
    icon: "💻",
    price: 124999,
    oldPrice: 149999,
    badge: "HOT",
    badgeType: "badge-hot",
    desc: "Intel i9 14th Gen, 32 GB RAM, 1 TB NVMe SSD, 3.2K OLED display.",
    fullDesc: "Engineered for creators, developers, and power users. SlateBook Pro 15 pairs raw computing prowess with aerospace-grade aluminum chassis and a breathtaking 3.2K 120Hz OLED screen delivering 100% DCI-P3 color precision.",
    specs: [
      { label: "Processor", value: "Intel Core i9 14900H (14-Core, up to 5.8GHz)" },
      { label: "RAM", value: "32GB LPDDR5X 6400MHz" },
      { label: "Storage", value: "1TB PCIe Gen4 NVMe SSD" },
      { label: "Display", value: "15.6\" 3.2K OLED 120Hz (HDR 600 True Black)" },
      { label: "Graphics", value: "NVIDIA GeForce RTX 4070 8GB GDDR6" },
      { label: "Weight", value: "1.78 kg" }
    ],
    rating: 4.9,
    reviewsCount: 98,
    inStock: true,
    isFeatured: true
  },
  {
    id: "soundcore-pro-anc",
    name: "SoundCore Pro ANC",
    category: "Audio",
    icon: "🎧",
    price: 12499,
    oldPrice: 19999,
    badge: "SALE",
    badgeType: "badge-sale",
    desc: "Active noise cancellation, 40 hr battery, Hi-Res Audio, spatial sound.",
    fullDesc: "Immerse yourself in crystal acoustics. SoundCore Pro ANC leverages custom titanium drivers and dual adaptive noise cancellation microphones to silence up to 98% of ambient noise while delivering studio-mastered audio fidelity.",
    specs: [
      { label: "Noise Cancellation", value: "Adaptive Hybrid ANC up to -45dB" },
      { label: "Battery Life", value: "40 hrs (ANC On) / 60 hrs (ANC Off)" },
      { label: "Fast Charge", value: "10 mins charge = 5 hrs playback" },
      { label: "Codecs", value: "LDAC, AAC, SBC, Hi-Res Wireless" },
      { label: "Bluetooth", value: "v5.3 Multipoint connection" }
    ],
    rating: 4.8,
    reviewsCount: 230,
    inStock: true,
    isFeatured: true
  },
  {
    id: "pulsewatch-ultra",
    name: "PulseWatch Ultra",
    category: "Wearables",
    icon: "⌚",
    price: 24999,
    oldPrice: 34999,
    badge: "NEW",
    badgeType: "badge-new",
    desc: "Health monitoring, dual GPS, 7-day battery, 50m waterproof titanium body.",
    fullDesc: "Your ultimate adventure and wellness companion. Crafted with grade-5 titanium and sapphire crystal glass, PulseWatch Ultra monitors ECG, SpO2, heart rate variability, and sleep cycles with clinical accuracy.",
    specs: [
      { label: "Chassis", value: "Grade 5 Titanium & Sapphire Glass" },
      { label: "Display", value: "1.95\" Always-On Retina AMOLED (2000 nits)" },
      { label: "Water Resistance", value: "50m (5 ATM) + EN13319 dive certified" },
      { label: "Battery", value: "Up to 7 days typical use / 36 hrs GPS mode" },
      { label: "Sensors", value: "ECG, SpO2, Skin Temp, Dual-Frequency GPS" }
    ],
    rating: 4.7,
    reviewsCount: 75,
    inStock: true,
    isFeatured: true
  },
  {
    id: "snapmaster-4k",
    name: "SnapMaster 4K",
    category: "Cameras",
    icon: "📷",
    price: 89999,
    oldPrice: 109999,
    badge: "HOT",
    badgeType: "badge-hot",
    desc: "Mirrorless, 45 MP sensor, 8K video, 5-axis IBIS, dual-card slot.",
    fullDesc: "Designed for cinematic filmmakers and studio photographers. SnapMaster 4K packs a 45MP full-frame backside-illuminated sensor capable of 8K 30fps and 4K 120fps recording with 15+ stops of dynamic range.",
    specs: [
      { label: "Sensor", value: "45MP Full-Frame BSI CMOS" },
      { label: "Video", value: "8K 30p, 4K 120p 10-bit 4:2:2 internal" },
      { label: "Stabilization", value: "5-Axis In-Body Image Stabilization (8 stops)" },
      { label: "Autofocus", value: "AI Subject Detection (Human, Animal, Vehicle)" },
      { label: "Slots", value: "Dual CFexpress Type B / SD UHS-II" }
    ],
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    isFeatured: true
  },
  {
    id: "ultraview-32-monitor",
    name: "UltraView 32\" Monitor",
    category: "Displays",
    icon: "🖥️",
    price: 34999,
    oldPrice: 49999,
    badge: "SALE",
    badgeType: "badge-sale",
    desc: "4K IPS, 144 Hz, HDR600, 99% DCI-P3, USB-C 90W power delivery.",
    fullDesc: "Elevate your desktop setup. The UltraView 32 combines sharp 4K UHD clarity with buttery 144Hz refresh rate, certified VESA DisplayHDR 600, and single-cable USB-C hub connectivity for MacBook and PC laptops.",
    specs: [
      { label: "Resolution", value: "3840 x 2160 (4K UHD)" },
      { label: "Refresh Rate", value: "144Hz with AMD FreeSync Premium Pro" },
      { label: "Panel", value: "IPS with Quantum Dot Backlight" },
      { label: "Color Gamut", value: "99% DCI-P3, Delta E < 1 factory calibrated" },
      { label: "Ports", value: "USB-C 90W PD, 2x HDMI 2.1, 1x DP 1.4, USB Hub" }
    ],
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    isFeatured: true
  },
  {
    id: "gamepad-elite-x",
    name: "GamePad Elite X",
    category: "Gaming",
    icon: "🎮",
    price: 8999,
    oldPrice: 12999,
    badge: "NEW",
    badgeType: "badge-new",
    desc: "Wireless, Hall-effect magnetic triggers, haptic feedback, 20 hr play.",
    fullDesc: "Next-gen precision for competitive gamers. Zero stick-drift Hall Effect analog sticks, mechanical tactile micro-switches, customizable rear paddle triggers, and cross-platform compatibility across PC, PS5, Xbox, and iOS/Android.",
    specs: [
      { label: "Thumbsticks", value: "Hall-Effect Magnetic Anti-Drift" },
      { label: "Battery", value: "1000 mAh rechargeable (20+ hrs gameplay)" },
      { label: "Latency", value: "1ms Ultra-low latency 2.4GHz wireless & Bluetooth" },
      { label: "Customization", value: "4 mappable back paddles, hair trigger locks" }
    ],
    rating: 4.9,
    reviewsCount: 180,
    inStock: true,
    isFeatured: true
  },
  {
    id: "wifi-6e-router",
    name: "WiFi 6E Router",
    category: "Networking",
    icon: "📡",
    price: 14999,
    oldPrice: 18999,
    badge: "HOT",
    badgeType: "badge-hot",
    desc: "Tri-band 6GHz, 10 Gbps aggregate, AI mesh support, 3500 sqft coverage.",
    fullDesc: "Unleash Gigabit speeds across your home and office. Featuring the clean 6GHz frequency spectrum with ultra-wide 160MHz channels, beamforming antennas, and AI QoS prioritization for lag-free 8K streaming and online gaming.",
    specs: [
      { label: "Bands", value: "Tri-Band: 2.4GHz + 5GHz + 6GHz" },
      { label: "Speed", value: "Up to 10.8 Gbps aggregate theoretical bandwidth" },
      { label: "Coverage", value: "Up to 3,500 sq. ft. / 200+ connected devices" },
      { label: "Ports", value: "1x 2.5G WAN/LAN + 4x Gigabit LAN + USB 3.0" }
    ],
    rating: 4.7,
    reviewsCount: 88,
    inStock: true,
    isFeatured: true
  }
];

export const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Audio",
  "Wearables",
  "Cameras",
  "Displays",
  "Gaming",
  "Networking"
];
