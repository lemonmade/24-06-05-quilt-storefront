if (process.env.NODE_ENV === 'development') {
  await import('preact/debug');
}

import '@quilted/quilt/globals';

import {hydrate} from 'preact';
import {GraphQLCache} from '@quilted/quilt/graphql';
import {Browser, BrowserContext} from '@quilted/quilt/browser';
import {createStorefrontGraphQLFetch} from '@lemonmade/shopify/storefront';

import type {AppContext} from '~/shared/context.ts';

import {App} from './App.tsx';

const element = document.querySelector('#app')!;
const browser = new Browser();

const graphQLFetch = createStorefrontGraphQLFetch({
  shop: 'admin4.myshopify.com',
  accessToken: 'c6f362765d5020a5c0b71303a6b06129',
});

const graphQLCache = new GraphQLCache({fetch: graphQLFetch});

graphQLCache.query(`query { shop { name } }`).then((result) => {
  console.log(result);
});

const context = {
  graphql: {
    fetch: graphQLFetch,
    cache: graphQLCache,
  },
} satisfies AppContext;

// Makes key parts of the app available in the browser console
Object.assign(globalThis, {app: context});

hydrate(
  <BrowserContext browser={browser}>
    <App context={context} />
  </BrowserContext>,
  element,
);
