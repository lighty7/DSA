const express = require('express');
const cors = require('cors');
const { execCode } = require('./runner');
const { analyzeComplexity } = require('./complexity');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PROBLEMS_DIR = path.join(__dirname, 'problems');

// ==================== API ROUTES ====================

// Get all problems for a concept
app.get('/api/problems', (req, res) => {
  const concept = req.query.concept || 'arrays';
  const conceptDir = path.join(PROBLEMS_DIR, concept);
  
  if (!fs.existsSync(conceptDir)) {
    return res.status(404).json({ error: 'Concept not found' });
  }
  
  const problemsFile = path.join(conceptDir, 'problems.json');
  if (!fs.existsSync(problemsFile)) {
    return res.status(404).json({ error: 'Problems not found' });
  }
  
  const data = JSON.parse(fs.readFileSync(problemsFile, 'utf-8'));
  res.json(data);
});

// Get single problem with test cases
app.get('/api/problems/:concept/:problemId', (req, res) => {
  const { concept, problemId } = req.params;
  const conceptDir = path.join(PROBLEMS_DIR, concept);
  const problemsFile = path.join(conceptDir, 'problems.json');
  
  if (!fs.existsSync(problemsFile)) {
    return res.status(404).json({ error: 'Problems not found' });
  }
  
  const data = JSON.parse(fs.readFileSync(problemsFile, 'utf-8'));
  const problem = data.problems.find(p => p.id === parseInt(problemId));
  
  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }
  
  const testcasesFile = path.join(conceptDir, 'testcases', `q${parseInt(problemId).toString().padStart(3, '0')}.json`);
  if (fs.existsSync(testcasesFile)) {
    problem.testcases = JSON.parse(fs.readFileSync(testcasesFile, 'utf-8'));
  }
  
  res.json(problem);
});

// Run code with test cases
app.post('/api/run', async (req, res) => {
  const { code, function: functionName, testcases } = req.body;
  
  if (!code || !functionName) {
    return res.status(400).json({ error: 'Code and function name required' });
  }
  
  const result = await execCode(code, functionName, testcases || []);
  res.json(result);
});

// Analyze complexity
app.post('/api/analyze', async (req, res) => {
  const { code, function: functionName, testInput } = req.body;
  
  if (!code || !functionName) {
    return res.status(400).json({ error: 'Code and function name required' });
  }
  
  const result = await analyzeComplexity(code, functionName, testInput || []);
  res.json(result);
});

// Get tutorials
app.get('/api/tutorials', (req, res) => {
  const tutorials = {
    github: [
      {
        id: 1,
        title: 'Creating a GitHub Account',
        content: `# Creating a GitHub Account

GitHub is a platform for version control and collaboration. Let's get started!

## Step 1: Visit GitHub.com
Go to [github.com](https://github.com) in your browser.

## Step 2: Sign Up
Click the "Sign up" button and enter:
- Your email address
- A password
- A username

## Step 3: Verify Email
GitHub will send a verification email to your inbox.

## Step 4: Complete Setup
Answer questions about your experience level and you're done!`,
        step: 1
      },
      {
        id: 2,
        title: 'Installing Git',
        content: `# Installing Git

Git is a version control system that tracks changes in your code.

## Windows
Download from [git-scm.com](https://git-scm.com) and run installer.

## Mac
Open Terminal and run: \`git --version\`

## Linux
\`\`\`bash
sudo apt-get install git  # Debian/Ubuntu
\`\`\`

## Verify
\`\`\`bash
git --version
\`\`\``,
        step: 2
      },
      {
        id: 3,
        title: 'Creating Your First Repository',
        content: '# Creating Your First Repository\n\nA repository (repo) is like a project folder that Git tracks.\n\n## Via GitHub Website\n1. Log in to GitHub\n2. Click "+" → "New repository"\n3. Enter a name (e.g., "my-first-repo")\n4. Choose "Public" or "Private"\n5. Check "Add a README file"\n6. Click "Create repository"',
        step: 3
      },
      {
        id: 4,
        title: 'Basic Git Commands',
        content: `# Basic Git Commands

## Core Commands

- \`git status\` - Show repository state
- \`git add .\` - Stage all changes
- \`git commit -m "message"\` - Save changes
- \`git push origin main\` - Upload to GitHub

## Workflow
Write code → git add → git commit → git push`,
        step: 4
      },
      {
        id: 5,
        title: 'Branching & Merging',
        content: `# Branching & Merging

Branches let you work on features safely.

## Commands
- \`git branch name\` - Create branch
- \`git checkout -b name\` - Create & switch
- \`git checkout name\` - Switch branch
- \`git merge name\` - Merge branch
- \`git branch -d name\` - Delete branch`,
        step: 5
      },
      {
        id: 6,
        title: 'Pull Requests',
        content: `# Pull Requests

Pull requests (PRs) propose changes to a repository.

## Steps
1. Push branch: \`git push -u origin branch-name\`
2. Go to GitHub and click "Compare & pull request"
3. Add title/description
4. Click "Create pull request"
5. Review and merge when ready`,
        step: 6
      }
    ]
  };
  
  res.json(tutorials);
});

// Serve static files from React build in production
const BUILD_DIR = path.join(__dirname, '../frontend/build');
app.use(express.static(BUILD_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
