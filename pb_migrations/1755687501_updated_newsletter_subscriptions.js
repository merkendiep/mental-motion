/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4263645220")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2395930636",
    "maxSelect": 3,
    "name": "newsletters",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "select",
    "values": [
      "algemeen",
      "evenementen",
      "tips"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4263645220")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select2395930636",
    "maxSelect": 2,
    "name": "newsletters",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "algemeen",
      "evenementen",
      "tips"
    ]
  }))

  return app.save(collection)
})
