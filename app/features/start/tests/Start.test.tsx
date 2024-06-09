import {describe, it, expect} from 'vitest';

import {Link} from '@quilted/quilt/navigate';

import {renderApp} from '~/tests/render.ts';
import {fillGraphQL, GraphQLController} from '~/tests/graphql.ts';

import Start from '../Start.tsx';
import startQuery from '../StartQuery.graphql';

describe('<Start />', () => {
  it('welcomes the user with their name', async () => {
    const graphql = new GraphQLController([
      fillGraphQL(startQuery, {
        products: {
          nodes: [{handle: 'my-product'}],
        },
      }),
    ]);

    const start = await renderApp(<Start />, {graphql});

    expect(graphql).toHavePerformedGraphQLQuery(startQuery);
    expect(start).toContainPreactComponent(Link, {
      to: '/products/my-product',
    });
  });
});
