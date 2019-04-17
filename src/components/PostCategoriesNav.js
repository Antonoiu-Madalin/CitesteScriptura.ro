import React from 'react'
import { Link } from 'gatsby'
import Collapsible from './Collapsible';
import './PostCategoriesNav.css'
import { FaPlusSquare } from 'react-icons/fa';
import BlogSearch from './BlogSearch';


const activeStyles  = {
  fontSize: '1.2rem',
  minHeight: '1.2em',
  lineHeight:' 1',
  margin: '0.5em 0',
  border: 'solid 1px #42B2A4',
  display: 'inline-block', /* Wraps div around the text only */
  background:'#86CBD1',
  color: 'white',
  fontWeight: '700'
}

const PostCategoriesNav = ({ categories}) => (
  

  <div id="collapsibleContainer">
  
  {/*The proper search! Do not remove */}
    <div className="properSearch"> 
      <BlogSearch />
    </div>

    <div id="innerCollapsible">
    <Collapsible trigger={<FaPlusSquare className="zeIcon"/>} className="collapSible" >
    
      <div className="PostCategoriesNav">
        <Link className="NavLink" exact="true" to={`/`} activeStyle={activeStyles}>
          Toate
        </Link>

        {categories.map((category, index) => (
          <Link
            exact="true"
            className="NavLink"
            key={category.title + index}
            to={category.slug}
            activeStyle={activeStyles}
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
