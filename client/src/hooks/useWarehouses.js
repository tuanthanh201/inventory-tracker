import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_WAREHOUSES } from '../graphql'
import { v4 as uuidv4 } from 'uuid'

const useWarehouses = () => {
  const { loading, data } = useQuery(GET_ALL_WAREHOUSES)

  return {
    loading,
    warehouses: useMemo(() => {
      const formattedWarehouses =
        data?.findAllWarehouses?.map((warehouse) => ({
          key: warehouse.id,
          text: warehouse.name,
          value: warehouse.name,
          icon: 'warehouse',
        })) ?? []
      formattedWarehouses.unshift({
        key: uuidv4(),
        text: 'None',
        value: '',
        icon: 'dont',
      })
      return formattedWarehouses
    }, [data?.findAllWarehouses]),
  }
}

export default useWarehouses
