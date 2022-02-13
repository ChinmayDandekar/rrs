import React from 'react'
import Nav from './Nav'
import Recipe from './Recipe'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {

  const { state } = useLocation();
  const { recipes, searchInput } = state;

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
  return (
    <>
      <Nav SearchBar={true} />
      <div className="featured-container container flex">

                {/* { searchPage? 1:0 } */}
                


                <h1></h1>

                {recipes.searchedRecipes.map((recipe) => {
                  return <Recipe Title={recipe.title} Img={ recipe.image } Id={ recipe.id }/>
                }) }
              
            </div>
      {console.log(recipes) }
      
    </>
  )
}

export default SearchPage