import {writeFile} from 'fs/promises';
import {
  buildClientSchema,
  printSchema,
} from '../app/node_modules/graphql/utilities/index.mjs';
import astSchema from './storefront.schema.json' assert {type: 'json'};

await writeFile(
  new URL('../app/graphql/storefront.schema.graphql', import.meta.url),
  printSchema(buildClientSchema(astSchema)),
);
