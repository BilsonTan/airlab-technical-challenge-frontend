import React, { createContext, useContext, useEffect, useState } from 'react';
import { TrajectoryTypes } from '../types';
import { fetchTrajectoriesApi, fetchAirportsApi } from '../api';
import isEmpty from 'lodash/isEmpty';

const TrajectoriesContext = createContext<
  TrajectoryTypes.TrajectoriesContextType | undefined
>(undefined);

export const TrajectoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trajectories, setTrajectories] = useState<
    TrajectoryTypes.Trajectory[]
  >([]);
  const [departureList, setDepartureList] = useState<
    TrajectoryTypes.OptionType[]
  >([]);
  const [arrivalList, setArrivalList] = useState<TrajectoryTypes.OptionType[]>(
    []
  );
  const [isLoadingTrajectories, setIsLoadingTrajectories] = useState(false);
  const [isLoadingAirports, setIsLoadingAirports] = useState(false);

  const fetchTrajectories = async () => {
    setIsLoadingTrajectories(true);
    const data = await fetchTrajectoriesApi();
    setTrajectories(data);
    setIsLoadingTrajectories(false);
  };

  const fetchAirports = async () => {
    setIsLoadingAirports(true);
    const data = await fetchAirportsApi();
    const departures = data.filter(
      (airport) =>
        airport.type === TrajectoryTypes.AirportType.DEPARTURE ||
        airport.type === TrajectoryTypes.AirportType.BOTH
    );
    const arrivals = data.filter(
      (airport) =>
        airport.type === TrajectoryTypes.AirportType.ARRIVAL ||
        airport.type === TrajectoryTypes.AirportType.BOTH
    );
    setDepartureList(
      departures.map((airport) => {
        return { value: airport.code, label: airport.code };
      })
    );
    setArrivalList(
      arrivals.map((airport) => {
        return { value: airport.code, label: airport.code };
      })
    );
    setIsLoadingAirports(false);
  };

  const applyFilteredTrajectories = (
    filtered: TrajectoryTypes.Trajectory[]
  ) => {
    setTrajectories(filtered);
  };

  const onHandleReset = () => {
    setTrajectories([]);
    setDepartureList([]);
    setArrivalList([]);
  };

  useEffect(() => {
    if (isEmpty(trajectories)) {
      fetchTrajectories();
      fetchAirports();
    }
  }, [trajectories]);

  return (
    <TrajectoriesContext.Provider
      value={{
        trajectories,
        departureList,
        arrivalList,
        isLoadingTrajectories,
        isLoadingAirports,
        fetchTrajectories,
        onHandleReset,
        applyFilteredTrajectories,
      }}
    >
      {children}
    </TrajectoriesContext.Provider>
  );
};

export const useTrajectoriesContext = () => {
  const context = useContext(TrajectoriesContext);
  if (!context) {
    throw new Error(
      'useTrajectoriesContext must be used within a TrajectoriesProvider'
    );
  }
  return context;
};
