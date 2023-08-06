import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import {withRouter} from 'react-router-dom'
import '../docs/css/views.css'
import AdminNavbar from './AdminNavbar';
import Loadingbar from './Loadingbar';
class ViewHousesOwned extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      houses: [],
      loading:false,
      cncl:false,
      cnfrm:false
    };
  }
  componentDidMount () {
      this.setState({
        loading:true
      })
      this.fetchAllHouses ();
  }

  fetchAllHouses = () => {
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/getFilledHouses`, {
      method: 'GET',
      responseType:"blob"
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('result', data);
        this.setState ({
          houses: data.data,
          loading:false,
          cncl:false,
          cnfrm:false
        });
      })
      .catch (error => {
        this.setState ({
            loading:false,
            cncl:false,
            cnfrm:false
          });
          console.log ('error', error)});
  }
  cancel = (hid) => {
    this.setState({
      cncl:true
    })
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/deleteHouseOwned/${hid}`, {
      method: 'DELETE',
    })
      .then (data => {
        console.log("Deleted")
        this.fetchAllHouses()
      })
      .catch (error => {
        this.setState({
          cncl:false
        })
        console.log ('error', error)});

  }
  update = (hid,oid,tid) => {
    this.setState({
      cnfrm:true
    })
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/updateHouseOwned/${hid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        houseId:hid,
        ownerId:oid,
        tenantId:tid,
        status:1
      }),
    }).then(res =>res.json())
      .then (res => {
        if (res.code === 200) {
              alert("Confirmed")
        } else if (res.code === 400) {
          document.getElementById ('register').innerHTML ="All Fields are Mandatory"
          console.log("Error in Confirming");
        }
        this.fetchAllHouses();
      })
      .catch (err => {
        this.setState({
          cnfrm:false
        })
        console.log (err);
      });
  }
  render () {
    if(this.state.loading || this.state.cnfrm || this.state.cncl)
    {
      if(this.state.loading)
      {
        return(
          <Loadingbar text="Loading Request..."/>
          )
      }
      else if(this.state.cnfrm)
      {
        return(
          <Loadingbar text="Confirming Request..."/>
          )
      }
      else
      {
        return(
          <Loadingbar text="Cancelling Request..."/>
          )
      }
      
    }
    else
    {
        if(this.state.houses.length!==0)
        {
            return (
            <div >
            <AdminNavbar/>
            <Container className="main">
                <h1 style={{paddingTop:"100px"}}>Filled Houses</h1>
                        { this.state.houses.map ((house,index) => { 
                        
                        
                            return (
                                <div className="housecards" id="doc">
                                <Image className="houseImage" src={"data:image/png;base64,"+ house.housePic} width="350px" height="250px"/>
                                <p><b>HouseId:</b>{house.houseId}</p>
                                <p><b>TenantId:</b>{house.tenantId}</p>
                                <p><b>Cost:</b>{house.cost}</p>
                                <p><b>Features:</b>{house.features}</p>
                                <p><b>Description:</b>{house.description}</p>
                                <p><b>Document:</b><a href={"data:application/pdf;base64,"+house.houseDocument} download="file.pdf">Download</a></p>
                                <p><b>Type:</b>{house.type}</p>
                                <p><b>OwnerId:</b>{house.ownerId}</p>
                                <p><b>Hno:</b>{house.hno}</p>
                                <p><b>Village:</b>{house.village}</p>
                                <p><b>District:</b>{house.district}</p>
                                <p><b>Pin:</b>{house.pin}</p>
                                <p><b>Owner:</b><a  onClick = {() =>{
                                      localStorage.setItem("userId",house.ownerId)
                                      localStorage.setItem("details","owner")
                                      this.props.history.push('/viewUser')
                                    }}>View Details</a></p>
                                <p><b>Tenant:</b><a  onClick = {() =>{
                                      localStorage.setItem("userId",house.tenantId)
                                      this.props.history.push('/viewUser')
                                      localStorage.setItem("details","tenant")
                                    }}>View Details</a></p>
                            </div> 
                            )}
                                
                        )} 
                </Container>
            </div>
            );
        }
        else
        {
            return (
                <div>
                      <AdminNavbar/>
                    <h1 style={{paddingTop:"100px"}}>No Filled Houses</h1>
                </div>
            )
        }
    }
  }
}

export default  withRouter(ViewHousesOwned);


