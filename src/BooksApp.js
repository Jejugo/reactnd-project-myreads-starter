import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search'
import Home from './components/Home'
import {Route} from 'react-router-dom'

class BooksApp extends Component {
	state = {
    books: [],
		currentlyReading: [],
		wantToRead: [],
    read: [],
    query: ''
  };
  
  addBook = (e, id) => {
    const result = this.state.books.find(item => {
      return item.id === id
    });

    if(e.target.value === 'currentlyReading'){
      console.log("Here1");
      this.setState((previousState) => ({
        currentlyReading: previousState.currentlyReading.concat(result)
      }))

      BooksAPI.update(result, "currentlyReadying");
    };

    if(e.target.value === 'wantToRead'){
      console.log("Here2");
      this.setState((previousState) => ({
        wantToRead: previousState.wantToRead.concat(result)
      }))

      BooksAPI.update(result, "wantToRead");
    };

    if(e.target.value === 'read'){
      console.log("Here3");
      this.setState((previousState) => ({
        read: previousState.read.concat(result)
      }))

      BooksAPI.update(result, "read");
    }
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
            <Home changeShelf={this.changeShelf} currentlyReading={currentlyReading} wantToRead={wantToRead} read={read}></Home>
          )}></Route>
      </div>
    )
  }
}

export default BooksApp
