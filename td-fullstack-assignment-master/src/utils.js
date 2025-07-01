export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }
  let resultArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array.includes(array[i] + array[j])) {
        const sumIndex = array.reduce(function (arr, element, index) {
          if (element === array[i] + array[j] && index !== i && index !== j) arr.push(index);
          return arr;
        }, []);
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
