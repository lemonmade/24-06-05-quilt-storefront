import type {Configuration} from '@quilted/graphql-tools/configuration';

const configuration: Configuration = {
  schema:
    'node_modules/@lemonmade/shopify/graphql/2024-04/storefront.schema.graphql',
  documents: ['app/**/*.graphql'],
  extensions: {
    quilt: {
      schema: [
        {kind: 'definitions', outputPath: 'app/graphql/storefront.schema.ts'},
      ],
    },
  },
};

export default configuration;
