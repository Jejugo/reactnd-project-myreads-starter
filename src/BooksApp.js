import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search'
import Home from './components/Home'
import {Route} from 'react-router-dom'

class BooksApp extends Component {
	state = {
    books: [],
    query: ''
  };
  
  addBook = (e, book) => {
    let aux = this.state.books;
    var find = false;
  
    aux.find(bookItem => {
      if (bookItem.id === book.id){
        bookItem.shelf = e.target.value;
        find = true;
      }
    });
    
    if(!find){
      book["shelf"] = e.target.value;
      aux.push(book);
    }
    
    this.setState({
      books: aux
    });

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
      console.log(books);
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
    const {books, query, currentlyReading, wantToRead, read} = this.state;

    return (
      <div className="app">
          <Route path='/search' render={() => (
            <Search books={books} query={query} handleInputChange={this.handleInputChange} addBook={this.addBook}></Search>
          )}></Route>
          <Route exact path='/' render={() => (
            <Home changeShelf={this.changeShelf} currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} books={books}></Home>
          )}></Route>
      </div>
    )
  }
}

export default BooksApp
