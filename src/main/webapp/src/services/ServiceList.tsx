import * as React from "react";
import Service from "../order/Service";
import {Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";
import {debounce} from "ts-debounce";
import API from "../API";
import Search from "../order/Search";

interface Props {
    onAdd: () => void,
    onSelect: (selectedService: Service) => void,
}

interface State {
    services: Service[],
    searchTerm: string
    page: Page,
    hasMore: boolean,
    isLoading: boolean
}

export default class ServiceList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: "",
            page: new Page('articleNumber'),
            hasMore: true,
            services: [],
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
        API.get('api/service/search?term=' + searchQuery + "&" + PageService.getPageAndSortParams(page))
            .then(res => {
                let hasMore = res.data.page.totalPages > res.data.page.number + 1;
                this.setState({hasMore: hasMore, page: Object.assign(this.state.page, {totalElements: res.data.page.totalElements})});
                return res.data._embedded === undefined ? [] : res.data._embedded.service;
            })
            .then((data: any[]) => data.map(value => Object.assign(new Service(), value)))
            .then((services: Service[]) => this.setState({
                services: append ? this.state.services.concat(services) : services,
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
                                labelAdd={"Neuen Service"}
                                searchFieldWidth={3}
                                addButtondWidth={1}/>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'articleNumber' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('articleNumber', this.state.page, this.sortAndPage.bind(this))}
                            >Artikelnummer</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'title' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('title', this.state.page, this.sortAndPage.bind(this))}
                            >Bezeichnung</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'price' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('price', this.state.page, this.sortAndPage.bind(this))}
                            >Preis</Table.HeaderCell>
                            <Table.HeaderCell>Selektierbar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(service: Service) {
        return <Table.Row key={service.articleNumber} onClick={this.props.onSelect.bind(this, service)}>
            <Table.Cell>{service.articleNumber}</Table.Cell>
            <Table.Cell>{service.title}</Table.Cell>
            <Table.Cell>{service.price.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</Table.Cell>
            <Table.Cell>{service.selectable ? <Icon name={'check'}/> : null}</Table.Cell>
        </Table.Row>;
    }

    private renderRows() {

        if (this.state.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.state.services.map(service => this.renderRow(service))
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
