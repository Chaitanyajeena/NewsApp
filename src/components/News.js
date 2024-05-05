import React, { Component } from 'react'
import Newsitem from '../Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor (){
    super();
    console.log("hello i m a constructor from news components");
    this.state = {
      articles:[],
      loading: false,
      page: 1
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a579cadc2cff4f66bc81973a07c1a78c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults: parsedData.totalResults,loading:false});
  }
  handleprev = async ()=> {
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a579cadc2cff4f66bc81973a07c1a78c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles,
      loading: false
    })

  }
  handlenext = async ()=> {
    if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a579cadc2cff4f66bc81973a07c1a78c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page:this.state.page + 1,
      articles:parsedData.articles,
      loading: false
    })
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsApp-Top-Headlines</h1>
        {this.state.loading && <Spinner/>}
        {/* This is a news Comp */}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-3" key={element.url}>
          <Newsitem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imgUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}  type="button" className='btn btn-dark' onClick={this.handleprev}> &larr; previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn btn-dark' onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News
