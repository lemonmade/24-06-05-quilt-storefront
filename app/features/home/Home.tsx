import {useGraphQLQuery} from '@quilted/quilt/graphql';
import {Link} from '@quilted/quilt/navigate';
import {useLocale} from '@quilted/quilt/localize';
import {useFormatMoney} from '@lemonmade/shopify-quilt';

import {Title} from '~/shared/head.ts';
import {Heading, Stack} from '~/shared/design-system.ts';

import styles from './Home.module.css';
import homeQuery, {type HomeQueryData} from './HomeQuery.graphql';

export function Home() {
  const locale = useLocale();

  const query = useGraphQLQuery(homeQuery, {
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
    <>
      <Title>Home</Title>
      <Stack spacing>
        <Heading>Recommended products</Heading>

        <div class={styles.ProductGrid}>
          {products.nodes.map((product) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </Stack>
    </>
  );
}

function ProductCard({product}: {product: HomeQueryData.Products.Nodes}) {
  const {title, featuredImage, priceRange} = product;

  const formatMoney = useFormatMoney();

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
}

export default Home;
