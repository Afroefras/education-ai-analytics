import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopicsChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500">No hay datos de tópicos</p>;

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Tópicos más mencionados</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="concept" />
          <Tooltip />
          <Bar dataKey="frequency" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicsChart;
