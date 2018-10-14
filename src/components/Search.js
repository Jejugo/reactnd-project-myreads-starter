import React, {Component} from 'react'

class Search extends Component {

  render() {
    const {books, query, handleInputChange, addBook} = this.props;

    //Filter books based on query
    const showingBooks = query === ''
    ? books : books.filter(b =>(
      b.title.toLowerCase().includes(query.toLowerCase())
    ));

    const getAllBooks = showingBooks.map(book => {
      return(
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail })` }}></div>
              <div className="book-shelf-changer">
                <select onChange={(e) => addBook(e, book.id)}>
                  <option value="move">Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>  
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors[0]}</div>
          </div>
        </li>
      )
    });

    return (
        <div>
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search">Close</a>
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
            <ol className="books-grid">
              {getAllBooks}
            </ol>
        </div>
    )
  }
}

export default Search
