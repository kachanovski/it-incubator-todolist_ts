import React, {useState} from 'react';
import './App.css';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (newTaskTitleValue: string) => void
    changeFilter: (value: FilterValueType) => void
    deleteTask: (id: string) => void
}

export function TodoList(props: PropsType) {

    let [newTaskTitleValue, setNewtaskTitleValue] = useState("")
    const addTask = () => {
        props.addTask(newTaskTitleValue)
        setNewtaskTitleValue('')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitleValue} onChange={(e) => {
                    setNewtaskTitleValue(e.currentTarget.value)
                }}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/> <span>{t.title} <input
                        onClick={() => {
                            props.deleteTask(t.id)
                        }} type="button" value={"X"}/></span>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}