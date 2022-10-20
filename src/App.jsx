import "./styledStyle.css";
import { useState , useEffect } from 'react';

function App() {

  const [red , setRed] = useState(0);
  const [green , setGreen] = useState(255);
  const [blue , setBlue] = useState(189);

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
      default:
        break;
    }
    setColor('rgb(' + red + ',' + green + ',' + blue + ')')
  }

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Welcome`;
  });

  return (
    <div className="App flex flex-col  px-5">
        
        <h1 className="text-xl text-center">React Colorizer</h1>
        <div className="flex flex-row justify-center">
          <div> RGB </div>
          <div> HSL </div>
          
        </div>
        <div className='flex gap-1 flex-col'>
          <p> Red: {red} <br />Green: {green} <br /> Blue: {blue} </p>
          <p> {color} </p>         
         
          <div style={{background: 'linear-gradient(90deg, rgb(0,'+ green + ','+ blue + '), rgb(255,'+ green + ','+ blue + '))'}}>
            <input onChange={reset} type="range" max="255" min="0" className='red' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb('+ red + ',0,'+ blue + '), rgb('+ red + ',255,'+ blue + '))'}}>
            <input onChange={reset}  type="range" max="255" min="0" className='green' />
          </div>
          <div style={{background: 'linear-gradient(90deg, rgb('+ red + ','+ green + ',0), rgb('+ red + ','+ green + ',255))'}}>
            <input onChange={reset}  type="range" max="255" min="0" className='blue' />
          </div>
        </div>

        <div className='h-[140px] m-4 mt-8 rounded-2xl' style={{backgroundColor: color, boxShadow: '2px 2px 20px -5px black'}}> </div>
    </div>
  );
}

export default App;
