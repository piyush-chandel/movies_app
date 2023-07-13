
import './App.css';
import Navbar from './Componenets/Navbar';
import Banner from './Componenets/Banner';
import List from './Componenets/List';
import Favorate from './Componenets/Favorate';
import { Fragment } from 'react';
import { BrowserRouter as Router,Switch,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <switch>
    <Routes>
   
    <Route path='/' exact
      element={
    <Fragment>  
      <Banner/>
      <List/>
     
      </Fragment>
      
}/>

      {/* </Route>  */}
    <Route path='/favourite' exact element={<Favorate/>}/>
 
      



   {/* <Banner/>
   <List/> */}
   </Routes>
   </switch>
   </Router>
   </>
  );
}

export default App;
