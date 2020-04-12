import * as React from "react";
import {useState} from "react";
import {Form} from "semantic-ui-react";
import {DateInput} from "semantic-ui-calendar-react";
import {DateUtil} from "./common/DateUtil";

interface Props {
    handleDateChange: (date: string) => void,
    errors: Map<string, string>
}

export default function Wishdate(props: Props) {

    const [wishDate, setWishDate] = useState<string>(DateUtil.tomorrowAsString());

    function handleDateChange(e: any, data: { value: string }) {
        setWishDate(data.value);
        props.handleDateChange(data.value);
    }

    return <React.Fragment>
        <Form.Field>
            <label>Abholdatum</label>
            <DateInput
                id="firstAppointment"
                dateFormat={"DD.MM.YYYY"}
                minDate={'01.01.1990'}
                hideMobileKeyboard={true}
                name="firstAppointment"
                placeholder="Abohldatum wählen"
                value={wishDate ? wishDate : ''}
                iconPosition="left"
                onChange={handleDateChange}
                error={props.errors.get('firstAppointment') ? {content: props.errors.get('firstAppointment')} : null}
            />
        </Form.Field>

    </React.Fragment>

}