import ApertureList from "./components/aperture_list/ApertureList";
import ApplianceList from "./components/appliance_list/ApplianceList";
import EventGenerator from "./components/event_generator/EventGenerator";
import EventLog from "./components/event_log/EventLog";

export default function ControlPanelPage() {
  return (
    <div className="grid grid-cols-1 w-full h-full space-y-4 lg:grid-cols-2 lg:space-y-0">
      {/* status toggle lists */}
      <section className="grid grid-cols-2">
        {/* appliances */}
        <div>
          <ApplianceList />
        </div>
        {/* apertures */}
        <div>
          <ApertureList />
        </div>
      </section>
      {/* event generator/air quality and event log */}
      <section className="flex flex-col space-y-4">
        {/* event generator/air quality */}
        <div className="h-1/2">
          <EventGenerator />
        </div>
        {/* event log */}
        <div className="h-1/2">
          <EventLog />
        </div>
      </section>
    </div>
  );
}
