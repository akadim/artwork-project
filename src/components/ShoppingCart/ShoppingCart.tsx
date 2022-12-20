import React from 'react';

import classes from './ShoppingCart.module.css';
import {Button, Stack} from "react-bootstrap";
import {useShoppingCart} from "../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";

const ShoppingCart = () => {

    const { cartItems, clearCart } = useShoppingCart();

    return (
        <div className={classes['cart-list-section']}>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </Stack>
            <hr/>
            <Button
                variant="outline-dark"
                className={`${classes['shopping-cart-btn']} w-100`}
                onClick={clearCart}
            >
                CLEAR
            </Button>
        </div>
    );
};

export default ShoppingCart;