## Global Object & Child Process

<hr>

### Execution parameters

To define the server's listening port you can use `--port` or `--p` (By default the server will use port 8080).
<br>
Example 1: `node index.js --port=8081`
<br>
Example 2: `node index.js --p=8081`

<hr>

### Storage

The API uses MongoDB for storage all the data. You have to set your DB using the enviroment variable `MONGO_URI`

<hr>

### Testing Routes

<details>
<summary>Get System Information</summary>

- URL: `/api/info`
- Method: `GET`
- Response: `200 (OK)`
- Response Type: `Document`

</details>

<details>
<summary>Get Random Numbers with ocurrence count</summary>

- URL: `/api/ramdoms`
- Method: `GET`
- Response: `200 (OK)`
- Response Type: `JSON`

Query Parameters

| Field | Type   | Description                |
| ----- | ------ | -------------------------- |
| cant  | number | Iterations the API must do |

JSON with numbes and ocurrence count

```json
{
  "numbers": {
    "68": 1,
    "126": 1,
    "274": 1,
    "322": 1,
    "461": 1,
    "604": 1,
    "608": 1,
    "619": 1,
    "941": 1,
    "993": 1
  }
}
```

</details>

<details>
<summary>Get Random Products</summary>

- URL: `/api/products`
- Method: `GET`
- Response: `200 (OK)`
- Response Type: `JSON`

Query Parameters

| Field | Type   | Description                   |
| ----- | ------ | ----------------------------- |
| cant  | number | Total of products to generate |

JSON with randoms products

```json
{
  "products": [
    {
      "title": "Fantastic Steel Soap",
      "price": "172.00",
      "thumbnail": "https://loremflickr.com/90/90/true"
    },
    {
      "title": "Modern Wooden Salad",
      "price": "755.00",
      "thumbnail": "https://loremflickr.com/90/90/true"
    },
    {
      "title": "Ergonomic Granite Hat",
      "price": "273.00",
      "thumbnail": "https://loremflickr.com/90/90/true"
    },
    {
      "title": "Practical Wooden Salad",
      "price": "206.00",
      "thumbnail": "https://loremflickr.com/90/90/true"
    },
    {
      "title": "Generic Granite Keyboard",
      "price": "729.00",
      "thumbnail": "https://loremflickr.com/90/90/true"
    }
  ]
}
```

</details>

<hr>

### Products Routes - Login Required 🔒

<details>
<summary>List all products</summary>

- URL: `/products`
- Method: `GET`
- Response: `200 (OK)`
- Response Type: `Document`

</details>

<details>
    <summary>Find Product By ID</summary>

- URL: `/products/{product_id}`
- Method: `GET`
- Response: `200 (OK)`
- Response Type: `JSON`
- Error: `404 (Not found)`

JSON with finded product

```json
{
  "product": {
    "_id": "62d5f38d7ea0f11f3a91ff59",
    "title": "Whoppers",
    "price": 200,
    "thumbnail": "https://www.candywarehouse.com/item-images/127280-01_whoppers-candy-175-ounce-packs-24-piece-box.jpg"
  }
}
```

</details>

<details>
    <summary>Add new product</summary>

- URL: `/products`
- Method: `POST`
- Response: `201 (Created)`
- Response Type: `JSON`
- Error: `400 (Bad request)`

### Required Fields

| Field     | Type   |
| --------- | ------ |
| title     | string |
| price     | string |
| thumbnail | string |

JSON with added product

```json
{
  "added": {
    "title": "Whoppers",
    "price": 200,
    "thumbnail": "https://www.candywarehouse.com/item-images/127280-01_whoppers-candy-175-ounce-packs-24-piece-box.jpg",
    "_id": "62d5f38d7ea0f11f3a91ff59"
  }
}
```

</details>

<details>
    <summary>Update a product</summary>

- URL: `/products/{product_id}`
- Method: `PUT`
- Response: `204 (No content)`
- Error: `404 (Not found)`

### Required Fields

| Field     | Type   |
| --------- | ------ |
| title     | string |
| price     | string |
| thumbnail | string |

</details>

<details>
    <summary>Remove a product</summary>

- URL: `/products/{product_id}`
- Method: `DELETE`
- Response: `204 (No content)`
- Error: `404 (Not found)`

</details>
