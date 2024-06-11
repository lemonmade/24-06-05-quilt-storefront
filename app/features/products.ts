import {AsyncComponent} from '@quilted/quilt/async';

export const ProductDetails = AsyncComponent.from(
  () => import('./products/ProductDetails.tsx'),
);
