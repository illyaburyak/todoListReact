import React from "react";

import ToDoListItem from '../todo-list-item/todo-list-item';

const TodoList = ({todos, onToggleImportant, onToggleDone, onDeleteItem})=> {

    const elements = todos.map((item) => {
        const {id, ...todosItems} = item;
        return(
            <div key={id}>
                <ToDoListItem {...todosItems} 
                onToggleImportant={()=>onToggleImportant(id)}
                onToggleDone={() => onToggleDone(id)}
                onDeleteItem={()=> onDeleteItem(id)}
                />
            </div>    
        )  
    })
    return(
        <div>
            {elements}
        </div>
    )
}

export default TodoList;