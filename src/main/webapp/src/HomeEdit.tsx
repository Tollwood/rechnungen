import * as React from "react";
import {useState} from "react";
import Company from "./employees/Company";
import {Checkbox, CheckboxProps, Form, Grid} from "semantic-ui-react";
import {Editor} from "./Editor";
import CompanyService from "./order/CompanyService";
import CUDButtons from "./common/CUDButtons";

interface Props {
    company: Company
    onClose: ()=>void
}

export default function HomeEdit(props: Props) {
    const [company, setCompany] = useState<Company>(props.company);

    function handleSelectable(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        // @ts-ignore
        setCompany({...company, publicOrder: data.checked});
    }

    return <Grid>
        <Grid.Row>
            <Grid.Column width={16}>
                <Form.Field>
                    <label>Header</label>
                    <Editor content={company.homeHeader}
                            onContentChange={(content: string) => setCompany({...company, homeHeader: content})}/>
                </Form.Field>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <Form.Field>
                    <Checkbox toggle
                              name="selectable"
                              id="selectable"
                              label="Wählbar"
                              checked={company.publicOrder}
                              onChange={handleSelectable}/>

                </Form.Field>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16}>
                <Form.Field>
                    <label>Footer</label>
                    <Editor content={company.homeFooter}
                            onContentChange={(content: string) => setCompany({...company, homeFooter: content})}/>
                </Form.Field>
            </Grid.Column>
        </Grid.Row>
        <CUDButtons onSave={(onSuccess, onError) => {
            CompanyService.save(company, props.company, onSuccess, onError)
        }}
                    object={company}
                    onDelete={() => {}}
                    name={"Homepage"}
                    initialState={props.company}
                    onSuccess={props.onClose}
                    onCancel={props.onClose}
                    onError={()=>{}}
                    canDelete={false}/>
    </Grid>


}