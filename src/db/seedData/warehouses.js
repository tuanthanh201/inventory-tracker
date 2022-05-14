const ObjectId = require('mongodb').ObjectId

module.exports = warehouses = [
  {
    _id: ObjectId('627dcd83d3c772be761409ba'),
    name: 'Warehouse 1',
    location: '77 Clarence St, Ottawa, ON K1N 5P5',
    description: 'A rather old warehouse',
    image: 'f1621fc0-a9ff-484d-96ad-91432e34bc16',
    createdAt: new Date(1652411779778),
    __v: 0,
  },
  {
    _id: ObjectId('627dce9fd3c772be761409c2'),
    name: 'Warehouse 2',
    location: '2745 Village Green Road, Village Green, C1B 3V3',
    description: 'A warehouse that was built recently',
    image: 'cba1f684-09fb-4a15-b72d-15520a9fc0e5',
    createdAt: new Date(1652412063942),
    __v: 0,
  },
  {
    _id: ObjectId('627dcf26d3c772be761409cc'),
    name: 'Warehouse 3',
    location: '3347 Benton Street, Kitchener, N2G 4L9',
    description: 'A typical warehouse that can be found anywhere',
    image: '248df38f-7edb-4440-8b45-659b2d8e8b94',
    createdAt: new Date(1652412198303),
    __v: 0,
  },
]
