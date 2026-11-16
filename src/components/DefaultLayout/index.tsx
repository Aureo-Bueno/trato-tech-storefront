import { memo } from 'react';
import Navbar from 'components/Navbar';
import styles from './DefaultLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer';

function DefaultLayout() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles['container-outlet']}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default memo(DefaultLayout);
