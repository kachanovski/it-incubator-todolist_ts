import React, {KeyboardEvent, useState} from "react";

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
            <input onKeyPress={onPressKey} value={newTaskTitleValue} onChange={(e) => {
                setNewTaskTitleValue(e.currentTarget.value)
            }}/>
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

}