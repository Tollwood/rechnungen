import React, {useRef} from 'react';
import JoditEditor from "jodit-react";

interface Props {
    content: string
    onContentChange: (content:string) => void
}

export function Editor(props: Props) {
    const editor = useRef(null);

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    };

    return (
        <JoditEditor
            ref={editor}
            value={props.content}
            config={config}
            onBlur={props.onContentChange} // preferred to use only this option to update the content for performance reasons
        />
    );
}