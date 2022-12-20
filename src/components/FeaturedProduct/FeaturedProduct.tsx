import React, {FC} from 'react';
import classes from "../FeaturedProduct/FeaturedProduct.module.css";
import {Image, Row, Col, Stack} from "react-bootstrap";
import {ProductProps} from "../Products/Products";
import formatByteSize from "../../utilities/formatByteSize";
import {useShoppingCart} from "../../context/ShoppingCartContext";


const FeaturedProduct: FC<ProductProps> = (props) => {

    const recommendations = props.details?.recommendations;

    const { increaseCartQuantity, openCart } = useShoppingCart();

    const addToCart = () => {
        increaseCartQuantity(props.id);
        openCart();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <Row>
                <Col sm={12} md={6} lg={6} className={classes['featured-product-title']}>
                    <span className="fw-bold" style={{fontSize: '22px'}}>{props.name}</span>
                </Col>
                <Col sm={12} md={6} lg={6} className={`align-items-center justify-content-end ${classes['featured-product-btn']}`}>
                    <button className={`float-end ${classes['add-to-cart-btn']}`} onClick={addToCart}>
                        ADD TO CART
                    </button>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <div className={classes['featured-product-img']} style={{backgroundImage: `url(../imgs/${props.image.src}.jpg)`}}>
                        <div className={`d-flex bg-white fw-bold p-2 justify-content-center align-items-center ${ classes['featured-product-caption'] }`}>
                            Photo of the day
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12} className={`mt-2 ${classes['cart-section']}`}>
                    <button className={`float-end w-100 ${classes['add-to-cart-btn']}`} onClick={addToCart}>
                        ADD TO CART
                    </button>
                </Col>
            </Row>
            <Row className={classes['featured-wrapper']}>
                <Col sm={12} md={6} lg={6}>
                    <div className={`fw-bold ${classes['featured-product-detail-header']}`}>
                        <span>About the {props.name}</span>
                        <p className={classes['description-content']}>{props.category}</p>
                    </div>
                    <span
                        className={`d-flex justify-content-center align-items-center ${classes['description-content']}`}
                    >
                        {props.details?.description}
                    </span>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <p className={`fw-bold text-end ${classes['featured-product-detail-header']}`}>People also buy:</p>
                    <div className={`d-flex flex-column align-items-end justify-content-end`}>
                        <Stack direction="horizontal" gap={2} className={`d-flex align-items-end ${classes['featured-product-detail-body']}`}>
                            { recommendations?.map( recommendation => (
                                <Image
                                    key={props.name + '-' + Math.random() }
                                    src={`../imgs/${recommendation.src}.jpg`}
                                    alt={recommendation.alt}
                                    className={classes['recommendation-img']}
                                    fluid
                                />
                            ) )}
                        </Stack>
                        <div className="d-flex flex-column align-items-end justify-content-end">
                            <p className="fw-bold">Details</p>
                            <div className={`text-end ${classes['description-content']}`}>
                                <div>Size: {props.details?.dimensions.width}x{props.details?.dimensions.height} pixels</div>
                                <div>Size: {props.details?.size &&  formatByteSize(props.details?.size) }</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default FeaturedProduct;