export interface SumResult {
  pA: number;
  pB: number;
  sum: number;
}

export interface CalculateResult {
  input: number[];
  result: SumResult[];
  error: string | null;
}

export const detectSums = (array: number[]): SumResult[] => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }
  let resultArray: SumResult[] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array.includes(array[i] + array[j])) {
        const sumIndex = array.reduce(function (arr: number[], element: number, index: number) {
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
  return resultArray;
};

export function calculateResult(input: string): CalculateResult {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error: string | null = null;
  let result: SumResult[] = [];
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error';
  }
  return { input: parsedInput, result, error };
} 