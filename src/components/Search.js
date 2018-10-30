import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import Books from './Books';
import SearchBar from './SearchBar';

class Search extends Component {

  state = {
    choice: 'Android',
    booksFilter: []
  }

  componentDidMount(){
    let mainBooks = []
    Array.prototype.isArray = true;
    BooksAPI.getAll().then(books => {
      mainBooks = books;
    });
    BooksAPI.search(this.state.choice).then(books => {
      if (books.isArray){
        books.map(bookNone => {
          if(!bookNone.hasOwnProperty("shelf")){
            bookNone.shelf = 'none';
          }
        });
        //loop over the array of books of the main page
        mainBooks.forEach(item => {
          //loop over the array of books of the API search
          books.forEach(item2 => {
            //if the item of the main page has same ID of the item from API search, remove the search api book and add the one from the shelf 
            if (item.id === item2.id){
              //create a new array of API with the values from the mainPage
              //removes the old book
              books = books.filter(book => {
              return book.id !== item2.id
              }); 
              
              //adds the new one with the new shelf
              books.push(item);
            } 
          });
        });
  
        this.setState({
          booksFilter: books
        });
      }
    });
  }

  choiceMade = (e) => {
    const newChoice = e.target.value
    Array.prototype.isArray = true;
    this.setState({
      choice: newChoice
    });

    let mainBooks = []
    BooksAPI.getAll().then(books => {
      mainBooks = books;
    });

    BooksAPI.search(newChoice).then(books => {
      if (books.isArray){
        books.map(bookNone => {
          if(!bookNone.hasOwnProperty("shelf")){
            bookNone.shelf = 'none';
          }
        });
         //loop over the array of books of the main page
        mainBooks.forEach(item => {
          //loop over the array of books of the API search
          books.forEach(item2 => {
            //if the item of the main page has same ID of the item from API search
            if (item.id === item2.id){
               //create a new array of API with the values from the mainPage
               //removes the old book
               books = books.filter(book => {
                return book.id !== item2.id
                
               }); 
               //adds the new one with the new shelf
               books.push(item);
            } 
          });
        });
        this.setState({
          booksFilter: books
        });
      }
      });
  }

  render() {
    const {query, handleInputChange, addBook, renderAuthors, generateUniqueId} = this.props;
    const {booksFilter} = this.state; 

    const options = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    const optionId = generateUniqueId(options);
    const optionsTag = optionId.map(tag => {
      return (
        <option key={tag.id}>{tag.name}</option>
      )
    });

    return (
        <div>
            <SearchBar query={query} handleInputChange={handleInputChange}></SearchBar>
            <div className="dropdown-category">
            <h2 className="category-title">Choose Category</h2>
            <div className="category">
              <select style={{width: "200px", height: "25px"}}onChange={(e) => this.choiceMade(e)}>
                {optionsTag}
              </select>
            </div>
            <p className="paragraphSearch">If the book is marked, then you already got it on one of your shelves.</p>
            </div>
            <Books booksFilter={booksFilter} query={query} addBook={addBook} renderAuthors={renderAuthors}></Books>
        </div>
    )
  }
}

export default Search
