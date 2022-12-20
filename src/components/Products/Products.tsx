import React from 'react';
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import ProductList from "../ProductList/ProductList";
import artworkData from '../../data/products.json';

type ProductDetails = {
    dimensions: {width: number, height: number};
    size: number;
    description: string;
    recommendations: {src: string, alt: string}[];
};

export type ProductProps = {
    id: string;
    name: string;
    category: string;
    price: number;
    currency: string;
    image: {src: string, alt: string};
    bestseller: boolean;
    featured: boolean;
    details?: ProductDetails;
};

const Products = () => {

    // Get the Featured Product/Artwork
    const featuredProductIndex = artworkData.products.findIndex( product => product.featured === true );
    const featuredProd = artworkData.products[featuredProductIndex];

    return (
        <>
         <FeaturedProduct {...featuredProd as ProductProps} />
         <ProductList />
        </>
    );
};

export default Products;