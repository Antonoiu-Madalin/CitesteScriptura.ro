import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X, Mail, Info, Home, Rss, LogIn } from 'react-feather'
import Logo from './Logo'
import './Nav.css'
import BlogSearch from './BlogSearch';


export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (

        <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
 
        <div className="Nav--Container"> {/*Remove this to make navbar full screen only */}
          <div className="hamBurger">
             {/* Butonul Hamburger */}
             <button
              className="Button-blank Nav--MenuButton"
              onClick={this.handleMenuToggle}
            >
              {active ? <X /> : <Menu />}
            </button>
          </div>

          <div className="logoMover noselect">
            <Logo />
          </div>

          <div  className="logoTextA">
            <p className="noselect">BetaRelease 1.1.0</p>         
          </div>
         
          <div className="Nav--Links noselect">
            <NavLink to="/"> <Home className="contactMenu"/>Acasă</NavLink>
            <NavLink to="/despre/"> <Info className="contactMenu"/>Info</NavLink>
            <NavLink to="/contact/"> <Mail className="contactMenu"/>Contact</NavLink>
            <NavLink to="/newsletter/"><Rss className="contactMenu"/>Newsletter</NavLink>
            <NavLink to="/log-in/"><LogIn className="contactMenu"/>Log In</NavLink>
          </div>
          
          <BlogSearch />
 
        </div>
      </nav>


      
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
