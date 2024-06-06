import {type Configuration} from '@quilted/graphql-tools/configuration';

const configuration: Configuration = {
  schema: 'app/graphql/schema.graphql',
  documents: ['app/**/*.graphql'],
  extensions: {
    quilt: {
      schema: [{kind: 'definitions', outputPath: 'app/graphql/schema.ts'}],
    },
  },
};

export default configuration;
