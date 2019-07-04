import React from 'react'
import { Link } from 'gatsby'
import './PostCategoriesNav.css'



const activeStyles  = {
  color: 'white',
  background:'#459c98',
}

const PostCategoriesNav = ({ categories}) => (



      <div className="scrollmenu">

      <ul>

          {categories.map((category, index) => (
             <li>
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
            </li>
          ))}

        </ul>

      </div>




)


export default PostCategoriesNav
