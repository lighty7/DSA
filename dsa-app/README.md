# DSA Learning App

A comprehensive web-based Data Structures and Algorithms learning platform with:
- **In-app Code Editor** - Write and run Python code
- **Test Case Verification** - Validate your solutions
- **Complexity Detection** - Automatically analyze Big-O notation
- **GitHub Tutorials** - Step-by-step GitHub guide

## Project Structure

```
dsa-app/
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   ├── runner.py           # Code execution engine
│   ├── complexity.py       # Big-O complexity analyzer
│   ├── requirements.txt    # Python dependencies
│   └── problems/           # Problem sets
│       └── arrays/         # Array problems
│           ├── problems.json
│           └── testcases/
└── frontend/                # React application
    ├── src/
    │   └── App.js          # Main React component
    └── package.json
```

## Features

### 1. Practice Mode
- Browse and solve DSA problems
- Write code in an in-browser editor (Monaco Editor)
- Run test cases and see instant results

### 2. Complexity Analysis
- Automatically detects time complexity (O(1), O(n), O(n²), etc.)
- Runs your code with varying input sizes
- Displays a graph showing execution time growth

### 3. GitHub Tutorials
- Step-by-step guide to GitHub
- Creating accounts, repositories
- Basic Git commands
- Branching and pull requests

## Installation

### Backend
```bash
cd dsa-app/backend
pip install -r requirements.txt
python app.py
```

The backend runs on http://localhost:5000

### Frontend
```bash
cd dsa-app/frontend
npm install
npm start
```

The frontend runs on http://localhost:3000

## Usage

1. Start the backend: `python app.py` (in backend folder)
2. Start the frontend: `npm start` (in frontend folder)
3. Open http://localhost:3000 in your browser

### Running Tests
1. Select a problem from the list
2. Write your solution in the code editor
3. Click "Run Tests" to verify your solution
4. Click "Analyze Complexity" to see the time complexity

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/problems?concept=arrays` | List all problems |
| GET | `/api/problems/arrays/:id` | Get problem details |
| POST | `/api/run` | Execute user code |
| POST | `/api/analyze` | Analyze complexity |
| GET | `/api/tutorials` | Get GitHub tutorials |

## Problem Categories

### Arrays (Current)
- Two Sum (Easy)
- Valid Anagram (Easy)
- Maximum Subarray (Medium)
- Product Except Self (Medium)
- Rotate Array (Medium)
- Contains Duplicate (Easy)
- Best Time to Buy and Sell Stock (Easy)

### Coming Soon
- Linked Lists
- Sliding Window
- Trees & Graphs
- Dynamic Programming

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Monaco Editor, Recharts |
| Backend | Flask (Python) |
| Code Execution | Python exec() |

## License

MIT
