import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { minute: 0, professor_percentage: 1.0 },
  { minute: 1, professor_percentage: 0.8889 },
  { minute: 2, professor_percentage: 1.0 },
  { minute: 3, professor_percentage: 1.0 },
  { minute: 4, professor_percentage: 1.0 },
];

export default function TalkTimeChart() {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Talk time</h2>
      <LineChart width={1000} height={300} data={data}>
        <XAxis dataKey="minute" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Line type="monotone" dataKey="professor_percentage" stroke="#2f49eb" strokeWidth={2} />
      </LineChart>
      <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-full">Download</button>
    </div>
  );
}