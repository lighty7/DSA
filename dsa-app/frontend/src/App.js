import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = '/api';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#1e1e1e',
  },
  header: {
    background: '#2d2d2d',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #3d3d3d',
  },
  logo: {
    color: '#61dafb',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navButton: {
    background: 'transparent',
    border: 'none',
    color: '#d4d4d4',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background 0.2s',
  },
  navButtonActive: {
    background: '#264f78',
    color: '#61dafb',
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  problemPanel: {
    width: '40%',
    padding: '20px',
    overflow: 'auto',
    borderRight: '1px solid #3d3d3d',
    background: '#252526',
  },
  editorPanel: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
  },
  editorHeader: {
    padding: '15px 20px',
    background: '#2d2d2d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #3d3d3d',
  },
  editor: {
    flex: 1,
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
  },
  runButton: {
    background: '#0e639c',
    color: 'white',
  },
  analyzeButton: {
    background: '#6a9955',
    color: 'white',
  },
  resultsPanel: {
    padding: '20px',
    background: '#1e1e1e',
    maxHeight: '300px',
    overflow: 'auto',
  },
  testResult: {
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '13px',
  },
  testPass: {
    background: '#1e3a1e',
    borderLeft: '4px solid #4ec9b0',
  },
  testFail: {
    background: '#3a1e1e',
    borderLeft: '4px solid #f14c4c',
  },
  problemTitle: {
    fontSize: '24px',
    color: '#d4d4d4',
    marginBottom: '10px',
  },
  difficulty: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  difficultyEasy: { background: '#1e3a1e', color: '#4ec9b0' },
  difficultyMedium: { background: '#3a3a1e', color: '#dcdcaa' },
  difficultyHard: { background: '#3a1e1e', color: '#f14c4c' },
  description: {
    color: '#d4d4d4',
    lineHeight: '1.6',
    marginBottom: '20px',
    whiteSpace: 'pre-wrap',
  },
  example: {
    background: '#2d2d2d',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '15px',
  },
  exampleLabel: {
    color: '#9cdcfe',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  hint: {
    background: '#2d2d2d',
    padding: '15px',
    borderRadius: '6px',
    borderLeft: '3px solid #dcdcaa',
    marginBottom: '15px',
  },
  hintTitle: {
    color: '#dcdcaa',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  complexityResult: {
    background: '#2d2d2d',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '15px',
  },
  complexityTitle: {
    color: '#61dafb',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  complexityValue: {
    fontSize: '28px',
    color: '#4ec9b0',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  confidence: {
    color: '#808080',
    fontSize: '14px',
  },
  summary: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    fontSize: '16px',
  },
  summaryPass: { color: '#4ec9b0' },
  summaryFail: { color: '#f14c4c' },
  tutorialContainer: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  tutorialNav: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
  },
  tutorialStep: {
    padding: '10px 20px',
    background: '#2d2d2d',
    border: 'none',
    borderRadius: '4px',
    color: '#d4d4d4',
    cursor: 'pointer',
  },
  tutorialStepActive: {
    background: '#0e639c',
    color: 'white',
  },
  tutorialContent: {
    background: '#252526',
    padding: '30px',
    borderRadius: '8px',
  },
  problemList: {
    display: 'grid',
    gap: '15px',
    padding: '20px',
  },
  problemCard: {
    background: '#2d2d2d',
    padding: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
    borderLeft: '4px solid transparent',
    transition: 'border-color 0.2s',
  },
};

function App() {
  const [view, setView] = useState('practice');
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [complexityResult, setComplexityResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);

  useEffect(() => {
    fetchProblems();
    fetchTutorials();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch(`${API_URL}/problems?concept=arrays`);
      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        return;
      }
      const data = await response.json();
      setProblems(data.problems || []);
      if (data.problems && data.problems.length > 0) {
        loadProblem(data.problems[0]);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  const fetchTutorials = async () => {
    try {
      const response = await fetch(`${API_URL}/tutorials`);
      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        return;
      }
      const data = await response.json();
      setTutorials(data.github || []);
      if (data.github && data.github.length > 0) {
        setCurrentTutorial(data.github[0]);
      }
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    }
  };

  const loadProblem = async (problem) => {
    setCurrentProblem(problem);
    setResults(null);
    setComplexityResult(null);
    
    try {
      const response = await fetch(`${API_URL}/problems/arrays/${problem.id}`);
      const data = await response.json();
      
      const template = `${data.signature}\n    # Write your solution here\n    pass\n`;
      setCode(template);
    } catch (error) {
      console.error('Error loading problem:', error);
      const template = `def ${problem.function}():\n    # Write your solution here\n    pass\n`;
      setCode(template);
    }
  };

  const runCode = async () => {
    if (!currentProblem) return;
    
    setLoading(true);
    setResults(null);
    
    try {
      const response = await fetch(`${API_URL}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          function: currentProblem.function,
          testcases: currentProblem.testcases?.tests || []
        })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error running code:', error);
      setResults({ error: error.message });
    }
    
    setLoading(false);
  };

  const analyzeComplexity = async () => {
    if (!currentProblem) return;
    
    setLoading(true);
    setComplexityResult(null);
    
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          function: currentProblem.function,
          test_input: currentProblem.testcases?.tests?.[0]?.input || []
        })
      });
      const data = await response.json();
      setComplexityResult(data);
    } catch (error) {
      console.error('Error analyzing complexity:', error);
    }
    
    setLoading(false);
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return { ...styles.difficulty, ...styles.difficultyEasy };
      case 'medium': return { ...styles.difficulty, ...styles.difficultyMedium };
      case 'hard': return { ...styles.difficulty, ...styles.difficultyHard };
      default: return styles.difficulty;
    }
  };

  const renderProblemPanel = () => {
    if (!currentProblem) return <div style={{ padding: '20px' }}>Loading...</div>;
    
    return (
      <div style={styles.problemPanel}>
        <div style={styles.problemTitle}>{currentProblem.title}</div>
        <div style={getDifficultyStyle(currentProblem.difficulty)}>
          {currentProblem.difficulty}
        </div>
        
        <div style={styles.description}>{currentProblem.description}</div>
        
        {currentProblem.examples?.map((ex, i) => (
          <div key={i} style={styles.example}>
            <div style={styles.exampleLabel}>Example {i + 1}</div>
            <div style={{ color: '#d4d4d4' }}>
              <div>Input: {JSON.stringify(ex.input)}</div>
              <div>Output: {JSON.stringify(ex.output)}</div>
              {ex.explanation && (
                <div style={{ color: '#808080', marginTop: '5px' }}>
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {currentProblem.hints && currentProblem.hints.length > 0 && (
          <div style={styles.hint}>
            <div style={styles.hintTitle}>Hints</div>
            <ul style={{ color: '#d4d4d4', paddingLeft: '20px' }}>
              {currentProblem.hints.map((hint, i) => (
                <li key={i} style={{ marginBottom: '5px' }}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div style={{ color: '#808080', marginTop: '15px' }}>
          <strong>Function signature:</strong>
          <div style={{ fontFamily: 'monospace', marginTop: '5px' }}>
            {currentProblem.signature}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!results) return null;
    
    if (results.error) {
      return (
        <div style={{ ...styles.testResult, ...styles.testFail }}>
          <strong>Error:</strong> {results.error}
        </div>
      );
    }
    
    return (
      <div>
        <div style={styles.summary}>
          <span style={styles.summaryPass}>
            Passed: {results.summary?.passed || 0}
          </span>
          <span style={styles.summaryFail}>
            Failed: {results.summary?.failed || 0}
          </span>
          <span>Total: {results.summary?.total || 0}</span>
        </div>
        
        {results.tests?.map((test, i) => (
          <div
            key={i}
            style={{
              ...styles.testResult,
              ...(test.passed ? styles.testPass : styles.testFail)
            }}
          >
            <div>
              <strong>Test {test.index}:</strong> {test.passed ? 'PASSED' : 'FAILED'}
            </div>
            {test.input && (
              <div style={{ color: '#9cdcfe' }}>Input: {JSON.stringify(test.input)}</div>
            )}
            {test.expected !== undefined && (
              <div style={{ color: '#4ec9b0' }}>Expected: {JSON.stringify(test.expected)}</div>
            )}
            {test.output !== undefined && (
              <div style={{ color: '#dcdcaa' }}>Output: {JSON.stringify(test.output)}</div>
            )}
            {test.error && (
              <div style={{ color: '#f14c4c' }}>Error: {test.error}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderComplexityResult = () => {
    if (!complexityResult) return null;
    
    return (
      <div style={styles.complexityResult}>
        <div style={styles.complexityTitle}>Time Complexity Analysis</div>
        <div style={styles.complexityValue}>
          {complexityResult.detected_complexity}
        </div>
        <div style={{ color: '#d4d4d4', marginBottom: '15px' }}>
          {complexityResult.explanation}
        </div>
        <div style={styles.confidence}>
          Confidence: {complexityResult.confidence}%
        </div>
        
        {complexityResult.graph_data && (
          <div style={{ height: '200px', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complexityResult.graph_data.labels.map((label, i) => ({
                size: label,
                time: complexityResult.graph_data.values[i]
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3d3d3d" />
                <XAxis 
                  dataKey="size" 
                  stroke="#808080" 
                  label={{ value: 'Input Size (n)', position: 'bottom', fill: '#808080' }}
                />
                <YAxis 
                  stroke="#808080" 
                  label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', fill: '#808080' }}
                />
                <Tooltip 
                  contentStyle={{ background: '#2d2d2d', border: '1px solid #3d3d3d' }}
                  labelStyle={{ color: '#d4d4d4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#61dafb" 
                  strokeWidth={2}
                  dot={{ fill: '#61dafb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };

  const renderPractice = () => (
    <div style={styles.main}>
      {renderProblemPanel()}
      <div style={styles.editorPanel}>
        <div style={styles.editorHeader}>
          <span style={{ color: '#d4d4d4' }}>Code Editor</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{ ...styles.button, ...styles.runButton }}
              onClick={runCode}
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Tests'}
            </button>
            <button
              style={{ ...styles.button, ...styles.analyzeButton }}
              onClick={analyzeComplexity}
              disabled={loading}
            >
              Analyze Complexity
            </button>
          </div>
        </div>
        <div style={styles.editor}>
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 15 },
            }}
          />
        </div>
        <div style={styles.resultsPanel}>
          {renderResults()}
          {renderComplexityResult()}
        </div>
      </div>
    </div>
  );

  const renderProblemsList = () => (
    <div style={styles.main}>
      <div style={{ width: '100%', padding: '20px', overflow: 'auto' }}>
        <h2 style={{ color: '#d4d4d4', marginBottom: '20px' }}>Array Problems</h2>
        <div style={styles.problemList}>
          {problems.map((problem) => (
            <div
              key={problem.id}
              style={{
                ...styles.problemCard,
                borderLeftColor: currentProblem?.id === problem.id ? '#61dafb' : 'transparent'
              }}
              onClick={() => loadProblem(problem)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#d4d4d4', fontWeight: 'bold' }}>
                    {problem.id}. {problem.title}
                  </span>
                </div>
                <div style={getDifficultyStyle(problem.difficulty)}>
                  {problem.difficulty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTutorial = () => (
    <div style={styles.tutorialContainer}>
      <h1 style={{ color: '#d4d4d4', marginBottom: '20px' }}>GitHub Tutorial</h1>
      <div style={styles.tutorialNav}>
        {tutorials.map((t, i) => (
          <button
            key={t.id}
            style={{
              ...styles.tutorialStep,
              ...(currentTutorial?.id === t.id ? styles.tutorialStepActive : {})
            }}
            onClick={() => setCurrentTutorial(t)}
          >
            Step {t.step}: {t.title}
          </button>
        ))}
      </div>
      {currentTutorial && (
        <div style={styles.tutorialContent}>
          <pre style={{ 
            color: '#d4d4d4', 
            fontFamily: 'inherit',
            whiteSpace: 'pre-wrap',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            {currentTutorial.content}
          </pre>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>DSA Learning App</div>
        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navButton,
              ...(view === 'practice' ? styles.navButtonActive : {})
            }}
            onClick={() => setView('practice')}
          >
            Practice
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(view === 'problems' ? styles.navButtonActive : {})
            }}
            onClick={() => setView('problems')}
          >
            Problems
          </button>
          <button
            style={{
              ...styles.navButton,
              ...(view === 'tutorial' ? styles.navButtonActive : {})
            }}
            onClick={() => setView('tutorial')}
          >
            GitHub Tutorial
          </button>
        </nav>
      </header>
      
      {view === 'practice' && renderPractice()}
      {view === 'problems' && renderProblemsList()}
      {view === 'tutorial' && renderTutorial()}
    </div>
  );
}

export default App;
