
// RGB to HSL
export function RGBtoHSL(red,green,blue) {
    let r = red/255;
    let g = green/255;
    let b = blue/255;

    let min = Math.min(r,g,b);
    let max = Math.max(r,g,b);

    // Luminace
    let luminace = (max + min)/2 * 100;

    // Saturation
    let saturation
    if (min === max) {
      saturation = 0;
    } else {
      if (luminace < 0.5) {
          saturation = (max-min)/(max+min) * 100;
      } else {
        saturation = (max-min)/(2.0-max-min) * 100;
      }
    }

    //Hue
    let hue = 0;
    if (saturation !== 0) {
      if (r === max) {
          hue = ((g-b)/(max-min)) * 60;
      }
      if (g === max) {
          hue = (2.0 + (b-r)/(max-min)) * 60;
      }
      if (b === max) {
          hue = (4.0 + (r-g)/(max-min)) * 60;
      }
      if (hue < 0) {
          hue = hue + 360;
      }
    }


    hue = Math.round(hue)
    saturation = Math.round(saturation)
    luminace = Math.round(luminace)

    const hsl = 'hsl(' + hue + ',' + saturation + ',' + luminace + ')'
    
    return { hue, saturation, luminace, hsl };
}

// HSL to RGB
export function HSLtoRGB(hue,saturation,luminace) {
  let h = hue/360;
  let s = saturation/100;
  let l = luminace/100;

  let tmpOne;

  let red
  let green
  let blue

  if (s !== 0) {
      if (l < 0.5) {
          tmpOne = l * (1 + s);
      } else {
          tmpOne = l + s - l * s;
      }
      var tmpTwo = 2 * l - tmpOne;

      function test(x) {
          if (x < 0 || x > 1) {
            if (x < 0) return x += 1;
            if (x > 1) return x -= 1;
          } else {
              return x;
          }
      }

      let tmpRed = test(h + 1/3);
      let tmpGreen = test(h);
      let tmpBlue = test(h - 1/3);

      function colorOut(tmp) {
          if ((6 * tmp) < 1) {
            return tmpTwo + (tmpOne - tmpTwo) * 6 * tmp;
          } else if ((2 * tmp) < 1) {
            return tmpOne;
          } else if ((3 * tmp) < 2) {
            return tmpTwo + (tmpOne - tmpTwo) * (1/1.5 - tmp) * 6;
          } else {
            return tmpTwo;
        }
      }
      

      red = colorOut(tmpRed) * 255;
      green = colorOut(tmpGreen) * 255;
      blue = colorOut(tmpBlue) * 255;

  } else {
      red = l * 255;
      green = l * 255;
      blue = l * 255;
  }

  red = Math.round(red)
  green = Math.round(green)
  blue = Math.round(blue)

  let rgb = 'rgb(' + red + ',' + green + ',' + blue + ')'

  return { red, green, blue, rgb };

}


// Number to Hex Converter
function hex(i) {
  let hex = parseInt(i).toString(16);
  if (hex.length < 2) {
    hex = "0"+hex;
  }
  return hex;
}

export function toHexa(r,g,b) {
  let rHex = hex(r)
  let gHex = hex(g)
  let bHex = hex(b)

  return '#'+rHex+gHex+bHex
}