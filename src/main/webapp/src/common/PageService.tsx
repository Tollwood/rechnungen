import {Page} from "./Page";

export class PageService{

    public static getPageAndSortParams(page: Page): String {
        let currentPage = 'page=' + page.number;
        let size = '&size=' + page.size;
        let dir = page.direction === 'ascending' ? 'asc' : 'desc';
        let sort = '&sort=' + page.sort + ',' + dir;
        return  currentPage + size + sort;
    }

    public static sort(clickedColumn: string, page:Page, onPageChange:(page:Page)=>void){

        if (page.sort !== clickedColumn) {
            onPageChange(Object.assign(page, {direction: 'ascending', sort: clickedColumn}));
            return
        }

        let direction = page.direction === 'ascending' ? 'descending' : 'ascending';
        onPageChange(Object.assign(page, {direction: direction}));
    }
}