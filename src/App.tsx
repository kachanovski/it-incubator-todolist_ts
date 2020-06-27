import React, {useState} from 'react';
import './App.css';
import {TodoList} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = "all" | "completed" | "active"


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "1", isDone: true},
        {id: v1(), title: "2", isDone: false},
        {id: v1(), title: "3", isDone: true},
    ])

    function deleteTask(id: string) {
        let newTasks = tasks.filter(t => t.id !== id)
        setTasks(newTasks)
    }

    function addTask(newTaskTitleValue: string) {
        let newTask = {id: v1(), title: newTaskTitleValue, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilterValue] = useState("all")
    let changeStatusValue = tasks

    function changeFilter(value: FilterValueType) {
        setFilterValue(value)
    }

    if (filter === "active") {
        changeStatusValue = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        changeStatusValue = tasks.filter(t => t.isDone === true)
    }

    function changeStatus (id:string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <TodoList tasks={changeStatusValue}
                      deleteTask={deleteTask}
                      filter={filter}
                      changeStatus={changeStatus}
                      changeFilter={changeFilter} addTask={addTask}
                      title={'what to learn'}/>
        </div>
    );
}

export default App;
