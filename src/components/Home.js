import React  from 'react'
import BookShelfCurrent from './shelves/BookShelfCurrent'
import BookShelfWant from './shelves/BookShelfWant'
import BookShelfRead from './shelves/BookShelfRead'
import {Link} from 'react-router-dom';

const Home = (props) => {
	
	const {changeShelf, books, renderAuthors} = props;

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookShelfCurrent changeShelf={changeShelf} books={books} renderAuthors={renderAuthors}></BookShelfCurrent>
					<BookShelfWant changeShelf={changeShelf} books={books} renderAuthors={renderAuthors}></BookShelfWant>
					<BookShelfRead changeShelf={changeShelf} books={books} renderAuthors={renderAuthors}></BookShelfRead>
				</div>
			</div>
			<div className="open-search">
				<Link to="/search">Add a book</Link>
			</div>
		</div>
	)
}

export default Home
