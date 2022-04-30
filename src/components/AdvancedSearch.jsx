import React from 'react'
import MinMaxInputComponent from './MinMaxInputComponent';
import SearchComponent from './SearchComponent'

const AdvancedSearch = ( {AdvancedSearchQuery, closeAdvSearchContainer} ) => {

  const [includeIngredientList, setIncludeIngredientList] = React.useState([]);
  const [excludeIngredientList, setExcludeIngredientList] = React.useState([]);
  const [listErrorMessage, setListErrorMessage] = React.useState('');

  const [minCalories, setMinCalories] = React.useState(0);
  const [maxCalories, setMaxCalories] = React.useState(0);

  const [minValueCarbs, setMinValueCarbs] = React.useState(0); 
  const [maxValueCarbs, setMaxValueCarbs] = React.useState(0);

  const [minValueProteins, setMinValueProteins] = React.useState(0); 
  const [maxValueProteins, setMaxValueProteins] = React.useState(0);

  let temporaryAdvancedSearchQuery = "";
  let temporaryIncludeIngredientList = [];
  let temporaryIncludeIngredientQuery = '';
  let temporaryExcludeIngredientList = [];
  let temporaryExcludeIngredientQuery = '';
  let tempMinCarbsQuery = '';
  let tempMaxCarbsQuery = "";
  let tempMinProteinsQuery = '';
  let tempMaxProteinsQuery = "";
  let tempMinCaloriesQuery = '';
  let tempMaxCaloriesQuery = "";
  let tempMinMaxQuerys =""
  

  const setAdvancedSearchQuery = () => {
    AdvancedSearchQuery(temporaryAdvancedSearchQuery)
    console.log(temporaryAdvancedSearchQuery)
    const filtersApplied = document.querySelector('#filters-applied-cont')
    console.log(filtersApplied)
    filtersApplied.classList.add('animate');
    closeAdvSearchContainer();
    setTimeout(() => {
      filtersApplied.classList.remove('animate');
    }, 4000);
  }

  React.useEffect(() => {
    if (minValueCarbs > 0 && maxValueCarbs > 0) {
      tempMinCarbsQuery = "&minCarbs=" + minValueCarbs;
      tempMaxCarbsQuery = "&maxCarbs=" + maxValueCarbs;
      
    }
    if (minValueProteins > 0 && maxValueProteins > 0) {
    
      tempMinProteinsQuery = "&minProtein=" + minValueProteins;
      tempMaxProteinsQuery = "&maxProtein=" + maxValueProteins;
    }

    if (minCalories > 0 && maxCalories) {
      
      tempMinCaloriesQuery = "&minCalories=" + minCalories;
      tempMaxCaloriesQuery = "&maxCalories=" + maxCalories;
    }

    tempMinMaxQuerys = tempMinCaloriesQuery+tempMinCarbsQuery+tempMinProteinsQuery+tempMaxCaloriesQuery+tempMaxCarbsQuery+tempMaxProteinsQuery


    if (includeIngredientList.length > 0) {
      // temporaryIncludeIngredientList.push();
      includeIngredientList.map((ingredient) => temporaryIncludeIngredientList.push(ingredient));
      temporaryIncludeIngredientQuery = "&includeIngredients=" + temporaryIncludeIngredientList.join(',');
    } else {
      temporaryIncludeIngredientList = [];
      temporaryIncludeIngredientQuery = '';
    }

    if (excludeIngredientList.length > 0) {
      // temporaryExcludeIngredientList.push();
      console.log(temporaryExcludeIngredientList)
      excludeIngredientList.map((ingredient) => temporaryExcludeIngredientList.push(ingredient));
      temporaryExcludeIngredientQuery = "&excludeIngredients=" + temporaryExcludeIngredientList.join(',');
    } else {
      temporaryExcludeIngredientList = [];
      temporaryExcludeIngredientQuery = '';
    }

    // if()


    temporaryAdvancedSearchQuery = temporaryIncludeIngredientQuery + temporaryExcludeIngredientQuery+tempMinMaxQuerys;
    // console.log(temporaryAdvancedSearchQuery)

    setListErrorMessage(includeIngredientList.some((ingredient => excludeIngredientList.includes(ingredient))))
    
  }, [includeIngredientList, excludeIngredientList, minValueCarbs, maxValueCarbs, minValueProteins, maxValueProteins, minCalories, maxCalories]);
  return (
      <div className='advanced-search-container flex '>
          
      
      <SearchComponent Title="Include Ingredients" ingredientList={includeIngredientList} setIngredientList={ setIncludeIngredientList }/>
      <SearchComponent Title="Exclude Ingredients" ingredientList={excludeIngredientList} setIngredientList={setExcludeIngredientList} />
      { listErrorMessage && <div className='error-message'> An Ingredient cannot be present in both Include and Exclude list </div> }
         
      <div className='minmax-components flex'>
        <MinMaxInputComponent Title="Calories" Unit="kcal" iterate={50 } minValue={minCalories} maxValue={maxCalories} setMinValue={setMinCalories} setMaxValue={setMaxCalories} />
        <MinMaxInputComponent Title="Carbohydrates" Unit="mg" iterate={10}  minValue={minValueCarbs} maxValue={maxValueCarbs} setMinValue={setMinValueCarbs} setMaxValue={setMaxValueCarbs} />
        <MinMaxInputComponent Title="Proteins" Unit="mg" iterate={10}  minValue={minValueProteins} maxValue={maxValueProteins} setMinValue={setMinValueProteins} setMaxValue={setMaxValueProteins}/>
      </div>
        <div className='buttons flex'>
          <button className='btn btn-solid' onClick={setAdvancedSearchQuery}>apply filters</button>
          <button className="btn btn-outline" onClick={closeAdvSearchContainer}>close</button>
      </div>
     
      </div>
      
      
      
  )
}

export default AdvancedSearch