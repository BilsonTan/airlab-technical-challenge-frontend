import { Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getColorForRoute } from './utils';
import { TrajectoryTypes } from '../../types';

L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Can implement a legend for the colors based on the routes

interface ITrajectoryMapProps {
  trajectories: TrajectoryTypes.Trajectory[];
}

export const TrajectoryMap = (props: ITrajectoryMapProps) => {
  const { trajectories } = props;
  return (
    <>
      {trajectories.map((trajectory) => {
        const coords = trajectory.waypoints.map((wp) => [
          wp.latitude,
          wp.longitude,
        ]);
        const adep = trajectory.waypoints[0];
        const ades = trajectory.waypoints[trajectory.waypoints.length - 1];
        const color = getColorForRoute(trajectory.adep, trajectory.ades);

        return (
          <div key={trajectory.id}>
            <Polyline
              positions={coords as [number, number][]}
              pathOptions={{ color, weight: 3 }}
            >
              <Tooltip sticky>
                Flight {trajectory.id}: {trajectory.adep} ➜ {trajectory.ades}
              </Tooltip>
            </Polyline>

            <Marker position={[adep.latitude, adep.longitude]}>
              <Popup>Departure: {trajectory.adep}</Popup>
            </Marker>

            <Marker position={[ades.latitude, ades.longitude]}>
              <Popup>Arrival: {trajectory.ades}</Popup>
            </Marker>
          </div>
        );
      })}
    </>
  );
};
