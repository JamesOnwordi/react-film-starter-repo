import React, { useState } from 'react'
import FilmRow from './FilmRow'


export default function FilmList (props) {
    
    const [filter,setFilter] = useState('all')
    const [faves,setFaves] = useState([])

    
    const handleFilterClick = filter => {
        console.log('handling filter click:', filter)
        setFilter( filter )
    }
    
    const handleFaveToggle = film => {
        let newFaves = [...faves];
        const filmIndex = newFaves.indexOf(film);
        if (filmIndex < 0) {
          console.log(`ADDING ${film.title} TO FAVES`)
          newFaves = [...newFaves, film];
        } else {
          console.log(`REMOVING ${film.title} TO FAVES`)
          newFaves.splice(filmIndex, 1)
        }
        setFaves(newFaves)
      }      
    
      const filmsToDisplay = filter=== "all" ? props.films : faves;
      const allFilms = filmsToDisplay.map((film, i) => {
       return (
           <FilmRow 
               key={`filmrow${i}`}
               film={film}
               onFaveToggle={handleFaveToggle}
               isFave={faves.includes(film)}
               handleDetailsClick = {props.handleDetailsClick}
           />
       )
    })
    
    return (
        <div className="film-list">
            <h1 className="section-title">FILMS</h1>

            <div className="film-list-filters">
                <div className={`film-list-filter ${filter === 'all' ? 'is-active' : ''}`}
                    onClick={() => handleFilterClick('all')}
                >
                    ALL
                    <span className="section-count">{props.films.length}</span>
                </div>
                <div className={`film-list-filter ${filter === 'fave' ? 'is-active' : ''}`}
                    onClick={() => handleFilterClick('fave')}
                >
                    FAVES
                    <span className="section-count">{faves.length}</span>
                </div>
            </div>

            {allFilms}
        </div>
    )
    }