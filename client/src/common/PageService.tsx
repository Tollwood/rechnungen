import { Page } from "./Page";

export class PageService {
  public static getPageAndSortParams(page: Page): String {
    let currentPage = "page=" + page.number;
    let size = "&size=" + page.size;

    let sort = "&sort=" + page.sort + "," + page.direction;
    return currentPage + size + sort;
  }

  public static sort(clickedColumn: string, page: Page, onPageChange: (page: Page) => void) {
    if (page.sort !== clickedColumn) {
      onPageChange({ ...page, direction: "ASC", sort: clickedColumn });
      return;
    }

    let direction: "ASC" | "DESC" = page.direction === "ASC" ? "DESC" : "ASC";
    onPageChange({ ...page, direction: direction });
  }
}
