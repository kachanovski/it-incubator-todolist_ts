import React from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Paper, Typography} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodoListType} from "./App";

export type FilterValueType = "all" | "completed" | "active"

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType , Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType , TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function deleteTask(id: string, todoListID: string) {
        dispatch(removeTaskAC(id, todoListID))
    }

    function deleteTodoList(id: string) {
        dispatch(RemoveTodolistAC(id))
    }

    function addTask(newTaskTitleValue: string, todoListID: string) {
        dispatch(addTaskAC(newTaskTitleValue, todoListID))
    }

    function changeFilter(value: FilterValueType, todoListID: string) {
        dispatch(ChangeFilterTodolistAC(todoListID, value))
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))

    }

    function changeTitle(id: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListID))
    }

    function addTodoList(title: string) {
        dispatch(AddTodolistAC(title))
    }

    function changeTitleTodoList(newTitle: string, id: string) {
        dispatch(ChangeTitleTodolistAC(newTitle, id))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTodoListTasks = tasks[tl.id];
                        let changeStatusValue = allTodoListTasks;

                        if (tl.filter === "active") {
                            changeStatusValue = allTodoListTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            changeStatusValue = allTodoListTasks.filter(t => t.isDone === true)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <TodoList key={tl.id}
                                          id={tl.id}
                                          tasks={changeStatusValue}
                                          deleteTask={deleteTask}
                                          deleteTodoList={deleteTodoList}
                                          filter={tl.filter}
                                          changeTitleTodoList={changeTitleTodoList}
                                          changeTitle={changeTitle}
                                          changeStatus={changeStatus}
                                          changeFilter={changeFilter} addTask={addTask}
                                          title={tl.title}/>
                            </Paper>
                        </Grid>

                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
