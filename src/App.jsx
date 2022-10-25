import "./styledStyle.css";
import { useState , useEffect } from 'react';

import { RGBtoHSL, HSLtoRGB } from "./scripts/conversions";

function App() {

  const [red , setRed] = useState(0);
  const [green , setGreen] = useState(255);
  const [blue , setBlue] = useState(189);

  const [hue , setHue] = useState(RGBtoHSL(red,green,blue).hue);
  const [sat , setSat] = useState(RGBtoHSL(red,green,blue).saturation);
  const [lum , setLum] = useState(RGBtoHSL(red,green,blue).luminace);

  

  const [activePanel, setActivePanel] = useState('rgb');

  const [color , setColor] = useState('rgb(' + red + ',' + green + ',' + blue + ')');


  const reset = (e) => {
    const _input = e.target.className
    const _value = e.target.value
    console.log(typeof _input);

    switch (true) {
      case _input === 'red':
        setRed(_value)
        break;
      case _input === 'green':
        setGreen(_value)
        break;
      case _input === 'blue':
        setBlue(_value)
        break;
      case _input === 'hue':        
        setHue(_value)
        break;
      case _input === 'sat':
        setSat(_value)
        break;
      case _input === 'lum':
        setLum(_value)
        break;
      default:
        break;
    }
    
    if (activePanel === 'rgb') {
      setColor('rgb(' + red + ',' + green + ',' + blue + ')')
      setHue(RGBtoHSL(red,green,blue).hue) 
      setSat(RGBtoHSL(red,green,blue).saturation)
      setLum(RGBtoHSL(red,green,blue).luminace)
    } else {      
      setColor('hsl(' + hue + ',' + sat + '%,' + lum + '%)')
      setRed(HSLtoRGB(hue, sat, lum).red)
      setGreen(HSLtoRGB(hue, sat, lum).green)
      setBlue(HSLtoRGB(hue, sat, lum).blue)
    }
    
    
  }
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Colorizer`;
  });

  return (
    <div className="App flex flex-col  px-5">
        <h1 className="text-4xl my-5 leading-[55px] text-center ">React Colorizer</h1> 
        <div 
          style={{'backgroundColor': '#eee'}}
          className="flex flex-row w-full justify-center rounded-full">
          <button 
            onClick={() => setActivePanel('rgb') }
            style={activePanel === 'rgb' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'rgb' ? 'flex-1 h-12 px-12 rounded-full': 'flex-1 h-12 text-black'}>
            RGB 
          </button>
          <button 
            onClick={() => setActivePanel('hsl') }
            style={activePanel === 'hsl' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'hsl' ? 'flex-1 h-12 rounded-full px-12': 'flex-1 h-12 text-black'}>
            HSL 
          </button>
          
          {/* <button 
            onClick={() => setActivePanel('cmyk') }
            style={activePanel === 'cmyk' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'cmyk' ? 'flex-1 h-12 rounded-full px-12': 'flex-1 h-12'}>
            CYMK
          </button> */}
          
        </div>
        <div className='h-[140px] m-4 mt-8 rounded-2xl' style={{backgroundColor: color, boxShadow: '5px 5px 15px', color }}> </div>
        <div 
          className={activePanel === 'rgb' ? 'flex flex-col': 'hidden'}>
          <p> Red: {red} |  Green: {green} |   Blue: {blue} </p>          
         
          <div style={{background: 'linear-gradient(90deg, rgb(0,'+ green + ','+ blue + '), rgb(255,'+ green + ','+ blue + '))'}}>
            <input onChange={reset} value={red} type="range" max="255" min="0" className='red' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb('+ red + ',0,'+ blue + '), rgb('+ red + ',255,'+ blue + '))'}}>
            <input onChange={reset} value={green} type="range" max="255" min="0" className='green' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb('+ red + ','+ green + ',0), rgb('+ red + ','+ green + ',255))'}}>
            <input onChange={reset} value={blue} type="range" max="255" min="0" className='blue' />
          </div>
        </div>
        
        <div 
          className={activePanel === 'hsl' ? 'flex flex-col': 'hidden'}>
          <p> Hue: {hue} | Sat: {sat} | Lum: {lum} </p>
          
         
          <div style={{background: 'linear-gradient(90deg,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))'}}>
            <input onChange={reset} value={hue} type="range" max="360" min="0" className='hue' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb(127,127,127), ' + color}}>
            <input onChange={reset} value={sat} type="range" max="100" min="0" className='sat' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb(0,0,0), ' + color + ' , rgb(255,255,255)'}}>
            <input onChange={reset} value={lum} type="range" max="100" min="0" className='lum' />
          </div>
        </div>

        {/* <div 
          className={activePanel === 'cmyk' ? 'flex flex-col': 'hidden'}>
          <p> Cyan: {red} | Magenta: {green} | Yellow: {blue} | KBlack {blue} </p>
          
         
          <div style={{background: 'linear-gradient(90deg,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))'}}>
            <input onChange={reset} type="range" max="360" min="0" className='hue' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb(127,127,127), ' + color}}>
            <input onChange={reset}  type="range" max="100" min="0" className='sat' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb(0,0,0), rgb(255,255,255)'}}>
            <input onChange={reset}  type="range" max="100" min="0" className='lum' />
          </div>
        </div> */}


        <div className="relative bottom-0">
          <h4 className="text-xl"> Debug </h4>
          <p>Current Color:  {color} </p>
          <p>Active Panel: {activePanel} </p>
          <p>Red: {red} Green: {green} Blue: {blue}</p>
          <p>Hue: {hue} Sat: {sat} Lum: {lum} </p>
          <p>  </p>
        </div>
        
    </div>
  );
}

export default App;
