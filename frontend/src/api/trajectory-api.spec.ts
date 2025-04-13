import axios from 'axios';
import { fetchTrajectoriesApi, fetchAirportsApi, IReq } from './trajectory-api';
import { TrajectoryTypes } from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('trajectory-api', () => {
  describe('fetchTrajectoriesApi', () => {
    it('should fetch trajectories with query parameters', async () => {
      const mockResponse: TrajectoryTypes.Trajectory[] = [
        {
          id: 1,
          adep: 'JFK',
          ades: 'LAX',
          waypoints: [
            {
              latitude: 40.6413,
              longitude: -73.7781,
              altitude: 10000,
              time: '2025-04-13T10:00:00Z',
              name: 'Waypoint 1',
            },
          ],
        },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

      const req: IReq = {
        departure: 'JFK',
        arrival: 'LAX',
        startTime: '2025-04-13T10:00:00Z',
        endTime: '2025-04-13T14:00:00Z',
      };
      const result = await fetchTrajectoriesApi(req);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/trajectories?departure=JFK&arrival=LAX&startTime=2025-04-13T10%3A00%3A00Z&endTime=2025-04-13T14%3A00%3A00Z'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch trajectories without query parameters', async () => {
      const mockResponse: TrajectoryTypes.Trajectory[] = [
        {
          id: 1,
          adep: 'JFK',
          ades: 'LAX',
          waypoints: [
            {
              latitude: 40.6413,
              longitude: -73.7781,
              altitude: 10000,
              time: '2025-04-13T10:00:00Z',
              name: 'Waypoint 1',
            },
          ],
        },
        {
          id: 2,
          adep: 'LAX',
          ades: 'JFK',
          waypoints: [
            {
              latitude: 34.0522,
              longitude: -118.2437,
              altitude: 20000,
              time: '2025-04-13T12:00:00Z',
              name: 'Waypoint 2',
            },
          ],
        },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchTrajectoriesApi();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/trajectories?'
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchAirportsApi', () => {
    it('should fetch airports', async () => {
      const mockResponse: TrajectoryTypes.Airports[] = [
        { code: 'JFK', count: 2, type: TrajectoryTypes.AirportType.DEPARTURE },
        { code: 'LAX', count: 1, type: TrajectoryTypes.AirportType.BOTH },
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchAirportsApi();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:8080/api/trajectories/airports'
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
