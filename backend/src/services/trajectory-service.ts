import fs from 'fs';
import readline from 'readline';
import path from 'path';
import {
  Airports,
  AirportType,
  Trajectory,
  TrajectorySchema,
} from '../types/trajectory-types';

let trajectories: Trajectory[] = [];

export const loadTrajectories = async () => {
  const filePath = path.join(__dirname, '..', 'data', 'trajectories.jsonl');
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      const result = TrajectorySchema.safeParse(parsed);
      if (result.success) {
        trajectories.push(result.data);
      } else {
        console.warn('Invalid line:', result.error);
      }
    } catch (e) {
      console.error('Failed to parse line:', e);
    }
  }
  console.log(`Loaded ${trajectories.length} trajectories`);
};

export const getAllTrajectories = () => {
  return trajectories;
};

export const getAllAirports = () => {
  const airportMap = new Map<string, Airports>();

  trajectories.forEach((trajectory) => {
    if (!airportMap.has(trajectory.adep)) {
      airportMap.set(trajectory.adep, {
        code: trajectory.adep,
        count: 1,
        type: AirportType.DEPARTURE,
      });
    } else {
      const airport = airportMap.get(trajectory.adep)!;
      airport.count++;
      if (airport.type === AirportType.ARRIVAL) {
        airport.type = AirportType.BOTH;
      }
    }

    if (!airportMap.has(trajectory.ades)) {
      airportMap.set(trajectory.ades, {
        code: trajectory.ades,
        count: 1,
        type: AirportType.ARRIVAL,
      });
    } else {
      const airport = airportMap.get(trajectory.ades)!;
      airport.count++;
      if (airport.type === AirportType.DEPARTURE) {
        airport.type = AirportType.BOTH;
      }
    }
  });

  return Array.from(airportMap.values()).sort((a, b) =>
    a.code.localeCompare(b.code)
  );
};
