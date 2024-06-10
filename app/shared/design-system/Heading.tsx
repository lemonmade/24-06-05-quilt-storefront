import type {RenderableProps} from 'preact';

import styles from './Heading.module.css';

export function Heading({children}: RenderableProps<{}>) {
  return <h2 class={styles.Heading}>{children}</h2>;
}
