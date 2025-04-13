import { renderHook, act } from '@testing-library/react';
import { useTrajectoriesFilters } from './useTrajectoriesFilters';
import { useTrajectoriesContext } from '../context/trajectories-context';
import { fetchTrajectoriesApi } from '../api';

jest.mock('../context/trajectories-context');
jest.mock('../api');

describe('useTrajectoriesFilters', () => {
  const mockApplyFilteredTrajectories = jest.fn();
  const mockOnHandleReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTrajectoriesContext as jest.Mock).mockReturnValue({
      applyFilteredTrajectories: mockApplyFilteredTrajectories,
      onHandleReset: mockOnHandleReset,
    });
  });

  it('Given the hook is called, should initialize with default values', () => {
    const { result } = renderHook(() => useTrajectoriesFilters());

    expect(result.current.filteredTrajectories).toEqual([]);
    expect(result.current.departure).toBe('');
    expect(result.current.arrival).toBe('');
    expect(result.current.startTime).toBeNull();
    expect(result.current.endTime).toBeNull();
  });

  it('Given handleSet is being called, should set the correct states', () => {
    const { result } = renderHook(() => useTrajectoriesFilters());
    const date = new Date();

    act(() => {
      result.current.handleSetArrival('Los Angeles');
      result.current.handleSetDeparture('New York');
      result.current.handleSetStartTime(date);
      result.current.handleSetEndTime(date);
    });

    expect(result.current.departure).toBe('New York');
    expect(result.current.arrival).toBe('Los Angeles');
    expect(result.current.startTime).toBe(date);
    expect(result.current.endTime).toBe(date);
  });

  it('Given handleResetFilters is called, should reset all filters', () => {
    const { result } = renderHook(() => useTrajectoriesFilters());

    const date = new Date();

    act(() => {
      result.current.handleSetArrival('Los Angeles');
      result.current.handleSetDeparture('New York');
      result.current.handleSetStartTime(date);
      result.current.handleSetEndTime(date);
    });

    act(() => {
      result.current.handleResetFilters();
    });
    expect(mockOnHandleReset).toHaveBeenCalled();
    expect(result.current.filteredTrajectories).toEqual([]);
    expect(result.current.departure).toBe('');
    expect(result.current.arrival).toBe('');
    expect(result.current.startTime).toBeNull();
    expect(result.current.endTime).toBeNull();
  });

  it('Given fetchFilteredTrajectories is called, should fetch and set filtered trajectories', async () => {
    const mockData = [{ id: 1, name: 'Trajectory 1' }];
    (fetchTrajectoriesApi as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useTrajectoriesFilters());

    await act(async () => {
      const data = await result.current.fetchFilteredTrajectories({
        departure: 'New York',
        arrival: 'Los Angeles',
      });
      expect(data).toEqual(mockData);
    });

    expect(fetchTrajectoriesApi).toHaveBeenCalledWith({
      departure: 'New York',
      arrival: 'Los Angeles',
    });
    expect(result.current.filteredTrajectories).toEqual(mockData);
  });

  it('Given api error, should handle fetch error gracefully', async () => {
    const mockError = new Error('Could not fetch data');
    (fetchTrajectoriesApi as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useTrajectoriesFilters());

    await act(async () => {
      const data = await result.current.fetchFilteredTrajectories({
        departure: 'New York',
        arrival: 'Los Angeles',
      });
      expect(data).toBeUndefined();
    });

    expect(fetchTrajectoriesApi).toHaveBeenCalledWith({
      departure: 'New York',
      arrival: 'Los Angeles',
    });
    expect(result.current.filteredTrajectories).toEqual([]);
  });
});
