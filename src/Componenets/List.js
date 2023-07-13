import React, { Component } from 'react'

import axios from 'axios'
export default class List extends Component {


constructor(){
    super();
    this.state={
        hover:'',
        pages:[1],
        currpage:1,
        movie:[],
        favourates:[],
    }
}
  async componentDidMount(){
       
    const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage}`)
    let data=res.data;
    this.setState({
        movie:[...data.results]
    })


  }
  changemovies=async ()=>{

    const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currpage}`)
   
    let data=res.data;
   
    this.setState({
        movie:[...data.results]
    })

  }


handleleft=()=>{

if(this.state.currpage!=1){
    this.setState({
        currpage:this.state.currpage-1,
    },this.changemovies)
}
}
handle=(value)=>{
    if(value!=this.state.currpage){
    this.setState({
        currpage:value,
    },this.changemovies)
}
}
  handleright=()=>{

    console.log("favidi");
   let temparr=[];
   for(let i=1;i<=this.state.pages.length+1;i++)
   temparr.push(i);

   this.setState({
    
    currpage:this.state.currpage+1,
    pages:[...temparr],
   },this.changemovies)

  }

handlefavorate=(moveobj)=>{
  
    let oldData=JSON.parse(localStorage.getItem('Movene-app') || "[]");
    // console.log(oldData);
    if(this.state.favourates.includes(moveobj.id))
    {
        oldData=oldData.filter((m)=>m.id!=moveobj.id)
    }
    else{

           
           oldData.push(moveobj);
    }
    console.log(oldData);
    localStorage.setItem("Movene-app",JSON.stringify(oldData));
    this.handleFavouarteState();
    
}


handleFavouarteState=()=>{
   
    let oldData=JSON.parse(localStorage.getItem('Movene-app') || "[]");
    let temp=oldData.map((movie)=>movie.id)
   
    this.setState({
        favourates:[...temp]
    })
}

    render() {
        // let movie = movies.results;
        return (
            <>
                {

                    this.state.movie.length === 0 ? <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                        <div >
                            <h3 className='text-center'><strong>Trendings</strong></h3>
                            <div className="outermovie-list">
                                {
                                    this.state.movie.map((movieobj) => (

                                        <div className="card list-card" onMouseEnter={()=>this.setState({hover:movieobj.id})}  onMouseLeave={(()=>this.setState({hover:''}))}>

                                            <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} className="card-img-top list-img" alt="fkbb" />
                                            {/* <div className="card-body"> */}
                                            <h5 className=" list-title">{movieobj.original_title}</h5>
                                            {/* <p className=" list-text">{movieobj.overview}</p> */}
                                            <div className='button-wrapper' style={{display:"flex",justifyContent:"center",width:"100%"}}>
                                                {

                                                
                                            this.state.hover==movieobj.id && <a   className="btn btn-primary" onClick={()=>this.handlefavorate(movieobj)}>{this.state.favourates.includes(movieobj.id)?"Remove From Favourites":"Add To Favorites"}</a>
                                                }
                                            </div>
                                        </div>




                                    ))
                                }

                            </div>
                           
                            <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item" >
      <a className="page-link"  tabindex="-1" onClick={this.handleleft}>Previous</a>
    </li>
    {
        this.state.pages.map((value)=>(
            <li className="page-item"><a className="page-link" onClick={()=>this.handle(value)}>  {value}</a></li>
        ))
    }
      <a className="page-link" onClick={this.handleright}>Next</a>
  
  </ul>
</nav>
                        </div>
                   

                }
            </>
        )
    }
}
