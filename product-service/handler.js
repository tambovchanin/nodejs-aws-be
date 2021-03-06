import * as db from './db';
import addProductHandler from './handlers/addProduct';
import getProductsListHandler from './handlers/getProductsList';
import getProductByIdHandler  from './handlers/getProductById';
import catalogBatchProcessHandler from './handlers/catalogBatchProcess';
import responseWrapper from './common/responseWrapper';

export const addProduct = responseWrapper(addProductHandler(db));
export const getProductsList = responseWrapper(getProductsListHandler(db));
export const getProductById = responseWrapper(getProductByIdHandler(db));
export const catalogBatchProcess = responseWrapper(catalogBatchProcessHandler(db));
