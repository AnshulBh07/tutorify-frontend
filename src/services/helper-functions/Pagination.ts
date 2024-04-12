import { useMemo } from "react";

type paginationHookType = (
  totalItems: number,
  pageSize: number,
  currPage: number,
  siblingCount: number
) => (string | number)[];

export const usePagination: paginationHookType = (
  totalItems,
  pageSize,
  currPage,
  siblingCount = 1
) => {
  const paginationRange = useMemo(() => {
    // for our pagination pill we will have max 5 clickable buttons at a time, the rest depends
    // on siblingsCount
    // count total number of pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // helper function to get range of numbers
    const range = (a: number, b: number) => {
      const arr: number[] = [];
      for (let i = a; i <= b; i++) {
        arr.push(i);
      }
      return arr;
    };

    // if the total pages are less than or equal to 5 simply return an array of that range
    if (totalPages <= 5) return range(1, totalPages);

    // if the total pages are more than 5 we have 3 conditions depending on the current page
    if (currPage >= 1 && currPage <= 4) {
      return [...range(1, 4), "...", totalPages];
    } else if (currPage >= totalPages - 4 && currPage <= totalPages) {
      return [1, "...", ...range(totalPages - 3, totalPages)];
    } else {
      return [
        1,
        "...",
        ...range(currPage - siblingCount, currPage + siblingCount),
        "...",
        totalPages,
      ];
    }
  }, [currPage, totalItems, pageSize, siblingCount]);

  return paginationRange;
};
