import React from 'react'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import "./BlogSearch.css"
/* import { FaSearch } from 'react-icons/fa'; */

export default () => {
  return (
    <Location>
      {({ location }) => {
        let search = qs.parse(location.search.replace('?', '', )) /* Gets rid of ? mark if present */

        return (
         
            <div className="search"> 
              <form id="demo-2">
              <input
                type="search" 
                className="searchBar"
                value={search.s || ''}
                placeholder="Cauta..."
                onChange={e => {
                  let search = {}
                  search.s = e.target.value
                  search = qs.stringify(search)

                  const url = location.href
                    .replace(location.origin, '')
                    .replace(location.search, '')
                   
                    navigate(`${url}?${search}`)
                }}

              />
             {/* <i className="searchIcon"> < FaSearch /> </i> */}
              
              </form>
              </div>
           
        )
      }}
      
    </Location>
    
  )
  
}
