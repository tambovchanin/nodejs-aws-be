import importFileParserHandler from './handlers/importFileParser';
import importProductsFileHandler from './handlers/importProductsFile';
import responseWrapper from './common/responseWrapper';

export const importFileParser = responseWrapper(importFileParserHandler);
export const importProductsFile = responseWrapper(importProductsFileHandler);
