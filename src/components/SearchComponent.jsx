import React from 'react';
import axios from 'axios';
import plusSign from '../assets/plus-sign.svg'

import Searchlogo from '../assets/SearchLogo.svg'
// const Key = "d30c83bf5f2e45638c5a2c4a1e756344";
// const Key = "1d2d61c30a2447b9adf9eec22603bf2b";
const Key = "4d45dc29209146aeaa091af55b0000df";

// const Key = "3169d180d10e48b480667c1f51e1bbd9";




const SearchComponent = ({ Title,  ingredientList, setIngredientList }) => {
    
  

  //  https://api.spoonacular.com/food/ingredients/autocomplete?query=appl&number=5

  const [textInput, setTextInput] = React.useState('');
  const [autoCompleteIngredient, setAutoCompleteIngredient] = React.useState([]); 
  // const [ingredientList, setIngredientList] = React.useState([]);
  

  //AutoComplete Data Fetch
  React.useEffect(() => {
        
    async function fetchData() {
      try {
          
        const result = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${textInput}&number=5&apiKey=${Key}`)
            
        let data = result.data;
        setAutoCompleteIngredient(data);
        console.log(data)

        } catch (error) {
            console.error(error);
            
        }
    
    }
    if (textInput !== "") {  
      fetchData();
    }

  }, [textInput]);

  const onTextChange = (e) => {
    setTextInput(e.target.value)
  }

  const addIngredientToList = (e) => {

    e.target.closest('.ingredient-search-autocomplete-cont').children[0].children[1].value = '';
    setTextInput("")
    
    setAutoCompleteIngredient([]);
    if (!ingredientList.includes(e.target.innerText)) {
      setIngredientList([...ingredientList, e.target.innerText])
    }
  } 

  const removeIngredientFromList = (e) => {
    console.log("hellow")
    setIngredientList(ingredientList.filter((ing)=> ing !== e.target.innerText))
  }

  return (
      <div className='search-component'>
        <div className="adv-search-header flex">
          <h1 className="ingredient-search-title">{Title}</h1>
          <div className="ingredient-search-autocomplete-cont">
            
              <div className='ingredient-searchbar-cont flex' >
                  <img src={Searchlogo} alt="" />
                  <input type="text" className='ingredient-searchbar' onChange={onTextChange} placeholder='Search Ingredients' />
              </div>
              
                  {(autoCompleteIngredient.length > 0 ?
                      <div className="auto-ingredients">
                          {autoCompleteIngredient.map((ingredient) => {
                          
                              return (
                                  <li  key={ingredient.id} id={ ingredient.name } className="auto-ingredient" onClick={addIngredientToList}>
                                  <h2 id={ingredient.name} >{ingredient.name}</h2>
                                  </li>
                              )
                          })}
                      </div>
                      : null)}
            </div>
        </div>

        <div className='ingredient-items flex'>
          {ingredientList.length>0?ingredientList.map((ing) => {
            return (
              <div className="ingredient-item flex" onClick={ removeIngredientFromList }>          
                <img src={plusSign} alt="" />
                <h3 className='ingredient-item-title'>{ ing }</h3>
              </div>
            )
          }):<h3>No Ingredients selected currently.</h3> }
          
        </div>
      </div>
  )
}

export default SearchComponent