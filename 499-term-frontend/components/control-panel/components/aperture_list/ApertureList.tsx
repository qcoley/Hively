import { useRecoilState } from "recoil";
import Panel from "../../../ui/Containers/Panel";
import PanelLabel from "../../../ui/Labels/PanelLabel";
import { aperturesAtom } from "../../../../atom/appliancesAndAperturesAtom";
import { useEffect, useState } from "react";
import { Aperture } from "../../../../types/Aperture";
import SearchInput from "../SearchInput";
import Row from "../../../ui/Containers/Row";
import ToggleSwitch from "../../../ui/Buttons/ToggleSwitch";
import Image from "next/image";
import { fetcher } from "../../../../lib/fetcher";
import { toast } from "react-toastify";
import { useInterval } from "usehooks-ts";

const icons = {
  1: "https://cdn-icons-png.flaticon.com/512/515/515094.png",
  2: "https://cdn-icons-png.flaticon.com/512/2401/2401126.png",
};

export default function ApertureList() {
  //state
  const [apertures, setApertures] = useRecoilState(aperturesAtom);
  const [query, setQuery] = useState("");

  //filter appliances by query
  let filteredApertures =
    query === ""
      ? apertures
      : apertures.filter((aperture: Aperture) =>
          aperture.fields.title.toLowerCase().includes(query.toLowerCase())
        );

  //fetch appliances
  async function fetchApertures() {
    let res = await fetcher.get("apertures/");
    //check errors
    if (res.code !== 200) {
      console.error(res.message);
      toast(`Failed to fetch aperture list`, {
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
    setApertures(res.data);
  }

  //life cycles
  //on mount
  useEffect(() => {
    fetchApertures();
  }, []);

  return (
    <Panel className="h-full">
      <PanelLabel>Aperture List</PanelLabel>
      <SearchInput id="search-apertures" query={query} setQuery={setQuery} />
      <Row className="w-full border-b-2 border-gray-800 ">
        <p className="w-3/5 p-3">Aperture</p>
        <p className="w-2/5 p-3 border-l-2 border-gray-800">Status</p>
      </Row>
      <ul className="overflow-y-auto max-h-[69vh] 2xl:max-h-[80vh]">
        {filteredApertures.map((aperture: Aperture) => (
          <li key={aperture.pk}>
            <Row className="w-full border-b-2 border-gray-800 ">
              <Row className="w-3/5 p-3 space-x-4">
                <div className="bg-hPurple-400 w-8 h-8 relative rounded-full">
                  <Image
                    fill
                    src={icons[aperture.fields.type as keyof typeof icons]}
                    alt={`${aperture.fields.title} icon`}
                    className="p-1"
                  />
                </div>
                <span>{aperture?.fields.title}</span>
              </Row>
              <div className="w-2/5 flex items-center justify-center">
                <ToggleSwitch
                  enabled={aperture?.fields.status}
                  setEnabled={async () => {
                    const oldApertures = apertures;

                    //toggle state
                    const newApertures = apertures.map((app: Aperture) => {
                      if (app.pk === aperture.pk) {
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
                    setApertures(newApertures);

                    let payload = {
                      id: aperture.pk,
                    };

                    let res = await fetcher.post("apertures/", payload);

                    //check errors, if bad notify and reset state
                    if (res.code !== 200) {
                      setApertures(oldApertures);
                      toast(`Failed to toggle ${aperture.fields.title}`, {
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
