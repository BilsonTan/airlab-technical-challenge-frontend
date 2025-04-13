import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { TrajectoryTypes } from "../../types";
import { LatLngBounds } from "leaflet";

interface FitMapToBoundsProps {
  trajectories: TrajectoryTypes.Trajectory[];
}

export const FitMapToBounds = (props: FitMapToBoundsProps ) => {
  const map = useMap();
  const { trajectories } = props;

  useEffect(() => {
    if (trajectories.length > 0) {
      const bounds = new LatLngBounds([]);
      trajectories.forEach((traj) => {
        traj.waypoints.forEach((wp) => {
          bounds.extend([wp.latitude, wp.longitude]);
        });
      });

      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [trajectories, map]);

  return null;
};
