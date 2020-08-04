import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Checkbox} from '@material-ui/core';

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
                <IconButton onClick={deleteTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
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
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={"primary"} onChange={changeStatusTask} checked={t.isDone}/>
                        <EditableSpan changeTitle={changeTitleTask} title={t.title}/>
                        <IconButton onClick={deleteTask}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        color={"default"}
                        onClick={onClickFilterAll}>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        color={"primary"}
                        onClick={onClickFilterActive}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        color={"secondary"}
                        onClick={onClickFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}

