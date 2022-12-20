import React, {FC, useState} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {BsArrowDown, BsArrowUp} from "react-icons/bs";
import {ProductProps} from "../Products/Products";

type ProductSortProps = {
    products: ProductProps[];
    setProducts: Function;
}

const ProductSort:FC<ProductSortProps> = ({products, setProducts}) => {

    // Sorting Info
    const [sortBy, setSortBy] = useState<any>('name');

    const sortProduct = (event: any) => {
        setSortBy(event.target.value);
    };

    const sortAscending = () => {
        if(sortBy === 'name') {
            setProducts([...products.sort(
                (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )]);
        } else {
            setProducts([...products.sort(
                (a, b) => a.price > b.price ? 1 : -1
            )]);
        }
    };

    const sortDescending = () => {
        if(sortBy === 'name') {
            setProducts([...products.sort(
                (a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
            )]);
        } else {
            setProducts([...products.sort(
                (a, b) => a.price < b.price ? 1 : -1
            )]);
        }
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={7} style={{textAlign: 'right'}}>
                    <BsArrowUp style={{cursor: 'pointer'}} onClick={sortAscending}/>
                    <BsArrowDown style={{cursor: 'pointer'}} onClick={sortDescending}/>
                    Sort By
                </Form.Label>
                <Col sm={5}>
                    <Form.Select onChange={sortProduct}>
                        <option value="name">Alphabet</option>
                        <option value="price">Price</option>
                    </Form.Select>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default ProductSort;