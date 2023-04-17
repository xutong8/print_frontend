import { httpRequest } from '@/services';

const deleteProductById = (productId: string) => {
  return httpRequest.delete('/product/deleteByProductId', {
    params: {
      productId
    }
  }) 
};

export {
  deleteProductById
};