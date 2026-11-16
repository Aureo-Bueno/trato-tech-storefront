import { useDeferredValue, useMemo } from 'react';
import Header from 'components/Header';
import Item from 'components/Item';
import { useParams } from 'react-router-dom';
import styles from './Category.module.scss';
import { useAppSelector } from 'store/hooks';
import { makeSelectCategoryById, makeSelectFilteredItems } from 'store/selectors';

export default function Category() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const selectCategory = useMemo(() => makeSelectCategoryById(categoryName), [categoryName]);
  const selectFilteredItems = useMemo(() => makeSelectFilteredItems(categoryName), [categoryName]);
  const category = useAppSelector(selectCategory);
  const items = useAppSelector(selectFilteredItems);
  const search = useAppSelector((state) => state.search);
  const deferredSearch = useDeferredValue(search);
  const isPending = deferredSearch !== search;

  return (
    <div>
      <Header title={category?.name || ''} description={category?.description} image={category?.header} />
      <div className={styles.items}>
        {isPending ? <p>Loading...</p> : items.map((item) => <Item key={item.id} {...item} />)}
      </div>
    </div>
  );
}
