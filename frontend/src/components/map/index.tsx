import { MapContainer, TileLayer } from 'react-leaflet';
import { useTrajectoriesContext } from '../../context/trajectories-context';
import { FitMapToBounds } from './fit-map';
import { TrajectoryMap } from './trajectory-map';

export const Map = () => {
  const { trajectories } = useTrajectoriesContext();

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitMapToBounds trajectories={trajectories} />
      <TrajectoryMap trajectories={trajectories} />
    </MapContainer>
  );
};
