import React from 'react'
import { Link } from 'gatsby'
import './PostMetaCategoriesNav.css'
import BlogSearch from './BlogSearch';


const activeStyles  = {
  color: 'white',
  background:'#459c98',
}

const PostCategoriesNav = ({ categories}) => (
  
  <div id="collapsibleContainer">
  
    {/*The proper search! Do not remove */}
      <div className="properSearch"> 
        <BlogSearch />
      </div>
 
      <div className="PostMetaCategoriesNav">
        

        {categories.map((category, index) => (
          <Link
            exact="true"
            className="NavLink"
            key={category.title + index}
            to={category.slug}
            activeStyle={activeStyles}
          >
          {/* Aici apare titlul fiecarei categorii sub MetaCat*/}
            {category.title.split("/")[1]} 
          </Link>
        ))}

      </div>
      </div>
    
   
)


export default PostMetaCategoriesNav
