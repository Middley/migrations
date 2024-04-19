export class PagedResponse {
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    maxPageLink: number;
    pageItemsStartsAt: number;
    pageItemsEndsAt: number;
    hasPreviousPage: Boolean;
    hasNextPage: Boolean;
    items: any[];
}