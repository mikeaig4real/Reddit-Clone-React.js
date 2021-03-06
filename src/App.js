/* eslint-disable no-useless-constructor */
/* eslint-disable no-eval */
/* eslint-disable no-lone-blocks */

import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      link:'',
      votes:0,
      articules:[]
    }
    this.handleTChange = this.handleTChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVoteup = this.handleVoteup.bind(this);
    this.handleVotedown = this.handleVotedown.bind(this);
    this.deleteArticule = this.deleteArticule.bind(this);
  }
  handleTChange (e) {
    const { articules } = this.state;
    const { value } = e.target;
    this.setState({
      title: value,
      articules: articules
    })
  }
  handleVoteup (title,link) {
    const { articules } = this.state;
    const currArticule = articules.find(articule => articule.title === title && articule.link === link)
    currArticule.votes++;
    this.setState({
      articules:[...articules]
    }) 
  }

  deleteArticule (title,link) {
    const { articules } = this.state;
    const currArticule = articules.find(articule => articule.title === title && articule.link === link)
    const index = articules.indexOf(currArticule);
    this.setState({
      articules:[...articules].filter((art,i) => i !==index)
    }) 
  }

  handleVotedown (title,link) {
    const { articules } = this.state;
    const currArticule = articules.find(articule => articule.title === title && articule.link === link)
    if (currArticule.votes > 0) {
      currArticule.votes--;
    }
    this.setState({
      articules:[...articules]
    }) 
  }
  handleLChange (e) {
    const { articules } = this.state;
    const { value } = e.target;
    this.setState({
      link: value,
      articules: articules
    })
  }
  handleSubmit (e) {
    const { title ,link ,votes ,articules } = this.state;
    if(title && link) {
      if(articules.filter(articule=> articule.title === title && articule.link === link).length===0) {
        e.preventDefault()
          this.setState({
          title:'',
          link:'',
          articules: [...articules,{title:title,link:link,votes:votes}]
        })
      } else {
        alert('Duplicate Entry')
        this.setState({
          title:'',
          link:'',
          articules: [...articules]
        })
      }
    }
  }
  render () {
   const { title ,link ,articules } = this.state;
    return (
      <div className='container'>
        <form>
            <h5>Add a link</h5>
            <div>
              <label for='title'>Title:</label><br></br>
              <input onChange={this.handleTChange} value={title} type='text' name='title' id='title' required></input>
            </div>
            <div>
              <label for='link'>Link:</label><br></br>
              <input onChange={this.handleLChange} value={link} type='text' name='link' id='link' required></input>
            </div>
            <div>
              <button 
              type='submit' 
              onClick={this.handleSubmit}>Submit link</button>
            </div>
          </form>
        <div class='articules'>
          {articules.sort((a,b) => b.votes - a.votes).map((articule,i) => {
            return <Articule 
              {...articule} 
              key={i} 
              voteUp={this.handleVoteup} 
              voteDown={this.handleVotedown} 
              deleteArt={this.deleteArticule}/>
          })}
        </div>
      </div>
    )
  }
}

class Articule extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { deleteArt,link,votes,title,voteUp,voteDown } = this.props;
    return (
      <div className='articule'>
        <div className='points'><h1>{votes}</h1><h2>points</h2></div>
        <div className='info'>
          <div><h3>{this.props.title}</h3><h4>{`(${link.split('//')[1]||link})`}</h4></div>
          <div className='votebtn'>
            <button onClick={()=>{
              voteUp(title,link)
            }}><i className='fas fa-arrow-circle-up'></i>upvote</button>
            <button onClick={()=>{
              voteDown(title,link)
            }}><i className='fas fa-arrow-circle-down'></i>downvote</button>
          </div>
        </div>
        <span><i onClick={()=> {
            deleteArt(title,link)
          }} className='fas fa-minus-circle'></i>
        </span>
      </div>
    )
  }
}

export default App;