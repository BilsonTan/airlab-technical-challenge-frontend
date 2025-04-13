export namespace TrajectoryTypes {
    interface Waypoint {
      latitude: number;
      longitude: number;
      altitude: number;
      time: string;
      name: string;
    }
    
    export interface Trajectory {
      id: number;
      adep: string;
      ades: string;
      waypoints: Waypoint[];
    }

    export enum AirportType {
      DEPARTURE = "departure",
      ARRIVAL = "arrival",
      BOTH = "both",
    }
    
    export interface Airports {
      code: string;
      count: number;
      type: AirportType; 
    }
    
    export interface Filters {
      departure?: string;
      arrival?: string;
      startTime?: string;
      endTime?: string;
    }

    export type OptionType = {
      value: string;
      label: string;
    }

    export type TrajectoriesContextType = { 
        trajectories: TrajectoryTypes.Trajectory[];
        arrivalList: OptionType[];
        departureList: OptionType[];
        isLoadingTrajectories: boolean;
        isLoadingAirports: boolean;
        onHandleReset: () => void;
        fetchTrajectories: () => Promise<void>;
        applyFilteredTrajectories: (filtered: TrajectoryTypes.Trajectory[]) => void;
    }
}