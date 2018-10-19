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
    success: null
  };
  
  addBook = (e, book) => {
    let aux = this.state.books;
    var find = false;
    
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
      books: aux
    }, () => {
      this.setState({
        success: true
      })
    });
  }

  changeSuccess = (bool) => {
    this.setState({
      success: bool
    })
  }

  changeShelf = (e, id) => {
    if(e.target.value === 'none'){
      //continuar daqui!
      const aux = this.state.books.filter(book => {
        return book.id !== id
      });
      this.setState({
        books: aux
      });
    }

    else{
      let aux = this.state.books;

      aux.find(bookItem => {
        if (bookItem.id === id){
          bookItem.shelf = e.target.value;
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

  render() {
    const {books, query, currentlyReading, wantToRead, read, success, changeSuccess} = this.state;

    return (
      <div className="app">
          <Route path='/search' render={() => (
            <Search books={books} query={query} handleInputChange={this.handleInputChange} addBook={this.addBook} success={success} changeSuccess={this.changeSuccess}></Search>
          )}></Route>
          <Route exact path='/' render={() => (
            <Home changeShelf={this.changeShelf} currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} books={books} ></Home>
          )}></Route>
      </div>
    )
  }
}

export default BooksApp
