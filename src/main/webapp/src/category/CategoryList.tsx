import * as React from "react";
import {Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";
import {debounce} from "ts-debounce";
import API from "../API";
import Search from "../order/Search";
import Company from "../employees/Company";
import Category from "./Category";

interface Props {
    company: Company,
    onAdd: () => void,
    onSelect: (selectedCategory: Category) => void,
}

interface State {
    categories: Category[],
    searchTerm: string
    page: Page,
    hasMore: boolean,
    isLoading: boolean
}

export default class CategoryList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: "",
            page: new Page('name'),
            hasMore: true,
            categories: [],
            isLoading: true
        };

        // Binds our scroll event handler
        window.onscroll = debounce(() => {

            if (this.state.isLoading) return;

            // Checks that the page has scrolled to the bottom
            if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight && this.state.hasMore) {
                this.scroll();
            }
        }, 100);
    }

    componentDidMount(): void {
        this.search(this.state.searchTerm, this.state.page);
    }

    private searchByTerm(searchTerm: string) {
        let page = this.state.page;
        page.number = 0;
        this.search(searchTerm, page)
    }

    private search(searchQuery: string, page: Page, append: boolean = false) {
        this.setState({searchTerm: searchQuery, page: page});
        API.get('api/categories/search?term=' + searchQuery + "&" + PageService.getPageAndSortParams(page))
            .then(res => {
                let hasMore = res.data.page.totalPages > res.data.page.number + 1;
                this.setState({hasMore: hasMore, page: Object.assign(this.state.page, {totalElements: res.data.page.totalElements})});
                return res.data._embedded === undefined ? [] : res.data._embedded.category;
            })
            .then((data: any[]) => data.map(value => Object.assign(new Category(this.props.company._links.self!.href), value)))
            .then((categories: Category[]) => this.setState({
                categories: append ? this.state.categories.concat(categories) : categories,
                isLoading: false
            }));
    }

    private scroll() {
        let page = this.state.page;
        page.number += 1;
        this.search(this.state.searchTerm, page, true)
    }

    private sortAndPage(page: Page) {
        this.setState({isLoading: true, page: page});
        this.search(this.state.searchTerm, page);
    }

    render() {
        return (
            <React.Fragment>
                <Table className="ui compact celled table selectable service-list" sortable >
                    <Table.Header>
                        <Search onSearchChanged={this.searchByTerm.bind(this)} currentValue={this.state.searchTerm} onAdd={this.props.onAdd}
                                labelAdd={"Neue Kategorie"}
                                searchFieldWidth={1}
                                addButtondWidth={1}/>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'name' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('name', this.state.page, this.sortAndPage.bind(this))}
                            >Name</Table.HeaderCell>
                            <Table.HeaderCell>Aktiv</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(category: Category) {
        return <Table.Row key={category.name} onClick={this.props.onSelect.bind(this, category)}>
            <Table.Cell >{category.name}</Table.Cell>
            <Table.Cell>{category.active ? <Icon name={'check'}/> : null}</Table.Cell>
        </Table.Row>;
    }

    private renderRows() {

        if (this.state.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.state.categories.map(category => this.renderRow(category))
    }

    private placeHolderRow() {
        return <Table.Row>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
        </Table.Row>;
    }
}
