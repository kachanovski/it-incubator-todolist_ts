import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, IconButton, Typography, Button, Paper} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

export type FilterValueType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "what to learn",
            filter: "all"
        },
        {
            id: todoListId2,
            title: "what to learn",
            filter: "all"
        }
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "1111", isDone: true},
            {id: v1(), title: "22222", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "food", isDone: true},
            {id: v1(), title: "qwe", isDone: false},
        ]
    })

    function deleteTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function deleteTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTask(newTaskTitleValue: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskTitleValue, isDone: false}
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []}
        )
    }

    function changeTitleTodoList(newTitle: string, id: string) {
        let todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
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

export default App;
