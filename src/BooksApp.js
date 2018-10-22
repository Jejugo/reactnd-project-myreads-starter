import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search'
import Home from './components/Home'
import {Route} from 'react-router-dom'

class BooksApp extends Component {
	state = {
    books: [],
    query: '',
    success: null,
    stars: ''
  };
  
  addBook = (e, book) => {
    let aux = this.state.books;
    var find = false;

    if(e.target.value === 'none'){
      aux.find(bookItem => {
        if (bookItem.id === book.id){
          BooksAPI.update(bookItem,  e.target.value);
          delete bookItem.shelf;
          find = true;
        }
        if(!find){
          BooksAPI.update(book, e.target.value);
          delete book.shelf
        }
      });
    }

    else{
      //if the book is already on books array, just change its shelf
      aux.find(bookItem => {
        if (bookItem.id === book.id){
          BooksAPI.update(bookItem, e.target.value);
          bookItem.shelf = e.target.value;
          find = true;
        }
        });
        
        //if the book isn't on books array, change the shelf and push the book to the book array
        if(!find){
          book["shelf"] = e.target.value;
          BooksAPI.update(book, e.target.value);
          aux.push(book);
        }
        
        this.setState({
          books: aux,
          success: true
        });
    }
  }
  
  changeSuccess = (bool) => {
    this.setState({
      success: bool
    });
    alert("You have added a book");
  }

  changeShelf = (e, id) => {
    let aux = this.state.books;

    //delete book temporarily from shelf if selected none
    if(e.target.value === 'none'){
      aux.find(bookItem => {
        if (bookItem.id === id){
          BooksAPI.update(bookItem, e.target.value);
          delete bookItem.shelf
        }
      });
      
      this.setState({
        books: aux
      });
    }

    else{

      aux.find(bookItem => {
        if (bookItem.id === id){
          bookItem.shelf = e.target.value; 
          BooksAPI.update(bookItem, e.target.value);
        }
      });

      this.setState({
        books: aux
      });
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    });
  }


//methods used for creating an array with authors with IDs. 
  generateUniqueId = (array) => {
    const arrayId = [];
    let count = 0;
    array.forEach(item => {
      arrayId.push({name: item, id: count});
      count++;
    })
    return arrayId;
  }

  renderAuthors = (book) => {
    let authorsId = []
    if(book.authors !== undefined){
      const authors = this.generateUniqueId(book.authors);
      authorsId = authors.map(item => {
        return (
          <div className="book-authors" key={item.id}>{item.name}</div>
        )
      })
    }

    return authorsId;
  }


  render() {
    const {books, query, currentlyReading, wantToRead, read, success} = this.state;
    return (
      <div className="app">
          <Route path='/search' render={() => (
            <Search query={query} handleInputChange={this.handleInputChange} addBook={this.addBook} success={success} changeSuccess={this.changeSuccess} renderAuthors={this.renderAuthors} generateUniqueId={this.generateUniqueId}></Search>
          )}></Route>
          <Route exact path='/' render={() => (
            <Home changeShelf={this.changeShelf} currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} books={books} renderAuthors={this.renderAuthors}></Home>
          )}></Route>
      </div>
    )
  }
}

export default BooksApp
