import React, {ChangeEvent, useCallback} from 'react';
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
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTitle: (id: string, newTitle: string, todoListID: string) => void
    deleteTask: (id: string, todoListID: string) => void
    changeTitleTodoList: (newTitle: string, todoListID: string) => void
    deleteTodoList: (id: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

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
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);
    const changeTitleTodoList = useCallback((newTitle: string) => {
        props.changeTitleTodoList(newTitle, props.id)
    }, [props.changeTitleTodoList, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
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
                {tasksForTodolist.map(t => {
                    return <Task changeStatus={props.changeStatus}
                                 task={t}
                                 deleteTask={props.deleteTask}
                                 todolistId={props.id}
                                 changeTitle={props.changeTitle}
                                 key={t.id}
                    />
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
})

type TaskPropsType = {
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTitle: (id: string, newTitle: string, todoListID: string) => void
    deleteTask: (id: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}

const Task = React.memo((props: TaskPropsType) => {

    let changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusTask = e.currentTarget.checked
        props.changeStatus(props.task.id, newStatusTask, props.todolistId)
    }
    let changeTitleTask = useCallback((newTitle: string) => {
        props.changeTitle(props.task.id, newTitle, props.todolistId)
    },[props.changeTitle,props.task.id,props.todolistId])

    let deleteTask = () => {
        props.deleteTask(props.task.id, props.todolistId)
    }
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox color={"primary"} onChange={changeStatusTask} checked={props.task.isDone}/>
        <EditableSpan changeTitle={changeTitleTask} title={props.task.title}/>
        <IconButton onClick={deleteTask}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </div>
})
