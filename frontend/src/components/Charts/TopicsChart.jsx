import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopicsChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500">No hay datos de tópicos</p>;

  // Función para truncar texto largo
  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Preparar datos con conceptos truncados para el display
  const chartData = data.map((item, index) => ({
    ...item,
    conceptDisplay: truncateText(item.concept),
    id: index
  }));

  // Custom tooltip para mostrar el concepto completo
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="max-w-xs p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="mb-1 font-semibold text-gray-800">
            {data.concept}
          </p>
          <p className="text-blue-600">
            Frecuencia: {data.frequency}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Tópicos más mencionados</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData} 
          layout="vertical" 
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="conceptDisplay"
            tick={{ fontSize: 12 }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="frequency" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicsChart;