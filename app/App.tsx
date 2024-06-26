import type {RenderableProps} from 'preact';

import {GraphQLContext} from '@quilted/quilt/graphql';
import {Routing, useRoutes} from '@quilted/quilt/navigate';
import {Localization, useLocaleFromEnvironment} from '@quilted/quilt/localize';
import {NotFound} from '@quilted/quilt/server';

import {HTML} from './foundation/html.ts';
import {Frame} from './foundation/frame.ts';

import {Home} from './features/home.ts';
import {ProductDetails} from './features/products.ts';

import {
  AppContextReact,
  type AppContext as AppContextType,
} from './shared/context.ts';

export interface AppProps {
  context: AppContextType;
}

// The root component for your application. You will typically render any
// app-wide context in this component.
export function App({context}: AppProps) {
  return (
    <AppContext context={context}>
      <HTML>
        <Frame>
          <Routes />
        </Frame>
      </HTML>
    </AppContext>
  );
}

export default App;

// This component renders the routes for your application. If you have a lot
// of routes, you may want to split this component into its own file.
function Routes() {
  return useRoutes([
    {match: '/', render: <Home />, renderPreload: <Home.Preload />},
    {
      match: 'products',
      children: [
        {
          match: /[^/]+/,
          render: ({matched}) => (
            <ProductDetails key={matched} handle={matched} />
          ),
          renderPreload: <ProductDetails.Preload />,
        },
      ],
    },
    {render: <NotFound />},
  ]);
}

// This component renders any app-wide context.
function AppContext({children, context}: RenderableProps<AppProps>) {
  const locale = useLocaleFromEnvironment() ?? 'en';

  return (
    <AppContextReact.Provider value={context}>
      <GraphQLContext
        fetch={context.graphql.fetch}
        cache={context.graphql.cache}
      >
        <Localization locale={locale}>
          <Routing>{children}</Routing>
        </Localization>
      </GraphQLContext>
    </AppContextReact.Provider>
  );
}
