import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, Mail, Info, Home, Rss, LogIn } from 'react-feather'
import Logo from './Logo'
import './Nav.css'
import Sidebar from "react-sidebar";

export class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {

    return (
        
        <nav className={`Nav`}>
 
        <Sidebar
                sidebar={
                  <div className="Nav--Links noselect">
                    <h3 style={{color: 'black'}}>Meniu</h3>
                    <Link to="/"> <Home className="contactMenu"/>Acasă</Link>
                    <Link to="/despre/"> <Info className="contactMenu"/>Info</Link>
                    <Link to="/contact/"> <Mail className="contactMenu"/>Contact</Link>
                    <Link to="/newsletter/"><Rss className="contactMenu"/>Newsletter</Link>
                    <Link to="/log-in/"><LogIn className="contactMenu"/>Log In</Link>
                  </div>
                
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
              >
                <button className="Button-blank Nav--MenuButton" onClick={() => this.onSetSidebarOpen(true)}>
                <span className="toTheLeft"><Menu /></span>
                </button>
        </Sidebar>
          
          
          {/*
          <div className="logoMover noselect">
            <Logo />
          </div>*/}

          <div  className="logoTextA">
            <p className="noselect">BetaRelease 1.9.0</p>         
          </div>

      </nav>
    

      
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
