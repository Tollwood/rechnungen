import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Form, Image} from "semantic-ui-react";
import {InputFile} from "semantic-ui-react-input-file/src/InputFile";

interface Props {
    onFileChange: (file: File) => void
}

export default function ImageUpload(props: Props) {

    const [file, setFile] = useState();

    function onFileChangeHandler(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        props.onFileChange(e.target.files![0]);
        setFile(URL.createObjectURL(e.target.files![0]));
    }

    return <Form.Field>
        <label>Neues Bild</label>
        {file !== undefined && <span style={{margin:"5px"}}><Image src={file} style={{width: "200px"}} wrapped centered/></span> }
        <InputFile
            button={{ label: "Bild auswählen" }}
            input={{
                id: 'input-control-id',
                accept: 'image/*',
                onChange: onFileChangeHandler
            }}
        />

    </Form.Field>
}