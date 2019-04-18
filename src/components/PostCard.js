import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'
import './PostCard.css'
import _format from 'date-fns/format'

/* Adaugi asta pentru data (1) */
const roLocale = require('date-fns/locale/ro');

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  date,
  time,
  readingTime,
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

          <Link to={cat.category.split(" ").join("-").toLowerCase().replace("ă","a") + "/"}>

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
          {/* <span>Mădălin Antonoiu</span>  <br/> */}
         

          <span>
              {date && (
                      <time
                        className="SinglePost--Meta--Date"
                        itemProp="dateCreated pubdate datePublished"
                        date={date}
                      >
                      {/* Adaugi asta pentru data (2) -  , { locale: roLocale })  */}
                        {_format(date, 'Do MMMM, YYYY', { locale: roLocale }) }
                      </time>
                    )}
          </span>  
              {/* Don't know yet how to put display the reading time here, i got it in GraphQL tho 
          <span>
          <time>
            {readingTime}
           </time>
          </span>
             */}   
          </div>
        </div>
      </div>
      </div>
  </Link>
)

export default PostCard
