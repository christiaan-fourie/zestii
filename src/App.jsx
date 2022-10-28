import "./styledStyle.css";
import { useState , useEffect } from 'react';
import { ImGithub, ImEyePlus, ImCancelCircle } from "react-icons/im";

import ReactTooltip from 'react-tooltip';

import { RGBtoHSL, HSLtoRGB, toHexa } from "./scripts/conversions";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

function App() {

  const [red , setRed] = useState(0);
  const [green , setGreen] = useState(255);
  const [blue , setBlue] = useState(189);

  const [hue , setHue] = useState(RGBtoHSL(red,green,blue).hue);
  const [sat , setSat] = useState(RGBtoHSL(red,green,blue).saturation);
  const [lum , setLum] = useState(RGBtoHSL(red,green,blue).luminace);


  


  const [activePanel, setActivePanel] = useState('rgb');

  const [color , setColor] = useState('rgb(' + red + ',' + green + ',' + blue + ')');

  // Gradients Section
  const [grad, setGrad] = useState([
    {
      id: 'grad_1',
      color: color
    },
    {
      id: 'grad_2',
      color: color
    }
  ]);
  const addToGradient = () => {
    setGrad([
      ...grad,
      {
        id: 'grad_' + (grad.length +1),
        color: color
      }
    ])
    
      
  };

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
  let title = 'ZesTii';
  useEffect(() => {
    // Update the document title using the browser API
    document.title = title;
  });

  return (
    <div className="App flex flex-col max-w-5xl px-5 mx-auto">
        <a  href="https://github.com/iam-krist/react-colorizer"
            target='_blank' rel='noreferrer' 
            className="absolute right-0 m-4" 
            data-tip="Explore The Code..."><ImGithub size={30} /><ReactTooltip />
        </a>       
        <h1 className="text-7xl pb-4 pt-5 text-center font-satisfy" 
            data-tip="Mix Colors with this beautiful color visualizing app...">
              {title}</h1><ReactTooltip />
        <div 
          style={{'backgroundColor': '#eee'}}
          className="flex flex-row w-full justify-center rounded-full">
          <button 
            data-tip="Mix Red, Green & Blue"
            onClick={() => setActivePanel('rgb') }
            style={activePanel === 'rgb' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'rgb' ? 'flex-1 h-12 px-12 rounded-full': 'flex-1 h-12 text-black'}>
            RGB 
          </button><ReactTooltip />
          <button 
            data-tip="Adjust the Hue, Saturation & Luminace Values"
            onClick={() => setActivePanel('hsl') }
            style={activePanel === 'hsl' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'hsl' ? 'flex-1 h-12 rounded-full px-12': 'flex-1 h-12 text-black'}>
            HSL 
          </button><ReactTooltip />
          
          {/* <button 
            onClick={() => setActivePanel('cmyk') }
            style={activePanel === 'cmyk' ? {'backgroundColor': color}: {'opacity': '0.5'}}
            className={activePanel === 'cmyk' ? 'flex-1 h-12 rounded-full px-12': 'flex-1 h-12'}>
            CYMK
          </button> */}
          
        </div>
        <div className='h-[140px] m-4 mt-8 rounded-xl' style={{backgroundColor: color, boxShadow: '5px 5px 15px', color }}> </div>
        <div 
          className={activePanel === 'rgb' ? 'flex flex-col gap-2 mt-5': 'hidden'}>
          {/* <p> Red: {red} |  Green: {green} |   Blue: {blue} </p>  */}
         
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg, rgb(0,'+ green + ','+ blue + '), rgb(255,'+ green + ','+ blue + '))'}}>
            <span className="absolute left-0 bg-red-600 rounded-r-full p-3 mt-1 opacity-80">{red}</span>
            <input onChange={reset} onClick={reset} value={red} type="range" max="255" min="0" className='red' /><span className="absolute right-0 bg-red-600 rounded-l-full p-3 mt-1 opacity-80 z-10">R</span>
          </div>
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg, rgb('+ red + ',0,'+ blue + '), rgb('+ red + ',255,'+ blue + '))'}}>
            <span className="absolute left-0 bg-green-600 rounded-r-full p-3 mt-1 opacity-80">{green}</span>
            <input onChange={reset} onClick={reset} value={green} type="range" max="255" min="0" className='green' /><span className="absolute right-0 bg-green-600 rounded-l-full p-3 mt-1 opacity-80 z-10">G</span>
          </div>
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg, rgb('+ red + ','+ green + ',0), rgb('+ red + ','+ green + ',255))'}}>
            <span className="absolute left-0 bg-blue-600 rounded-r-full p-3 mt-1 opacity-80">{blue}</span>
            <input onChange={reset} onClick={reset} value={blue} type="range" max="255" min="0" className='blue' /><span className="absolute right-0 bg-blue-600 rounded-l-full p-3 mt-1 opacity-80 z-10">B</span>
          </div>
        </div>
        
        <div
          className={activePanel === 'hsl' ? 'flex flex-col gap-2 mt-5': 'hidden'}>
          {/* <p> Hue: {hue} | Sat: {sat} | Lum: {lum} </p> */}
          
         
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))'}}>
            <span className="absolute left-0 bg-neutral-600 rounded-r-full p-3 mt-1 opacity-80">{hue}</span>
            <input onChange={reset} onClick={reset} value={hue} type="range" max="360" min="0" className='hue' /><span className="absolute right-0 bg-neutral-600 rounded-l-full p-3 mt-1 opacity-80 z-10">H</span>
          </div>
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg, rgb(127,127,127), ' + color}}>
            <span className="absolute left-0 bg-neutral-600 rounded-r-full p-3 mt-1 opacity-80">{sat}</span>
            <input onChange={reset} onClick={reset} value={sat} type="range" max="100" min="0" className='sat' /><span className="absolute right-0 bg-neutral-600 rounded-l-full p-3 mt-1 opacity-80 z-10">S</span>
          </div>
          <div style={{borderRadius: '99px' ,background: 'linear-gradient(90deg, rgb(0,0,0), ' + color + ' , rgb(255,255,255)'}}>
            <span className="absolute left-0 bg-neutral-600 rounded-r-full p-3 mt-1 opacity-80">{lum}</span>
            <input onChange={reset} onClick={reset} value={lum} type="range" max="100" min="0" className='lum' /><span className="absolute right-0 bg-neutral-600 rounded-l-full p-3 mt-1 opacity-80 z-10">L</span>
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
        <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-full text-center"
        >
                <SwiperSlide>
                  <div className="w-3/4 mx-auto"> 
                    {/* 
                    Color Information */}
                    <div className='text-white pt-5 flex flex-col mx-auto gap-2 '>
                      <input style={{border: '1px solid ' + color}}  
                        className="rounded-full p-2 text-center bg-black" type="text" value={ 'hsl(' + hue + ',' + sat + ',' + lum + ')'}  />
                      <input style={{border: '1px solid ' + color}}    
                        className="rounded-full p-2 text-center bg-black" type="text" value={ 'rgb(' + red + ',' + green + ',' + blue + ')'}  />
                      <input  style={{border: '1px solid ' + color}}   
                        className="rounded-full p-2 text-center bg-black" type="text" value={ toHexa(red,green,blue) }  />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>                  
                    {/* 
                    Gradients  */}
                    <div className="flex flex-row mx-auto justify-center mt-10">
                      <div className="h-24 w-2/3 rounded-xl" style={{backgroundImage: 'linear-gradient(90deg,' + grad.map(i => i.color ) + ')'}}></div>
                    </div>
                    <div className="w-full">
                    <div className="flex flex-row justify-center"> 
                      {grad.map((i) => (
                        <div>
                            <span className="h-5 w-5 rounded-full my-5 mx-1" 
                              key={i.id} 
                              data-tip={i.color}
                              style={{display: 'block' , backgroundColor: i.color}}><ReactTooltip />
                            </span><ReactTooltip />
                        </div>
                        
                      ))}
                      <button onClick={addToGradient}
                        className="ml-10"> 
                                <ImEyePlus size={40} fill={color} data-tip="Add to Gradient Selection"/> 
                      </button> <ReactTooltip />
                      <button onClick={()=> { 
                        setGrad([
                          {
                            id: 'grad_1',
                            color: color
                          }
                        ]) 
                      }}
                        className="ml-10 right-0 absolute mt-5 mr-20"> 
                                <ImCancelCircle size={20} fill='red' data-tip="Clear All Colors"/> 
                      </button> <ReactTooltip />
                    </div>
                  </div>                  
                </SwiperSlide>
                {/* <SwiperSlide>
                  <div className="w-full" > Pallets </div>
                </SwiperSlide> */}
        </Swiper>

        {/* <div className="relative bottom-0">
          <h4 className="text-xl"> Debug </h4>
          <p>Current Color:  {color} </p>
          <p>Active Panel: {activePanel} </p>
          <p>Red: {red} Green: {green} Blue: {blue}</p>
          <p>Hue: {hue} Sat: {sat} Lum: {lum} </p>
          <p>  </p>
        </div> */}
        
    </div>
  );
}

export default App;
