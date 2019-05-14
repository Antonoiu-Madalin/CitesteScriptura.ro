import React from 'react'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import "./BlogSearch.css"

export default () => {
  return (
    <Location>
      {({ location }) => {
        let search = qs.parse(location.search.replace('?', '', )) /* Gets rid of ? mark if present */

        return (
         
            <div id="wrappersearch"> 
              <form id="search-form-1" className="search-form-1">
                <input
                  id="s1"
                  type="text" 
                  className="search-field-1"
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
                  }}/>

           
             

              </form>

            <p className="noselect logoMe">BetaStage App0.05</p>         
         

              </div>
           
        )
      }}
      
    </Location>
    
  )
  
}
