import type {RenderableProps} from 'preact';

import styles from './Stack.module.css';

export type SpacingValue =
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

export function Stack({
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
