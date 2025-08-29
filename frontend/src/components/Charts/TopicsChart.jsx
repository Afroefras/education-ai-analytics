import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TopicsChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-500">No topic data available</p>;

  // Function to truncate long text
  const truncateText = (text, maxLength = 30) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Prepare data with truncated concepts for display
  const chartData = data.map((item, index) => ({
    ...item,
    conceptDisplay: truncateText(item.concept),
    id: index
  }));

  // Custom tooltip to show full concept
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="max-w-xs p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="mb-1 font-semibold text-gray-800">
            {data.concept}
          </p>
          <p className="text-blue-600">
            Frequency: {data.frequency}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData} 
          layout="vertical" 
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[0, 'dataMax']}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => Math.round(value)}
          />
          <YAxis 
            type="category" 
            dataKey="conceptDisplay"
            tick={{ fontSize: 12 }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="frequency" 
            fill="#2563eb" // blue-600
            radius={[0, 4, 4, 0]}
            animationBegin={100}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicsChart;