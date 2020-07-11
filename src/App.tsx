import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
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
            {id: v1(), title: "1", isDone: true},
            {id: v1(), title: "2", isDone: false},
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

    return (
        <div className="App">
            {todoLists.map(tl => {

                let allTodoListTasks = tasks[tl.id];
                let changeStatusValue = allTodoListTasks;

                if (tl.filter === "active") {
                    changeStatusValue = allTodoListTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    changeStatusValue = allTodoListTasks.filter(t => t.isDone === true)
                }

                return <TodoList key={tl.id}
                                 id={tl.id}
                                 tasks={changeStatusValue}
                                 deleteTask={deleteTask}
                                 deleteTodoList={deleteTodoList}
                                 filter={tl.filter}
                                 changeStatus={changeStatus}
                                 changeFilter={changeFilter} addTask={addTask}
                                 title={tl.title}/>

            })}

        </div>
    );
}

export default App;
