import React,{ useState } from 'react'
import PostCard from '../components/PostCard'
import './PostSection.css'


export default function PostSection (props) {

    const { posts= [], title= '', showLoadMore= true, loadMoreTitle= 'Mai multe articole',} = props;
    const [limit, setLimit] = useState(12);
    const  visiblePosts  = posts.slice(0, limit || posts.length)

    return (

      <div className="PostSection">
            {/*1*/}
            {title && <h2>{title}</h2>}
            {/*2*/}
            {!!visiblePosts.length && (   <div className="PostSection--Grid"> {visiblePosts.map((post, index) => (<PostCard key={post.title + index} {...post} />))} </div>)}
            {/*3*/}
            {showLoadMore && visiblePosts.length < posts.length && ( <div className="taCenter"> <button className="buttonulMorePosts" onClick={() =>{setLimit(limit+6)}}> {loadMoreTitle}</button></div>)}
      </div>
    )
  }

