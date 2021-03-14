import { act, renderHook } from '@testing-library/react-hooks';
import { useDataApi } from './index';

const useApiFetchMock = [{ title: 'Hello' }, { title: 'World' }];

const mockFetch = (mockData) => {
	global.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
			json: () => Promise.resolve(mockData),
		}),
	);
};

const mockFetchError = (error) => {
	global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () =>
	act(() => {
		global.fetch.mockClear();
		delete global.fetch;
	});

describe('useDataApi Hook', () => {
	it('loading and success state', async () => {
		act(() => mockFetch(useApiFetchMock));
		const { result, waitForNextUpdate } = renderHook(() => useDataApi());
		expect(result.current.loading).toBe(true);

		await act(async () => {
			result.current.callApi('test');
			await waitForNextUpdate();
		});

		expect(result.current.loading).toBe(false);
		expect(result.current.data).toMatchObject(useApiFetchMock);
		mockFetchCleanUp();
	});

	it('error state', async () => {
		mockFetchError('Network Error');
		const { result, waitForNextUpdate } = renderHook(() => useDataApi());
		// we will skip the tests for the initial state
		await act(async () => {
			result.current.callApi('test');
			await waitForNextUpdate();
		});
		expect(result.current).toMatchObject({
			data: null,
			error: 'Network Error',
		});
		mockFetchCleanUp();
	});
});
