import importFileParserHandler from './handlers/importFileParser';
import importProductsFileHandler from './handlers/importProductsFile';
import responseWrapper from './common/responseWrapper';

export const addProduct = responseWrapper(importFileParserHandler);
export const getProductsList = responseWrapper(importProductsFileHandler);
