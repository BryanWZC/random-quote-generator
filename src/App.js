import React, {Component} from 'react';
import './App.css';
import fetch from 'node-fetch';
import twitter from "./images/twitter.svg";



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotesArr: [{}],
      isLoaded: false,
      quote: {}

    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    try{(async () => {
          const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
          const data = await response.json();
          this.setState({quotesArr: data.quotes, isLoaded: true});
          this.setState({quote: this.state.quotesArr[Math.floor(Math.random()*this.state.quotesArr.length)]});
    })();
  } catch (error){
    this.setState({error: error.message})
  }
  }

  handleClick() {
    this.setState({quote: this.state.quotesArr[Math.floor(Math.random()*this.state.quotesArr.length)]})
  }

  boxAnimate(){
    let arr = [];
    for(let i = 0; i < 8; i++){
      arr.push(<div key = {i} id={'box-animation'+i}></div>)
    }
    return arr
  }

  render() {
    const {error, quote} = this.state; 

    if (error){
      return <div>Error: {error.message}</div>
    } else {
      return (
      <div className="App">

        {this.boxAnimate()}
        <div id="quote-box">
          <h1 id = 'heading'> &#8220; Random Quote Generator &#8220;</h1>
          <h2 id='text'>{quote.quote}</h2>
          <h4 id = 'author'>{quote.author}</h4>
          <button id = 'new-quote' onClick = {this.handleClick}><h4>New Quote</h4></button>
          <a id = 'tweet-quote' href = 'https://www.twitter.com/intent/tweet'><img id = "tweet-icon" src = {twitter} ></img></a>
        </div>
      </div>
    )
    }
  }
}

export default App