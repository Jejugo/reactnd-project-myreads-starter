import React, {Component}  from 'react'
import BookShelfCurrent from './shelves/BookShelfCurrent'
import BookShelfWant from './shelves/BookShelfWant'
import BookShelfRead from './shelves/BookShelfRead'
import {Link} from 'react-router-dom';

class Home extends Component {

	render() {

		const {changeShelf, books, renderAuthors, changeRating, modal, closeModal, openModal} = this.props;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<h5 style={{textAlign: "center", width: "100%", fontSize: "20px"}}>Do not forget to rate the books you have!</h5>
					<div className='reset-books'>
					<a id="reset-button" href="#" onClick={() =>{
							console.log("clicou");
							localStorage.clear(); 
							window.location.reload();
						}}></a>
					</div>
					<div className='reset-title'>
							<h3>Reset Button</h3>
					</div>
					<div>
						<BookShelfCurrent changeShelf={changeShelf} books={books} renderAuthors={renderAuthors} changeRating={changeRating}></BookShelfCurrent>
						<BookShelfWant changeShelf={changeShelf} books={books} renderAuthors={renderAuthors} changeRating={changeRating} modal={modal} closeModal={closeModal} openModal={openModal}></BookShelfWant>
						<BookShelfRead changeShelf={changeShelf} books={books} renderAuthors={renderAuthors} changeRating={changeRating}></BookShelfRead>
					</div>
				</div>
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
			</div>
		)
	}
	
}

export default Home
