import axios from 'axios';
import { TrajectoryTypes } from '../types';

const BASE_URL = 'http://localhost:8080/api/trajectories';

export interface IReq {
  departure?: string;
  arrival?: string;
  startTime?: string;
  endTime?: string;
}

export const fetchTrajectoriesApi = async (
  req?: IReq
): Promise<TrajectoryTypes.Trajectory[]> => {
  const { departure, arrival, startTime, endTime } = req || {};
  const params = new URLSearchParams();
  if (departure) params.append('departure', departure);
  if (arrival) params.append('arrival', arrival);
  if (startTime) params.append('startTime', startTime);
  if (endTime) params.append('endTime', endTime);

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await axios.get(url);
  return res.data;
};

export const fetchAirportsApi = async (): Promise<
  TrajectoryTypes.Airports[]
> => {
  const url = `${BASE_URL}/airports`;
  const res = await axios.get(url);
  return res.data;
};
