import React from 'react'

const Recipe = ({Title, Img, Id , OnClick}) => {
    return (
        <div className="recipe flex" key={Id} id={`${Id}`} onClick={OnClick}>
            <img src={Img} alt="" key={Id*2} id={`${Id}`}/>
            <h2 className="fw-bold" key={Id*3} id={`${Id}`}>{Title} </h2>
        </div>
    )
}

export default Recipe
