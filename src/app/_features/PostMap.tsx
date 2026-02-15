'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CuteSleepingCatLoader } from '../_components/loading/CuteSleepingCatLoader';

// Fix marker icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

const lostPet = new L.Icon({
  iconUrl: '/lostPetPin.svg', // your svg file
  iconSize: [30, 30], // size
  iconAnchor: [20, 40], // bottom center
  popupAnchor: [0, -40],
});

type Props = {
  lat?: number | null;
  lng?: number | null;
};

export default function PostMap({ lat, lng }: Props) {
  if (!Number.isFinite(lat as number) || !Number.isFinite(lng as number)) {
    return (
      <div className="w-full h-48  ">
        <CuteSleepingCatLoader />
      </div>
    );
  }
  return (
    <div className="w-full h-38  overflow-hidden">
      <MapContainer center={[lat as number, lng as number]} zoom={15} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat as number, lng as number]} icon={lostPet}>
          <Popup>Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
