import { RouterBranch, RouterRoot } from '../../../../src';
import { makeRoute } from '../../../shared';

describe('RouterBranch', () => {
	describe('path', () => {
		test('GIVEN a static branch THEN it should return the correct path', () => {
			const value = new RouterBranch('test', false, null);
			expect(value.path).toBe('test');
		});

		test('GIVEN a dynamic branch THEN it should return the correct path', () => {
			const value = new RouterBranch('test', true, null);
			expect(value.path).toBe('[test]');
		});

		test('GIVEN a static branch with a parent THEN it should return the correct path', () => {
			const parent = new RouterBranch('parent', false, null);
			const value = new RouterBranch('test', false, parent);
			expect(value.path).toBe('parent/test');
		});

		test('GIVEN a dynamic branch with a parent THEN it should return the correct path', () => {
			const parent = new RouterBranch('parent', false, null);
			const value = new RouterBranch('test', true, parent);
			expect(value.path).toBe('parent/[test]');
		});

		test('GIVEN the root THEN it should return the correct path', () => {
			const value = new RouterRoot();
			expect(value.path).toBe('');
		});

		test('GIVEN a child of the root THEN it should return the correct path', () => {
			const root = new RouterRoot();
			const value = root.add(makeRoute('test'));
			expect(value.path).toBe('/test');
		});
	});

	describe('children', () => {
		test('GIVEN a branch with no children THEN it should return an empty array', () => {
			const value = new RouterRoot();
			expect(value.children).toEqual([]);
		});

		test('GIVEN a branch with static children THEN it should return the correct children in insert order', () => {
			const value = new RouterRoot();
			value.add(makeRoute('child1'));
			value.add(makeRoute('child2'));
			expect(value.children.map((child) => child.toString())).toEqual(['child1', 'child2']);
		});

		test('GIVEN a branch with dynamic children THEN it should return the correct children in insert order', () => {
			const value = new RouterRoot();
			value.add(makeRoute('[child1]'));
			value.add(makeRoute('[child2]'));
			expect(value.children.map((child) => child.toString())).toEqual(['[child1]']);
		});
	});

	describe('empty', () => {
		test('GIVEN a branch with no children THEN it should return true', () => {
			const value = new RouterRoot();
			expect(value.empty).toBe(true);
		});

		test('GIVEN a branch with static children THEN it should return false', () => {
			const value = new RouterRoot();
			value.add(makeRoute('child1'));
			expect(value.empty).toBe(false);
		});

		test('GIVEN a branch with dynamic children THEN it should return false', () => {
			const value = new RouterRoot();
			value.add(makeRoute('[child1]'));
			expect(value.empty).toBe(false);
		});
	});

	describe('find', () => {
		test('GIVEN a branch with no children THEN it should return null', () => {
			const value = new RouterRoot();
			expect(value.find(['test'])).toBeNull();
		});

		test('GIVEN a branch with a matching child THEN it should return the child', () => {
			const value = new RouterRoot();
			const child = value.add(makeRoute('child'));
			expect(value.find(['child'])?.node).toBe(child);
		});

		test('GIVEN a branch with a non-matching child THEN it should return null', () => {
			const value = new RouterRoot();
			value.add(makeRoute('child'));
			expect(value.find(['child2'])).toBeNull();
		});
	});

	describe('matches', () => {
		test('GIVEN a static branch and a matching part THEN it should return true', () => {
			const value = new RouterBranch('test', false, null);
			expect(value.matches('test')).toBe(true);
		});

		test('GIVEN a static branch and a non-matching part THEN it should return false', () => {
			const value = new RouterBranch('test', false, null);
			expect(value.matches('test2')).toBe(false);
		});

		test('GIVEN a dynamic branch and a matching part THEN it should return true', () => {
			const value = new RouterBranch('test', true, null);
			expect(value.matches('test')).toBe(true);
		});

		test('GIVEN a dynamic branch and a matching part with a different name THEN it should return true', () => {
			const value = new RouterBranch('test', true, null);
			expect(value.matches('test2')).toBe(true);
		});
	});

	describe('normalize', () => {
		test.each([undefined, null, ''])('GIVEN an empty path (%s) THEN it should return an empty array', (input) => {
			const value = RouterRoot.normalize(input);
			expect(value).toEqual([]);
		});

		test('GIVEN a path with no slashes THEN it should return an array with the path', () => {
			const value = RouterRoot.normalize('test');
			expect(value).toEqual(['test']);
		});

		test('GIVEN a path with starting and trailing slashes THEN it should return an array with the path', () => {
			const value = RouterRoot.normalize('/test/');
			expect(value).toEqual(['test']);
		});

		test('GIVEN a path with multiple slashes THEN it should return an array with the path', () => {
			const value = RouterRoot.normalize('/test//test2/');
			expect(value).toEqual(['test', 'test2']);
		});
	});

	describe('extractMethod', () => {
		test('GIVEN an empty path THEN it should return null', () => {
			const value = RouterRoot.extractMethod([]);
			expect(value).toBeNull();
		});

		test('GIVEN a non-empty path with no method THEN it should return null', () => {
			const value = RouterRoot.extractMethod(['foo']);
			expect(value).toBeNull();
		});

		test('GIVEN a path with a method and a part THEN it should return the method', () => {
			const value = RouterRoot.extractMethod(['foo.get']);
			expect(value).toBe('GET');
		});
	});
});
