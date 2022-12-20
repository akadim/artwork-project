import React, {FC} from 'react';
import classes from './ProductItem.module.css';
import {ProductProps} from "../Products/Products";
import formatCurrency from "../../utilities/formatCurrency";
import {useShoppingCart} from "../../context/ShoppingCartContext";

const ProductItem:FC<ProductProps> = props => {
    const {id, name, image, category, price, bestseller } = props;

    const { increaseCartQuantity, openCart } = useShoppingCart();

    const addToCart = () => {
        increaseCartQuantity(id);
        openCart();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            <div style={{backgroundImage: `url(../imgs/${image.src}.jpg)`}} className={classes['product-image']}>
                {bestseller && <div className={classes['product-badge']}>Best Seller</div>}
                <button className={`${classes['add-to-cart-btn']} w-100`} onClick={addToCart}>
                    ADD TO CART
                </button>
            </div>
            <div>
                <div className={`fw-bold ${classes['product-category']}`}>{category}</div>
                <div className="fw-bold fs-5">{name}</div>
                <div className={`${classes['product-price']}`}>{formatCurrency(price)}</div>
            </div>
        </div>

    );
};

export default ProductItem;