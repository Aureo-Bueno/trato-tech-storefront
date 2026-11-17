import { memo, useEffect, useRef, useState, useTransition } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './Search.module.scss';
import SearchInput from './SearchInput';
import type { SearchInputHandle } from './SearchInput';
import { changeSearch, resetSearch } from 'store/slices/search';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'hooks/useDebounce';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectSearch } from 'store/selectors';

function Search() {
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchRef = useRef<SearchInputHandle>(null);
  const [input, setInput] = useState(search);
  const [isPending, startTransition] = useTransition();
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    setInput('');
    dispatch(resetSearch());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    setInput(search);
  }, [search]);

  useEffect(() => {
    startTransition(() => {
      dispatch(changeSearch(debouncedInput));
    });
  }, [debouncedInput, dispatch, startTransition]);

  const commitSearch = (value: string) => {
    startTransition(() => {
      dispatch(changeSearch(value));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitSearch(searchRef.current?.getValue() ?? '');
    }
  };

  const handleClear = () => {
    searchRef.current?.clear();
    commitSearch('');
  };

  return (
    <div className={styles.search} onClick={() => searchRef.current?.focus()}>
      <SearchInput
        ref={searchRef}
        placeholder="What are you looking for?"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onClear={() => setInput('')}
        onKeyDown={handleKeyDown}
      />
      {input && (
        <button
          type='button'
          className={styles.clear}
          aria-label='Clear search'
          onClick={(event) => {
            event.stopPropagation();
            handleClear();
          }}
        >
          ×
        </button>
      )}
      {isPending && <span className={styles.status}>Loading...</span>}
    </div>
  );
}

export default memo(Search);
