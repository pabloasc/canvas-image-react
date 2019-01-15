export function addImage(file, settings) {
  var element = document.createElement('div');
  element.className = 'row';
  element.innerHTML =
    '<div class="image">' +
    '  <img id="loadedImage"/>' +
    '</div>';

  var img = element.querySelector('img');

  if (file) {
    document.getElementById('image').innerHTML = '';
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      this.processImage(settings);
      document.getElementById('parameterControls').style.display = 'block';
      document.getElementById('results').style.display = 'block';
    }.bind(this);
    document.getElementById('image').appendChild(element);
  }
}



export function processImage(settings) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var image = document.getElementById('loadedImage');
  var width = canvas.width = image.naturalWidth;
  var height = canvas.height = image.naturalHeight;
  var firstColorRGB = convertHex(settings.firstColor);
  var secondColorRGB = convertHex(settings.secondColor);
  var thirdColorRGB = convertHex(settings.thirdColor);

  ctx.drawImage(image, 0, 0);

  var imageData = ctx.getImageData(0, 0, width, height);
  var editedImageData = imageData;

  var data = imageData.data;

  for (var i = 0, l = data.length; i < l; i += 4) {
    
    let whiteness = data[i] + data[i+1] + data[i+2];

    if(whiteness < settings.value.min) {
      editedImageData.data[i] = firstColorRGB.r;
      editedImageData.data[i+1] = firstColorRGB.g;
      editedImageData.data[i+2] = firstColorRGB.b;
    } else if (whiteness >= settings.value.min && whiteness <= settings.value.max) {
      editedImageData.data[i] = secondColorRGB.r;
      editedImageData.data[i+1] = secondColorRGB.g;
      editedImageData.data[i+2] = secondColorRGB.b;
    } else {
      editedImageData.data[i] = thirdColorRGB.r;
      editedImageData.data[i+1] = thirdColorRGB.g;
      editedImageData.data[i+2] = thirdColorRGB.b;
    }

    editedImageData.data[i+3] = 255;
  }

  var newCanvas = document.createElement('canvas');
  var newCtx = newCanvas.getContext('2d');
  newCanvas.width = width;
  newCanvas.height = height;
  newCtx.putImageData(editedImageData, 0, 0);

  
  var newImg = document.querySelector('#edited_image');
  newImg.width = width;
  newImg.src = newCanvas.toDataURL();
}

function convertHex(hex){
  hex = hex.replace('#','');
  return { r: parseInt(hex.substring(0,2), 16), g: parseInt(hex.substring(2,4), 16), b: parseInt(hex.substring(4,6), 16) };
}

