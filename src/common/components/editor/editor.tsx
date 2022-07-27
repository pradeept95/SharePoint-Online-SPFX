import { IInputProps, IRenderFunction, ITextFieldProps } from "@fluentui/react";
import * as React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';
import { renderFieldDescription, renderFieldErrorMessage, renderFieldLabelWithHelp } from "../forms/CustomFormElements";

const modules={
    toolbar: [
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'direction': 'rtl' }],                         // text direction 
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    ['link', 'image', 'video'],
    ['blockquote', 'code-block'], 
    ['clean']                                         // remove formatting button
    ] 
}

interface RichTextEditorProps extends IInputProps {
    label?: string;
    onRenderLabel?: IRenderFunction<ITextFieldProps>;
    onChange: (event: any) => any; 
    required?: boolean;
    resolveDelay?: number;
    placeholder?: string;
    errorMessage?: string;
    value?: string;
    disabled?: boolean;
    description?: string
    onRenderDescription?: IRenderFunction<ITextFieldProps>; 
    showHelp?: boolean;
    helpDescription?: string | JSX.Element
}

export const RichTextEditor: React.FunctionComponent<RichTextEditorProps> = (props) => {

    const { value, defaultValue, onChange } = props;
    const { showHelp, helpDescription } = props;

    const textFieldPros: ITextFieldProps = {
        label: props?.label,
        errorMessage: props?.errorMessage,
        description: props?.description,
        required: props?.required,
        disabled: props?.disabled
    }

    const _onChange = async (content: string, delta: any, source: any, editor: any) => { 
        onChange(content == '<p><br></p>'? '' : content) 
    }

    return (
        <div style={ { paddingTop : 10 }}>
            {props?.label && renderFieldLabelWithHelp(textFieldPros, showHelp ?? false, helpDescription ?? '')}
            <div style={ { display : 'block'}}>
                {<ReactQuill
                    theme="snow" 
                    value={value}
                    onChange={_onChange}
                    onBlur={() => props?.onBlur}
                    readOnly={props?.readOnly}
                    placeholder={props?.placeholder}
                    modules={modules}
                    style={{
                        width: '100%',
                        minHeight: '100px'  
                    }}
                />}
            </div>
            {props?.description && renderFieldDescription(textFieldPros)}
            {props?.errorMessage ? renderFieldErrorMessage(props?.errorMessage) : ''}
        </div>
    );

}