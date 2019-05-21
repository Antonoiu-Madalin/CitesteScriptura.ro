import React from "react";
import Sidebar from "react-sidebar";
import { Link } from 'gatsby'
import { Menu, Mail, Info, Home, Rss, LogIn } from 'react-feather'

class App extends React.Component {
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
      <Sidebar
      sidebar={
        <div classname="SideMenuContainer">
          <div className="Nav--Links noselect">
            <h3 style={{color: 'black'}}>Meniu</h3>
            <Link to="/"> <Home className="contactMenu"/>Acasă</Link>
            <Link to="/despre/"> <Info className="contactMenu"/>Info</Link>
            <Link to="/contact/"> <Mail className="contactMenu"/>Contact</Link>
            <Link to="/newsletter/"><Rss className="contactMenu"/>Newsletter</Link>
            <Link to="/log-in/"><LogIn className="contactMenu"/>Log In</Link>
          </div>
         </div>





      }

      open={this.state.sidebarOpen}
      onSetOpen={this.onSetSidebarOpen}
      styles={{ sidebar: { background: "white" } }}
      
      
    >
      <button className="Button-blank Nav--MenuButton" onClick={() => this.onSetSidebarOpen(true)}>
        <span className="hamBurger"><Menu /></span>
      </button>
    </Sidebar>

    );
  }
}

export default App;