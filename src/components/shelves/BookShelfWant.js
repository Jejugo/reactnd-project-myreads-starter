import React from 'react'
import StarRatings from 'react-star-ratings';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const BookShelfWant = (props) => {
	const {changeShelf, books, renderAuthors, changeRating, modal, closeModal, openModal} = props;
	const readingList = books.map(book => {
		if (book.shelf === "wantToRead"){
			return (
				<li key={book.id}>
					<div className="book" id="single-book">
						<div className="book-top">
						{book.imageLinks !== undefined && (
								<a onClick={openModal} className="trigger"><div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div></a>
							)}
							<div className="book-shelf-changer">
								<select onChange={(e) => changeShelf(e, book.id)} value={book.shelf}>
									<option value="move" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								</select>
							</div>
							<Modal isOpen={modal.isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
								<h2>Hello</h2>
								<button onClick={closeModal}>close</button>
								<div>I am a modal</div>
								<form>
									<input />
									<button>tab navigation</button>
									<button>stays</button>
									<button>inside</button>
									<button>the modal</button>
								</form>
        		</Modal>
						</div>
						<div className="book-title">{book.title}</div>
						{renderAuthors(book)}
						{book.review <= 3 ? (
							<StarRatings rating={book.review} starRatedColor="red" changeRating={(newRating, name) => changeRating(newRating, name, book.id)} numberOfStars={5} name='rating'
							starDimension="22px" starSpacing="2px"/>
						) : (
							<StarRatings rating={book.review} starRatedColor="green" changeRating={(newRating, name) => changeRating(newRating, name, book.id)} numberOfStars={5} name='rating'
							starDimension="22px" starSpacing="2px"/>
						)}
						
					</div>
				
				</li>
			)
		}

		return null;
		});

    return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Want to Read</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{readingList}
					</ol>
				</div>
			</div>
    )
}

export default BookShelfWant
