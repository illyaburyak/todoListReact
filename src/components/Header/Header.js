import React from "react";


const Header = ({toDo, done}) =>{

    return(
        <div>
            <h2>Todo List</h2>
            <span> {toDo} more to do, {done} done</span>
        </div>
    );
};

export default Header;