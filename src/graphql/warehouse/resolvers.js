const resolvers = {
  Query: {
    async findAllWarehouses(_, __, {dataSources}) {
      return await dataSources.warehouseService.findAllWarehouses()
    }
  }
}