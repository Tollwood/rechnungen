import * as React from "react";
import {Dropdown, DropdownProps, Pagination, PaginationProps, Table} from "semantic-ui-react";
import {Page} from "./Page";

interface Props {
    page: Page
    onPageChange: (page: Page) => void
    columns: number
}

export default class PaginationFooter extends React.Component<Props> {

    render() {

        if (!this.props.page) {
            return
        }
        return <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={this.props.columns -1}>
                    {this.props.page.totalPages > 1 ?
                        <Pagination activePage={this.props.page.number + 1}
                                    onPageChange={this.handlePaginationChange.bind(this)}
                                    totalPages={this.props.page.totalPages}
                                    lastItem={this.props.page.totalPages - 1 === this.props.page.number ? null : undefined}
                                    nextItem={this.props.page.totalPages - 1 === this.props.page.number ? null : undefined}
                                    firstItem={0 === this.props.page.number ? null : undefined}
                                    prevItem={0 === this.props.page.number ? null : undefined}

                        /> : null}
                </Table.HeaderCell>
                <Table.HeaderCell style={{overflow: "visible"}}>
                    <Dropdown id="pageSize"
                              style={{float: "right"}}
                              compact={true}
                              selection
                              options={[
                                  {key: 10, value: 10, text: 10},
                                  { key: 20, value: 20, text: 20},
                                  {key: 30, value: 30, text: 30},
                                  {key: 40, value: 40, text: 40},
                                  { key: 50, value: 50, text: 50}
                                  ]}
                              value={this.props.page.size}
                              onChange={this.handlePageSizeChange.bind(this)}
                    />
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    }

    handlePageSizeChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.props.onPageChange(Object.assign(this.props.page, {size: data.value, number: 0}))
    }

    handlePaginationChange(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) {
        this.props.onPageChange(Object.assign(this.props.page, {number: data.activePage as number - 1}))
    };


}
