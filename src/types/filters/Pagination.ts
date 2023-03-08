export const DEFAULT_PAGE_SIZE = 50

export const fullListPagination: Pagination = {
  page: 1,
  size: 1000,
  preload: false,
}

export class Pagination {
  page = 1
  size = DEFAULT_PAGE_SIZE
  preload = true
}
