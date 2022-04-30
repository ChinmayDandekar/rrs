import React from 'react'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'

const MinMaxInputComponent = ({ Title = "Carbohydrates", Unit = "mg",iterate, minValue, maxValue, setMinValue, setMaxValue}) => {
    

    // const [minValue, setMinValue] = React.useState(0);
    // const [maxValue, setMaxValue] = React.useState(0);

    const onClick = (e) => {
        let input = e.target.closest('.minmax-input').children[1].children[0]
        if (e.target.closest('.plusminus-button').getAttribute('button-type') == "plus") {
            input.value = parseInt(input.value) + iterate; 
        } else {
            if (parseInt(input.value) - iterate < 0) {
                input.value = 0; 
                
            } else {
                
                input.value = parseInt(input.value) - iterate; 
            }
            
        }
        if (input.getAttribute("input-type") == "max") {
            setMaxValue(parseInt(input.value))
        } else {
            setMinValue(parseInt(input.value))
        }
    }
    
  return (
      <div className='minmax-input-cont flex'>
          <h2 className='minmax-title'>{ Title }</h2>
          <div className='minmax-inputs flex'>
              <div className='minmax-input flex'>
                  <div className='plusminus-buttons flex'>
                      <div className="plusminus-button flex" onClick={onClick} button-type="plus">
                          <img src={ plus } alt="" />
                        </div>
                      <div className="plusminus-button flex" onClick={onClick} button-type="minus">
                          <img src={ minus } alt="" />
                        </div>
                  </div>   
                  <div className="minmax-value-cont flex" >
                      <input type="text" onkeypress="return /[0-9]/i.test(event.key)" value={minValue} input-type="min" className="minmax-value"></input>
                      <div className="minmax-unit">{Unit }</div>
                  </div>
              </div>
              <div className='minmax-input flex flex-reverse'>
                  <div className='plusminus-buttons flex'>
                      <div className="plusminus-button flex" onClick={onClick}  button-type="plus">
                          <img src={ plus } alt="" />
                        </div>
                      <div className="plusminus-button flex" onClick={onClick}  button-type="minus">
                          <img src={ minus } alt="" />
                        </div>
                  </div>   
                  <div className="minmax-value-cont flex">
                      <input type="text" onkeypress="return /[0-9]/i.test(event.key)" value={ maxValue } input-type="max" className="minmax-value"></input>
                      <div className="minmax-unit">{Unit }</div>
                  </div>
              </div>
          </div>
          <div className="minmax-subtitles flex">
              <h3>Min</h3>
              <h3>Max</h3>
          </div>
    </div>
    )
}

export default MinMaxInputComponent