import { TrajectoriesProvider } from "../context/trajectories-context";
import { FilterBar } from "./filter";
import { Map } from "./map";

export const AircraftTrajectories = () => {
  return (
    <TrajectoriesProvider>
      <>
        <h1>Aircraft Trajectories</h1>
        <FilterBar />
        <Map />
      </>
    </TrajectoriesProvider>
  );
};
