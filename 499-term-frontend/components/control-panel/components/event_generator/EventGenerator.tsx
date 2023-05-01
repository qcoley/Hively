import { useState } from "react";
import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import EventTabs from "./Tabs";
import Row from "../../../ui/Containers/Row";
import AppliancesForm from "./AppliancesForm";
import AperturesForm from "./AperturesForm";
import AirQualityForm from "./AirQualityForm";

export default function EventGenerator() {
  //state
  const [selectedTab, setSelectedTab] = useState("Appliances");

  return (
    <Panel className="h-full">
      <PanelLabel>Event Generator</PanelLabel>
      <EventTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "Appliances" && <AppliancesForm />}
      {/* cutting this from final project for time contsraints, not exactly necessary */}
      {/* {selectedTab === "Apertures" && <AperturesForm />} */}
      {selectedTab === "Air Quality" && (
        <Row className="w-full h-full justify-center items-center">
          <AirQualityForm />
        </Row>
      )}
    </Panel>
  );
}
