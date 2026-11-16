import type { ComponentProps, Ref } from 'react';
import styles from './Search.module.scss';

interface SearchInputProps extends ComponentProps<'input'> {
  ref?: Ref<HTMLInputElement>;
}

export default function SearchInput({ ref, ...props }: SearchInputProps) {
  return <input ref={ref} className={styles.input} {...props} />;
}
