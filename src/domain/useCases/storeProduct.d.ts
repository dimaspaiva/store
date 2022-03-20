import { ProductModel } from '../models/product'

export interface StoreProductModel extends ProductModel {}

export interface StoreProduct {
  store(product: StoreProductModel): ProductModel
}