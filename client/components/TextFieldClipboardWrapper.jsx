import React from "react";
import { ActionButton, TextField, TooltipTrigger, Tooltip } from "@adobe/react-spectrum";

import Copy from "@spectrum-icons/workflow/Copy";

export default class TextFieldClipboardWrapper extends React.Component {
    handleCopy() {
        navigator.clipboard.writeText(this.props.text);
    }

    render() {
        return (
            <div id="wrapper">
                <TextField value={this.props.text} />
                <TooltipTrigger delay={0}>
                    <ActionButton onPress={this.handleCopy.bind(this)}>
                        <Copy />
                    </ActionButton>
                    <Tooltip>copy to clipboard</Tooltip>
                </TooltipTrigger>
            </div>
        );
    }
}
