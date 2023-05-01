import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import SearchInput from "../SearchInput";
import { useRecoilState } from "recoil";
import { appliancesAtom } from "../../../../atom/appliancesAndAperturesAtom";
import Row from "../../../ui/Containers/Row";
import { Appliance } from "../../../../types/Appliance";
import ToggleSwitch from "../../../ui/Buttons/ToggleSwitch";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetcher } from "../../../../lib/fetcher";
import { toast } from "react-toastify";
import { useInterval } from "usehooks-ts";

const icons = {
  1: "https://cdn-icons-png.flaticon.com/512/2961/2961545.png",
  2: "https://cdn-icons-png.flaticon.com/512/9886/9886552.png",
  3: "https://cdn-icons-png.flaticon.com/512/393/393260.png",
  4: "https://cdn-icons-png.flaticon.com/512/3100/3100641.png",
  5: "https://cdn-icons-png.flaticon.com/512/9886/9886672.png",
  6: "https://cdn-icons-png.flaticon.com/512/9886/9886621.png",
  7: "https://cdn-icons-png.flaticon.com/512/9886/9886586.png",
  8: "https://cdn-icons-png.flaticon.com/512/1682/1682983.png",
  9: "https://cdn-icons-png.flaticon.com/512/5789/5789553.png",
  10: "https://cdn-icons-png.flaticon.com/512/9013/9013994.png",
  11: "https://cdn-icons-png.flaticon.com/512/3043/3043939.png",
  12: "https://cdn-icons-png.flaticon.com/512/3172/3172961.png",
  13: "https://cdn-icons-png.flaticon.com/512/9886/9886558.png",
  14: "https://cdn-icons-png.flaticon.com/512/6895/6895845.png",
  15: "https://cdn-icons-png.flaticon.com/512/9886/9886593.png",
};

export default function ApplianceList() {
  //state
  const [appliances, setAppliances] = useRecoilState(appliancesAtom);
  const [query, setQuery] = useState("");

  //filter appliances by query
  let filteredAppliances =
    query === ""
      ? appliances
      : appliances.filter((appliance: Appliance) =>
          appliance.fields.title.toLowerCase().includes(query.toLowerCase())
        );

  //fetch appliances
  async function fetchAppliances() {
    let res = await fetcher.get("appliances/");
    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      toast(`Failed to fetch appliance list`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setAppliances(res.data);
  }

  //life cycles
  //on mount
  useEffect(() => {
    fetchAppliances();
  }, []);

  return (
    <Panel className="h-full">
      <PanelLabel>Appliance List</PanelLabel>
      <SearchInput id="search-appliances" query={query} setQuery={setQuery} />
      <Row className="w-full border-b-2 border-gray-800 ">
        <p className="w-3/5 p-3">Appliance</p>
        <p className="w-2/5 p-3 border-l-2 border-gray-800">Status</p>
      </Row>
      <ul className="overflow-y-auto max-h-[69vh] 2xl:max-h-[80vh]">
        {filteredAppliances.map((appliance: Appliance) => (
          <li key={appliance.pk}>
            <Row className="w-full border-b-2 border-gray-800 ">
              <Row className="w-3/5 p-3 space-x-4">
                <div className="bg-hPurple-400 w-8 h-8 relative rounded-full">
                  <Image
                    fill
                    src={
                      icons[
                        appliance.fields.appliance_type as keyof typeof icons
                      ]
                    }
                    alt={`${appliance.fields.title} icon`}
                    className="p-1"
                  />
                </div>
                <span>{appliance?.fields.title}</span>
              </Row>
              <div className="w-2/5 flex items-center justify-center">
                <ToggleSwitch
                  enabled={appliance?.fields.status}
                  setEnabled={async () => {
                    const oldAppliances = appliances;

                    //toggle state
                    const newAppliances = appliances.map((app: Appliance) => {
                      if (app.pk === appliance.pk) {
                        return {
                          ...app,
                          fields: {
                            ...app.fields,
                            status: !app.fields.status,
                          },
                        };
                      }
                      return app;
                    });
                    setAppliances(newAppliances);

                    let payload = {
                      id: appliance.pk,
                    };

                    let res = await fetcher.post("appliances/", payload);

                    console.log(res);

                    //check errors, if bad notify and reset state
                    if (res.code !== 200) {
                      setAppliances(oldAppliances);
                      toast(`Failed to toggle ${appliance.fields.title}`, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                      return;
                    }
                  }}
                />
              </div>
            </Row>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
