import '@quilted/quilt/globals';

import {RequestRouter, RedirectResponse} from '@quilted/quilt/request-router';
import {BrowserAssets} from 'quilt:module/assets';

const router = new RequestRouter();
const assets = new BrowserAssets();

router.get(/\/discount\/\w+/, async (request) => {
  const searchParams = new URLSearchParams(request.URL.search);
  const redirectURL = new URL(
    searchParams.get('redirect') ?? searchParams.get('return_to') ?? '/',
    request.url,
  );

  // Only allow same-origin redirects
  if (redirectURL.origin !== request.URL.origin) {
    return new Response(null, {
      status: 400,
    });
  }

  searchParams.delete('redirect');
  searchParams.delete('return_to');
  redirectURL.search = searchParams.toString();

  // TODO: update cart

  return new RedirectResponse(redirectURL, {
    status: 303,
  });
});

// For all GET requests, render our React application.
router.get(async (request) => {
  const [
    {App},
    {createStorefrontGraphQLFetch},
    {renderToResponse},
    {GraphQLCache},
  ] = await Promise.all([
    import('./App.tsx'),
    import('@lemonmade/shopify/storefront'),
    import('@quilted/quilt/server'),
    import('@quilted/quilt/graphql'),
  ]);

  const graphQLFetch = createStorefrontGraphQLFetch({
    shop: 'admin4.myshopify.com',
    accessToken: 'c6f362765d5020a5c0b71303a6b06129',
  });

  const response = await renderToResponse(
    <App
      context={{
        graphql: {
          fetch: graphQLFetch,
          cache: new GraphQLCache({fetch: graphQLFetch}),
        },
      }}
    />,
    {
      request,
      assets,
    },
  );

  return response;
});

export default router;
