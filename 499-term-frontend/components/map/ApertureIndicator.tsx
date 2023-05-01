import Col from "../ui/Containers/Col";
import Image from "next/image";
import Row from "../ui/Containers/Row";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Aperture } from "../../types/Aperture";

const icons = {
  1: "https://cdn-icons-png.flaticon.com/512/515/515094.png",
  2: "https://cdn-icons-png.flaticon.com/512/2401/2401126.png",
};

export default function ApertureIndicator({
  aperture,
}: {
  aperture: Aperture;
}) {
  let apertureOff = new Icon({
    iconUrl: "https://i.imgur.com/VLWJJFc.png",
    iconSize: [30, 30],
  });

  let apertureOn = new Icon({
    iconUrl: "https://i.imgur.com/T4mLqPl.png",
    iconSize: [35, 35],
  });

  return (
    <Marker
      position={[aperture.fields.x, aperture.fields.y]}
      icon={aperture.fields.status ? apertureOn : apertureOff}
    >
      <Popup closeButton={false} maxWidth={1000}>
        <div className="w-full bg-white text-black">
          <Col className="w-full items-center space-y-2">
            <div className="bg-hPurple-400 w-16 h-16 relative rounded-full">
              <Image
                fill
                src={icons[aperture.fields.type as keyof typeof icons]}
                alt={`${aperture.fields.title} icon`}
                className="p-3"
              />
            </div>
            <h3 className="font-semibold pt-3 text-center text-md">
              {aperture.fields.title}
            </h3>

            {aperture.fields.status ? (
              <Row className="space-x-2 w-full justify-center">
                <p className="bg-hPurple-400 p-1 px-2 rounded-xl font-medium">
                  Open
                </p>
              </Row>
            ) : (
              <Row className="space-x-2 w-full justify-center">
                <p className="bg-gray-400 p-1 px-2 rounded-xl font-medium">
                  Closed
                </p>
              </Row>
            )}
          </Col>
        </div>
      </Popup>
    </Marker>
  );
}
