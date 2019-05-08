import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X, Mail, Info, Home, Rss, LogIn } from 'react-feather'
import Logo from './Logo'
import './Nav.css'
import BlogSearch from './BlogSearch';
import FaHome from 'react-icons/lib/fa/home';

const activeStyles  = {
  color: 'white',
  background:'#459c98',
}

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
      <div className="Multiple-Nav">

        <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
 
        <div className="Nav--Container container"> {/*Remove this to make navbar full screen only */}
          
          <div className="logoMover noselect">
            <Logo />
          </div>

          <div  className="logoTextA">
            <p className="noselect">AlphaStage App0.1</p>         
          </div>
         
          <div className="Nav--Links noselect">
            <NavLink to="/"> <Home className="contactMenu"/>Acasă</NavLink>
            <NavLink to="/despre/"> <Info className="contactMenu"/>Info</NavLink>
            <NavLink to="/contact/"> <Mail className="contactMenu"/>Contact</NavLink>
            <NavLink to="/newsletter/"><Rss className="contactMenu"/>Newsletter</NavLink>
            <NavLink to="/log-in/"><LogIn className="contactMenu"/>Log In</NavLink>
          </div>
          
          
          <div className="buttonsToTheRight">
            {/* Butonul Hamburger */}
            <button
              className="Button-blank Nav--MenuButton"
              onClick={this.handleMenuToggle}
            >
              {active ? <X /> : <Menu />}
            </button>

            <div className="globalSearchButton"> 
              <BlogSearch />
            </div>
          </div>

        </div>
      </nav>

        <nav className={`Nav  ${active ? 'Nav-active' : ''}`}>
          <ul className="Nav--Container container secondNav"> 
                    
            <div className="MetaCategories">
              <li>
                  <Link className="NavLinkMetaCategory" exact="true" to={`/`} activeStyle={activeStyles}>
                  <FaHome />
                  </Link> 
              </li>

                <li>
                  <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/studiu-biblic/`} activeStyle={activeStyles}>
                    MetaCat1
                  </Link>
                </li>

                <li>
                  <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/raspunsuri-rapide/`} activeStyle={activeStyles}>
                    MetaCat2
                  </Link>
                </li>

                <li>
                  <Link className="NavLinkMetaCategory" exact="true" partiallyActive={true} to={`/versete/`} activeStyle={activeStyles}>
                    MetaCat3
                  </Link>
                </li>
            </div>
          </ul> 
        </nav>

      </div>
    
      
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)
