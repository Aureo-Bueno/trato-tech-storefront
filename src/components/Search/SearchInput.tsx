import { useImperativeHandle, useRef } from 'react';
import type { ComponentProps, Ref } from 'react';
import styles from './Search.module.scss';

export interface SearchInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

interface SearchInputProps extends Omit<ComponentProps<'input'>, 'ref'> {
  ref?: Ref<SearchInputHandle>;
  onClear?: () => void;
}

export default function SearchInput({ ref, onClear, ...props }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      if (inputRef.current) inputRef.current.value = '';
      onClear?.();
    },
    getValue() {
      return inputRef.current?.value ?? '';
    },
  }));

  return <input ref={inputRef} className={styles.input} {...props} />;
}
