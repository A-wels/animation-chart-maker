import {
	equalDistribution,
	slowInDist,
	slowOutDist,
	slowInOutDist,
	getFrameIndex
} from './Distributions.js';
import { describe, expect, it } from 'vitest';

describe('Distributions', () => {
	describe('equalDistribution', () => {
		it('should distribute boxes equally', () => {
			// Test case 1
			const result1 = equalDistribution(5);
			expect(result1).toEqual([25, 50, 75]);

			// Test case 2
			const result2 = equalDistribution(10);
			// compare list of floats -> approximatly equal
			let expected = [11.11, 22.22, 33.33, 44.44, 55.56, 66.67, 77.78, 88.89];
			// compare list of floats -> approximatly equal
			expected.forEach((e, i) => {
				expect(result2[i]).approximately(e, 0.01);
			});
		});
	});

	describe('slowInDist', () => {
		it('should distribute boxes with slow-in effect', () => {
			// Test case 1
			const result1 = slowInDist(5);
			expect(result1).toEqual([12.5, 25, 50]);

			// Test case 2
			const result2 = slowInDist(10);
			let expected = [0.390625, 0.78125, 1.5625, 3.125, 6.25, 12.5, 25, 50];
			// compare list of floats -> approximatly equal
			expected.forEach((e, i) => {
				expect(result2[i]).approximately(e, 0.0001);
			});
		});
	});

	describe('slowOutDist', () => {
		it('should distribute boxes with slow-out effect', () => {
			// Test case 1
			const result1 = slowOutDist(5);
			expect(result1).toEqual([50, 75, 87.5]);

			// Test case 2
			const result2 = slowOutDist(10);
			expect(result2).toEqual([50, 75, 87.5, 93.75, 96.875, 98.4375, 99.21875, 99.609375]);
		});
	});

	describe('slowInOutDist', () => {
		it('should distribute boxes with slow-in-out effect', () => {
			// Test case 1
			const result1 = slowInOutDist(7);
			expect(result1).toEqual([12.5, 25, 50, 75, 87.5]);

			// Test case 2
			const result2 = slowInOutDist(10);
			// compare list of floats -> approximatly equal
			let expected = [3.125, 6.25, 12.5, 25, 50, 75, 87.5, 93.75];
			// compare list of floats -> approximatly equal
			expected.forEach((e, i) => {
				expect(result2[i]).approximately(e, 0.0001);
			});
		});
	});

	describe('getFrameIndex', () => {
		it('should return the frame index, based on initial frame number and the skipped indexes', () => {
			// Test case 1
			const result1 = getFrameIndex(5, 'Ones');
			expect(result1).toEqual(5);

			// Test case 2
			const result2 = getFrameIndex(10, 'Twos');
			expect(result2).toEqual(19);

			// Test case 3
			const result3 = getFrameIndex(10, 'Threes');
			expect(result3).toEqual(28);

			// Test case 4
			const result4 = getFrameIndex(10, 'Fours');
			expect(result4).toEqual(37);

			// Test case 5
			const result5 = getFrameIndex(10, 'Fives');
			expect(result5).toEqual(46);
		});
	});
});
