import React, { Component } from 'react'
import { Location } from '@reach/router'
/* import Logo from './Logo' */
import './Nav.css'
import App from "./App"

export class Navigation extends Component {

  render() {

    return (
      

      <nav className="Nav">
 
        <div className="Nav--Container"> {/*Remove this to make navbar full screen only */}


            <App/>


            {/*
            <div className="logoMover noselect">
              <Logo />
            </div>
            */}

            <div  className="logoTextA">
              <p className="noselect">BetaRelease 1.7.0</p>         
            </div>
          
 

        </div>

      </nav>
   

      
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
