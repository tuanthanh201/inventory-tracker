const ObjectId = require('mongodb').ObjectId

module.exports = items = [
  {
    _id: ObjectId('627dd2546cf72f1de4319266'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'MacBook Pro',
    description:
      '2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray',
    image: '2ebb3f2c-36ec-490a-aea1-09b554eb1f1a',
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd3326cf72f1de43192ca'),
      },
    ],
    quantity: 140,
    createdAt: new Date(1652413012373),
    __v: 1,
  },
  {
    _id: ObjectId('627dd2546cf72f1de431926f'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Apple Watch',
    description:
      'Apple Watch Series 3 (GPS, 38mm) - Silver Aluminium Case with White Sport Band ',
    image: '84b85ebb-f040-40ad-a8c7-a69b9cd5907c',
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd3286cf72f1de43192bf'),
      },
    ],
    quantity: 70,
    createdAt: new Date(1652413012754),
    __v: 1,
  },
  {
    _id: ObjectId('627dd2546cf72f1de4319278'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Iphone XR',
    description: 'Apple iPhone XR, 64GB, Black - Fully Unlocked (Renewed) ',
    image: 'e9d1ce4f-a51e-415a-b03e-14f36a561fe1',
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd34e6cf72f1de43192d3'),
      },
    ],
    quantity: 125,
    createdAt: new Date(1652413012908),
    __v: 2,
  },
  {
    _id: ObjectId('627dd4fc6cf72f1de43192da'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Heat pad',
    description:
      'Heating Pad,OWZ Electric Heat Pads Fast Heating Warm Pad 6 Temperature Settings',
    image: '4eb1381c-4f6b-45bb-b38d-3186b7c233c6',
    quantity: 100,
    tags: [
      {
        tagId: ObjectId('627dd55c6cf72f1de43192f3'),
        content: 'health',
        _id: ObjectId('627dd5bb6cf72f1de4319311'),
      },
      {
        tagId: ObjectId('627dd5bb6cf72f1de4319313'),
        content: 'heatpad',
        _id: ObjectId('627dd5bb6cf72f1de4319315'),
      },
    ],
    createdAt: new Date(1652413692683),
    __v: 1,
  },
  {
    _id: ObjectId('627dd4fc6cf72f1de43192e1'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Coffee Machine',
    description: 'Braun BrewSense Drip Coffee Maker - 12 Cup - KF7150BK, Black',
    image: 'ab6d5273-b713-42a1-b79d-99cd53bd2bb1',
    quantity: 55,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd5a36cf72f1de4319302'),
      },
      {
        tagId: ObjectId('627dd5a36cf72f1de4319304'),
        content: 'kitchen',
        _id: ObjectId('627dd5a36cf72f1de4319306'),
      },
    ],
    createdAt: new Date(1652413692832),
    __v: 1,
  },
  {
    _id: ObjectId('627dd4fc6cf72f1de43192e8'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Eletric toothbrush',
    description: '5 Modes Powerful Cleaning Whitening Ultrasonic Toothbrush',
    image: '037aeb98-f451-4054-8411-ce07ef22e9c2',
    quantity: 80,
    tags: [
      {
        tagId: ObjectId('627dd55c6cf72f1de43192f3'),
        content: 'health',
        _id: ObjectId('627dd55c6cf72f1de43192f5'),
      },
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd55c6cf72f1de43192f7'),
      },
    ],
    createdAt: new Date(1652413692996),
    __v: 1,
  },
  {
    _id: ObjectId('627dd67e6cf72f1de431931c'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Keyboard Cleaner',
    description: 'Vacuum Keyboard Cleaner 3-in-1 for Keyboard Cleaning',
    image: '69619039-8cbb-4e98-8884-0ec14cfea339',
    quantity: 44,
    tags: [],
    createdAt: new Date(1652414078458),
    __v: 0,
  },
  {
    _id: ObjectId('627dd67e6cf72f1de4319323'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Wireless Mouse',
    description:
      'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life',
    image: '1dd9fa45-52e1-4e35-b8ba-3adb0cc17860',
    quantity: 87,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd6a76cf72f1de4319344'),
      },
    ],
    createdAt: new Date(1652414078592),
    __v: 1,
  },
  {
    _id: ObjectId('627dd67e6cf72f1de431932a'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Headphones',
    description:
      'JBL Tune 125BT Wireless in-Ear Bluetooth Headphones, 16 Hour Playtime - Blue',
    image: 'b11b45cc-6c1d-427a-bb88-47c3faa0ecff',
    quantity: 80,
    tags: [
      {
        tagId: ObjectId('627dd69a6cf72f1de4319335'),
        content: 'entertainment',
        _id: ObjectId('627dd69a6cf72f1de4319337'),
      },
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd69a6cf72f1de4319339'),
      },
    ],
    createdAt: new Date(1652414078708),
    __v: 1,
  },
  {
    _id: ObjectId('627dd7736cf72f1de4319354'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Notebooks & Pens',
    description:
      '2 Pack Graph Paper Spiral Notebook with Free Gel Pens, A5 Grid Match Notebook, 160-Page 80-Sheet 5.5 x 8.3 inch',
    image: '06aeb025-51c7-4499-89de-9c2470222aca',
    quantity: 35,
    tags: [
      {
        tagId: ObjectId('627dd8166cf72f1de431938d'),
        content: 'office',
        _id: ObjectId('627dd8166cf72f1de431938f'),
      },
      {
        tagId: ObjectId('627dd8166cf72f1de4319391'),
        content: 'school',
        _id: ObjectId('627dd8166cf72f1de4319393'),
      },
      {
        tagId: ObjectId('627dd8166cf72f1de4319395'),
        content: 'notebooks',
        _id: ObjectId('627dd8166cf72f1de4319397'),
      },
    ],
    createdAt: new Date(1652414323080),
    __v: 1,
  },
  {
    _id: ObjectId('627dd7736cf72f1de431935a'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'USB Hub',
    description:
      'USB Hub 3.0 Vertical Data Hub with Long Cord - 4 Port Black & White Charger Splitter USB Extension Cable',
    image: '003f8d03-b687-43e7-9b5d-2ecd256d37c5',
    quantity: 57,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd7c76cf72f1de431937e'),
      },
      {
        tagId: ObjectId('627dd7c76cf72f1de4319380'),
        content: 'usb',
        _id: ObjectId('627dd7c76cf72f1de4319382'),
      },
    ],
    createdAt: new Date(1652414323198),
    __v: 1,
  },
  {
    _id: ObjectId('627dd7736cf72f1de431935f'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Camera',
    description:
      'Baby Monitor Surveillance IP Camera with Night Vision, 2-Way Audio, Human Motion Detection',
    image: '5a8647bb-4f09-4680-af62-8ffcb998e8c9',
    quantity: 50,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd7a36cf72f1de431936b'),
      },
      {
        tagId: ObjectId('627dd7a36cf72f1de431936d'),
        content: 'security',
        _id: ObjectId('627dd7a36cf72f1de431936f'),
      },
      {
        tagId: ObjectId('627dd7a36cf72f1de4319371'),
        content: 'camera',
        _id: ObjectId('627dd7a36cf72f1de4319373'),
      },
    ],
    createdAt: new Date(1652414323299),
    __v: 1,
  },
  {
    _id: ObjectId('627dd8f56cf72f1de43193a6'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Keyboard',
    description:
      'Logitech K360 Compact Wireless Keyboard for Windows, 2.4GHz Wireless, USB Unifying Receiver',
    image: 'dd708fc3-6901-4a7c-b638-3f264e8848fa',
    quantity: 57,
    tags: [],
    createdAt: new Date(1652414709315),
    __v: 0,
  },
  {
    _id: ObjectId('627dd8f56cf72f1de43193ad'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Headphones',
    description:
      'Soundcore by Anker Life Q35 Multi Mode Active Noise Cancelling Headphones',
    image: '01ceab72-ccb3-4944-9786-535fb39b27a2',
    quantity: 65,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dd9946cf72f1de43193e0'),
      },
    ],
    createdAt: new Date(1652414709444),
    __v: 2,
  },
  {
    _id: ObjectId('627dd8f56cf72f1de43193b4'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Air Conditioner',
    description:
      'Portable Air Conditioner Evaporative Air Conditioner Fan with Double Water Tank 4 Speeds 8H Timer 7 Colors',
    image: '6deb1c0f-d78c-4cdc-b420-b1e61bf91bdd',
    quantity: 60,
    tags: [
      {
        tagId: ObjectId('627dd9096cf72f1de43193bf'),
        content: 'home',
        _id: ObjectId('627dd9096cf72f1de43193c1'),
      },
      {
        tagId: ObjectId('627dd5a36cf72f1de4319304'),
        content: 'kitchen',
        _id: ObjectId('627dd9096cf72f1de43193c3'),
      },
    ],
    createdAt: new Date(1652414709574),
    __v: 1,
  },
  {
    _id: ObjectId('627dda7c6cf72f1de43193ef'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Webcam',
    description:
      'HD Webcam for Video Calling, Recording, Conferencing, Streaming, Gaming',
    image: 'c577b4a4-4f1b-4859-8ff9-b444b26d664c',
    quantity: 35,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627ddad96cf72f1de431941d'),
      },
      {
        tagId: ObjectId('627dd7a36cf72f1de4319371'),
        content: 'camera',
        _id: ObjectId('627ddad96cf72f1de431941f'),
      },
    ],
    createdAt: new Date(1652415100838),
    __v: 1,
  },
  {
    _id: ObjectId('627dda7d6cf72f1de43193f6'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Mouse Pad',
    description:
      'Small Mouse Pad 6 x 8 Inch, Audimi Mini Mouse Pad Thick for Laptop Wireless Mouse Home Office Travel, Portable & Washable (Black)',
    image: '1ea65382-4587-4fe6-b8a8-a1bf6752e9a0',
    quantity: 78,
    tags: [],
    createdAt: new Date(1652415101007),
    __v: 0,
  },
  {
    _id: ObjectId('627dda7d6cf72f1de43193fd'),
    warehouse: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Digital Scale',
    description: 'Etekcity Digital Bathroom Body Weight Scale',
    image: '8ce5b5d8-67a9-445d-8463-e37e392c3fa4',
    quantity: 25,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627dda926cf72f1de4319407'),
      },
    ],
    createdAt: new Date(1652415101123),
    __v: 1,
  },
  {
    _id: ObjectId('627ddb876cf72f1de4319429'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Speaker',
    description:
      'Bose Home Speaker 500 with Alexa Voice Control Built-in, Black',
    image: 'c4d610bb-0911-430b-8c02-85063d4d4a4f',
    quantity: 44,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627ddbdf6cf72f1de4319469'),
      },
      {
        tagId: ObjectId('627ddbaf6cf72f1de4319451'),
        content: 'speaker',
        _id: ObjectId('627ddbdf6cf72f1de431946b'),
      },
    ],
    createdAt: new Date(1652415367552),
    __v: 1,
  },
  {
    _id: ObjectId('627ddb876cf72f1de4319430'),
    warehouse: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Speaker',
    description:
      'JBL Boombox Portable Waterproof Wireless Bluetooth Speaker with up to 24 Hours of Battery Life - Black ',
    image: 'f7e4f7f0-d29d-4943-9d0f-4f3e09d01bf2',
    quantity: 52,
    tags: [
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627ddbd06cf72f1de431945c'),
      },
      {
        tagId: ObjectId('627ddbaf6cf72f1de4319451'),
        content: 'speaker',
        _id: ObjectId('627ddbd06cf72f1de431945e'),
      },
    ],
    createdAt: new Date(1652415367672),
    __v: 2,
  },
  {
    _id: ObjectId('627ddb876cf72f1de4319437'),
    warehouse: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Tripod',
    description:
      'Portable Cellphone Camera Tripod with Bluetooth Remote, Compatible with iPhone and Android Phone, Great for Selfies/Vlogging/Streaming',
    image: 'daef2135-0e3e-4e1d-8158-108defb40dd8',
    quantity: 20,
    tags: [
      {
        tagId: ObjectId('627dd7a36cf72f1de4319371'),
        content: 'camera',
        _id: ObjectId('627ddb946cf72f1de4319442'),
      },
      {
        tagId: ObjectId('627dcff2d3c772be761409d2'),
        content: 'electronics',
        _id: ObjectId('627ddb946cf72f1de4319444'),
      },
    ],
    createdAt: new Date(1652415367796),
    __v: 1,
  },
]
