import { useActionState, useDeferredValue, useMemo } from 'react';
import Header from 'components/Header';
import styles from './Cart.module.scss';
import Item from 'components/Item';
import CheckoutButton from './CheckoutButton';
import { resetCart } from 'store/slices/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { makeSelectFilteredCartItems } from 'store/selectors';

type CheckoutState = { ok: boolean; error?: string } | null;

export default function Cart() {
  const dispatch = useAppDispatch();
  const selectFilteredCart = useMemo(makeSelectFilteredCartItems, []);
  const { items, total } = useAppSelector(selectFilteredCart);
  const search = useAppSelector((state) => state.search);
  const deferredSearch = useDeferredValue(search);
  const isPending = deferredSearch !== search;

  const checkoutAction = async (_previousState: CheckoutState): Promise<CheckoutState> => {
    try {
      // simulate async checkout request
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(resetCart());
      return { ok: true };
    } catch {
      return { ok: false, error: 'Checkout failed. Please try again.' };
    }
  };

  const [checkoutState, formAction] = useActionState(checkoutAction, null);

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
        <form action={formAction} className={styles.checkoutForm}>
          <CheckoutButton disabled={items.length === 0} />
        </form>
        {checkoutState?.error && <p className={styles.error}>{checkoutState.error}</p>}
        {checkoutState?.ok && <p className={styles.success}>Checkout completed successfully.</p>}
      </div>
    </div>
  );
}
