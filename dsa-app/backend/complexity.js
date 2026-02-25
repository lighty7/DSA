const vm = require('vm');

async function analyzeComplexity(code, functionName, testInput) {
  const testSizes = [10, 50, 100, 500, 1000];
  const timings = [];
  
  // Generate test data
  const testData = generateTestData(testInput, testSizes);
  
  for (const size of testSizes) {
    const timing = await measureExecution(code, functionName, testData, size);
    timings.push({ size, timeMs: timing });
    
    if (timing > 5000) break; // 5 second timeout
  }
  
  const complexity = detectComplexity(timings);
  
  return {
    success: true,
    timings,
    detected_complexity: complexity.complexity,
    explanation: complexity.explanation,
    confidence: complexity.confidence,
    graph_data: {
      labels: timings.map(t => t.size),
      values: timings.map(t => t.timeMs)
    }
  };
}

function generateTestData(testInput, sizes) {
  const data = { type: 'array', sizes: {} };
  
  if (!testInput || testInput.length === 0) {
    for (const size of sizes) {
      data.sizes[size] = Array.from({ length: size }, (_, i) => i);
    }
    return data;
  }
  
  const sample = testInput[0];
  
  if (Array.isArray(sample)) {
    for (const size of sizes) {
      if (typeof sample[0] === 'number') {
        data.sizes[size] = Array.from({ length: size }, () => Math.floor(Math.random() * size * 10));
      } else {
        data.sizes[size] = Array.from({ length: size }, (_, i) => `str${i}`);
      }
    }
  } else if (typeof sample === 'number') {
    for (const size of sizes) {
      data.sizes[size] = size;
    }
  } else {
    for (const size of sizes) {
      data.sizes[size] = size;
    }
  }
  
  return data;
}

async function measureExecution(code, functionName, testData, size) {
  const sandbox = {
    console: { log: () => {}, error: () => {}, warn: () => {} },
    performance: { now: () => Date.now() }
  };
  
  try {
    const wrappedCode = `
      ${code}
      return typeof ${functionName} === 'function' ? ${functionName} : null;
    `;
    
    const createFunction = new vm.Script(wrappedCode);
    const context = vm.createContext(sandbox);
    const userFunc = createFunction.runInContext(context);
    
    if (!userFunc) return 0;
    
    const inputData = testData.sizes[size];
    const runs = size < 500 ? 3 : 1;
    const times = [];
    
    for (let i = 0; i < runs; i++) {
      const start = performance.now();
      
      try {
        if (Array.isArray(inputData)) {
          userFunc(inputData);
        } else {
          userFunc(inputData);
        }
      } catch (e) {
        // Function might need different args
        try { userFunc(inputData, size); } catch {}
      }
      
      const end = performance.now();
      times.push(end - start);
    }
    
    return times.reduce((a, b) => a + b, 0) / times.length;
    
  } catch (e) {
    return 0;
  }
}

function detectComplexity(timings) {
  if (timings.length < 2) {
    return { complexity: 'Unknown', explanation: 'Not enough data', confidence: 0 };
  }
  
  const sizes = timings.map(t => t.size);
  const times = timings.map(t => Math.max(t.timeMs, 0.001));
  
  const ratios = [];
  for (let i = 1; i < sizes.length; i++) {
    const sizeRatio = sizes[i] / sizes[i - 1];
    const timeRatio = times[i] / times[i - 1];
    ratios.push({ sizeRatio, timeRatio });
  }
  
  const avgRatio = ratios.reduce((a, r) => a + r.timeRatio, 0) / ratios.length;
  const avgSizeRatio = ratios.reduce((a, r) => a + r.sizeRatio, 0) / ratios.length;
  
  const expectedOn = avgSizeRatio;
  const expectedN2 = avgSizeRatio ** 2;
  const expectedNlogn = avgSizeRatio * Math.log2(avgSizeRatio || 2);
  
  const candidates = [
    { name: 'O(1)', expected: 1.2, desc: 'Constant time - execution doesn\'t grow with input size' },
    { name: 'O(log n)', expected: Math.log2(avgSizeRatio || 2) + 0.5, desc: 'Logarithmic - halving the problem each step' },
    { name: 'O(n)', expected: expectedOn * 1.3, desc: 'Linear - time grows proportionally with input' },
    { name: 'O(n log n)', expected: expectedNlogn * 1.3, desc: 'Linearithmic - divide and conquer approach' },
    { name: 'O(n²)', expected: Math.min(expectedN2, 50), desc: 'Quadratic - nested loops over input' },
  ];
  
  const bestMatch = candidates.reduce((best, c) => {
    const diff = Math.abs(c.expected - avgRatio) / Math.max(c.expected, 1);
    const bestDiff = Math.abs(best.expected - avgRatio) / Math.max(best.expected, 1);
    return diff < bestDiff ? c : best;
  }, candidates[0]);
  
  const confidence = calculateConfidence(avgRatio, bestMatch.expected);
  
  return {
    complexity: bestMatch.name,
    explanation: bestMatch.desc,
    confidence
  };
}

function calculateConfidence(actual, expected) {
  if (expected === 0) return 0;
  const ratio = actual / expected;
  
  if (ratio >= 0.7 && ratio <= 1.3) return 90;
  if (ratio >= 0.5 && ratio <= 2) return 70;
  if (ratio >= 0.3 && ratio <= 3) return 50;
  return 30;
}

module.exports = { analyzeComplexity };
