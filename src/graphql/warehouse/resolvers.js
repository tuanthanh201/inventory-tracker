const resolvers = {
  Warehouse: {
    image(parent, _, { dataSources }) {
      return dataSources.itemService.getImageUrl(parent.image)
    },
  },
  Query: {
    async findWarehouseById(_, args, { dataSources }) {
      return await dataSources.warehouseService.findWarehouseById(
        args.warehouseId
      )
    },
    async findWarehousesByName(_, args, { dataSources }) {
      return await dataSources.warehouseService.findWarehousesByName(args.name)
    },
    async findAllWarehouses(_, __, { dataSources }) {
      return await dataSources.warehouseService.findAllWarehouses()
    },
  },
  Mutation: {
    async createWarehouse(_, args, { dataSources }) {
      return await dataSources.warehouseService.createWarehouse(args)
    },
    async editWarehouse(_, args, { dataSources }) {
      return await dataSources.warehouseService.editWarehouse(args)
    },
  },
}

module.exports = resolvers
