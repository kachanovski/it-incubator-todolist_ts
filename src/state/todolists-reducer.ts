import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType =
    RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeFilterTodolistActionType |
    ChangeTitleTodolistActionType

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let todoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, todoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}
export const ChangeFilterTodolistAC = (todolistId: string, newFilter: FilterValueType): ChangeFilterTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter
    }
}
export const ChangeTitleTodolistAC = (todolistId: string, title: string): ChangeTitleTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: title
    }
}
