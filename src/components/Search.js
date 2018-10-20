import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'

class Search extends Component {

  state = {
    choice: 'Android',
    booksFilter: []
  }

  componentDidMount(){
    BooksAPI.search(this.state.choice).then(books => {
      this.setState({
        booksFilter: books
      });
    })
  }

  choiceMade = (e) => {
    const newChoice = e.target.value
    this.setState({
      choice: newChoice
    });

    BooksAPI.search(newChoice).then(books => {
      this.setState({
        booksFilter: books
      });
    })
  }

  render() {
    const {query, handleInputChange, addBook, success, changeSuccess, renderAuthors, generateUniqueId} = this.props;

    //Filter books based on query
    const showingBooks = query === ''
    ? this.state.booksFilter : this.state.booksFilter.filter(b =>(
      b.title.toLowerCase().includes(query.toLowerCase())
    ));

    const options = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    const optionId = generateUniqueId(options);
    const optionsTag = optionId.map(tag => {
      return (
        <option key={tag.id}>{tag.name}</option>
      )
    })

    const getAllBooks = showingBooks.map(book => {
        return(
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {book.imageLinks !== undefined && (
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                )}
                <div className="book-shelf-changer">
                  <select onChange={(e) => addBook(e, book)}>
                    <option value="move">Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>  
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {renderAuthors(book)}
            </div>
          </li>
        )
    });

    return (
        <div>
            {success === true && (
                alert("You have added a book"),
                changeSuccess(false)
            )}
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => handleInputChange(e)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
            </div>
            <div className="dropdown-category">
            <h2 className="category-title">What kind of book would you like?</h2>
            <select className="category" onChange={(e) => this.choiceMade(e)}>
              {optionsTag}
            </select>
            </div>
            <ol className="books-grid">
              {getAllBooks}
            </ol>
        </div>
    )
  }
}

export default Search
