import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import style from "./Map.module.css";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import ApplianceIndicator from "./ApplianceIndicator";
import ApertureIndicator from "./ApertureIndicator";
import { useRecoilState } from "recoil";
import {
  appliancesAtom,
  aperturesAtom,
} from "../../atom/appliancesAndAperturesAtom";
import { fetcher } from "../../lib/fetcher";
import { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";

export default function Map() {
  //map bounds
  const bounds = new LatLngBounds([0, 0], [13.5, 20]);

  //state
  const [appliances, setAppliances] = useRecoilState(appliancesAtom);
  const [apertures, setApertures] = useRecoilState(aperturesAtom);

  const [applianceError, setApplianceError] = useState(null);
  const [apertureError, setApertureError] = useState(null);

  //fetch appliances
  async function fetchAppliances() {
    let res = await fetcher.get("appliances/");
    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      setApplianceError(res.message);
    }
    setAppliances(res.data);
  }

  //fetch apertures
  async function fetchApertures() {
    let res = await fetcher.get("apertures/");
    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      setApertureError(res.message);
    }
    setApertures(res.data);
  }

  //fetch appliances on mount
  useEffect(() => {
    fetchAppliances();
    fetchApertures();
  }, []);

  return (
    <MapContainer
      center={[6.75, 10]}
      zoom={6}
      className={style.map}
      scrollWheelZoom={true}
    >
      <ImageOverlay
        url="https://i.imgur.com/DPHT5O3.png"
        bounds={bounds}
        s
        opacity={1}
        zIndex={30}
      />
      {appliances.map((appliance) => (
        <ApplianceIndicator key={appliance.pk} appliance={appliance} />
      ))}
      {apertures.map((aperture) => (
        <ApertureIndicator key={aperture.pk} aperture={aperture} />
      ))}
    </MapContainer>
  );
}
