import { memo } from 'react';
import styles from './Header.module.scss';
import TitleWithImage from './TitleWithImage';
import TitleWithoutImage from './TitleWithoutImage';

interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
  image?: string;
}

function Header({ title, description, className = '', image }: HeaderProps) {
  return (
    <header className={styles.header}>
      {title && !image && <TitleWithoutImage title={title} description={description} />}
      {title && image && (
        <TitleWithImage
          title={title}
          description={description}
          image={image}
          className={className}
        />
      )}
    </header>
  );
}

export default memo(Header);
