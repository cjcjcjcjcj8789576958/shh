# Conway's Game of Life

A web-based implementation of Conway's Game of Life using HTML5 Canvas and JavaScript.

## Features

- Interactive grid where you can click to toggle cells
- Start/Stop simulation
- Clear grid
- Randomize grid
- Adjustable simulation speed
- Responsive design
- Modern UI

## How to Use

1. Open `index.html` in a web browser
2. Use the controls to interact with the simulation:
   - Click on the grid to toggle cells on/off
   - Use the "Start" button to begin the simulation
   - Use the "Stop" button to pause the simulation
   - Use the "Clear" button to reset the grid
   - Use the "Random" button to generate a random pattern
   - Adjust the speed slider to control simulation speed

## Rules of Conway's Game of Life

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Technical Details

- Built with vanilla JavaScript
- Uses HTML5 Canvas for rendering
- Responsive design with modern CSS
- No external dependencies required

## Browser Support

Works in all modern browsers that support HTML5 Canvas. 