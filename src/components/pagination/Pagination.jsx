import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './styled.module.scss';
const Pagination = ({ onChangePage, pageCount }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
