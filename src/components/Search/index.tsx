import { memo, useEffect, useRef, useState, useTransition } from 'react';
import styles from './Search.module.scss';
import SearchInput from './SearchInput';
import { changeSearch, resetSearch } from 'store/slices/search';
import { useLocation } from 'react-router-dom';
import { useDebounce } from 'hooks/useDebounce';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectSearch } from 'store/selectors';

function Search() {
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
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

  return (
    <div className={styles.search} onClick={() => inputRef.current?.focus()}>
      <SearchInput
        ref={inputRef}
        placeholder="What are you looking for?"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      {isPending && <span className={styles.status}>Loading...</span>}
    </div>
  );
}

export default memo(Search);
