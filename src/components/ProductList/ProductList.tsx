import React, {useState} from 'react';
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import ProductFilter from "../ProductFilter/ProductFilter";
import {ProductProps} from "../Products/Products";
import ProductItem from "../ProductItem/ProductItem";
import classes from './ProductList.module.css';
import filter from '../../assets/filter.png';
import artworkData from '../../data/products.json';
import {useShoppingCart} from "../../context/ShoppingCartContext";
import Pagination from "../Pagination/Pagination";
import ProductSort from "../ProductSort/ProductSort";



const ProductList = () => {

    const [products, setProducts] = useState<ProductProps[]>(artworkData.products as ProductProps[]);

    // Filter Info
    const [filterIsOpen, setFilterIsOpen] = useState<boolean>(true);
    const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
    const [priceRangeFilter, setPriceRangeFilter] = useState<string>('');

    // Pagination Info
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productPerPage, setProductPerPage] = useState<number>(6);
    const lastProductPageIndex = currentPage * productPerPage;
    const firstProductPageIndex = lastProductPageIndex - productPerPage;

    // Check if the Device is a Computer or a Mobile
    const { isMobile } = useShoppingCart();

    const filterProducts = (filters: any) => {
        const categories = [];
        let priceRange = '';
        setCurrentPage(1);
        const categoryIterator = filters.categoriesFilter.entries();
        for (let [key, value] of categoryIterator) {
            if(value) {
                categories.push(key);
            }
        }

        setCategoriesFilter([...categories]);

        for(let[key, value] of filters.priceRangesFilter.entries()) {
          if(value) {
            priceRange = key;
          }
        }

        setPriceRangeFilter(priceRange);

    };

    const toggleFilterForm = () => {
       setFilterIsOpen(prevState => !prevState);
    };

    const priceRangeFilterCondition = (condition: string, price: number) => {
        switch (condition) {
            case 'lower-20': return price < 20; break;
            case '20-100': return price >= 20 && price <= 100; break;
            case '100-200': return price >= 100 && price <= 200; break;
            case 'greater-200': return price > 200; break;
            default: return; break;
        }
    }

    const filteredProductsByCategories = categoriesFilter.length > 0 ? products.filter(product => {
        return categoriesFilter.some(category => product.category.toLowerCase() === category.toLowerCase())
    }) : products;

    const filteredProducts = priceRangeFilter.trim().length > 0 ?
        filteredProductsByCategories.filter(product => priceRangeFilterCondition(priceRangeFilter, product.price)) :
        filteredProductsByCategories;

    return (
       <Container>
           <Row className="mb-3">
               <Col
                   sm={12}
                   md={9}
                   lg={9}
                   className={`p-2 ${classes['product-list-wrapper']} ${filterIsOpen ? classes['products-wrapper-bg'] : ''}`}
                   style={{background: `${filterIsOpen && isMobile ? '#CCC' : '#FFF'}`}}
               >
                   <span className="fs-5">Photography / </span>
                   {categoriesFilter.map((category,i, row) => {
                       return <span className={`${classes['category-title']}`}>
                           {category} Photos {categoriesFilter.length  === i + 1 ? '' : '- ' }
                       </span>;
                   })}
                   <Image
                       src={filter}
                       alt="Filter"
                       className={`${classes['filter-img']} float-end`}
                       onClick={toggleFilterForm}
                   />
               </Col>
               <Col
                   sm={12}
                   md={3}
                   lg={3}
                   className={`p-2 ${classes['products-sorting-wrapper']} ${filterIsOpen ? classes['product-list-wrapper-bg'] : ''}`}
                   style={{background: `${filterIsOpen && isMobile ? '#CCC' : '#FFF'}`}}
               >
                   <ProductSort products={products} setProducts={setProducts} />
               </Col>
           </Row>
           <Row>
               <Col sm={12} md={3} lg={3}>
                  <ProductFilter isOpen={filterIsOpen || !isMobile} onFilter={filterProducts} />
               </Col>
               <Col sm={12} md={9} lg={9}>
                   <Row md={2} xs={1} lg={3} className="g-3">
                       {filteredProducts.slice(firstProductPageIndex, lastProductPageIndex).map(product => (
                           <Col key={product.id}>
                               <ProductItem {...product} />
                           </Col>
                       ))}
                   </Row>
                   <Row>
                       <Container className="justify-content-center align-items-center">
                           <Pagination
                               currentPage={currentPage}
                               totalProducts={filteredProducts.length}
                               productsPerPage={productPerPage}
                               setCurrentPage={setCurrentPage}
                           />
                       </Container>
                   </Row>
               </Col>
           </Row>
       </Container>
    );
};

export default ProductList;