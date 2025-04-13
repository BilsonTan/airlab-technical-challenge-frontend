import express, { Request, Response } from 'express';
import request from 'supertest';
import trajectoryRoutes from './trajectory-routes';
import * as trajectoryService from '../services/trajectory-service';

jest.mock('../services/trajectory-service');

describe('Trajectory Routes', () => {
  let app: express.Application;
  
  const mockTrajectories = [
    {
      id: 1,
      adep: 'EHAM',
      ades: 'EDDF',
      waypoints: [
        { longitude: 4.7638, latitude: 52.3086, altitude: 0, time: '2023-01-01T10:00:00Z', name: 'EHAM' },
        { longitude: 8.5622, latitude: 50.0332, altitude: 0, time: '2023-01-01T11:00:00Z', name: 'EDDF' }
      ]
    },
    {
      id: 2,
      adep: 'EDDF',
      ades: 'LFPG',
      waypoints: [
        { longitude: 8.5622, latitude: 50.0332, altitude: 0, time: '2023-01-01T12:00:00Z', name: 'EDDF' },
        { longitude: 2.5478, latitude: 49.0097, altitude: 0, time: '2023-01-01T13:00:00Z', name: 'LFPG' }
      ]
    }
  ];
  
  const mockAirports = [
    { code: 'EHAM', count: 1, type: 'departure' },
    { code: 'EDDF', count: 2, type: 'both' },
    { code: 'LFPG', count: 1, type: 'arrival' }
  ];

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/trajectories', trajectoryRoutes);
    
    // Setup mock implementations
    (trajectoryService.getAllTrajectories as jest.Mock).mockReturnValue(mockTrajectories);
    (trajectoryService.getAllAirports as jest.Mock).mockReturnValue(mockAirports);
  });

  test('GET / should return all trajectories when no filters are applied', async () => {
    const response = await request(app).get('/api/trajectories');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].id).toBe(1);
    expect(response.body[1].id).toBe(2);
  });

  test('GET / should filter trajectories by departure airport', async () => {
    const response = await request(app).get('/api/trajectories?departure=EHAM');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(1);
  });

  test('GET / should filter trajectories by arrival airport', async () => {
    const response = await request(app).get('/api/trajectories?arrival=LFPG');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(2);
  });

  test('GET / should filter trajectories by time range', async () => {
    const startTime = '2023-01-01T09:30:00Z';
    const endTime = '2023-01-01T11:30:00Z';
    
    const response = await request(app)
      .get(`/api/trajectories?startTime=${startTime}&endTime=${endTime}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(1);
  });

  test('GET / should handle combined filters', async () => {
    const response = await request(app)
      .get('/api/trajectories?departure=EDDF&arrival=LFPG&startTime=2023-01-01T11:00:00Z');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(2);
  });

  test('GET /airports should return all airports', async () => {
    const response = await request(app).get('/api/trajectories/airports');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAirports);
  });
});