import React, {Component} from 'react';
import axios from 'axios';

export default class DeleteTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeToDelete = this.onChangeToDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false, 
            toDelete: 'No'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    
    onChangeToDelete(e) {
        this.setState({
            toDelete: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.toDelete === 'Yes') {
            axios.delete('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        }
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Delete Todo</h3>
                <h5> Are you sure you want to delete the following todo? </h5>
                <div>
                    <h6> Description: {this.state.todo_description} </h6>
                    <h6> Responsible: {this.state.todo_responsible} </h6>
                    <h6> Priority: {this.state.todo_priority} </h6>
                    <h6> Completed: {this.state.todo_completed ? 'Complete' : 'Incomplete'} </h6>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="deleteOptions"
                                    id="No"
                                    value="No"
                                    checked={this.state.toDelete==='No'}
                                    onChange={this.onChangeToDelete}
                                    />
                            <label className="form-check-label">No</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="deleteOptions"
                                    id="Yes"
                                    value="Yes"
                                    checked={this.state.toDelete==='Yes'}
                                    onChange={this.onChangeToDelete}
                                    />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}