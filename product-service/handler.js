import db from './db/productList';
import getProductsListHandler from './handlers/getProductsList';
import getProductByIdHandler  from './handlers/getProductById';
import responseWrapper from './common/responseWrapper';

export const getProductsList = responseWrapper(getProductsListHandler(db));
export const getProductById = responseWrapper(getProductByIdHandler(db));
