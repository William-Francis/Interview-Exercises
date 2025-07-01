export const detectSums = (array) => {
  let arrayFormatted = array.split(',').map(i => parseInt(i.trim(), 10));
  let resultArray = [];
  for (let i = 0; i < arrayFormatted.length; i++) {
    for (let j = i + 1; j < arrayFormatted.length; j++) {
      if (arrayFormatted.includes(arrayFormatted[i] + arrayFormatted[j])) {
        const sumIndex = arrayFormatted.reduce(function (arr, element, index) {
          if (element === arrayFormatted[i] + arrayFormatted[j] && index !== i && index !== j) arr.push(index);
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
  return '[' + resultArray.map((item) => JSON.stringify(item)).join(',') + ']';
};

export function calculateResult(input) {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error = null;
  let result = '';
  try {
    result = detectSums(input);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
