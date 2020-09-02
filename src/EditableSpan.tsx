import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField label="Standard"
                         value={title}
                         autoFocus
                         onChange={changeTitle}
                         onBlur={activateViewMode}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

})