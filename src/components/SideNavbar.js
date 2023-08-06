import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import { FaBars} from "react-icons/fa";
import { AiFillHome, AiOutlineClose} from "react-icons/ai";
import {RiLogoutCircleRLine} from "react-icons/ri"
import {CgProfile} from "react-icons/cg"
import {GiFamilyHouse} from 'react-icons/gi'
import {MdAddCircle} from 'react-icons/md'
import {FcHome} from 'react-icons/fc'
import '../docs/css/Nav/SideNavbar.css'
class SideNavbar extends React.Component {
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
          <nav id="nav1" className={this.state.sidebar ? 'nav-menu active ': 'nav-menu'}>
              <ul className="nav-menu-items" onClick={this.clicked}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                        <AiOutlineClose/>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/user/profile">
                        <CgProfile/>
                        <span>Profile</span>
                    </Link>
                </li>
                <li className="nav-text" onClick={()=>{
                    localStorage.setItem("method1","POST")
                    this.props.history.push('/house/add')}}>
                    <Link to="/house/add">
                        <MdAddCircle/>
                        <span>Add House</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/house/getHousesOfOwner">
                        {/* <AiFillHome/> */}
                        {/* <BiBuildingHouse/> */}
                        <GiFamilyHouse/>
                        <span>My Houses</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/housesOwned/filledHouses">
                        {/* <AiFillHome/> */}
                        {/* <FcHome/> */}
                        <GiFamilyHouse/>
                        <span>Filled Houses</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/house/getVacantHousesOfOwner">
                        {/* <AiFillHome/> */}
                        <GiFamilyHouse/>
                        <span>Vacant Houses</span>
                    </Link>
                </li>
                <li className="nav-text">
                    <Link to="/housesOwned/requestedHouses">
                        {/* <AiFillHome/> */}
                        <GiFamilyHouse/>
                        <span>Requests</span>
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

export default withRouter(SideNavbar);
