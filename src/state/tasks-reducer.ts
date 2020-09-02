import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionType =
    RemoveTaskType |
    ChangeStatusTaskActionType |
    ChangeTitleTaskActionType |
    RemoveTodolistActionType |
    AddTodolistActionType |
    AddTaskActionType


type RemoveTaskType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistsId: string
}
type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
type ChangeStatusTaskActionType = {
    type: 'CHANGE_STATUS'
    isDone: boolean
    todolistId: string
    taskId: string
}
type ChangeTitleTaskActionType = {
    type: 'CHANGE_TITLE'
    title: string
    todolistId: string
    taskId: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            let newTodolist = [...state[action.todolistsId]].filter(task => task.id !== action.taskId);
            return {
                ...state,
                [action.todolistsId]: newTodolist
            }
        case 'ADD_TASK':
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                ...state, [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE_STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        case 'CHANGE_TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            };
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistsId: string): RemoveTaskType => {
    return {
        type: 'REMOVE_TASK', taskId, todolistsId
    }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK', title, todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusTaskActionType => {
    return {
        type: 'CHANGE_STATUS', taskId, todolistId, isDone,
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleTaskActionType => {
    return {
        type: 'CHANGE_TITLE', taskId, title, todolistId
    }
}