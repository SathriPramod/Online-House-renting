import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import { FaBars} from "react-icons/fa";
import { AiFillHome, AiOutlineClose} from "react-icons/ai";
import {RiLogoutCircleRLine} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {GiFamilyHouse} from 'react-icons/gi'
import { ImUser } from "react-icons/im"
import '../docs/css/Nav/SideNavbar.css'
class AdminNavbar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
        sidebar:false,
        logout:false
    };
       
  }
  clicked =() =>{
      console.log(this.state.sidebar)
        this.setState({
            sidebar:!this.state.sidebar
        })
  }
  render () {
    return (
      <div>
          <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={this.clicked}/>
                </Link>
          </div>
          <nav className={this.state.sidebar ? 'nav-menu active ': 'nav-menu'}>
              <ul className="nav-menu-items" onClick={this.clicked}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                        <AiOutlineClose/>
                    </Link>
                </li>
                {/* <li className="nav-text" onClick={()=>{localStorage.setItem("method","PATCH")}}>
                    <Link to="/user/profile">
                        <CgProfile/>
                        <span>Profile</span>
                    </Link>
                </li> */}
                <li className="nav-text">
                    <Link to="/owner/getOwners">
                        {/* <AiFillHome/> */}
                        {/* <BiBuildingHouse/> */}
                        <ImUser/>
                        <span>Owners</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/tenant/getTenants">
                        {/* <AiFillHome/> */}
                        {/* <FcHome/> */}
                        <ImUser/>
                        <span>Tenants</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/house/getHouses">
                        {/* <AiFillHome/> */}
                        <GiFamilyHouse/>
                        <span>Vacant Houses</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/housesOwned/getHouses">
                        {/* <AiFillHome/> */}
                        <GiFamilyHouse/>
                        <span>Filled Houses</span>
                    </Link>
                </li>
                <li className="nav-text" onClick={()=>{
                    if(window.confirm('Are you sure You want to logout ?'))
                    {
                        this.setState({
                            logout:true
                        })
                        localStorage.clear()
                        this.props.history.push('/')
                    }
                    else
                    {
                        this.setState({
                            logout:false
                        })
                    }
                    }}>
                    <Link to={this.state.logout ? "/" : "#"}>
                        <RiLogoutCircleRLine/>
                        <span>Logout</span>
                    </Link>
                </li>
              </ul>
          </nav>
      </div>
    );
  }
}

export default withRouter(AdminNavbar);
