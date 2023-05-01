import { Line } from "react-chartjs-2";

export default function Graph({ options, data }: { options: any; data: any }) {
  return <Line options={options as any} data={data} />;
}
