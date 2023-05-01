/* eslint-disable @next/next/no-img-element */
import Panel from "../../ui/Containers/Panel";
import PanelLabel from "../../ui/Labels/PanelLabel";
import React from "react";
import Map from "../../map";

export default function FloorPlan() {
  return (
    <Panel>
      <PanelLabel>Floor Plan</PanelLabel>
      <Map />
    </Panel>
  );
}
