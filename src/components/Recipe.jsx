import React from 'react'

const Recipe = ({Title, Img, Id}) => {
    return (
        <div className="recipe flex" key={Id}>
            <img src={ Img } alt="" />
            <h2  className="fw-bold">{Title}</h2>
        </div>
    )
}

export default Recipe
