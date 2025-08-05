import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#ff00cc', '#ffaa00', '#3357ff', '#00d2ff'];

const mockData = {
  questioning: 0.2022,
  correcting: 0.0315,
  explanation: 0.6562,
  encouraging: 0.1102,
};

const pieData = Object.entries(mockData).map(([name, value]) => ({ name, value }));

export default function TeachingStyleChart() {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Teaching style</h2>
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
