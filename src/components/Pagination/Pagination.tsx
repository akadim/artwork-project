import React, {FC} from 'react';
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

import classes from './Pagination.module.css';

type PaginationProps = {
    currentPage: number;
    totalProducts: number;
    productsPerPage: number;
    setCurrentPage: Function;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalProducts, productsPerPage, setCurrentPage}) => {

    let pages = [];

    for(let i = 1; i<= Math.ceil(totalProducts/productsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex justify-content-center mt-4 mb-4">
            { currentPage > 1 && (
                <a
                    className={`${classes['pagination-link']} ${classes['active']}`}
                    onClick={() => {setCurrentPage(currentPage - 1)}}
                >
                    <BsChevronLeft />
                </a>
            ) }
            {pages.map((page, index) => (
                <a
                    key={index}
                    className={`${classes['pagination-link']} ${page === currentPage ? classes['active'] : ''}`}
                    onClick={() => {setCurrentPage(page)}}
                >
                    {page}
                </a>
            ))}
            { currentPage < Math.ceil(totalProducts/productsPerPage) && (
                <a
                    className={`${classes['pagination-link']} ${classes['active']}`}
                    onClick={() => {setCurrentPage(currentPage + 1)}}
                >
                    <BsChevronRight />
                </a>
            ) }
        </div>
    );
};

export default Pagination;