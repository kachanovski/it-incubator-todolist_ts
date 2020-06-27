import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    filter: string
    tasks: Array<TaskType>
    addTask: (newTaskTitleValue: string) => void
    changeFilter: (value: FilterValueType) => void
    deleteTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {

    let [newTaskTitleValue, setNewTaskTitleValue] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (newTaskTitleValue.trim() !== "") {
            props.addTask(newTaskTitleValue);
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

    const onClickFilterAll = () => {
        props.changeFilter("all")
    }
    const onClickFilterActive = () => {
        props.changeFilter("active")
    }
    const onClickFilterCompleted = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={onPressKey} value={newTaskTitleValue} onChange={(e) => {
                    setNewTaskTitleValue(e.currentTarget.value)
                }}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    let changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
                        let newStatusTask = e.currentTarget.checked
                        props.changeStatus(t.id, newStatusTask)
                    }
                    let deleteTask = () => {
                        props.deleteTask(t.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={changeStatusTask} checked={t.isDone}/> <span>{t.title} <input
                        onClick={deleteTask} type="button" value={"X"}/></span>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onClickFilterAll}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickFilterActive}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}