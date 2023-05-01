import Panel from "../../ui/Containers/Panel";
import Row from "../../ui/Containers/Row";
import PanelLabel from "../../ui/Labels/PanelLabel";
import { useRecoilValue } from "recoil";
import { airQualityAtom } from "../../../atom/thermoAndAirAtom";
import { useRecoilState } from "recoil";
import { fetcher } from "../../../lib/fetcher";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { Tooltip } from "react-tooltip";

export default function AirQuality() {
  //state
  const [airQuality, setAirQuality] = useRecoilState(airQualityAtom);
  const [error, setError] = useState(false);

  //fetch data
  async function fetchAirQualityData() {
    //get current air qual
    let res = await fetcher.get("air_quality/");
    //handle errors
    if (res.code !== 200) {
      setError(res.message);
      console.error(res.message);
      return;
    }
    //set air quality state
    setAirQuality(res.data);
  }

  //life cycle
  //on mount
  useEffect(() => {
    fetchAirQualityData();
  }, []);

  //interval refetch every 1 minute
  useInterval(() => {
    fetchAirQualityData();
  }, 30000);

  const headingStyle = "text-2xl font-semibold";
  const measureStyle = "font-semibold";
  const panelStyle = "p-4 items-center justify-center";
  return (
    <Panel>
      <PanelLabel>Air Quality</PanelLabel>
      <div className="grid grid-cols-2 w-full h-full">
        {/* CO */}
        <Panel
          className={`${panelStyle} ${
            airQuality?.co_level >= 70
              ? "bg-hError"
              : airQuality?.co_level >= 30
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <div
            data-tooltip-id="co"
            data-tooltip-content={`${
              airQuality?.co_level > 70
                ? "CO level is dangerously high."
                : `${
                    airQuality?.co_level >= 30
                      ? "CO level is higher than acceptable levels."
                      : "CO level is acceptable."
                  }`
            }`}
            className="flex flex-col w-full h-full items-center justify-evenly"
          >
            <h2 className={headingStyle}>CO</h2>
            <p className={measureStyle}>{airQuality?.co_level} PPM</p>
            <Tooltip id="co" place="top" />
          </div>
        </Panel>
        {/* CO2 */}
        <Panel
          className={`${panelStyle} ${
            airQuality?.co2_level >= 2000
              ? "bg-hError"
              : airQuality?.co2_level >= 1000
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <div
            className="flex flex-col w-full h-full items-center justify-evenly"
            data-tooltip-id="co2"
            data-tooltip-content={`${
              airQuality?.co2_level >= 2000
                ? "CO2 level is dangerously high."
                : `${
                    airQuality?.co2_level >= 1000
                      ? "CO2 level is higher than acceptable levels."
                      : "CO2 level is acceptable."
                  }`
            }`}
          >
            <h2 className={headingStyle}>
              CO<sub>2</sub>
            </h2>
            <p className={measureStyle}>{airQuality?.co2_level} PPM</p>
            <Tooltip id="co2" place="top" />
          </div>
        </Panel>
        {/* humidity */}
        <Panel
          className={`${panelStyle} ${
            airQuality?.humidity >= 0.7
              ? "bg-hError"
              : airQuality?.humidity >= 0.6
              ? "bg-hWarning"
              : airQuality?.humidity <= 0.3
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <div
            className="flex flex-col w-full h-full items-center justify-evenly"
            data-tooltip-id="humidity"
            data-tooltip-content={`${
              airQuality?.humidity >= 0.7
                ? "Humidity level is too high."
                : airQuality?.humidity >= 0.6
                ? "Humidity level is higher than acceptable levels."
                : airQuality?.humidity <= 0.3
                ? "Humidity level is lower than acceptable levels."
                : "Humidity level is acceptable."
            }`}
          >
            <h2 className={headingStyle}>
              H<sub>2</sub>O
            </h2>
            <p className={measureStyle}>
              {airQuality?.humidity?.toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 1,
              })}
            </p>
            <Tooltip id="humidity" place="top" />
          </div>
        </Panel>
        {/* pm */}
        <Panel
          className={`${panelStyle} ${
            airQuality?.pm_level >= 50
              ? "bg-hError"
              : airQuality?.pm_level >= 35
              ? "bg-hWarning"
              : "bg-gray-600"
          }`}
        >
          <div
            className="flex flex-col w-full h-full items-center justify-evenly"
            data-tooltip-id="pm"
            data-tooltip-content={`${
              airQuality?.pm_level >= 50
                ? "Particulate matter level is dangerously high."
                : `${
                    airQuality?.pm_level >= 35
                      ? "Particulate matter level is higher than acceptable levels."
                      : "Particulate matter level is acceptable."
                  }`
            }`}
          >
            <h2 className={headingStyle}>PM2.5</h2>
            <p className={measureStyle}>
              {airQuality?.pm_level} &#181;g/m<sup>3</sup>
            </p>
            <Tooltip id="pm" place="top" />
          </div>
        </Panel>
      </div>
    </Panel>
  );
}
