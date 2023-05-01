import Col from "../ui/Containers/Col";
import { Appliance } from "../../types/Appliance";
import Image from "next/image";
import Row from "../ui/Containers/Row";
import ToggleSwitch from "../ui/Buttons/ToggleSwitch";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { appliancesAtom } from "../../atom/appliancesAndAperturesAtom";
import { useRecoilState } from "recoil";
import { fetcher } from "../../lib/fetcher";
import { toast } from "react-toastify";

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

export default function ApplianceIndicator({
  appliance,
}: {
  appliance: Appliance;
}) {
  //state
  const [appliances, setAppliances] = useRecoilState(appliancesAtom);

  let applianceOn = new Icon({
    iconUrl: "https://i.imgur.com/EpNdQWV.png",
    iconSize: [30, 30],
  });

  let applianceOff = new Icon({
    iconUrl: "https://i.imgur.com/ZV07q7Q.png",
    iconSize: [30, 30],
  });

  //function that toggles the appliance then updates the state from api response
  const toggleAppliance = async () => {
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
  };

  return (
    <Marker
      key={appliance.pk}
      position={[appliance.fields.x, appliance.fields.y]}
      icon={appliance.fields.status ? applianceOn : applianceOff}
    >
      <Popup closeButton={false} maxWidth={1000}>
        <div className="w-full bg-white text-black">
          <Col className="w-full items-center space-y-2">
            <div className="bg-hPurple-400 w-16 h-16 relative rounded-full">
              <Image
                fill
                src={
                  icons[appliance.fields.appliance_type as keyof typeof icons]
                }
                alt={`${appliance.fields.title} icon`}
                className="p-2"
              />
            </div>
            <h3 className="font-semibold pt-3 text-center text-md">
              {appliance.fields.title}
            </h3>

            <Row className="w-full items-center space-x-3 justify-between">
              {appliance.fields.appliance_type === 1 && (
                <ToggleSwitch
                  enabled={appliance.fields.status}
                  setEnabled={toggleAppliance}
                />
              )}
              {appliance.fields.status ? (
                <Row className="space-x-2 w-full justify-center">
                  <p className="bg-hPurple-400 p-1 px-2 rounded-xl font-medium">
                    On
                  </p>
                </Row>
              ) : (
                <Row className="space-x-2 w-full justify-center">
                  <p className="bg-gray-400 p-1 px-2 rounded-xl font-medium">
                    Off
                  </p>
                </Row>
              )}
            </Row>
          </Col>
        </div>
      </Popup>
    </Marker>
  );
}
