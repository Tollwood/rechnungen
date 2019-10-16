import React, {Component} from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';
import BillItem from "./BillItem";
import Bill from "./Bill";
import BillServiceTable from "./BillServiceTable";

// Create styles
// @ts-ignore
// @ts-ignore
// @ts-ignore
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column2: {
        flex: 50
    },
    sum: {
        textAlign: "right",
        marginRight: 5,
        marginTop: 2
    },
});

export default class BillItems extends Component<{ bill: Bill }, {}> {

    maxItemsOnFirstPage = 14; //17 wihtout logo
    maxItemsOnPage = 27;

    render(): React.ReactNode {
        return (
            <React.Fragment>
                {this.renderItemsFirstPage()}
                {this.renderItemsForRemainingPages()}
            </React.Fragment>
        )
    }


    private renderItemsFirstPage() {

        let itemCountToRender = this.props.bill.billItems.length > this.maxItemsOnFirstPage ? this.maxItemsOnFirstPage : this.props.bill.billItems.length;
        let morePages: boolean = this.props.bill.billItems.length > this.maxItemsOnFirstPage - 3;
        return <React.Fragment>
            <BillServiceTable data={this.props.bill.billItems.slice(0, itemCountToRender)}/>
            {morePages ?
                <React.Fragment>
                    {this.renderTakeOver(0, itemCountToRender)}
                    {this.renderTakeOver(0, itemCountToRender, true)}
                </React.Fragment> : null
            }
        </React.Fragment>
    }

    private renderItemsForRemainingPages() {

        let requiresMorPages = this.props.bill.billItems.length > this.maxItemsOnFirstPage;
        if (requiresMorPages) {
            return this.renderAdditionalItems(this.maxItemsOnFirstPage, this.maxItemsOnPage)
        }
        return null;
    }

    private renderTakeOver(start: number, end: number, breakPage?: boolean) {
        let takeOver = this.props.bill.billItems
            .slice(start, end)
            .map((billitem: BillItem) => billitem.amount * billitem.price).reduce((a: number, b: number) => a + b, 0).toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        return <View style={[styles.row]} break={breakPage}>
            <Text style={[styles.column2, {marginLeft: 400, marginTop: 12}]}>Übertrag</Text>
            <Text
                style={[styles.column2, styles.sum, {marginTop: 12}]}>{takeOver}</Text>
        </View>
    }

    private renderAdditionalItems(index: number, maxItems: number) {
        if (index >= this.props.bill.billItems.length) {
            return null;
        }
        let morePages: boolean = this.props.bill.billItems.length > index + maxItems - 3;
        return <React.Fragment>
            <BillServiceTable data={this.props.bill.billItems.slice(index, index + maxItems)}/>
            {morePages ?
                <React.Fragment>
                    {this.renderTakeOver(0, index + maxItems)}
                    {this.renderTakeOver(0, index + maxItems, true)}
                    {this.renderAdditionalItems(index += maxItems, maxItems)}
                </React.Fragment> : null
            }
        </React.Fragment>
    }
}
