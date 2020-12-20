import * as React from "react";
import Service from "../order/Service";
import {DropdownItemProps, DropdownProps, Form, Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";
import {debounce} from "ts-debounce";
import API from "../API";
import Search from "../order/Search";
import { useEffect, useState } from "react";
import ServiceCatlog from "../order/ServiceCatalog";

interface Props {
    onAdd: () => void,
    onSelect: (selectedService: Service) => void,
    onProductCatalogSelect:(serviceCatalog?:ServiceCatlog)=>void,
    selectedServiceCatalog?:ServiceCatlog,
    serviceCatalogs: ServiceCatlog[]
}

const ServiceList:React.FC<Props> =  (props:Props) => {

    const {selectedServiceCatalog} = props;
    const [searchTerm,setSearchTerm] = useState<string>("");
    const [page,setPage] = useState<Page>(new Page('articleNumber'));
    const [hasMore,setHasMore] = useState<boolean>(true);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [services,setServices] = useState<Service[]>([]);
    
    // Binds our scroll event handler
window.onscroll = debounce(() => {

    if (isLoading) return;

    // Checks that the page has scrolled to the bottom
    if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight && hasMore) {
        scroll();
    }
}, 100);

    useEffect(()=>{
       if(selectedServiceCatalog){
        search();
       }
    },[selectedServiceCatalog, searchTerm,page]);        
            
    function  sortAndPage(newPage: Page) {
        setIsLoading(true);
        setServices([]);
        setPage(newPage);
    }
    
    function scroll(){
        setPage({...page, number: page.number+1})
    }

    function renderRows() {

        if (isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(placeHolderRow)
        }
        return services.filter((s:Service) => s.serviceCatalogId === (selectedServiceCatalog? selectedServiceCatalog.idValue: -1)).map(service => renderRow(service,props.onSelect))
    }

    function searchByTerm (searchTerm: string) {
        setPage({...page, number:0})
        setSearchTerm(searchTerm);
    }

    function search () {
      
        API.get('api/service/search?term=' + searchTerm + "&" + PageService.getPageAndSortParams(page))
            .then(res => {
                let hasMore = res.data.page.totalPages > res.data.page.number + 1;
                setHasMore(hasMore);
                return res.data._embedded === undefined ? [] : res.data._embedded.service;
            })
            .then((data: any[]) => data.map(value => Object.assign(new Service(), value)))
            .then((services: Service[]) => {
                setServices(prev => [...services]);
                setIsLoading(false);
            }
                );
    }
    
    function mapCatalogToDropdownItems(): DropdownItemProps[] {
        return props.serviceCatalogs.map((serviceCatalog: ServiceCatlog, index:number) => {
            return {key: serviceCatalog.name, value: serviceCatalog.idValue, text: serviceCatalog.name}
        });
    }

    function updateClient(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const selected = props.serviceCatalogs.find(sc => sc.idValue === data.value as number);
        props.onProductCatalogSelect(selectedServiceCatalog);
    }

    
        return <React.Fragment>
            <Form.Dropdown id="client"
                                           selection
                                           options={mapCatalogToDropdownItems()}
                                           value={selectedServiceCatalog?.idValue}
                                           onChange={updateClient}
                                           
                            />
                <Table className="ui compact celled table selectable service-list" sortable >
                    <Table.Header>
                        <Search onSearchChanged={searchByTerm} currentValue={searchTerm} onAdd={props.onAdd}
                                labelAdd={"Neuen Service"}
                                searchFieldWidth={3}
                                addButtondWidth={1}/>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={page.sort === 'articleNumber' ? page.direction : undefined}
                                onClick={() => PageService.sort('articleNumber', page, sortAndPage)}
                            >Artikelnummer</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={page.sort === 'title' ? page.direction : undefined}
                                onClick={() => PageService.sort('title', page, sortAndPage)}
                            >Bezeichnung</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={page.sort === 'price' ? page.direction : undefined}
                                onClick={() => PageService.sort('price', page, sortAndPage)}
                            >Preis</Table.HeaderCell>
                            <Table.HeaderCell>Selektierbar</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderRows()}
                    </Table.Body>
                </Table>
            </React.Fragment>
        
        }

const renderRow = (service: Service, onSelect: (service:Service)=> void) =>{
    return <Table.Row key={service.articleNumber} onClick={()=>onSelect(service)}>
        <Table.Cell>{service.articleNumber}</Table.Cell>
        <Table.Cell>{service.title}</Table.Cell>
        <Table.Cell>{service.price.toLocaleString('de', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</Table.Cell>
        <Table.Cell>{service.selectable ? <Icon name={'check'}/> : null}</Table.Cell>
    </Table.Row>;
}


const placeHolderRow = () =>{
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
};

export default ServiceList;