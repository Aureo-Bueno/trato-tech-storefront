import { memo } from 'react';
import styles from './Footer.module.scss';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const iconProps = {
  color: 'white',
  size: 24,
};

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <FaFacebook {...iconProps} />
        <FaTwitter {...iconProps} />
        <FaInstagram {...iconProps} />
      </div>
      <span>Developed by me.</span>
    </footer>
  );
}

export default memo(Footer);
