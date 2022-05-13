const resolvers = {
  Item: {
    id: (parent) => parent._id || parent.id,
    tags(parent) {
      return parent.tags.map((tag) => ({
        id: tag.tagId,
        content: tag.content,
      }))
    },
    image(parent, _, { dataSources }) {
      return dataSources.itemService.getImageUrl(parent.image)
    },
    async warehouse(parent, _, { dataSources, warehouseLoader }) {
      if (parent.warehouse) {
        return await warehouseLoader.load(
          parent.warehouse,
          dataSources.warehouseService
        )
      }
    },
  },
  Query: {
    async findItemById(_, args, { dataSources }) {
      return await dataSources.itemService.findItemById(args.itemId)
    },
    async findAllItems(_, args, { dataSources }) {
      return await dataSources.itemService.findAllItems(args.cursor)
    },
    async findItemsByName(_, args, { dataSources }) {
      return await dataSources.itemService.findItemsByName(
        args.name,
        args.cursor
      )
    },
    async findItemsByTag(_, args, { dataSources }) {
      return await dataSources.itemService.findItemsByTag(args.tag, args.cursor)
    },
    async findItemsByWarehouse(_, args, { dataSources }) {
      return await dataSources.itemService.findItemsByWarehouse(
        args.warehouseId,
        args.cursor
      )
    },
  },
  Mutation: {
    async createItem(_, args, { dataSources }) {
      return await dataSources.itemService.createItem(args)
    },
    async editItem(_, args, { dataSources }) {
      return await dataSources.itemService.editItem(args)
    },
    async assignWarehouse(_, args, { dataSources }) {
      return await dataSources.itemService.assignWarehouse(args)
    },
    async deleteItems(_, args, { dataSources }) {
      return await dataSources.itemService.deleteItems(args)
    },
  },
}

module.exports = resolvers
