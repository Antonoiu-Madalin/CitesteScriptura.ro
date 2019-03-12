import React from 'react'
import { Link } from 'gatsby'
import Collapsible from 'react-collapsible';

import './PostCategoriesNav.css'
import { FaPlusSquare } from 'react-icons/fa';
import BlogSearch from './BlogSearch';


const PostCategoriesNav = ({ categories, enableSearch }) => (
  

  <div id="collapsibleContainer">
  
  {/*The proper search! Do not remove */}
    <div className="properSearch"> 
      <BlogSearch />
    </div>

    <div id="innerCollapsible">
    <Collapsible trigger={<FaPlusSquare className="zeIcon"/>} className="collapSible" >
    
      <div className="PostCategoriesNav">
        <Link className="NavLink" exact="true" to={`/blog/`}>
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            exact="true"
            className="NavLink"
            key={category.title + index}
            to={category.slug}
          >
            {category.title}
          </Link>
        ))}

      </div>
      </Collapsible>
      </div>
    </div>
)

export default PostCategoriesNav
