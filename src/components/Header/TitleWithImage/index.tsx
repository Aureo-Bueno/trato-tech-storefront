import { memo } from 'react';
import styles from './TitleWithImage.module.scss';

interface TitleWithImageProps {
  title: string;
  description?: string;
  image: string;
  className?: string;
}

function TitleWithImage({ title, description, image, className }: TitleWithImageProps) {
  return (
    <div className={`${className || ''} ${styles.header}`}>
      <div className={styles['header-text']}>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div className={styles['header-image']}>
        <img alt={title} src={image} />
      </div>
    </div>
  );
}

export default memo(TitleWithImage);
