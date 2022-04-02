import React from 'react'
import logo from '../assets/RRSlogo.svg'
import name from '../assets/RRSname.svg'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

const Nav = ({ LinkArray = ['contact', 'Login', 'register'], BackgroundStyle = {}, SearchBar = false, AdvancedSearch=false, autoRecipe, onKeyDown,onSearchTextChange, onClickAutoRecipe }) => {
    return (
        <div className="nav" style={BackgroundStyle}>
            <div className='inner-nav flex'>
                <div className="logo-container">"
                    <a href="/">
                        <img src={logo} alt="" />
                        <img src={name} alt="" />
                    </a>
                </div>
                {/* {console.log(SearchBar) } */}
                {SearchBar ? <SearchBox Size={"small"} handleKeyDown={onKeyDown} onSearchTextChange={onSearchTextChange} />:null}

                <ul className="menu">
                    {LinkArray.map(link => <div className=" menu-item fw-black" key={link}><Link to={link==="Home"?"/":"/"+link}>{link}</Link></div>) }
                    
                </ul>
                
            </div>

        
            {AdvancedSearch ?
            (autoRecipe.length > 0  ?
                <div className="auto-recipes">
                        {autoRecipe.map((recipe) => {
                        // console.log('hello')`
                        return (
                            <li key={recipe.id} className="auto-recipe" id={ recipe.title } onClick={onClickAutoRecipe}>
                                <h2 id={ recipe.title }>{recipe.title}</h2>
                            </li>
                        )
                    })}
                </div>
                : <div className="advanced-search menu-item fw-black">Advanced Search</div>):null}
                
        </div>
    )
}

export default Nav;
