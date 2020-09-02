import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';
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
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValueType = "all" | "completed" | "active"

/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}*/

function AppWihtReducer() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodolist] = useReducer(todolistsReducer,[
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
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(id, todoListID))
    }

    function deleteTodoList(id: string) {
        const action = RemoveTodolistAC(id)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function addTask(newTaskTitleValue: string, todoListID: string) {
        dispatchToTasks(addTaskAC(newTaskTitleValue, todoListID))
    }

    function changeFilter(value: FilterValueType, todoListID: string) {
            dispatchToTodolist(ChangeFilterTodolistAC(todoListID, value))
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
            dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))

    }

    function changeTitle(id: string, newTitle: string, todoListID: string) {
            dispatchToTasks(changeTaskTitleAC(id, newTitle,todoListID))
        }

    function addTodoList(title: string) {
       const action = AddTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeTitleTodoList(newTitle: string, id: string) {
            dispatchToTodolist(ChangeTitleTodolistAC(newTitle,id))
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

export default AppWihtReducer;
