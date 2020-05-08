import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as PIXI from 'pixi.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

const npcs = {};

// load the texture we need
app.loader.add('brush', 'assets/brush.jpg').load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    npcs.bunny = new PIXI.Sprite(resources.brush.texture);

    setupNPCs();
    rotateNPCs();
    addNPCs();
});

const setupNPCs = () => { 
    // Setup the position of the bunny
    npcs.bunny.x = app.renderer.width / 2;
    npcs.bunny.y = app.renderer.height / 2;
}

const rotateNPCs = () => {
    // Rotate around the center
    npcs.bunny.anchor.x = 0.5;
    npcs.bunny.anchor.y = 0.5;
}

const addNPCs = () => {
    // Add the bunny to the scene we are building
    app.stage.addChild(npcs.bunny); 
}

const controls = { rotate: false };

document.addEventListener('keyup', (e) => {
    if (e.code === "Space") controls.rotate = !controls.rotate;
});

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    npcs.bunny && controls.rotate && (npcs.bunny.rotation += .15);
});

export default App;
