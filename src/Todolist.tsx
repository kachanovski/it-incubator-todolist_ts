import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTitleTodoList: (newTitle: string, todoListID: string) => void
    deleteTodoList: (id: string) => void
}

export function TodoList(props: PropsType) {

    const deleteTodoList = () => {
        props.deleteTodoList(props.id)
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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTitleTodoList = (newTitle: string) => {
        props.changeTitleTodoList(newTitle, props.id)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTitleTodoList}/>
                <button onClick={deleteTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    let changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
                        let newStatusTask = e.currentTarget.checked
                        props.changeStatus(t.id, newStatusTask, props.id)
                    }
                    let changeTitleTask = (newTitle: string) => {
                        props.changeTitle(t.id, newTitle, props.id)
                    }
                    let deleteTask = () => {
                        props.deleteTask(t.id, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={changeStatusTask} checked={t.isDone}/>
                        <EditableSpan changeTitle={changeTitleTask} title={t.title}/>
                        <input onClick={deleteTask} type="button" value={"X"}/>

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

