import React, { Component } from 'react';
import Results from './Results';
import * as imageBlast from './lib/image-blast.js'
import InputRange from 'react-input-range';
import './App.css';
import 'react-input-range/lib/css/index.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: { min: 255, max: 510 },
      firstColor: '#000000',
      secondColor: '#888888',
      thirdColor: '#FFFFFF',
    };

    //Create References
    this.uploadInput = React.createRef();
    this.triggerUploadInput = this.triggerUploadInput.bind(this);

    this.targetDiv = React.createRef();
    this.clickTarget = this.clickTarget.bind(this);
    this.updateColors = this.updateColors.bind(this);
  }


  targetDivDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  targetDivDrop(event) {
    event.preventDefault();
    imageBlast.addImage(event.dataTransfer.files[0], this.state);
  }

  triggerUploadInput() {
    imageBlast.addImage(this.uploadInput.current.files[0], this.state);
  }

  updateImage(value) {
    this.setState({ value }); 
    imageBlast.processImage(this.state);
  }

  updateColors(e) {
    this.setState({ [e.target.name]: e.target.value });
    imageBlast.processImage(this.state);
  }

  clickTarget() {
    this.uploadInput.current.click();
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Edit image with Canvas</h1>
        </header>
        <content>
          <p>Basic React Project for image processing.</p>
          <div id="target" onClick={this.clickTarget} onDragOver={this.targetDivDragOver} onDrop={this.targetDivDrop}>
            Drop an image here (or click to upload)
            <input type="file" id="upload" ref={this.uploadInput} onChange={this.triggerUploadInput} />
          </div>

          <div id="image"></div>

          <Results />

          <span id="parameterControls">
            <InputRange
              maxValue={765}
              minValue={0}
              value={this.state.value}
              onChange={value => this.updateImage(value)} 
            />
            <span className="colors">
              <span>
                <input type="color" name="firstColor" value={this.state.firstColor} onChange={this.updateColors} />
              </span>
              <span>
                <input type="color" name="secondColor" value={this.state.secondColor} onChange={this.updateColors}/>
              </span>
              <span>
                <input type="color" name="thirdColor" value={this.state.thirdColor} onChange={this.updateColors}/>
              </span>
            </span>
          </span>

          <iframe src="https://ghbtns.com/github-btn.html?user=pabloasc&repo=canvas-image-react&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
        </content>
      </div>
    );
  }
}

export default App;
