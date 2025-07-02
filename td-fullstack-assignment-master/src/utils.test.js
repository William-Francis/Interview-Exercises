/* eslint-env mocha */
import { expect } from 'chai';
import { detectSums } from './utils';

describe('Detect sums', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSums()).to.throw('Input is not an array');
  });

  it('should return an array', () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
  });

  it('should detect sums', () => {
    const result = detectSums([1, 2]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it('should detect sums in order', () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.deep.equal([{ pA: 0, pB: 1, sum: 2}]);
  });

  it('should detect multiple sums in [1, 2, 3, 4]', () => {
    const result = detectSums([1, 2, 3, 4]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 2, sum: 3 }
    ]);
  });

  it('should handle palindromes correctly and zeros [3, 0, 3]', () => {
    const result = detectSums([3, 0, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 1, pB: 2, sum: 0 }
    ]);
  });

  it('should not use same element twice [1, 2, 4]', () => {
    const result = detectSums([1, 2, 4]);
    expect(result).to.deep.equal([]);
  });

  it('should not use same element twice [3, 0, 2]', () => {
    const result = detectSums([3, 0, 2]);
    expect(result).to.deep.equal([]);
  });

  it('should detect multiple combinations in [1, 2, 3, 4, 5]', () => {
    const result = detectSums([1, 2, 3, 4, 5]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 2, sum: 3 },
      { pA: 0, pB: 3, sum: 4 },
      { pA: 1, pB: 2, sum: 4 }
    ]);
  });

  it('should return every possible combination once [1, 2, 1, 3]', () => {
    const result = detectSums([1, 2, 1, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 3 },
      { pA: 0, pB: 2, sum: 1 },
      { pA: 1, pB: 2, sum: 3 }
    ]);
  });

  it('should return every possible combination once [1, 2, 1, 2, 3]', () => {
    const result = detectSums([1, 2, 1, 2, 3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 4 },
      { pA: 0, pB: 2, sum: 1 },
      { pA: 0, pB: 2, sum: 3 },
      { pA: 0, pB: 3, sum: 4 },
      { pA: 1, pB: 2, sum: 4 },
      { pA: 2, pB: 3, sum: 4 }
    ]);
  });

  it('should handle negative numbers correctly', () => {
    const result = detectSums([-1, 2, 1, -3]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 1, pB: 3, sum: 0 }
    ]);
  });

  it('should handle single element array', () => {
    const result = detectSums([5]);
    expect(result).to.deep.equal([]);
  });

  it('should handle array with all same numbers', () => {
    const result = detectSums([2, 2, 2, 2]);
    expect(result).to.deep.equal([]);
  });

  it('should handle large numbers', () => {
    const result = detectSums([1000, 2000, 3000, 3000]);
    expect(result).to.deep.equal([
      { pA: 0, pB: 1, sum: 2 },
      { pA: 0, pB: 1, sum: 3 }
    ]);
  });
});
