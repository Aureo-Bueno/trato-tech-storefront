import { useFormStatus } from 'react-dom';
import styles from './Cart.module.scss';

interface CheckoutButtonProps {
  disabled?: boolean;
}

export default function CheckoutButton({ disabled }: CheckoutButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.finish}
      disabled={disabled || pending}
    >
      {pending ? 'Processing...' : 'Checkout'}
    </button>
  );
}
