import React, { Component } from "react";

import './todolist.css'

export default class TodoListItem extends Component {

    
    render() {
        const {label, important, done, onDeleteItem, onToggleDone, onToggleImportant } = this.props;
       
      
        
        let classNames = 'todolist-span';

        if(important) {
            classNames += ' importDif';
        }

        if (done){
            classNames += ' spanDif';
        }
 
        return(
            <div>
                <span className={classNames} onClick={ onToggleDone}>
                   {label}
                </span>
                <button onClick={onDeleteItem}>Dele</button>
                <button  onClick={onToggleImportant}>important</button>
            </div>
        )
    }

}


