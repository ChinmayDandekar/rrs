import React from 'react'
import Nav from './Nav'
import dummyrecipe from '../assets/dummyrecipe.jpg'
import axios from "axios"
import { Link, useNavigate, useLocation} from "react-router-dom"


const Key = "d30c83bf5f2e45638c5a2c4a1e756344";
// const Key = "1d2d61c30a2447b9adf9eec22603bf2b";

// const Key = "92366db4df0b4d48b14220ea95c1c81c";


const RecipePage = ({ searchedRecipes, handleKeyDown, onSearchTextChange, searchInput, autoRecipe, onClickAutoRecipe }) => {

    const { state } = useLocation();
    const searchRecipes = state.searchedRecipes;
    // const searchRecipes = searchedRecipes;
    let featuredrecipes = [];
    // console.log(state.searchedRecipes)

    if (state.featuredRecipes) {     
        featuredrecipes = state.featuredRecipes;
        // console.log(featuredrecipes)
    }
    // console.log(state.recipeData)
    const Id = state.recipeId
    let recipeData = [];
    // console.log(searchRecipes)
    // console.log(featuredrecipes)
    
    recipeData = featuredrecipes.filter((recipe) => recipe.id == Id) 
    if(recipeData.length == 0)
        recipeData = searchRecipes.filter((recipe) => recipe.id == Id)
    
    recipeData = recipeData[0];
    console.log(recipeData)
    
    
    const recipeIngredients = recipeData.extendedIngredients;
    let nutritionData = recipeData.nutrition.nutrients;
    const timeToMake = recipeData.readyInMinutes;
    const recipeDirections = recipeData.analyzedInstructions[0].steps;
    const recipeSummary = recipeData.summary;
    const recipeImage = recipeData.image;
    


    
    
    
    if (nutritionData !== undefined) {
        
        nutritionData = nutritionData.filter((nutri, index) => index < 5)
        // console.log(nutritionData)
    }
    return (
        <>
            <Nav SearchBar={true} AdvancedSearch="true" onKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} searchInput={searchInput} autoRecipe={autoRecipe} onClickAutoRecipe={onClickAutoRecipe}/>
            <div className="sub-nav">
                <div className='menu-item fw-black'>Advanced Search</div>
            </div>
            <div className="main-container">

                <div className="container cont-recipe-info flex">
                    <div className="cont-header flex">
                        <h1>{ recipeData.title }</h1>
                        <div className="cont-recipe-time">Time To Make: <span>{timeToMake} Mins</span></div>
                    </div> 
                    <div className="cont-body flex">
                        <div className="img-cont"> <img className="flex" src={recipeImage} alt="" /></div>
                        <div className="recipe-summary-cont flex">
                            <h2>Summary<span>.</span></h2>
                            <div className="recipe-summary" dangerouslySetInnerHTML={{__html: recipeSummary}}></div>
                        </div>
                    </div>
                </div>
                <div className="container cont-nutrition-info flex">
                    {nutritionData.length > 0 ?<>
                    <h1>Nutrition<span></span></h1>
                    <div className="nutritions flex">

                        {nutritionData.map((nutrition) => {
                            return  <div className="nutrition flex">
                                        <div className='nutrition-value fw-black'>{nutrition.amount}</div>
                                        <div className='nutrition-name menu-item fw-extrabold'>{nutrition.name}</div>
                                    </div>
                        }) }
                        
                    </div></>:null
                    
                
                    }
                </div>
                <div className="container cont-recipe-details flex">
                    <div className="recipe-ingredients-cont flex">
                        <h2>Ingredients:</h2>
                        <ul className="recipe-ingredients">
                            {recipeIngredients.map((ingredient) => {
                                return <li>{ingredient.original}</li>

                            })}
                        </ul>
                    </div>
                    <div className="recipe-direction-cont">
                        <h2>Directions:</h2>
                        <div className="recipe-direction-steps">

                            {recipeDirections.map((direction, index) => {
                                return  <div className="step" key={index}>
                                            <h3>STEP {direction.number}:</h3>
                                            <p>{ direction.step }</p>
                                        </div>
                            })}
                          
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </>
      
    )
}

export default RecipePage