import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    addTask: (newTaskTitleValue: string, todoListID: string) => void
    changeFilter: (value: FilterValueType, todoListID: string) => void
    deleteTask: (id: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    deleteTodoList: (id:string) => void
}

export function TodoList(props: PropsType) {

    let [newTaskTitleValue, setNewTaskTitleValue] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitleValue.trim() !== "") {
            props.addTask(newTaskTitleValue.trim(), props.id);
            setNewTaskTitleValue("")
        } else {
            setError("ERROR")
        }
    }

    const deleteTodoList = () => {
        props.deleteTodoList(props.id)
    }

    const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onClickFilterAll = () => {
        props.changeFilter("all", props.id)
    }
    const onClickFilterActive = () => {
        props.changeFilter("active", props.id)
    }
    const onClickFilterCompleted = () => {
        props.changeFilter("completed", props.id)
    }


    return (
        <div>
            <h3>{props.title}<button onClick={deleteTodoList}>X</button></h3>
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
                        props.changeStatus(t.id, newStatusTask, props.id)
                    }
                    let deleteTask = () => {
                        props.deleteTask(t.id, props.id)
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