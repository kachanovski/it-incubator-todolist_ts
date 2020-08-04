import React, {KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from '@material-ui/icons/AddBox';

type AddItemFormType = {
    addItem: (newTaskTitleValue: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    let [newTaskTitleValue, setNewTaskTitleValue] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitleValue.trim() !== "") {
            props.addItem(newTaskTitleValue.trim());
            setNewTaskTitleValue("")
        } else {
            setError("ERROR")
        }
    }

    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <TextField onKeyPress={onPressKey}
                       variant="outlined"
                       helperText={error}
                       error={!!error}
                       value={newTaskTitleValue}
                       onChange={(e) => {
                           setNewTaskTitleValue(e.currentTarget.value)
                       }}
                       label="Введите значение"/>
            <IconButton color={"primary"} onClick={addTask}>
                <AddBoxIcon fontSize={"large"} />
            </IconButton>
        </div>
    )

}