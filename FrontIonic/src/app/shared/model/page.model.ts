export class Page {
    size = 0;
    totalElements = 0;
    totalPages = 0;
    pageNumber = 0;
    filter = '-';

    constructor() {
        this.pageNumber = 0;
        this.size = 5;
    }
}
