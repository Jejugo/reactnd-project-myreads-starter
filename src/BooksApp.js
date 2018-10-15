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
  
  addBook = (e, id) => {

    let aux = this.state.books

    aux.find(book => {
      book.id === id && (
        book.shelf = e.target.value
      )
    });

    this.setState({
      books: aux
    });

    /*find the book to add to the proper category.
    const result = this.state.books.find(book => {
      return book.id === id
    });

    remove the added book from books so it doesn't show on search anymore.
    const newBooks = this.state.books.filter(book => {
      return book.id !== id
     });

    if(e.target.value === 'currentlyReading'){
      this.setState((previousState) => ({
        currentlyReading: previousState.currentlyReading.concat(result)
      }))

      this.setState({
        books: newBooks
      });

      BooksAPI.update(result, "currentlyReadying");
    };

    if(e.target.value === 'wantToRead'){
      this.setState((previousState) => ({
        wantToRead: previousState.wantToRead.concat(result)
      }))

      this.setState({
        books: newBooks
      });

      BooksAPI.update(result, "wantToRead");
    };

    if(e.target.value === 'read'){
      this.setState((previousState) => ({
        read: previousState.read.concat(result)
      }))

      this.setState({
        books: newBooks
      });

      BooksAPI.update(result, "read");
    }*/
  }

  changeShelf = (e) => {
    console.log(e.target.value);
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
