import React from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  limit: number;
  page: number;
  totalCount: number;
  changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  changePage,
  page,
  limit,
  totalCount,
}) => {
  const pageCount = Math.ceil(totalCount / limit) - 1;

  return (
    <div className="w-full flex justify-end mt-5">
      <ReactPaginate
        breakLabel="..."
        className="flex items-center gap-1"
        nextLabel={<ChevronRight className="ml-4" />}
        pageClassName="px-3 py-1"
        onPageChange={(e) => changePage(e.selected + 1)}
        pageCount={pageCount}
        activeClassName="border-2 border-sky-300 rounded-md"
        previousLabel={<ChevronLeft className="mr-4" />}
        forcePage={page - 1}
      />
    </div>
  );
};

export default Pagination;
