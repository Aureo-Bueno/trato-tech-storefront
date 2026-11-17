import { useActionState, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import Header from 'components/Header';
import styles from './Cart.module.scss';
import Item from 'components/Item';
import CheckoutForm from './CheckoutForm';
import type { CheckoutFormHandle } from './CheckoutForm';
import { resetCart } from 'store/slices/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { makeSelectFilteredCartItems } from 'store/selectors';

type CheckoutState = { ok: boolean; error?: string; email?: string } | null;

export default function Cart() {
  const dispatch = useAppDispatch();
  const selectFilteredCart = useMemo(makeSelectFilteredCartItems, []);
  const { items, total } = useAppSelector(selectFilteredCart);
  const search = useAppSelector((state) => state.search);
  const deferredSearch = useDeferredValue(search);
  const isPending = deferredSearch !== search;
  const checkoutRef = useRef<CheckoutFormHandle>(null);
  const [reviewEmail, setReviewEmail] = useState<string | null>(null);

  const checkoutAction = async (
    _previousState: CheckoutState,
    formData: FormData
  ): Promise<CheckoutState> => {
    try {
      // simulate async checkout request
      await new Promise((resolve) => setTimeout(resolve, 500));
      const email = String(formData.get('email') ?? '');
      dispatch(resetCart());
      return { ok: true, email };
    } catch {
      return { ok: false, error: 'Checkout failed. Please try again.' };
    }
  };

  const [checkoutState, formAction] = useActionState(checkoutAction, null);

  useEffect(() => {
    if (checkoutState?.ok) checkoutRef.current?.reset();
    if (checkoutState?.error) checkoutRef.current?.focus();
  }, [checkoutState]);

  const handleReview = () => {
    const values = checkoutRef.current?.getValues();
    setReviewEmail(values?.email ?? '');
  };

  return (
    <div>
      <Header title='Shopping Cart' description='Review the products you added to your cart.' />
      <div className={styles.cart}>
        {isPending ? <p>Loading...</p> : items.map((item) => <Item key={item.id} {...item} cart />)}
        <div className={styles.total}>
          <strong>Order summary</strong>
          <span>
            Subtotal: <strong> R$ {total.toFixed(2)} </strong>
          </span>
        </div>
        <div className={styles.review}>
          <button type='button' className={styles.reviewButton} onClick={handleReview}>
            Review order
          </button>
          {reviewEmail !== null && (
            <span className={styles.reviewEmail}>
              {reviewEmail ? `Receipt email: ${reviewEmail}` : 'Receipt email not filled yet.'}
            </span>
          )}
        </div>
        <CheckoutForm ref={checkoutRef} action={formAction} disabled={items.length === 0} />
        {checkoutState?.error && <p className={styles.error}>{checkoutState.error}</p>}
        {checkoutState?.ok && (
          <p className={styles.success}>
            Checkout completed successfully
            {checkoutState.email ? `. Receipt sent to ${checkoutState.email}.` : '.'}
          </p>
        )}
      </div>
    </div>
  );
}
