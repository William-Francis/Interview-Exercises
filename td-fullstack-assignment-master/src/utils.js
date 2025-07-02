// takes in an array and returns each pair of numbers that sum to a value in the array
// Time : O(n³)
// Memory: O(n + r) where r is the number of results
export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }
  // initialize an empty array to store the results
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      // check if the sum of the two numbers is in the array
      if (array.includes(array[i] + array[j])) {
        // this is to check if there are duplicate answers
        const sumIndex = array.reduce(function (arr, element, index) {
          if (element === array[i] + array[j] && index !== i && index !== j) arr.push(index);
          return arr;
        }, []);
        // adds each answer to the result array
        for (let k = 0; k < sumIndex.length; k++) {
          resultArray.push({
            pA: i,
            pB: j,
            sum: sumIndex[k],
          });
        }
      }
    }
  }
  return resultArray
};

// Much faster version of detectSums using a value-to-indices map
// Time : O(n² × k) where k is the average number of indices for each sum
// Memory: O(n + r) where r is the number of results
export const detectSumsFast = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }
  
  // Preprocess: value -> [indices]
  const valueToIndices = new Map();
  array.forEach((value, idx) => {
    if (!valueToIndices.has(value)) valueToIndices.set(value, []);
    valueToIndices.get(value).push(idx);
  });

  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const indices = (valueToIndices.get(array[i] + array[j]) || []).filter(idx => idx !== i && idx !== j);
      for (let k = 0; k < indices.length; k++) {
        resultArray.push({
          pA: i,
          pB: j,
          sum: indices[k],
        });
      }
    }
  }
  return resultArray;
};

// Memory-efficient version that minimizes memory usage
// Time : O(n² × k) where k is the average number of indices for each sum
// Memory: O(r) where r is the number of results
export const detectSumsLowerMemory = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }
  const resultArray = [];
  // Use nested loops without any additional data structures
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const sum = array[i] + array[j];
      
      // Scan the array to find all indices where the sum exists
      for (let k = 0; k < array.length; k++) {
        // Skip if any index is the same (can't use same element twice)
        if (k === i || k === j) continue;
        
        // Check if this position contains the sum
        if (array[k] === sum) {
          resultArray.push({
            pA: i,
            pB: j,
            sum: k,
          });
        }
      }
    }
  }
  return resultArray;
};

export function calculateResult(input) {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error = null;
  let result = '';
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}

// Takes in a function and arguments and returns the result and execution time in milliseconds
export function measureExecutionTime(fn, ...args) {
  const startTime = performance.now();
  const result = fn(...args);
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  
  return {
    result,
    executionTime: executionTime.toFixed(2)
  };
}
