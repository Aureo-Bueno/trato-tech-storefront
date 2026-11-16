import { memo } from 'react';
import styles from './TitleWithoutImage.module.scss';

interface TitleWithoutImageProps {
  title: string;
  description?: string;
}

function TitleWithoutImage({ title, description }: TitleWithoutImageProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
    </div>
  );
}

export default memo(TitleWithoutImage);
