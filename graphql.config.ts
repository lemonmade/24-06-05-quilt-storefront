import {type Configuration} from '@quilted/graphql-tools/configuration';

const configuration: Configuration = {
  schema: 'app/graphql/storefront.schema.graphql',
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
