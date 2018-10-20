import React, {Component}  from 'react'

const BookShelfRead = (props) => {

  const {changeShelf, books, renderAuthors} = props;
  const readingList = books.map(book => {
    if (book.shelf === "read"){
      return (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
            {book.imageLinks !== undefined && (
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                )}
              <div className="book-shelf-changer">
                <select onChange={(e) => changeShelf(e, book.id)}>
                  <option value="move">Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            {renderAuthors(book)}
          </div>
        </li>
      )
    }
  });

    return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Read</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{readingList}
					</ol>
				</div>
			</div>
    )
}

export default BookShelfRead
