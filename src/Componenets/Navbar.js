import React, { Component } from 'react'
import {Link} from 'react-router-dom'
 class Navbar extends Component {
  render() {
    return (
       //<></> can be used this also
       <div style={{display:"flex"}}>
        
        <Link to='/' style={{textDecoration:"none",fontWeight:"normal"}}><h1 >MOVIES</h1></Link>
        <Link to='/favourite' style={{textDecoration:"none"}}><h2 style={{marginTop:"0.7rem",marginLeft:"2rem",fontWeight:"normal",textDecoration:"none"}}> Favourite</h2></Link>

      </div>
    )
  }
}
export default Navbar