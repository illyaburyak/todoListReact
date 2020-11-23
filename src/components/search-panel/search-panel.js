import React, { Component } from "react";

import './search.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchChange =(e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };


    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'},
    ];

    render() {

        const { filter, onFilterChange } =this.props;

        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'searchPanel-mainBtn' : 'btnSimp'
            return (
            <button type="button"
            key={name}
            className={clazz}
            onClick={() => onFilterChange(name) }
            >{label}</button>
            );
        });

        return(
            <div>
                <input type="text" 
                placeholder="type to search"
                value={this.state.term}
                onChange={this.onSearchChange}/>
             {buttons}
            </div>
        )
    }
    
}
