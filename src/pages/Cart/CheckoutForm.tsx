import { useImperativeHandle, useRef, useState } from 'react';
import type { Ref } from 'react';
import CheckoutButton from './CheckoutButton';
import styles from './Cart.module.scss';

export interface CheckoutFormHandle {
  focus: () => void;
  reset: () => void;
  getValues: () => { email: string };
}

interface CheckoutFormProps {
  ref?: Ref<CheckoutFormHandle>;
  action: (formData: FormData) => void | Promise<void>;
  disabled?: boolean;
}

export default function CheckoutForm({ ref, action, disabled }: CheckoutFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');

  useImperativeHandle(ref, () => ({
    focus() {
      emailRef.current?.focus();
    },
    reset() {
      setEmail('');
    },
    getValues() {
      return { email };
    },
  }));

  return (
    <form action={action} className={styles.checkoutForm}>
      <label className={styles.field}>
        <span>Receipt email</span>
        <input
          ref={emailRef}
          type='email'
          name='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='you@example.com'
          required
        />
      </label>
      <CheckoutButton disabled={disabled} />
    </form>
  );
}
