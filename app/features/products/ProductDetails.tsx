import {useGraphQLQuery} from '@quilted/quilt/graphql';

import {Title} from '~/shared/head.ts';

import productDetailsQuery from './ProductDetailsQuery.graphql';

export function ProductDetails({handle}: {handle: string}) {
  const query = useGraphQLQuery(productDetailsQuery, {
    key: handle,
    variables: {handle},
  });

  const product = query.result?.data?.product;

  if (product == null) return null;

  return (
    <>
      <Title>{product.title}</Title>
      <div>{JSON.stringify(product)}</div>
    </>
  );
}

export default ProductDetails;
