import dynamic from "next/dynamic";
//no ssr render of map
const Map = dynamic(() => import("./Map"), { ssr: false });

export default Map;
