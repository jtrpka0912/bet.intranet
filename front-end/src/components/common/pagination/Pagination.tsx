import { PaginationProps } from "./Pagination.types";

/**
 * @function Pagination
 * @description A pagination system
 * @author J. Trpka
 * @param {PaginationProps} props
 * @returns {JSX.Element}
 */
const Pagination = ({
  totalItems,
  currentPage,
  totalPages
}: PaginationProps) => {
  return (
    <div>Hello World: {totalItems}, {currentPage}, {totalPages}</div>
  );
};

export default Pagination;