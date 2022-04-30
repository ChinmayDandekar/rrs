import React from "react"
import Home from './components/Home'
import Login from './components/Login'
import SearchPage from './components/SearchPage';
import Register from './components/Register';
import Logout from './components/Logout';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import RecipePage from './components/RecipePage';
import axios from "axios"
import { useNavigate, useLocation} from "react-router-dom"
import AdvancedSearch from "./components/AdvancedSearch";
import MinMaxInputComponent from "./components/MinMaxInputComponent";
import { addDoc } from "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { app } from './firebase'
// import {  } from "firebase/app";

// import { initializeApp}  from "firebase/app";

// const Key = "3169d180d10e48b480667c1f51e1bbd9";

// const Key = "d30c83bf5f2e45638c5a2c4a1e756344";
const Key = "4d45dc29209146aeaa091af55b0000df";
// const Key = "1d2d61c30a2447b9adf9eec22603bf2b";


function App() {
  


  const [featuredRecipes, setFeaturedRecipes] = React.useState([]);

  const [input, setInput] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const [autoRecipe, setAutoRecipe] = React.useState([]);
  const [searchPage, setSearchPage] = React.useState(false);
  const [recipePage, setRecipePage] = React.useState(false);
  const [recipeId, setRecipeId] = React.useState(0);
  const [recipeData, setRecipeData] = React.useState({});
  const [searchedRecipes, setSearchedRecipes] = React.useState([]);
  const [advancedSearchCont, setAdvancedSearchCont] = React.useState(false);
  const [advancedSearchQuery, setAdvancedSearchQuery] = React.useState('');
  let Navigate = useNavigate()

  const [user, loading, error] = useAuthState(auth);


  const openOrCloseAdvSearchContainer = () => {
    // console.log('hello')
    if (advancedSearchCont) {
      
      setAdvancedSearchCont(false);
    }
    else {
      setAdvancedSearchCont(true);
      
    }
  }


  React.useEffect(() => {
    console.log(advancedSearchCont)
    console.log(document.querySelector(".advanced-search-container")) 
    if (advancedSearchCont) {
      document.querySelector(".advanced-search-container").style.transform = "translateY(55%)";
      document.querySelector(".arrow-icon").style.transform = "rotate(0deg)";
      document.querySelector("html").style.overflowY = "none";
    }
    else {
      document.querySelector(".advanced-search-container").style.transform = "translateY(-70%)";
      document.querySelector(".arrow-icon").style.transform = "rotate(-180deg)";
      document.querySelector("html").style.overflowY = "scroll";

      
    }
  },[advancedSearchCont])


  React.useEffect(() => {
    fetchData();
    async function fetchData() {
    
        try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=12&instructionsRequired=true&addRecipeNutrition=true&fillIngredients=true&apiKey=${Key}`)
            
        let data = result.data.results;
   
            setFeaturedRecipes(data);

        } catch (error) {
            console.error(error);
            
        }
    
    }
  }, [setFeaturedRecipes]);
  
    //Search recipes based on Input

  React.useEffect(() => {
    if (searchInput !== '') {

      async function fetchData() {
        const db = getFirestore(app);
            
          try {
              // await addDoc(collection(db, "users"), {
              //   // uid: user.uid,
              //   name: user.displayName,
              //   email: user.email,
              //   input: {searchInput},
              // });
              console.log(advancedSearchQuery)
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&instructionsRequired=true&fillIngredients=true&addRecipeNutrition=true&number=12&${advancedSearchQuery}&apiKey=${Key}`)
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
      // console.log(searchInput)
      Navigate('/searchpage', { state: { searchInput } })
      setSearchPage(false)
    }
    
    
  }, [searchPage]);

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
  
  const onRecipeClick = (e) => {
    const Id = e.target.id;
    // console.log(Id);
    setRecipeId(Id)
  };


  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${Key}`)
        let data = result.data;
        setRecipeData(data);
        setRecipePage(true);
        

      } catch (error) {
        console.error(error);
          
      }
    }
    if (recipeId !== 0) {
      
      fetchData();
    }
  }, [recipeId]);

  React.useEffect(() => {
    if (recipePage) {
      // console.log(searchedRecipes)
      Navigate('/recipepage', { state: { featuredRecipes, searchedRecipes, recipeId, recipeData } })
      setRecipePage(false);
    }

  }, [recipePage]);


  const onClickAutoRecipe = (e) => {
    console.log(e.target.id)
    setSearchInput(e.target.id);
    setAutoRecipe([])

  }

  return (
    <div className="App">
      {/* <Nav /> */}
      <div className="filters-applied-cont" id="filters-applied-cont">
        <h3>Filters Applied</h3>
      </div>

      
      <Routes>
        <Route path="/" element={<Home featuredRecipes={featuredRecipes} handleKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} onRecipeClick={onRecipeClick} recipeId={recipeId} autoRecipe={autoRecipe} searchInput={searchInput} searchedRecipes={searchedRecipes} onClickAutoRecipe={ onClickAutoRecipe } openOrCloseAdvSearchContainer={ openOrCloseAdvSearchContainer }  AdvancedSearchQuery={setAdvancedSearchQuery} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="searchpage" element={<SearchPage handleKeyDown={handleKeyDown} onRecipeClick={onRecipeClick} searchedRecipes={searchedRecipes} recipeId={recipeId} autoRecipe = { autoRecipe } onSearchTextChange={onSearchTextChange} searchInput={searchInput} onClickAutoRecipe={ onClickAutoRecipe } openOrCloseAdvSearchContainer={ openOrCloseAdvSearchContainer }  AdvancedSearchQuery={setAdvancedSearchQuery}/> }/>
        <Route path="logout" element={<Logout />} />
        <Route path="recipepage" element={<RecipePage searchedRecipes={searchedRecipes} handleKeyDown={handleKeyDown} onSearchTextChange={onSearchTextChange} autoRecipe={autoRecipe} searchInput={searchInput} onClickAutoRecipe={onClickAutoRecipe} openOrCloseAdvSearchContainer={openOrCloseAdvSearchContainer} AdvancedSearchQuery={setAdvancedSearchQuery} />} />
        <Route path="minmax" element={<MinMaxInputComponent/>}/>
      </Routes>
      

    </div>
  );
}



export default App;
