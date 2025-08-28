/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4263645220")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_U5wxaTKS5H` ON `newsletter_subscriptions` (`email`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4263645220")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
