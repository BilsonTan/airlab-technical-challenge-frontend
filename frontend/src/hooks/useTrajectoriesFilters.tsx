import { useEffect, useState } from 'react';
import { useTrajectoriesContext } from '../context/trajectories-context';
import { fetchTrajectoriesApi } from '../api';
import { TrajectoryTypes } from '../types';

export const useTrajectoriesFilters = () => {
  const { applyFilteredTrajectories, onHandleReset } = useTrajectoriesContext();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [filteredTrajectories, setFilteredTrajectories] = useState<
    TrajectoryTypes.Trajectory[]
  >([]);

  useEffect(() => {
    filteredTrajectories.length > 0 &&
      applyFilteredTrajectories(filteredTrajectories);
  }, [applyFilteredTrajectories, filteredTrajectories]);

  const fetchFilteredTrajectories = async (req: TrajectoryTypes.Filters) => {
    try {
      const data = await fetchTrajectoriesApi(req);
      setFilteredTrajectories(data);
      return data;
    } catch (error) {
      console.error('Error fetching filtered trajectories:', error);
    }
  };

  const handleResetFilters = () => {
    onHandleReset();
    setFilteredTrajectories([]);
    setDeparture('');
    setArrival('');
    setStartTime(null);
    setEndTime(null);
  };

  const handleSetDeparture = (val: string) => {
    setDeparture(val);
  };

  const handleSetArrival = (val: string) => {
    setArrival(val);
  };

  const handleSetStartTime = (val: Date | null) => {
    setStartTime(val);
  };

  const handleSetEndTime = (val: Date | null) => {
    setEndTime(val);
  };

  return {
    filteredTrajectories,
    departure,
    arrival,
    startTime,
    endTime,
    handleSetStartTime,
    handleSetEndTime,
    fetchFilteredTrajectories,
    handleResetFilters,
    handleSetDeparture,
    handleSetArrival,
  };
};
