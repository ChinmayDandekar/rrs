import React from 'react'
import Nav from './Nav'
import Recipe from './Recipe'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "axios"

// const Key = "d30c83bf5f2e45638c5a2c4a1e756344";
const Key = "1d2d61c30a2447b9adf9eec22603bf2b";


const SearchPage = ({ handleKeyDown, searchedRecipes, recipeId, onSearchTextChange, autoRecipe, onRecipeClick,searchInput, onClickAutoRecipe}) => {

 

  return (
    <>
      <Nav SearchBar={true} onKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} AdvancedSearch={true} searchInput={searchInput} autoRecipe={ autoRecipe } onClickAutoRecipe={onClickAutoRecipe}/>
      
      {console.log(autoRecipe)}

      <div className="sub-nav">
      {/* {autoRecipe.length > 0 ?
                    <div className="auto-recipes">
                        {autoRecipe.map((recipe) => {
                            return (
                                <li key={recipe.id} className="auto-recipe">
                                    <h2>{recipe.title}</h2>
                                </li>
                            )
                        })}
                    </div> : <div className="menu-item fw-black">Advanced Search</div>} */}
          {/* <div className='menu-item fw-black'><a href="#">Advanced Search</a></div> */}
      </div>
      <div className="featured-container container flex">

                {/* { searchPage? 1:0 } */}
                


                <h1></h1>

                {searchedRecipes && searchedRecipes.map((recipe) => {
                  return <Recipe Title={recipe.title} Img={ recipe.image } Id={ recipe.id } OnClick={onRecipeClick}/>
                }) }
              
            </div>
      {/* {console.log(searchedRecipes) } */}
      
    </>
  )
}

export default SearchPage