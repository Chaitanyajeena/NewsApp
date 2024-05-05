import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
   let {title,description,imgUrl,newsurl,author,date} = this.props;    //this is also called destructuring of js.       //creating props using this syntax in class base components.
    return (
      <div className='container my-3'>
        <div className="card" style ={{width: "18rem"}}>
      <img src={!imgUrl?"https://www.hindustantimes.com/ht-img/img/2024/02/25/1600x900/yami_gautam_1708827871065_1708827880928.png":imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text"> {description}</p>
        <p className='card-text'><small className='text-muted'>By {!author?"Unknow":author} on {new Date(date).toGMTString()} </small></p>
        <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
      </div>
    )
  }
}

export default Newsitem
