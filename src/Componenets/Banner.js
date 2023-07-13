import React, { Component } from 'react'
import { movies } from './Movies';

class Banner extends Component {
    render() {
        let movie = movies.results[2];
        // console.log(movie);

        // let movie1 = 'rbfkb';
        return (
            <div>
                {
                    movie.length === 0 ? <div>
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :

                        <div className="card banner-card">

                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt="fkbb" />
                            {/* <div className="card-body"> */}
                            <h2 className="card-title banner-title">{movie.original_title}</h2>
                            <p className="card-text banner-text">{movie.overview}</p>
                            {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                            {/* </div> */}
                        </div>

                }
            </div>
        )
    }
}



export default Banner;