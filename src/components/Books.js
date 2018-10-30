import React from 'react'

const Books = (props) => {
      const {booksFilter, query, addBook, renderAuthors} = props;

      //Filter books based on query
      const showingBooks = query === ''
      ? [] : booksFilter.filter(b =>(
        b.title.toLowerCase().includes(query.toLowerCase())
      ));

      const getAllBooks = showingBooks.map(book => {
        return(
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {
                  book.shelf !== 'none' && book.imageLinks !== undefined ? (
                    <div className="book-cover-shadow" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  ):
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                }
                <div className="book-shelf-changer">
                  <select onChange={(e) => addBook(e, book)} value={book.shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">wantToRead</option>
                    <option value="read">read</option>
                    <option value="none">none</option>    
                    )}
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
        <ol className="books-grid">
          {getAllBooks}
        </ol>
      </div>
    )
}

export default Books
