import React from 'react'
import Nav from './Nav'
// import Searchlogo from '../assets/SearchLogo.svg'
import SearchBox from './SearchBox'
import Recipe from './Recipe'
import axios from "axios"

import {useNavigate} from "react-router-dom"


const Key = "d30c83bf5f2e45638c5a2c4a1e756344";


const Home = () => {

    const featuredRecipes = [
                {id: 638729, title: 'Chinese Veg Fried rice', image: 'https://spoonacular.com/recipeImages/638729-312x231.jpg', imageType: 'jpg'},
                {id: 1095996, title: 'Vegan Eggnog', image: 'https://spoonacular.com/recipeImages/1095996-312x231.jpg', imageType: 'jpg'},
                {id: 664547, title: 'Vegetable Dip', image: 'https://spoonacular.com/recipeImages/664547-312x231.jpg', imageType: 'jpg'},
                {id: 664748, title: 'Veggie Meatloaf', image: 'https://spoonacular.com/recipeImages/664748-312x231.jpg', imageType: 'jpg'},
                {id: 661223, title: 'Spicy Vegan Chili', image: 'https://spoonacular.com/recipeImages/661223-312x231.jpg', imageType: 'jpg'},
                {id: 664624, title: 'Vegetable Wontons', image: 'https://spoonacular.com/recipeImages/664624-312x231.jpg', imageType: 'jpg'},
                // {id: 664664, title: 'Vegetarian Haggis', image: 'https://spoonacular.com/recipeImages/664664-312x231.jpg', imageType: 'jpg'},
                // {id: 664573, title: 'Vegetable Noodles', image: 'https://spoonacular.com/recipeImages/664573-312x231.jpg', imageType: 'jpg'},
                // {id: 664472, title: 'Vegan Potato Salad', image: 'https://spoonacular.com/recipeImages/664472-312x231.jpg', imageType: 'jpg'},
                // {id: 664396, title: 'Vegan Beet Borscht', image: 'https://spoonacular.com/recipeImages/664396-312x231.jpg', imageType: 'jpg'},
                // {id: 662263, title: 'Summer Veggie Bake', image: 'https://spoonacular.com/recipeImages/662263-312x231.jpg', imageType: 'jpg'},
        ]
    // const [featuredRecipes, setFeaturedRecipes] = React.useState([]);

    // React.useEffect(() => {
    //     fetchData();
    //     async function fetchData() {
        
    //         try {
    //         const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=12&instructionsRequired=true&apiKey=${Key}`)
                
    //         let data = result.data.results;
       
    //             setFeaturedRecipes(data);
    
    //         } catch (error) {
    //             console.error(error);
                
    //         }
        
    //     }
    // }, [setFeaturedRecipes]);

    const [input, setInput] = React.useState('');
    const [searchInput, setSearchInput] = React.useState('');
    const [autoRecipe, setAutoRecipe] = React.useState([]);
    const [searchPage, setSearchPage] = React.useState(false);

    const [searchedRecipes, setSearchedRecipes] = React.useState([]);
    let Navigate = useNavigate()




    //Search recipes based on Input
    React.useEffect(() => {
        if (searchInput !== '') {

            async function fetchData() {
                
                try {
                    const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&instructionsRequired=true&&number=12&apiKey=${Key}`)
                    let data = result.data.results;
                    setSearchedRecipes(data);
                    setSearchPage(true);
                    

                } catch (error) {
                    console.error(error);
                    
                }
            }
            fetchData();


        } else {
            setSearchedRecipes([])
        }
    }, [searchInput]);




    //Store search input for autocomplete
    const onSearchTextChange = (e) => {
        
        setInput(e.target.value);
    }

    React.useEffect(() => {
        if (searchPage) {
            Navigate('/searchpage', { state: { recipes: { searchedRecipes,searchInput } } })
            setSearchPage(false)
        }
        
        
    },[searchPage])
    
    //Store search input for fetching search recipes
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchInput(event.target.value)
            setAutoRecipe([])

            // document.querySelector(".search-box").classList.add("search-animation-final");



        }
        if (event.key === 'Backspace') {
            setSearchInput('')
            
        }
    }





    //AutoComplete Data Fetch
    React.useEffect(() => {
        
            async function fetchData() {
                try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?number=5&query=${input}&apiKey=${Key}`)
                    
                    let data = result.data;
                    setAutoRecipe(data);
        
                } catch (error) {
                    console.error(error);
                    
                }
            
            }
            fetchData();
        
    }, [input]);


    return (
        <>
            
            {/* <Redirect to="/searchpage" /> */}
            <Nav />
            
            <div className="search-container container flex">
            
                <h1>Search a Recipe<span>.</span></h1>
                {/* <div className="search-box flex">
                    <img src={Searchlogo} alt="" />
                    <input className="fw-extrabold" type="text" onKeyDown={handleKeyDown} onChange={onSearchTextChange} name="search-input" id="search-input" placeholder='Recipe Name' autoComplete='off' />
                    
                </div> */}
                <SearchBox handleKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} searchInput={searchInput} searchedRecipes={ searchedRecipes }/>
                {autoRecipe.length > 0 ?
                    <div className="auto-recipes">
                        {autoRecipe.map((recipe) => {
                            return (
                                <li key={recipe.id} className="auto-recipe">
                                    <h2>{recipe.title}</h2>
                                </li>
                            )
                        })}
                    </div>
                    : <div className="menu-item fw-black">Advanced Search</div>}
                
                
            
            </div>
            <div className="featured-container container flex">

                {/* { searchPage? 1:0 } */}
                


                <h1>Featured Recipes:</h1>

                {featuredRecipes.map(recipe => {
                    return <Recipe Title={recipe.title} Img={ recipe.image } Id={ recipe.id }/>
                }) }
              
            </div>
        </>
    )
}

export default Home
