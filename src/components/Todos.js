import React, {useState} from 'react'
import {Card, ListGroup, CardDeck} from 'react-bootstrap'
import { Form, FormGroup, Button } from 'react-bootstrap'
import shortid from 'shortid'


//map through users todos and display them as list items
function Todos({todos, setTodos}) {

    const [newItem, setNewItem] = useState({text: ''});

    const displayTodos = () => {
        return todos.map((todo, i) => {
            let status = todo.done;
                return (
                    <div id="bigToDo">
                    <ListGroup.Item key={i}>
                    {i+1}: <span style={{textDecoration: status ? 'line-through' : ''}}>{todo.text}</span>
                    <div id="mediumToDo"> 
                    <input id="toDoList" type='image' src='../../check_icon.png'  alt='Completed' width='30'  onClick={() => changeStatus(todo.key)}/>
                    
                    <button  id="remove" onClick={() => deleteTodo(todo.key)}>Remove</button>
                    </div>
                    </ListGroup.Item>
                    
                </div>
        )})
    }

    //function that handles and sets user input
    const grabNewTodo = (e) => {
        let text = e.target.value;
        //everytime a new item is input it gets a text and a done status defaulted to false
        setNewItem({key: shortid.generate(), text, done: false})
        //setTodos(todoItems)
    }

    //function that allows user to add to their todos list and also saves it to the backend
    const addItem = (e) => {
        e.preventDefault();
        setTodos([...todos, newItem])
        //set the newItem text back to empty so input box clears
        setNewItem({text: ''})
    }

    //function that will remove the item associated with remove btn
    const deleteTodo = (key) => {
        //filter out each todo in a new array that doesnt equal to the key being passed in
        setTodos(todos.filter((todo) => todo.key !== key))
    }

    //function triggered by checkmark input, will find the todo that was clicked and change its status
    const changeStatus = (key) => {
        setTodos(
            todos.map((todo) => {
                if(todo.key === key){
                    return {...todo, done: !todo.done} 
                } else {
                    return todo;
                }
            })
        )
    }


    return (
        <div>
            <Card>
                <ListGroup>
                        
                <div className='line'>
    <h2 id="h2" className='flipX'>Your To Dos:</h2>
  </div>
                    {displayTodos()}
                </ListGroup>
            </Card>

            <Form>
                <FormGroup id='todo-add'>
                    <Form.Control
                    size ="lg"
                    type="text"
                    placeholder="Add todo" 
                    name="todoItem"
                    value={newItem.text}
                    onChange={grabNewTodo} />
                    <Button id="addTodo" onClick={(e)=> addItem(e)} id='todo-btn' variant='flat' size='m'>Add</Button>
                </FormGroup>
            </Form>
            
        </div>
    )
}

export default Todos
