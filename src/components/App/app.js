/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from '../Header/Header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import Additem from '../additem/add-item';


export default class App extends Component {

    maxId = 100;
  
    state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make Awesome App'),
        this.createTodoItem('Have a lunch')
      ],
      // 
      term: '',
      filter: 'all' // active, all, done
    };
  
    createTodoItem(label) {
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
    }
  
    onDeleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
  
        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1)
        ];
  
        return {
          todoData: newArray
        };
      });
    };
  
    addItem = (text) => {
      const newItem = this.createTodoItem(text);
  
      this.setState(({ todoData }) => {
        const newArr = [
          ...todoData,
          newItem
        ];
  
        return {
          todoData: newArr
        };
      });
  
    };
  
    toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);
  
      const oldItem = arr[idx];
      const newItem = {...oldItem,
        [propName]: !oldItem[propName]};
  
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
    }
  
    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        };
      });
    };
  
    onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        };
      });
    };

    // функция принимает масив елементов и тот текст которые мы пытаемся найти
    search(items, term) {
        // если это пустая строка 
        if (term.length === 0) {
            // то мы просто вернем все
            return items;
        }

       return items.filter((item) => {
            return item.label
            .toLowerCase()
            // индект оф вернет 0 или больше если строка содержиться, и -1 если строки нет 
            // > -1 даст нам все те елементы у которых лейбл сотержит строку терм 
            .indexOf(term.toLowerCase()) > -1;
        });
    };

    filter(items, filter) {

        switch(filter) {
            case 'all' :
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done': 
                return items.filter((item) => item.done);
            default: 
            return items;
        }

    }

    onSearchChange = (term) => {
        this.setState({term});
    };



    onFilterChange = (filter) => {
        this.setState({filter});
    };
    


  


    render() {
  
      const { todoData, term, filter } = this.state;

      // создаем масив в котором только видемые елементы 
      const visibleItems = this.filter(this.search(todoData, term), filter);
      const doneCount = todoData
                        .filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;
  
      return (
        <div className="todo-app">
          <Header toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel onSearchChange={this.onSearchChange} 
             filter={filter} 
             onFilterChange={this.onFilterChange}/>
          </div>
  
          <TodoList
          // передаем елементы только те, которые сейчас видимы
            todos={visibleItems}
            onDeleteItem={ this.onDeleteItem }
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
  
          <Additem onItemAdded={this.addItem}/>
        </div>
      );
    }
  };