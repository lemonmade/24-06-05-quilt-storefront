import {useGraphQLQuery} from '@quilted/quilt/graphql';
import {Link} from '@quilted/quilt/navigate';
import {useLocale} from '@quilted/quilt/localize';

import {useFormatMoney} from '~/shared/shopify.ts';
import {Heading, Stack} from '~/shared/design-system.ts';

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

  return (
    <Stack spacing>
      <Heading>Recommended products</Heading>

      <div class={styles.ProductGrid}>
        {products.nodes.map((product) => {
          const {title, featuredImage, priceRange} = product;

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
                <div class={styles.ProductTitle}>{title}</div>
                <small>{formatMoney(priceRange.minVariantPrice)}</small>
              </Stack>
            </Link>
          );
        })}
      </div>
    </Stack>
  );
}
