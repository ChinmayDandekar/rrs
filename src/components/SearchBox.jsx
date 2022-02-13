import React from 'react'
import Searchlogo from '../assets/SearchLogo.svg'


const SearchBox = ({ handleKeyDown, onSearchTextChange, Size="default", searchedRecipes, searchInput }) => {
    // const searchBox = document.querySelector(".search-box")
    
    // if (Size === 'small') {
    //     searchBox.classList.add("search-box-s")
    // } else {
    //     if (searchBox.classList.contains("search-box-s")) 
    //         searchBox.classList.remove("search-box-s")
    // }

  return (
    <div className="search-box flex">
        <img src={Searchlogo} alt="" />
      <input className="fw-extrabold" type="text" onKeyDown={handleKeyDown} onChange={onSearchTextChange} name="search-input" id="search-input" placeholder='Recipe Name' autoComplete='off' />
                    
    </div>
  )
}

export default SearchBox