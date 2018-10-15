import React, {Component}  from 'react'
import BookShelfCurrent from './shelves/BookShelfCurrent'
import BookShelfWant from './shelves/BookShelfWant'
import BookShelfRead from './shelves/BookShelfRead'
import {Link} from 'react-router-dom';

class Home extends Component {

  render() {
		const {changeShelf, currentlyReading, wantToRead, read, books} = this.props;

    return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
					<span><Link to="/search">Search</Link></span>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelfCurrent changeShelf={changeShelf} currentlyReading={books}></BookShelfCurrent>
						<BookShelfWant wantToRead={books}></BookShelfWant>
						<BookShelfRead read={books}></BookShelfRead>
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
