import { memo, startTransition, useCallback, useOptimistic, useRef } from 'react';
import styles from './Item.module.scss';
import { AiOutlineHeart, AiFillHeart, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { toggleFavorite } from 'store/slices/items';
import { changeCart, changeQuantity } from 'store/slices/cart';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import AnimatedFeedback from './AnimatedFeedback';
import type { AnimatedFeedbackHandle } from './AnimatedFeedback';

const iconProps = {
  size: 24,
  color: '#041833',
};

const quantityProps = {
  size: 32,
  color: '#1875E8',
};

interface ItemProps {
  title: string;
  photo: string;
  price: number;
  description: string;
  favorite: boolean;
  id: string;
  cart?: boolean;
  quantity?: number;
  category?: string;
}

function Item(props: ItemProps) {
  const { title, photo, price, description, favorite, id, cart, quantity } = props;
  const dispatch = useAppDispatch();
  const favoriteFeedbackRef = useRef<AnimatedFeedbackHandle>(null);
  const cartFeedbackRef = useRef<AnimatedFeedbackHandle>(null);
  const isInCart = useAppSelector((state) =>
    state.cart.some((cartItem) => cartItem.id === id)
  );

  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    favorite,
    (_current, next: boolean) => next
  );
  const [optimisticInCart, setOptimisticInCart] = useOptimistic(
    isInCart,
    (_current, next: boolean) => next
  );

  const handleFavorite = useCallback(() => {
    favoriteFeedbackRef.current?.start();
    startTransition(() => {
      setOptimisticFavorite(!optimisticFavorite);
      dispatch(toggleFavorite(id));
    });
  }, [dispatch, id, optimisticFavorite, setOptimisticFavorite]);

  const handleCart = useCallback(() => {
    cartFeedbackRef.current?.start();
    startTransition(() => {
      setOptimisticInCart(!optimisticInCart);
      dispatch(changeCart(id));
    });
  }, [dispatch, id, optimisticInCart, setOptimisticInCart]);

  const decreaseQuantity = useCallback(() => {
    if ((quantity || 0) >= 1) {
      dispatch(changeQuantity({ id, quantity: -1 }));
    }
  }, [dispatch, id, quantity]);

  const increaseQuantity = useCallback(() => {
    dispatch(changeQuantity({ id, quantity: 1 }));
  }, [dispatch, id]);

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemInCart]: cart,
      })}
    >
      <div className={styles['item-image']}>
        <img src={photo} alt={title} loading="lazy" />
      </div>
      <div className={styles['item-description']}>
        <div className={styles['item-title']}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles['item-info']}>
          <div className={styles['item-price']}>R$ {price.toFixed(2)}</div>
          <div className={styles['item-actions']}>
            <AnimatedFeedback ref={favoriteFeedbackRef}>
              {optimisticFavorite ? (
                <AiFillHeart
                  {...iconProps}
                  color='#ff0000'
                  className={styles['item-action']}
                  onClick={handleFavorite}
                />
              ) : (
                <AiOutlineHeart
                  {...iconProps}
                  className={styles['item-action']}
                  onClick={handleFavorite}
                />
              )}
            </AnimatedFeedback>
            {cart ? (
              <div className={styles.quantity}>
                Quantity:
                <AiFillMinusCircle {...quantityProps} onClick={decreaseQuantity} />
                <span>{String(quantity || 0).padStart(2, '0')}</span>
                <AiFillPlusCircle {...quantityProps} onClick={increaseQuantity} />
              </div>
            ) : (
              <AnimatedFeedback ref={cartFeedbackRef}>
                <FaCartPlus
                  {...iconProps}
                  color={optimisticInCart ? '#1875E8' : iconProps.color}
                  className={styles['item-action']}
                  onClick={handleCart}
                />
              </AnimatedFeedback>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
