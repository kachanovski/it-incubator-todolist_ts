import React, {useCallback} from 'react';
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

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const deleteTask = useCallback((id: string, todoListID: string) => {
        dispatch(removeTaskAC(id, todoListID))
    }, [dispatch])
    const deleteTodoList = useCallback((id: string) => {
        dispatch(RemoveTodolistAC(id))
    }, [dispatch])
    const addTask = useCallback((newTaskTitleValue: string, todoListID: string) => {
        dispatch(addTaskAC(newTaskTitleValue, todoListID))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValueType, todoListID: string) => {
        dispatch(ChangeFilterTodolistAC(todoListID, value))
    }, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))
    }, [dispatch])
    const changeTitle = useCallback((id: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])
    const changeTitleTodoList = useCallback((newTitle: string, id: string) => {
        dispatch(ChangeTitleTodolistAC(newTitle, id))
    }, [dispatch])

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

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <TodoList key={tl.id}
                                          id={tl.id}
                                          tasks={tasks[tl.id]}
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
