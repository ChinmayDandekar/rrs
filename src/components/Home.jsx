import React from 'react'
import Nav from './Nav'
// import Searchlogo from '../assets/SearchLogo.svg'
import SearchBox from './SearchBox'
import Recipe from './Recipe'
import axios from "axios"

// import { useNavigate } from "react-router-dom"

import { Link, useNavigate, useLocation} from "react-router-dom"
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// const Key = "d30c83bf5f2e45638c5a2c4a1e756344";
// const Key = "1d2d61c30a2447b9adf9eec22603bf2b";



const Home = ({ featuredRecipes, handleKeyDown, onRecipeClick, recipeId, autoRecipe, onSearchTextChange, searchInput, searchedRecipes, onClickAutoRecipe}) => {

    // const featuredRecipes = [
    //             {id: 638729, title: 'Chinese Veg Fried rice', image: 'https://spoonacular.com/recipeImages/638729-312x231.jpg', imageType: 'jpg'},
    //             {id: 1095996, title: 'Vegan Eggnog', image: 'https://spoonacular.com/recipeImages/1095996-312x231.jpg', imageType: 'jpg'},
    //             {id: 664547, title: 'Vegetable Dip', image: 'https://spoonacular.com/recipeImages/664547-312x231.jpg', imageType: 'jpg'},
    //             {id: 664748, title: 'Veggie Meatloaf', image: 'https://spoonacular.com/recipeImages/664748-312x231.jpg', imageType: 'jpg'},
    //             {id: 661223, title: 'Spicy Vegan Chili', image: 'https://spoonacular.com/recipeImages/661223-312x231.jpg', imageType: 'jpg'},
    //             {id: 664624, title: 'Vegetable Wontons', image: 'https://spoonacular.com/recipeImages/664624-312x231.jpg', imageType: 'jpg'},
    //             // {id: 664664, title: 'Vegetarian Haggis', image: 'https://spoonacular.com/recipeImages/664664-312x231.jpg', imageType: 'jpg'},
    //             // {id: 664573, title: 'Vegetable Noodles', image: 'https://spoonacular.com/recipeImages/664573-312x231.jpg', imageType: 'jpg'},
    //             // {id: 664472, title: 'Vegan Potato Salad', image: 'https://spoonacular.com/recipeImages/664472-312x231.jpg', imageType: 'jpg'},
    //             // {id: 664396, title: 'Vegan Beet Borscht', image: 'https://spoonacular.com/recipeImages/664396-312x231.jpg', imageType: 'jpg'},
    //             // {id: 662263, title: 'Summer Veggie Bake', image: 'https://spoonacular.com/recipeImages/662263-312x231.jpg', imageType: 'jpg'},
    //     ]
    // const [featuredRecipes, setFeaturedRecipes] = React.useState([]);

    // React.useEffect(() => {
    //     fetchData();
    //     async function fetchData() {
        
    //         try {
    //         const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=12&instructionsRequired=true&addRecipeNutrition=true&apiKey=${Key}`)
                
    //         let data = result.data.results;
       
    //             setFeaturedRecipes(data);
    
    //         } catch (error) {
    //             console.error(error);
                
    //         }
        
    //     }
    // }, [setFeaturedRecipes]);

    // const [input, setInput] = React.useState('');
    // const [searchInput, setSearchInput] = React.useState('');
    // const [autoRecipe, setAutoRecipe] = React.useState([]);
    // const [searchPage, setSearchPage] = React.useState(false);
    // const [recipePage, setRecipePage] = React.useState(false);
    // const [recipeId, setRecipeId] = React.useState(0);
    // const [recipeData, setRecipeData] = React.useState({});


    // const [searchedRecipes, setSearchedRecipes] = React.useState([]);
    // let Navigate = useNavigate()




    // //Search recipes based on Input
    // React.useEffect(() => {
    //     if (searchInput !== '') {

    //         async function fetchData() {
                
    //             try {
    //                 const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&instructionsRequired=true&addRecipeNutrition=true&number=12&apiKey=${Key}`)
    //                 let data = result.data.results;
    //                 setSearchedRecipes(data);
    //                 setSearchPage(true);
                    

    //             } catch (error) {
    //                 console.error(error);
                    
    //             }
    //         }
    //         fetchData();


    //     } else {
    //         setSearchedRecipes([])
    //     }
    // }, [searchInput]);




    // //Store search input for autocomplete
    // const onSearchTextChange = (e) => {
        
    //     setInput(e.target.value);
    // }

    // React.useEffect(() => {
    //     if (searchPage) {
    //         console.log(searchInput)
    //         Navigate('/searchpage', { state: { searchInput } })
    //         setSearchPage(false)
    //     }
        
        
    // }, [searchPage]);
    
    //Store search input for fetching search recipes
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         setSearchInput(event.target.value)
    //         setAutoRecipe([])

    //         // document.querySelector(".search-box").classList.add("search-animation-final");



    //     }
    //     if (event.key === 'Backspace') {
    //         setSearchInput('')
            
    //     }
    // }





    //AutoComplete Data Fetch
    // React.useEffect(() => {
        
    //         async function fetchData() {
    //             try {
    //             const result = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?number=5&query=${input}&apiKey=${Key}`)
                    
    //                 let data = result.data;
    //                 setAutoRecipe(data);
        
    //             } catch (error) {
    //                 console.error(error);
                    
    //             }
            
    //         }
    //         fetchData();
        
    // }, [input]);


    // const { state } = useLocation();
    // const { user } = state;

    const [user, loading, error] = useAuthState(auth);


    // const onRecipeClick = (e) => {
    //     const Id = e.target.id;
    //     setRecipeId(Id)
    // }

    // React.useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const result = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${Key}`)
    //             let data = result.data;
    //             setRecipeData(data);
    //             setRecipePage(true);                
    
    //         } catch (error) {
    //             console.error(error);
                
    //         }
    //     }
    //     if (recipeId !== 0) {
            
    //         fetchData();
    //     }
    // }, [recipeId])

    // React.useEffect(() => {
    //     if (recipePage) {
    //         Navigate('/recipepage', { state: { searchedRecipes, featuredRecipes, recipeId, recipeData } })
    //         setRecipePage(false);
    //     }

    // },[recipePage])

 


   
    

    return (
        <>
            
            
            {user ? <Nav LinkArray={['contact', 'create', 'logout']} autoRecipe={autoRecipe}/>: <Nav autoRecipe={autoRecipe} onClickAutoRecipe={onClickAutoRecipe} /> }
            
            {/* <Nav /> */}
            <div className="search-container container flex">
            
                <h1>Search a Recipe<span>.</span></h1>
                
                <SearchBox handleKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} searchInput={searchInput} searchedRecipes={ searchedRecipes }/>
                {(autoRecipe.length > 0 ?
                    <div className="auto-recipes">
                        {autoRecipe.map((recipe) => {
                        
                            return (
                                <li key={recipe.id} id={ recipe.title } className="auto-recipe" onClick={onClickAutoRecipe}>
                                    <h2 id={ recipe.title } >{recipe.title}</h2>
                                </li>
                            )
                        })}
                    </div>
                    : <div className="menu-item fw-black">Advanced Search</div>)}
                
                
            
            </div>
            <div className="featured-container container flex">

                {/* { searchPage? 1:0 } */}
                


                <h1>Featured Recipes:</h1>

                {featuredRecipes.map(recipe => {
                    return <Recipe Title={recipe.title} Img={recipe.image} Id={recipe.id} OnClick={onRecipeClick}/>
                }) }
              
            </div>
        </>
    )
}

export default Home
