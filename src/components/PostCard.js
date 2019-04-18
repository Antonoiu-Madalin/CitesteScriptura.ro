import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'
import './PostCard.css'
import _format from 'date-fns/format'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  date,
  time,
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      
      <p className="PostCard--Category">
        {categories.map((cat, index) => (

          <Link to={cat.category.split(" ").join("-").toLowerCase() + "/"}>

            <span
              key={cat.category}
              className="SinglePost--Meta--Category"
            >
              {cat.category}
              {/* Add a comma on all but last category */}
              {index !== categories.length - 1 ? ',' : ''}
            </span>
          </Link>

        ))}


      </p>

      {title && <h3 className="PostCard--Title">{title}</h3>}
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}

      <div className="post-card-wrapper">
        <div className="post-card-avatar">
          <div className="author-profile-image"> 
            <img className="avatarPhoto" src="https://archive.icann.org/meetings/icann56/cdn.schd.ws/common/img/avatar-empty.png" 
            alt="author"></img> 
          </div>
           
        <div className="nameAndDate">
          <span>Mădălin Antonoiu</span> 
          <br/>

          <span>
              {date && (
                      <time
                        className="SinglePost--Meta--Date"
                        itemProp="dateCreated pubdate datePublished"
                        date={date}
                      >
                        {_format(date, 'Do MMMM , YYYY')}
                      </time>
                    )}
          </span>  
                
          </div>
        </div>
      </div>
      </div>
  </Link>
)

export default PostCard
