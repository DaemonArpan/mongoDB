use TechLibrary
switched to db TechLibrary
db.createCollection("techProducts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["productId", "type", "brand", "model", "price"],
      properties: {
        productId: {
          bsonType: "string",
          pattern: "^[A-Z]{2,}-[0-9]{1,}$",
          description: "Product ID must follow format: XX-000"
        },
        type: {
          enum: ["laptop", "smartphone", "tablet", "smartwatch"],
          description: "Product type must be one of the specified values"
        },
        price: {
          bsonType: "double",
          minimum: 0,
          description: "Price must be a positive number"
        }
      }
    }
  }
})
{ ok: 1 }
// laptopdocuments 
db.techProducts.insertMany([
  {
    "productId": "ANISHLAP-01",
    "type": "laptop",
    "brand": "Dell",
    "model": "ALIENWARE ",
    "price": 1299.99,
    "specifications": {
      "processor": {
        "brand": "Intel",
        "model": "Core i7-1165G7",
        "cores": 4,
        "baseSpeed": "2.8GHz"
      },
      "memory": {
        "RAM": "16GB",
        "type": "LPDDR5x"
      },
      "storage": {
        "capacity": "512GB",
        "type": "NVMe SSD"
      },
      "graphics": {
        "type": "integrated",
        "model": "GTX 4050"
      }
    },
    "shipping": {
      "dimensions": {
        "width": 296.0,
        "height": 14.8,
        "depth": 199.0
      },
      "weight": 1200
    },
    "releaseDate": ISODate("2025-03-15T00:00:00Z"),
    "availability": true
  },
  {
    "productId": "ANISHLP-2",
    "type": "laptop",
    "brand": "Apple",
    "model": "MacBook Air M2",
    "price": 1199.99,
    "specifications": {
      "processor": {
        "brand": "Apple",
        "model": "M4",
        "cores": 8
      },
      "memory": {
        "RAM": "8GB",
        "type": "Unified Memory"
      },
      "storage": {
        "capacity": "256GB",
        "type": "SSD"
      },
      "graphics": {
        "type": "integrated",
        "model": "8-core GPU"
      }
    },
    "shipping": {
      "dimensions": {
        "width": 304.1,
        "height": 11.3,
        "depth": 215.0
      },
      "weight": 1240
    },
    "releaseDate": ISODate("2025-07-15T00:00:00Z"),
    "availability": true
  }
])

// Smartphone Documents
db.techProducts.insertMany([
  {
    "productId": "SPANISH-1",
    "type": "smartphone",
    "brand": "Samsung",
    "model": "Galaxy S25",
    "price": 799.99,
    "specifications": {
      "camera": {
        "rear": [
          {
            "megapixels": 50,
            "aperture": "f/1.8",
            "type": "main"
          }
        ],
        "front": {
          "megapixels": 12,
          "aperture": "f/2.2"
        }
      },
      "battery": {
        "capacity": 4000,
        "unit": "mAh"
      },
      "operatingSystem": {
        "name": "Android",
        "version": "14"
      }
    },
    "shipping": {
      "dimensions": {
        "width": 70.6,
        "height": 147.0,
        "depth": 7.6.0
      },
      "weight": 167
    },
    "releaseDate": ISODate("2025-01-24T00:00:00Z"),
    "availability": true
  },
  {
    "productId": "SPANISH-2",
    "type": "smartphone",
    "brand": "Apple",
    "model": "iPhone 17",
    "price": 799.99,
    "specifications": {
      "camera": {
        "rear": [
          {
            "megapixels": 48,
            "aperture": "f/1.6",
            "type": "main"
          }
        ],
        "front": {
          "megapixels": 12,
          "aperture": "f/1.9"
        }
      },
      "battery": {
        "capacity": 3349,
        "unit": "mAh"
      },
      "operatingSystem": {
        "name": "iOS",
        "version": "17"
      }
    },
    "shipping": {
      "dimensions": {
        "width": 71.6,
        "height": 147.6,
        "depth": 7.8
      },
      "weight": 171
    },
    "releaseDate": ISODate("2025-09-22T00:00:00Z"),
    "availability": true
  }
])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('68cfdc9c96b094a3784f4340'),
    '1': ObjectId('68cfdc9c96b094a3784f4341')
  }
}
// Primary Indexes for Common Queries
db.techProducts.createIndex({ "brand": 1, "type": 1 })
db.techProducts.createIndex({ "price": 1 })
db.techProducts.createIndex({ "shipping.weight": 1 })
db.techProducts.createIndex({ "specifications.operatingSystem.name": 1 })
db.techProducts.createIndex({ "model": 1 })
db.techProducts.createIndex({ "specifications.processor.brand": 1 })

// Compound Index for Complex Queries
db.techProducts.createIndex({ 
  "type": 1, 
  "price": 1, 
  "shipping.weight": 1 
})

// Text Index for Product Search
db.techProducts.createIndex({
  "brand": "text",
  "model": "text",
  "specifications.processor.model": "text"
})
brand_text_model_text_specifications.processor.model_text
db.techProducts.find().pretty()
{
  _id: ObjectId('68cfdc9c96b094a3784f433e'),
  productId: 'ANISHLAP-01',
  type: 'laptop',
  brand: 'Dell',
  model: 'ALIENWARE ',
  price: 1299.99,
  specifications: {
    processor: {
      brand: 'Intel',
      model: 'Core i7-1165G7',
      cores: 4,
      baseSpeed: '2.8GHz'
    },
    memory: {
      RAM: '16GB',
      type: 'LPDDR5x'
    },
    storage: {
      capacity: '512GB',
      type: 'NVMe SSD'
    },
    graphics: {
      type: 'integrated',
      model: 'GTX 4050'
    }
  },
  shipping: {
    dimensions: {
      width: 296,
      height: 14.8,
      depth: 199
    },
    weight: 1200
  },
  releaseDate: 2025-03-15T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f433f'),
  productId: 'ANISHLP-2',
  type: 'laptop',
  brand: 'Apple',
  model: 'MacBook Air M2',
  price: 1199.99,
  specifications: {
    processor: {
      brand: 'Apple',
      model: 'M4',
      cores: 8
    },
    memory: {
      RAM: '8GB',
      type: 'Unified Memory'
    },
    storage: {
      capacity: '256GB',
      type: 'SSD'
    },
    graphics: {
      type: 'integrated',
      model: '8-core GPU'
    }
  },
  shipping: {
    dimensions: {
      width: 304.1,
      height: 11.3,
      depth: 215
    },
    weight: 1240
  },
  releaseDate: 2025-07-15T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f4340'),
  productId: 'SPANISH-1',
  type: 'smartphone',
  brand: 'Samsung',
  model: 'Galaxy S25',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 50,
          aperture: 'f/1.8',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/2.2'
      }
    },
    battery: {
      capacity: 4000,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'Android',
      version: '14'
    }
  },
  shipping: {
    dimensions: {
      width: 70.6,
      height: 147,
      depth: 7.6
    },
    weight: 167
  },
  releaseDate: 2025-01-24T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f4341'),
  productId: 'SPANISH-2',
  type: 'smartphone',
  brand: 'Apple',
  model: 'iPhone 17',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 48,
          aperture: 'f/1.6',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/1.9'
      }
    },
    battery: {
      capacity: 3349,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'iOS',
      version: '17'
    }
  },
  shipping: {
    dimensions: {
      width: 71.6,
      height: 147.6,
      depth: 7.8
    },
    weight: 171
  },
  releaseDate: 2025-09-22T00:00:00.000Z,
  availability: true
}
db.techProducts.find({ "shipping.weight_grams": { $gt: 200 } }).pretty()
db.techProducts.find({ "shipping.weight_grams": { $gt: 200 } }).pretty()
db.techProducts.find({ "shipping.weight": { $gt: 200 } }).pretty()
{
  _id: ObjectId('68cfdc9c96b094a3784f433e'),
  productId: 'ANISHLAP-01',
  type: 'laptop',
  brand: 'Dell',
  model: 'ALIENWARE ',
  price: 1299.99,
  specifications: {
    processor: {
      brand: 'Intel',
      model: 'Core i7-1165G7',
      cores: 4,
      baseSpeed: '2.8GHz'
    },
    memory: {
      RAM: '16GB',
      type: 'LPDDR5x'
    },
    storage: {
      capacity: '512GB',
      type: 'NVMe SSD'
    },
    graphics: {
      type: 'integrated',
      model: 'GTX 4050'
    }
  },
  shipping: {
    dimensions: {
      width: 296,
      height: 14.8,
      depth: 199
    },
    weight: 1200
  },
  releaseDate: 2025-03-15T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f433f'),
  productId: 'ANISHLP-2',
  type: 'laptop',
  brand: 'Apple',
  model: 'MacBook Air M2',
  price: 1199.99,
  specifications: {
    processor: {
      brand: 'Apple',
      model: 'M4',
      cores: 8
    },
    memory: {
      RAM: '8GB',
      type: 'Unified Memory'
    },
    storage: {
      capacity: '256GB',
      type: 'SSD'
    },
    graphics: {
      type: 'integrated',
      model: '8-core GPU'
    }
  },
  shipping: {
    dimensions: {
      width: 304.1,
      height: 11.3,
      depth: 215
    },
    weight: 1240
  },
  releaseDate: 2025-07-15T00:00:00.000Z,
  availability: true
}
db.techProducts.find({
  "type": "smartphone",
  "price": 800,
  "shipping.weight_grams": { $lt: 200 }
}).pretty()
db.techProducts.find({
  "type": "smartphone",
  "price": 799.99,
  "shipping.weight_grams": { $lt: 200 }
}).pretty()
db.techProducts.find({
  "type": "smartphone",
  "price": 799.99,
  "shipping.weight": { $lt: 200 }
}).pretty()
{
  _id: ObjectId('68cfdc9c96b094a3784f4340'),
  productId: 'SPANISH-1',
  type: 'smartphone',
  brand: 'Samsung',
  model: 'Galaxy S25',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 50,
          aperture: 'f/1.8',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/2.2'
      }
    },
    battery: {
      capacity: 4000,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'Android',
      version: '14'
    }
  },
  shipping: {
    dimensions: {
      width: 70.6,
      height: 147,
      depth: 7.6
    },
    weight: 167
  },
  releaseDate: 2025-01-24T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f4341'),
  productId: 'SPANISH-2',
  type: 'smartphone',
  brand: 'Apple',
  model: 'iPhone 17',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 48,
          aperture: 'f/1.6',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/1.9'
      }
    },
    battery: {
      capacity: 3349,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'iOS',
      version: '17'
    }
  },
  shipping: {
    dimensions: {
      width: 71.6,
      height: 147.6,
      depth: 7.8
    },
    weight: 171
  },
  releaseDate: 2025-09-22T00:00:00.000Z,
  availability: true
}
db.techProducts.find({
  "type": "smartphone",
  "price": 800,
  "shipping.weight": { $lt: 200 }
}).pretty()
db.techProducts.find({
  "type": "smartphone",
  "price": {$lt: 800},
  "shipping.weight": { $lt: 200 }
}).pretty()
{
  _id: ObjectId('68cfdc9c96b094a3784f4340'),
  productId: 'SPANISH-1',
  type: 'smartphone',
  brand: 'Samsung',
  model: 'Galaxy S25',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 50,
          aperture: 'f/1.8',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/2.2'
      }
    },
    battery: {
      capacity: 4000,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'Android',
      version: '14'
    }
  },
  shipping: {
    dimensions: {
      width: 70.6,
      height: 147,
      depth: 7.6
    },
    weight: 167
  },
  releaseDate: 2025-01-24T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f4341'),
  productId: 'SPANISH-2',
  type: 'smartphone',
  brand: 'Apple',
  model: 'iPhone 17',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 48,
          aperture: 'f/1.6',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/1.9'
      }
    },
    battery: {
      capacity: 3349,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'iOS',
      version: '17'
    }
  },
  shipping: {
    dimensions: {
      width: 71.6,
      height: 147.6,
      depth: 7.8
    },
    weight: 171
  },
  releaseDate: 2025-09-22T00:00:00.000Z,
  availability: true
}
db.techProducts.find(
  { "type": "laptop" },
  { 
    "_id": 0,
    "brand": 1,
    "model": 1,
    "shipping.width_cm": 1,
    "shipping.height_cm": 1,
    "shipping.depth_cm": 1
  }
).pretty()
{
  brand: 'Apple',
  model: 'MacBook Air M2',
  shipping: {}
}
{
  brand: 'Dell',
  model: 'ALIENWARE ',
  shipping: {}
}
db.techProducts.find().sort({ "model": -1 }).pretty()
{
  _id: ObjectId('68cfdc9c96b094a3784f4341'),
  productId: 'SPANISH-2',
  type: 'smartphone',
  brand: 'Apple',
  model: 'iPhone 17',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 48,
          aperture: 'f/1.6',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/1.9'
      }
    },
    battery: {
      capacity: 3349,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'iOS',
      version: '17'
    }
  },
  shipping: {
    dimensions: {
      width: 71.6,
      height: 147.6,
      depth: 7.8
    },
    weight: 171
  },
  releaseDate: 2025-09-22T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f433f'),
  productId: 'ANISHLP-2',
  type: 'laptop',
  brand: 'Apple',
  model: 'MacBook Air M2',
  price: 1199.99,
  specifications: {
    processor: {
      brand: 'Apple',
      model: 'M4',
      cores: 8
    },
    memory: {
      RAM: '8GB',
      type: 'Unified Memory'
    },
    storage: {
      capacity: '256GB',
      type: 'SSD'
    },
    graphics: {
      type: 'integrated',
      model: '8-core GPU'
    }
  },
  shipping: {
    dimensions: {
      width: 304.1,
      height: 11.3,
      depth: 215
    },
    weight: 1240
  },
  releaseDate: 2025-07-15T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f4340'),
  productId: 'SPANISH-1',
  type: 'smartphone',
  brand: 'Samsung',
  model: 'Galaxy S25',
  price: 799.99,
  specifications: {
    camera: {
      rear: [
        {
          megapixels: 50,
          aperture: 'f/1.8',
          type: 'main'
        }
      ],
      front: {
        megapixels: 12,
        aperture: 'f/2.2'
      }
    },
    battery: {
      capacity: 4000,
      unit: 'mAh'
    },
    operatingSystem: {
      name: 'Android',
      version: '14'
    }
  },
  shipping: {
    dimensions: {
      width: 70.6,
      height: 147,
      depth: 7.6
    },
    weight: 167
  },
  releaseDate: 2025-01-24T00:00:00.000Z,
  availability: true
}
{
  _id: ObjectId('68cfdc9c96b094a3784f433e'),
  productId: 'ANISHLAP-01',
  type: 'laptop',
  brand: 'Dell',
  model: 'ALIENWARE ',
  price: 1299.99,
  specifications: {
    processor: {
      brand: 'Intel',
      model: 'Core i7-1165G7',
      cores: 4,
      baseSpeed: '2.8GHz'
    },
    memory: {
      RAM: '16GB',
      type: 'LPDDR5x'
    },
    storage: {
      capacity: '512GB',
      type: 'NVMe SSD'
    },
    graphics: {
      type: 'integrated',
      model: 'GTX 4050'
    }
  },
  shipping: {
    dimensions: {
      width: 296,
      height: 14.8,
      depth: 199
    },
    weight: 1200
  },
  releaseDate: 2025-03-15T00:00:00.000Z,
  availability: true
}
db.techProducts.updateOne(
  { "productId": "ANISHLAP-01" },
  { 
    $set: { 
      "shipping.weight": 1300,
      "updatedAt": new Date()
    }
  }
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.products.updateOne(
  { productId: "ANISHLAP-01" }, 
  { $set: { price: 1500 } } 
)
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 0,
  modifiedCount: 0,
  upsertedCount: 0
}
// Verify the update was successful
db.techProducts.findOne({"productId": "ANISHLAP-01"}, {"shipping.weight": 1})
{
  _id: ObjectId('68cfdc9c96b094a3784f433e'),
  shipping: {
    weight: 1300
  }
}
db.techProducts.dropIndex({ "price": 1 })
{ nIndexesWas: 9, ok: 1 }

db.techProducts.getIndexes()
