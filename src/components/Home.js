import React, {Component}  from 'react'
import BookShelfCurrent from './shelves/BookShelfCurrent'
import BookShelfWant from './shelves/BookShelfWant'
import BookShelfRead from './shelves/BookShelfRead'
import {Link} from 'react-router-dom';

class Home extends Component {

  render() {
		const {changeShelf, books} = this.props;

    return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
					<span><Link to="/search">Search</Link></span>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelfCurrent changeShelf={changeShelf} books={books}></BookShelfCurrent>
						<BookShelfWant changeShelf={changeShelf} books={books}></BookShelfWant>
						<BookShelfRead changeShelf={changeShelf} books={books}></BookShelfRead>
					</div>
				</div>
				<div className="open-search">
					<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
				</div>
			</div>
    )
  }
}

export default Home
