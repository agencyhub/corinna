import { getMonthName } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { SideSheet } from '../sheet'
import { DataTable } from '../table'
import TabsMenu from '../tabs/intex'
import { TableCell, TableRow } from '../ui/table'
import { TabsContent } from '../ui/tabs'
import { CreateProductForm } from './product-form'

type Props = {
  products: {
    id: string
    name: string
    price: number
    image: string
    createdAt: Date
    domainId: string | null
  }[]
  id: string
}

const ProductTable = ({ id, products }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Products</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add products to your store and set them live to accept payments from
          customers.
        </p>
      </div>

      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: 'All products',
          },
          { label: 'Live' },
          { label: 'Deactivated' },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Add products to your store and set them live to accept payments from customers."
              title="Add a product"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 font-semibold rounded-lg text-sm shadow-soft hover:shadow-medium transition-all duration-200"
              trigger={
                <>
                  <Plus
                    size={20}
                    className="text-white"
                  />
                  <p className="text-white">Add Product</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      >
        <TabsContent value="All products">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <DataTable headers={['Featured Image', 'Name', 'Pricing', 'Created']}>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={`https://ucarecdn.com/${product.image}/`}
                        width={50}
                        height={50}
                        alt="Product image"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400 font-semibold">${product.price}</TableCell>
                  <TableCell className="text-right text-gray-600 dark:text-gray-400">
                    {product.createdAt.getDate()}{' '}
                    {getMonthName(product.createdAt.getMonth())}{' '}
                    {product.createdAt.getFullYear()}
                  </TableCell>
                </TableRow>
              ))}
            </DataTable>
          </div>
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ProductTable
