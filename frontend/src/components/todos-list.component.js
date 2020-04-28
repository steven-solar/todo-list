import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}> {props.todo.todo_description} </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}> {props.todo.todo_responsible} </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}> {props.todo.todo_priority} </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}> 
        <Link to={"/edit/" + props.todo._id}> Edit </Link> 
        <Link to={"/delete/" + props.todo._id}> Delete </Link>
        </td> 
    </tr>
)

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos')
            .then(res => this.setState({ todos: res.data }))
            .catch(err => console.log(err));
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos')
            .then(res => this.setState({ todos: res.data }))
            .catch(err => console.log(err));
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            console.log(currentTodo);
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3> Todos List </h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th> Description </th>
                            <th> Responsible </th>
                            <th> Priority </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}