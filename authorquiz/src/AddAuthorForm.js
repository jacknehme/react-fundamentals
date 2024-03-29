import React from 'react';
import "./AddAuthorForm.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddBook(event) {
        event.preventDefault();
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <div className="AddAuthorForm_input">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onFieldChange} />
                </div>
                <div className="AddAuthorForm_input">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onFieldChange} />
                </div>
                <div className="AddAuthorForm_input">
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <label htmlFor="bookTemp">Books</label>
                    <input
                        type="text"
                        name="bookTemp"
                        value={this.state.bookTemp}
                        onChange={this.onFieldChange} />
                    <button type="button" value="+" onClick={this.handleAddBook}>+</button>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    }
}

function AddAuthorForm({ match, onAddAuthor }) {
    return <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor} />
    </div>;
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => {return {}}, mapDispatchToProps)(AddAuthorForm));