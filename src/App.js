import React from 'react'
import { Table, Tag, Space, Divider } from 'antd';

import 'antd/dist/antd.css';

const urlPosts = 'https://jsonplaceholder.typicode.com/posts'
const urlComments = 'https://jsonplaceholder.typicode.com/comments'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      columns : [        
        {
          title: 'Posts',
          dataIndex: 'posts',
          key: 'posts',            
        }
      ],
      posts : [],
      comments : [],
      dataTable : []
    }
  }

  componentDidMount(){
    this.getAllPosts()
    this.getAllComments()
  }

  formatSentence = (sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
  }

  getAllPosts = () =>{
    try {
      fetch(urlPosts)
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
      else return {}
    })
    .then( json => {
        if(json != null){
          let posts = []
          json.forEach(element => {
            posts.push(
              {               
                id : element.id,
                title : element.title,
                body : element.body                
              })
          })    
          this.setState ({ posts : posts }) 
        }   
      })
      
    } catch (error) {
      console.log(error);
    }    
  }

  getAllComments = () =>{
    try {
      fetch(urlComments)
    .then(response => {
      if(response.status === 200){
        return response.json()
      }
      else return {}
    })
    .then( json => {
        if(json != null){
          let comments = []
          json.forEach(element => {
            comments.push(
              {               
                id : element.id,
                name : element.name,
                email : element.email,
                body : element.body,
                postId : element.postId             
              })
          })    
          this.setState ({ comments : comments }) 
          this.updateTablePosts()
        }   
      })
      
    } catch (error) {
      console.log(error);
    }    
  }

  getCommentsPerPost = (postId) =>{
    let filteredComments = this.state.comments.filter(c => c.postId == postId)
    let commentList = []   

    let columns = [        
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',            
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',            
      },
      {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',            
      },
    ]

    for (let index = 0; index < filteredComments.length; index++) {
      const element = filteredComments[index];
      commentList.push({
        email: element.email,
        name : element.name,
        body : element.body 
      })
    }

    return (
      <Table
          columns={columns} 
          dataSource={commentList}
      />)
  }

  updateTablePosts = () =>{
    let posts = this.state.posts
    let comments = this.state.comments
    let dataTable = []
    posts.forEach(post => {
      dataTable.push({
        posts : <div key={post.id}>
                  <h2>{this.formatSentence(post.title)}</h2> 
                  <p>{this.formatSentence(post.body)}</p>
                  <h3>Comments</h3>                  
                  <p>    
                    {this.getCommentsPerPost(post.id)}                      
                  </p>
                </div>
      })
    })
    this.setState ({dataTable : dataTable})
  }  

  render(){
    return (
      <div>
        <Table 
          columns={this.state.columns} 
          dataSource={this.state.dataTable} />        
      </div>
    );
  }
}

export default App;
