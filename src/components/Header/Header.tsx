import React from 'react';
import {Col, Image, Navbar as NavbarArt} from 'react-bootstrap';
import logo from '../../assets/logo.png';
import cart from '../../assets/cart.svg';
import classes from './Header.module.css';
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import {useShoppingCart} from "../../context/ShoppingCartContext";

const Header = () => {

    const { openCart, closeCart, isOpen, cartQuantity } = useShoppingCart();

    const toggleCartDropdown = () => {
       if(isOpen) {
           closeCart();
       } else {
           openCart();
       }
    };

    return (
        <NavbarArt className={classes.navbar}>
            <Col className="me-auto">
                <Image src={logo} alt="BEJAMAS" className="me-auto" />
            </Col>
            <div className={classes['cart-section']}>
                <Image src={cart} alt="Cart" className={classes.cart} onClick={toggleCartDropdown}/>
                {cartQuantity > 0 && <div className={`d-flex justify-content-center align-items-center ${classes["cart-badge"]}`}>{ cartQuantity }</div>}
                {isOpen && <ShoppingCart></ShoppingCart>}
            </div>
        </NavbarArt>
    );
};

export default Header;