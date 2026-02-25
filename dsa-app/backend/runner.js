const vm = require('vm');

async function execCode(code, functionName, testcases) {
  const results = {
    success: true,
    tests: [],
    summary: { passed: 0, failed: 0, total: testcases.length }
  };

  // Create a sandboxed context
  const sandbox = {
    console: {
      log: () => {}, // Suppress console.log
      error: () => {},
      warn: () => {}
    }
  };

  try {
    // Create function from code
    const wrappedCode = `
      ${code}
      return typeof ${functionName} === 'function' ? ${functionName} : null;
    `;
    
    const createFunction = new vm.Script(wrappedCode);
    const context = vm.createContext(sandbox);
    const userFunc = createFunction.runInContext(context);
    
    if (!userFunc) {
      results.success = false;
      results.error = `Function '${functionName}' not found in code`;
      return results;
    }

    // Run each test case
    for (let i = 0; i < testcases.length; i++) {
      const test = testcases[i];
      const testResult = { index: i + 1, passed: false, input: test.input || [] };
      
      try {
        const args = test.input || [];
        const startTime = performance.now();
        
        let result;
        if (Array.isArray(args)) {
          result = userFunc(...args);
        } else {
          result = userFunc(args);
        }
        
        const executionTime = performance.now() - startTime;
        
        testResult.output = result;
        testResult.expected = test.expected;
        testResult.timeMs = Math.round(executionTime * 100) / 100;
        
        // Compare results
        if (arraysEqual(result, test.expected)) {
          testResult.passed = true;
          results.summary.passed++;
        } else {
          results.summary.failed++;
        }
        
      } catch (e) {
        testResult.error = e.message;
        testResult.output = null;
        results.summary.failed++;
      }
      
      results.tests.push(testResult);
    }
    
  } catch (e) {
    results.success = false;
    results.error = `Compilation error: ${e.message}`;
  }

  return results;
}

function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a === b;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!arraysEqual(a[i], b[i])) return false;
    } else if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

module.exports = { execCode };
