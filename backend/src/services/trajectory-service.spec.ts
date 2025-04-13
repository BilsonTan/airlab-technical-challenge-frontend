import {
  getAllTrajectories,
  getAllAirports,
  loadTrajectories,
} from './trajectory-service';
import { Trajectory, AirportType } from '../types/trajectory-types';
import * as fs from 'fs';
import * as readline from 'readline';

/* 
  Test will fail if run individually, as trajectories are loaded on the first test.
  Trajectories will not be overwritten, as the second test will not load them again.
  This is because trajectories is not reset between tests.
  But test will pass if run in sequence, as the trajectories are loaded after the first test.
*/

jest.mock('fs');
jest.mock('readline');

describe('Trajectory Service', () => {
  const mockTrajectories: Trajectory[] = [
    {
      id: 1,
      adep: 'EHAM',
      ades: 'EDDF',
      waypoints: [
        {
          longitude: 4.7638,
          latitude: 52.3086,
          altitude: 0,
          time: '2023-01-01T10:00:00Z',
          name: 'EHAM',
        },
        {
          longitude: 8.5622,
          latitude: 50.0332,
          altitude: 0,
          time: '2023-01-01T11:00:00Z',
          name: 'EDDF',
        },
      ],
    },
    {
      id: 2,
      adep: 'EDDF',
      ades: 'LFPG',
      waypoints: [
        {
          longitude: 8.5622,
          latitude: 50.0332,
          altitude: 0,
          time: '2023-01-01T12:00:00Z',
          name: 'EDDF',
        },
        {
          longitude: 2.5478,
          latitude: 49.0097,
          altitude: 0,
          time: '2023-01-01T13:00:00Z',
          name: 'LFPG',
        },
      ],
    },
  ];

  const mockInvalidTrajectories = [
    {
      invalid: 'data',
    },
    {
      id: 3,
      adep: 'EDDF',
      ades: 'LFPG',
      waypoints: [
        {
          longitude: 8.5622,
          latitude: 50.0332,
          altitude: 0,
          time: '2023-01-01T12:00:00Z',
          name: 'EDDF',
        },
        {
          longitude: 2.5478,
          latitude: 49.0097,
          altitude: 0,
          time: '2023-01-01T13:00:00Z',
          name: 'LFPG',
        },
      ],
    },
  ];

  beforeEach(() => {
    // Reset mocks
    jest.resetAllMocks();

    // Mock readline.createInterface
    (readline.createInterface as jest.Mock).mockReturnValue({
      [Symbol.asyncIterator]: async function* () {
        yield JSON.stringify(mockTrajectories[0]);
        yield JSON.stringify(mockTrajectories[1]);
        yield JSON.stringify(mockInvalidTrajectories[0]);
        yield JSON.stringify(mockInvalidTrajectories[1]);
      },
      close: jest.fn(),
    } as any);

    // Mock fs.createReadStream
    (fs.createReadStream as jest.Mock).mockReturnValue('mockStream' as any);
  });

  it('Given that there is valid and invalid lines, should load correct trajectories', async () => {
    await loadTrajectories();
    const trajectories = getAllTrajectories();

    expect(fs.createReadStream).toHaveBeenCalled();
    expect(readline.createInterface).toHaveBeenCalled();
    expect(trajectories).toHaveLength(3);
    expect(trajectories[0].id).toBe(1);
    expect(trajectories[1].id).toBe(2);
    expect(trajectories[2].id).toBe(3);
  });

  it('Given trajectories are loaded, getAllAirports should return unique airports with correct types', async () => {
    // Load the trajectories
    const airports = getAllAirports();

    expect(airports).toHaveLength(3);

    // Check if EHAM is a departure airport
    const eham = airports.find((a) => a.code === 'EHAM');
    expect(eham).toBeDefined();
    expect(eham?.type).toBe(AirportType.DEPARTURE);
    expect(eham?.count).toBe(1);

    // Check if EDDF is both departure and arrival
    const eddf = airports.find((a) => a.code === 'EDDF');
    expect(eddf).toBeDefined();
    expect(eddf?.type).toBe(AirportType.BOTH);
    expect(eddf?.count).toBe(3);

    // Check if LFPG is an arrival airport
    const lfpg = airports.find((a) => a.code === 'LFPG');
    expect(lfpg).toBeDefined();
    expect(lfpg?.type).toBe(AirportType.ARRIVAL);
    expect(lfpg?.count).toBe(2);
  });
});
