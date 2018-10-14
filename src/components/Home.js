import React, {Component}  from 'react'
import BookShelfCurrent from './shelves/BookShelfCurrent'
import BookShelfWant from './shelves/BookShelfWant'
import BookShelfRead from './shelves/BookShelfRead'
class Home extends Component {

  render() {
		const {changeShelf} = this.props;

    return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelfCurrent changeShelf={changeShelf}></BookShelfCurrent>
						<BookShelfWant></BookShelfWant>
						<BookShelfRead></BookShelfRead>
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
