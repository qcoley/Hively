import AirQuality from "./components/air-quality";
import FloorPlan from "./components/floor-plan";
import Thermostat from "./components/thermostat";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full w-full lg:flex-row">
      {/* floor plan */}
      <section className="flex h-full lg:w-2/3">
        <FloorPlan />
      </section>
      {/* thermo and air quality */}
      <section className="grid grid-cols-2 h-full lg:grid-cols-1 lg:w-1/3">
        {/* thermostat */}
        <div className="flex flex-grow ">
          <Thermostat />
        </div>
        {/* air quality */}
        <div className="flex flex-grow w-full">
          <AirQuality />
        </div>
      </section>
    </div>
  );
}
