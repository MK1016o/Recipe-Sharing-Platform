import React from 'react'

const Recipe = ({ name }) => {
    return (
        <>  
                <a href="/recipe" className="recipe-link">
                    <div className="card col recipe-card">
                        <img src="https://imgs.search.brave.com/OQRVG3PrmPu2kujPgxxBLtZvVwuW1gbraT-PAJbhmbA/rs:fit:860:0:0:0/g:ce/aHR0cDovL3NpbmRo/aXJhc29pLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAwOC8w/Mi9kYWFsY2hhYXdh/bC5qcGc" className="card-img-top receipe-image" alt="recipe_image"></img>
                        <div className="card-img-overlay"></div>
                        <div className="card-body">
                            <p className="card-text text-center">
                                <b>{name}</b>
                                <br></br>
                            </p>
                        </div>
                    </div>
                </a>
        </>
    )
}

export default Recipe
