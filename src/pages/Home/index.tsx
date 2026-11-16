import { Suspense, use, useCallback, useEffect } from 'react';
import Header from 'components/Header';
import styles from './Home.module.scss';
import clock from 'assets/inicial.png';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from 'store/slices/items';
import { setCategories } from 'store/slices/categories';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCategories } from 'store/selectors';
import { getCategoriesPromise } from 'services/resources';
import type { Category } from 'store/slices/categories';

function CategoriesList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = use(getCategoriesPromise());
  const storeCategories = useAppSelector(selectCategories);

  useEffect(() => {
    if (categories.length && storeCategories.length === 0) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch, storeCategories.length]);

  const openCategory = useCallback(
    (id: string) => {
      navigate(`/category/${id}`);
    },
    [navigate]
  );

  const list = storeCategories.length ? storeCategories : categories;

  return (
    <div className={styles.categories}>
      <div className={styles['categories-title']}>
        <h1>Categories</h1>
      </div>
      <div className={styles['categories-container']}>
        {list.map((category) => (
          <div key={category.id} onClick={() => openCategory(category.id)}>
            <img src={category.thumbnail} alt={category.name} loading="lazy" />
            <h1>{category.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <Header
        title='Classifieds Tech'
        description='Buy all kinds of products on the best site in Brazil!'
        image={clock}
        className={styles.header}
      />
      <Suspense fallback={<div className={styles.categories}><p>Loading categories...</p></div>}>
        <CategoriesList />
      </Suspense>
    </div>
  );
}
