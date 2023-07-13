import React, { Component } from 'react'
import { movies } from './Movies'

export default class Favorate extends Component {
    constructor() {
        super();
        this.state = {
            genreslist: [],
            currgenre: "All Genres",
            movies:[],
            currtext:'',
            limit:5,
            currpage:1,
        }
    }
 
componentDidMount(){
    let genresids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let data=JSON.parse(localStorage.getItem("Movene-app") || "[]")
    
    let temp = [];
    data.forEach((movieobj) => {
        if (!temp.includes(genresids[movieobj.genre_ids[0]]))
            temp.push(genresids[movieobj.genre_ids[0]]);
    })
    temp.unshift("All Genres");
    this.setState({
       
        movies:[...data],
        genreslist:[...temp],
    })
}

// handelRemove=()=>{

//     let oldData=JSON.parse(localStorage.getItem('Movene-app') || "[]");
//     // console.log(oldData);
//     if(this.state.favourates.includes(moveobj.id))
//     {
//         oldData=oldData.filter((m)=>m.id!=moveobj.id)
//     }

// }


handlecurrGenre=(val)=>{
    this.setState({
        currgenre:val
    })
}


sortpopularitydescending=()=>{
    let temp=this.state.movies;
  temp.sort((objA,objB)=>{
    return objB.popularity-objA.popularity;
  })
this.setState({
    movies:[...temp],
})
  
}

sortpopularityascending=()=>{
    let temp=this.state.movies;
  temp.sort((objA,objB)=>{
    return objA.popularity-objB.popularity;
  })
this.setState({
    movies:[...temp],
})
  
}
    

sortRatingdescending=()=>{
    let temp=this.state.movies;
  temp.sort((objA,objB)=>{
    return objB.vote_average-objA.vote_average;
  })
this.setState({
    movies:[...temp],
})
  
}

sortRatingascending=()=>{
    let temp=this.state.movies;
  temp.sort((objA,objB)=>{
    return objA.vote_average-objB.vote_average;
  })
this.setState({
    movies:[...temp],
})
  
}

handleDelete=(movieobj)=>{
    let index=movieobj.genre_ids[0];
    let genresids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let temp=this.state.movies;
    temp=temp.filter((objA)=>{
      return objA.original_title!=movieobj.original_title;
    })
  this.setState({
      movies:[...temp],
  })

  localStorage.setItem("Movene-app",JSON.stringify(temp));

  let newarr = [];
   temp.forEach((movieobj) => {
        if (!newarr.includes(genresids[movieobj.genre_ids[0]]))
            newarr.push(genresids[movieobj.genre_ids[0]]);
    })
    newarr.unshift("All Genres");
    this.setState({
        genreslist:[...newarr],
    })



}


handlepagechange=(value)=>{

this.setState({
    currpage:value,
})

}



    render() {

       

        let genresids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let filterarray=[];

if(this.state.currtext==''){
    filterarray=this.state.movies;
}

    else{
        
        filterarray=this.state.movies.filter((movieobj)=>{
            let title=movieobj.original_title.toLowerCase();
            return title.includes(this.state.currtext.toLowerCase());
        })
    }
  
    if(this.state.currgenre!="All Genres"){
        filterarray=this.state.movies.filter((movieobj)=>genresids[movieobj.genre_ids[0]]==this.state.currgenre)
    }
      
    
    let pages=Math.ceil(filterarray.length/this.state.limit);
    let pagesarr=[];
    for(let i=1;i<=pages;i++)
    pagesarr.push(i);
    let si=(this.state.currpage-1)*this.state.limit;
    let ei=si+this.state.limit;
    filterarray=filterarray.slice(si,ei);   
        return (
            <>
                <div className='main'>
                    <div className='row'>

                        <div className='col-lg-3 col-sm-12'>
                            <ul className="list-group favourate-genres">
                                {
                                    this.state.genreslist.map((genres) => (

                                        this.state.currgenre == genres ? <li className="list-group-item" style={{ backgroundColor: "#4561a2", fontWeight: "bold", color: "white" }}>{genres}</li> :
                                            <li className="list-group-item" onClick={()=>this.handlecurrGenre(genres)}>{genres}</li>
                                    ))

                                }

                            </ul>

                            {/* <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                                <li className="list-group-item">A fourth item</li>
                                <li className="list-group-item">And a fifth one</li> */}

                        </div>
                        <div className='col-lg-9 col-sm-12 favourate-table'>
                            <div className='row'>

                                <input type="text" className='input-group-text col' style={{ marginRight: "1rem", textAlign: "left" }} placeholder='Search'
                                value={this.state.currtext} onChange={(e)=>{this.setState({currtext:e.target.value})}}></input>


                                <input type="number" className='input-group-text col' placeholder='Rows Count'
                                value={this.state.limit} onChange={(e)=>{this.setState({limit:e.target.value})}}
                                ></input>

                            </div>
                            <div className='row'>


                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i className="fas fa-caret-up" onClick={()=>this.sortpopularitydescending()}></i>Popularity<i onClick={()=>this.sortpopularityascending()}class="fas fa-caret-down"></i></th>

                                            <th scope="col"><i class="fas fa-caret-up" onClick={()=>this.sortRatingdescending()}></i>Rating<i onClick={()=>this.sortRatingascending()}class="fas fa-caret-down"></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarray.map((movieobj) => (
                                                <tr>

                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.title} style={{ height: "3rem", width: "5rem", marginRight: '1rem' }}></img>{movieobj.original_title}</td>
                                                    <td>{genresids[movieobj.genre_ids[0]]}</td>
                                                    <td>{movieobj.popularity}</td>
                                                    <td>{movieobj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieobj)}>Remove</button></td>

                                                </tr>

                                            ))
                                        }



                                    </tbody>
                                </table>

                            </div>


                            <div className='row'>

                                <nav aria-label="Page navigation example">
                                    <ul className="pagination" style={{ justifyContent: "center" }}>
                              {
                                pagesarr.map((value)=>(
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handlepagechange(value)}>{value}</a></li>
                                ))
                              }
                                       
                                    
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
