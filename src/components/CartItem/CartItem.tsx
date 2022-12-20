import React from 'react';
import artwork from '../../data/products.json';
import {Button, Stack} from "react-bootstrap";
import formatCurrency from "../../utilities/formatCurrency";

type CartItemProps = {
    id: string;
    quantity: number;
}

const CartItem = ({id, quantity}: CartItemProps) => {

    const item = artwork.products.find(i => i.id === id);

    if(item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <div className="me-auto">
                <div>
                    {item.name} { quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: ".65rem"}}>
                          x{quantity}
                      </span>
                ) }
                </div>
                <div className="text-muted" style={{ fontSize: '.75rem'}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <img src={`imgs/${item.image.src}.jpg`} style={{width: '75px', height: '42px', objectFit: 'cover'}}/>
        </Stack>
    );
};

export default CartItem;