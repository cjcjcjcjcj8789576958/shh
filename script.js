class GameOfLife {
    constructor(canvas, cellSize = 10) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.grid = [];
        this.isRunning = false;
        this.animationId = null;
        this.speed = 5;

        // Set canvas size
        this.canvas.width = 600;
        this.canvas.height = 400;
        
        // Calculate grid dimensions
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        this.rows = Math.floor(this.canvas.height / this.cellSize);

        // Initialize grid
        this.initializeGrid();
        
        // Add event listeners
        this.setupEventListeners();
    }

    initializeGrid() {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    setupEventListeners() {
        // Canvas click event
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / this.cellSize);
            const y = Math.floor((e.clientY - rect.top) / this.cellSize);
            
            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                this.grid[y][x] = this.grid[y][x] ? 0 : 1;
                this.draw();
            }
        });

        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('clearBtn').addEventListener('click', () => this.clear());
        document.getElementById('randomBtn').addEventListener('click', () => this.randomize());
        
        // Speed control
        document.getElementById('speed').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
        });
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    clear() {
        this.stop();
        this.initializeGrid();
        this.draw();
    }

    randomize() {
        this.stop();
        this.grid = Array(this.rows).fill().map(() => 
            Array(this.cols).fill().map(() => Math.random() > 0.7 ? 1 : 0)
        );
        this.draw();
    }

    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newX = (x + j + this.cols) % this.cols;
                const newY = (y + i + this.rows) % this.rows;
                count += this.grid[newY][newX];
            }
        }
        return count;
    }

    update() {
        const newGrid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const neighbors = this.countNeighbors(x, y);
                const cell = this.grid[y][x];
                
                if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
                    newGrid[y][x] = 1;
                } else if (cell === 0 && neighbors === 3) {
                    newGrid[y][x] = 1;
                }
            }
        }
        
        this.grid = newGrid;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x]) {
                    this.ctx.fillStyle = '#4CAF50';
                    this.ctx.fillRect(
                        x * this.cellSize,
                        y * this.cellSize,
                        this.cellSize - 1,
                        this.cellSize - 1
                    );
                }
            }
        }
    }

    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        const delay = 1000 / (this.speed * 2);
        setTimeout(() => {
            this.animationId = requestAnimationFrame(() => this.animate());
        }, delay);
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new GameOfLife(canvas);
    game.draw();
}); 