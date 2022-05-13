const DataLoader = require('dataloader')

const WarehouseLoader = (warehouseService) =>
  new DataLoader(async (warehouseIds) => {
    const warehouses = await warehouseService.findWarehousesByIds(warehouseIds)

    const warehouseMap = {}
    warehouses.forEach((warehouse) => {
      warehouseMap[warehouse.id] = warehouse
    })

    return warehouseIds.map((warehouseId) => warehouseMap[warehouseId])
  })

module.exports = WarehouseLoader
