import React,{ useState } from 'react'
import PostCard from '../components/PostCard'
import './PostSection.css'

export default function PostSection (props) {

    const {
        posts= [], // here im putting all posts inside an array
        title= '',
        showLoadMore= true,
        loadMoreTitle= 'Mai multe articole',
        } = props;


    const [limit, setLimit] = useState(12);

    const  visiblePosts  = posts.slice(0, limit || posts.length) //slicing to display only limit array Posts


    return (

      <div className="PostSection">

        {title && <h2 className="PostSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="PostSection--Grid">
            {visiblePosts.map((post, index) => (
              <PostCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
        {showLoadMore && visiblePosts.length < posts.length && (
          <div className="taCenter">
            <button className="buttonulMorePosts" onClick={() =>{setLimit(limit+6)}}>
              {loadMoreTitle}
            </button>

          </div>
        )}
        </div>

    )
  }


