import S from './Pagination.module.css';
import Button from "../button/Button";
import { PaginationProps } from "./Pagination.types";

/**
 * @function Pagination
 * @description A pagination system
 * @author J. Trpka
 * @param {PaginationProps} props
 * @returns {JSX.Element}
 */
const Pagination = ({
  // totalItems, // Create the numbers another time
  currentPage,
  totalPages,
  numbers = false,
  onPaginate
}: PaginationProps) => {
  const handleOnClick = (page: number) => {
    onPaginate(page);
  }

  return (
    <ul className={S.pagination}>
      <li><Button type="button" size="small" color="primary" disabled={currentPage === 0} onClick={() => handleOnClick(0)}>First</Button></li>
      <li><Button type="button" size="small" color="primary" disabled={currentPage === 0} onClick={() => handleOnClick(currentPage - 1)}>Prev</Button></li>

      {numbers ? (
        <li><Button type="button" size="small" color="primary">1</Button></li>
      ) : null}

      <li><Button type="button" size="small" color="primary" disabled={totalPages === (currentPage + 1)} onClick={() => handleOnClick(currentPage + 1)}>Next</Button></li>
      <li><Button type="button" size="small" color="primary" disabled={totalPages === (currentPage + 1)} onClick={() => handleOnClick(totalPages - 1)}>Last</Button></li>
    </ul>
  );
};

export default Pagination;