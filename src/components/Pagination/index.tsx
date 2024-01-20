import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  total: number;
  setPageNumber: (pageNumber: number) => void;
};

const Pagination = ({ setPageNumber, total, ...props }: Props) => {
  const itemsPerPage = 10;
  const pageCount = Math.ceil(total / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event?.selected + 1);
  };

  return (
    <>
      <div className="text-gray-900/60 bg-white flex gap-4 items-center py-4 sticky bottom-0">
        <ReactPaginate
          className="flex gap-3"
          pageClassName={
            "bg-gray-100 border-gray-200/30 border-2 my-auto py-1 text-center rounded h-full"
          }
          pageLinkClassName={"my-auto py-2 px-3 text-center h-full"}
          breakLabel="..."
          nextLabel={
            <p className="bg-gray-100 px-2 py-1 rounded text border-gray-200/30 border-2">
              Next
            </p>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <p className="bg-gray-100 px-2 py-1 rounded text border-gray-200/30 border-2">
              Previous
            </p>
          }
          renderOnZeroPageCount={null}
        />
        <p className="text-sm">10 Rows Per Page</p>
      </div>
    </>
  );
};

export default Pagination;
