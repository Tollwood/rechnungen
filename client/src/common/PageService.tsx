import { Page } from "./Page";

export class PageService {
  public static getPageAndSortParams(page: Page): String {
    let currentPage = "page=" + page.number;
    let size = "&size=" + page.size;

    let sort = `&sort=${page.sort},${page.direction || "asc"}`;
    return currentPage + size + sort;
  }

  public static sort(clickedColumn: string, page: Page, onPageChange: (page: Page) => void) {
    if (page.sort !== clickedColumn) {
      onPageChange({ ...page, direction: "asc", sort: clickedColumn });
      return;
    }

    onPageChange({ ...page, direction: page.direction === undefined ? page.direction : "asc" });
  }
}
