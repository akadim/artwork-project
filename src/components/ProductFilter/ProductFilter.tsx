import React, {FC, useEffect, useReducer, useState} from 'react';
import classes from './ProductFilter.module.css';
import {Button, Form, Stack} from "react-bootstrap";
import {useShoppingCart} from "../../context/ShoppingCartContext";

type ProductFilterProps = {
  isOpen: boolean;
  onFilter: Function;
};


// State that holds the Checked Categories and the checked Price Range information
type ProductFilterState = {
    categoriesFilter: Map<string, boolean>,
    priceRangesFilter: Map<string, boolean>
};

type ProductFilterItem = {
    id: string;
    isChecked: boolean;
}

type ProductAction = {
    type: string;
    val: ProductFilterItem | string
};

// a reducer function to update the 'ProductFilterState' state
const productFilterReducer = (state: ProductFilterState, action: ProductAction) => {
   if (action.type === 'CATEGORY_FILTER') {
       const newSelectedCategories = state.categoriesFilter.set(
           (action.val as ProductFilterItem).id, (action.val as ProductFilterItem).isChecked
       );

       return {
           categoriesFilter: newSelectedCategories,
           priceRangesFilter: state.priceRangesFilter
       }
   } else if (action.type === 'PRICE_RANGE_FILTER') {

       for(let [key, value] of state.priceRangesFilter.entries()) {
           state.priceRangesFilter.set(key, false);
       }

       const newSelectedPriceRange = state.priceRangesFilter.set(
           (action.val as ProductFilterItem).id, (action.val as ProductFilterItem).isChecked
       );

       return {
           categoriesFilter: state.categoriesFilter,
           priceRangesFilter: newSelectedPriceRange
       }
   } else if (action.type === 'EMPTY_PRODUCT_FILTER') {

       for(let [key, value] of state.categoriesFilter.entries()) {
           state.categoriesFilter.set(key, false);
       }

       for(let [key, value] of state.priceRangesFilter.entries()) {
           state.priceRangesFilter.set(key, false);
       }

   }

   return {
       categoriesFilter: state.categoriesFilter,
       priceRangesFilter: state.priceRangesFilter
   }
}

const ProductFilter:FC<ProductFilterProps> = props => {
    const categories = ['People', 'Premium', 'Pets', 'Food', 'Landmarks', 'Cities', 'Nature'];
    const priceRanges = [
        {id: 'lower-20', label: 'Lower than $20', checked: false },
        {id: '20-100', label: '$20 - $100', checked: false },
        {id: '100-200', label: '$100 - $200', checked: false },
        {id: 'greater-200', label: 'More than $200', checked: false },
    ];

    const { isMobile } = useShoppingCart();

    // Initialize the Categories Filter Checkboxes, all the Checkboxes are unchecked at first
    const categoriesCheckboxes = new Map();
    categories.forEach(category => {
       categoriesCheckboxes.set(category, false);
    });

    // Initialize the Price Range Filter Checkboxes, all the Checkboxes are unchecked at first
    const priceRangeCheckboxes = new Map();
    priceRanges.forEach(category => {
        priceRangeCheckboxes.set(category.id, false);
    });

    const defaultProductFilter = {
       categoriesFilter: categoriesCheckboxes,
       priceRangesFilter: priceRangeCheckboxes
    };

    const [productFilterState, dispatchFilterAction] = useReducer(productFilterReducer, defaultProductFilter);

    // Send the Updated Filters to ProductList Component when productFilterState is changed
    useEffect(() => {
        if(!isMobile) {
            props.onFilter(productFilterState);
        }
    }, [productFilterState]);



    const onFilter = (event: any) => {
        const item = event.target.id;
        const isChecked = event.target.checked;
        const filterType = event.target.getAttribute('filter-type');
        if(filterType === 'categories') {
            dispatchFilterAction({type: 'CATEGORY_FILTER', val: { id: item, isChecked }});
        } else if(filterType === 'price-ranges') {
            dispatchFilterAction({type: 'PRICE_RANGE_FILTER', val: { id: item, isChecked }});
        } else if(filterType === 'cancel-filter') {
            dispatchFilterAction({type: 'EMPTY_PRODUCT_FILTER', val: ''});
        }
    }

    return (
        <>
            { props.isOpen && (
              <div className={classes['filter-section']}>
                <div>
                    <p className="fw-bold">Category</p>
                    <Form>
                        {categories.map((category) => (
                            <div className="mb-3" key={category}>
                                <Form.Check
                                    type='checkbox'
                                    filter-type="categories"
                                    id={`${category}`}
                                    label={`${category}`}
                                    checked={productFilterState.categoriesFilter.get(category)}
                                    onChange={onFilter}
                                />
                            </div>
                        ))}
                    </Form>
                </div>
                <hr />
                <div>
                    <p className="fw-bold">Price range</p>
                    <Form>
                        {priceRanges.map((priceRange) => (
                            <div className="mb-3" key={priceRange.id}>
                                <Form.Check
                                    type='checkbox'
                                    filter-type="price-ranges"
                                    id={`${priceRange.id}`}
                                    label={`${priceRange.label}`}
                                    checked={productFilterState.priceRangesFilter.get(priceRange.id)}
                                    onChange={onFilter}
                                />
                            </div>
                        ))}
                    </Form>
                </div>
                <div className={`p-2 ${classes['filter-btn-actions']}`}>
                    <Stack direction="horizontal" gap={3}>
                        <Button
                            filter-type="cancel-filter"
                            variant="outline-dark"
                            className="w-100"
                            onClick={(event) => {
                                onFilter(event);
                                props.onFilter(defaultProductFilter);
                            }}
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => {props.onFilter(productFilterState);}}
                        >
                            SAVE
                        </Button>
                    </Stack>
                </div>
            </div>) }
        </>
    );
};

export default ProductFilter;