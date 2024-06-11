import {describe, it, expect} from 'vitest';

import {Link} from '@quilted/quilt/navigate';

import {renderApp} from '~/tests/render.ts';
import {fillGraphQL, GraphQLController} from '~/tests/graphql.ts';

import Home from '../Home.tsx';
import homeQuery from '../HomeQuery.graphql';

describe('<Home />', () => {
  it('welcomes the user with their name', async () => {
    const graphql = new GraphQLController([
      fillGraphQL(homeQuery, {
        products: {
          nodes: [{handle: 'my-product'}],
        },
      }),
    ]);

    const home = await renderApp(<Home />, {graphql});

    expect(graphql).toHavePerformedGraphQLQuery(homeQuery);
    expect(home).toContainPreactComponent(Link, {
      to: '/products/my-product',
    });
  });
});
