import {
  GraphQLTesting,
  GraphQLController,
  createGraphQLSchema,
  createGraphQLFiller,
} from '@quilted/quilt/graphql/testing';

import schemaSource from '../graphql/storefront.schema.ts';

export const schema = createGraphQLSchema(schemaSource);
export const fillGraphQL = createGraphQLFiller(schema);

export {GraphQLController, GraphQLTesting};
