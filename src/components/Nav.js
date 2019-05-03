import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'
import './Nav.css'


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
 
        <div className="Nav--Container container"> {/*Remove this to make navbar full screen only */}
          
          
          <Link to="/" className="logoMover" onClick={this.handleLinkClick}>
            <Logo />
          </Link>

          <Link to="/" onClick={this.handleLinkClick}>
            <a href="/" className="logoTextA">
              
                <p>MyFuture Applicats</p>
               
              
            </a>
          </Link>

          <div className="Nav--Links">
            <NavLink to="/">Acasă</NavLink>
            <NavLink to="/despre/" >Despre</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
          </div>
          
          {/* Butonul Hamburger */}
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
