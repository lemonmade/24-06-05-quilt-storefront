import type {RenderableProps} from 'preact';

import {useGraphQLQuery} from '@quilted/quilt/graphql';
import {Link} from '@quilted/quilt/navigate';
import {useLocale} from '@quilted/quilt/localize';

import {useFormatMoney} from '~/shared/shopify.ts';

import styles from './Start.module.css';
import startQuery from './StartQuery.graphql';

export default function Start() {
  const locale = useLocale();
  const formatMoney = useFormatMoney();

  const query = useGraphQLQuery(startQuery, {
    // Why do I have to provide language as a GraphQL enum?? I obviously have a locale,
    // why can't I just use that?
    // @ts-expect-error
    variables: {country: 'CA', language: locale.split('-')[0].toUpperCase()},
  });

  const data = query.result?.data;

  if (data == null) {
    return null;
  }

  const {products} = data;

  console.log(data);

  return (
    <Stack spacing>
      <Heading>Recommended products</Heading>

      <div class={styles.ProductGrid}>
        {products.nodes.map((product) => {
          const featuredImage = product.images.nodes[0];

          return (
            <Link class={styles.Product} to={`/products/${product.handle}`}>
              {featuredImage ? (
                <img
                  class={styles.ProductImage}
                  src={featuredImage.url}
                  alt={featuredImage.altText ?? ''}
                />
              ) : null}
              <Stack spacing="small-200">
                <div class={styles.ProductTitle}>{product.title}</div>
                <small>{formatMoney(product.priceRange.minVariantPrice)}</small>
              </Stack>
            </Link>
          );
        })}
      </div>
    </Stack>
  );
}

function Heading({children}: RenderableProps<{}>) {
  return <h2 class={styles.Heading}>{children}</h2>;
}

type SpacingValue =
  | boolean
  | 'none'
  | 'small-200'
  | 'small-100'
  | 'small'
  | 'auto';

const SPACING_VALUE_CLASS_MAP = new Map<SpacingValue, string | undefined>([
  [true, styles['spacing-auto']],
  ['small-200', styles['spacing-small-200']],
  ['small-100', styles['spacing-small-100']],
  ['small', styles['spacing-small-100']],
  ['auto', styles['spacing-auto']],
]);

function Stack({
  spacing = false,
  children,
}: RenderableProps<{
  spacing?: SpacingValue;
}>) {
  return (
    <div
      class={[styles.Stack, SPACING_VALUE_CLASS_MAP.get(spacing)]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
