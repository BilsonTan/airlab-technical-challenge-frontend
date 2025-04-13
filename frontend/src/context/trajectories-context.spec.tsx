import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import {
  TrajectoriesProvider,
  useTrajectoriesContext,
} from './trajectories-context';
import { fetchTrajectoriesApi, fetchAirportsApi } from '../api';
import { TrajectoryTypes } from '../types';

jest.mock('../api');

const mockTrajectories = [
  {
    id: 1,
    adep: 'VTBS',
    ades: 'WIII',
    waypoints: [],
  },
] as TrajectoryTypes.Trajectory[];

const mockAirports = [
  { code: 'JFK', count: 2, type: TrajectoryTypes.AirportType.DEPARTURE },
  { code: 'LAX', count: 1, type: TrajectoryTypes.AirportType.BOTH },
] as TrajectoryTypes.Airports[];

(fetchTrajectoriesApi as jest.Mock).mockResolvedValue(mockTrajectories);
(fetchAirportsApi as jest.Mock).mockResolvedValue(mockAirports);

const TestComponent = () => {
  const {
    trajectories,
    departureList,
    arrivalList,
    isLoadingTrajectories,
    isLoadingAirports,
  } = useTrajectoriesContext();

  return (
    <div>
      <div data-testid="trajectory-count">{trajectories.length}</div>
      <div data-testid="departure-count">{departureList.length}</div>
      <div data-testid="arrival-count">{arrivalList.length}</div>
      <div data-testid="loading-trajectories">
        {String(isLoadingTrajectories)}
      </div>
      <div data-testid="loading-airports">{String(isLoadingAirports)}</div>
    </div>
  );
};

describe('TrajectoriesContext', () => {
  it('Given the api calls are mocked and called, should provide the correct trajectory and airport data', async () => {
    render(
      <TrajectoriesProvider>
        <TestComponent />
      </TrajectoriesProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('trajectory-count')).toHaveTextContent('1')
    );
    expect(screen.getByTestId('departure-count')).toHaveTextContent('2');
    expect(screen.getByTestId('arrival-count')).toHaveTextContent('1');
    expect(screen.getByTestId('loading-trajectories')).toHaveTextContent(
      'false'
    );
    expect(screen.getByTestId('loading-airports')).toHaveTextContent('false');
  });
});
