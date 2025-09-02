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
          <p className="mb-1 font-semibold" style={{ color: '#414141' }}>
            {data.concept}
          </p>
          <p style={{ color: '#3b82f6' }}>
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
            tick={{ fontSize: 12, fill: '#414141' }}
            tickFormatter={(value) => Math.round(value)}
          />
          <YAxis 
            type="category" 
            dataKey="conceptDisplay"
            tick={{ fontSize: 12, fill: '#414141' }}
            width={140}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#93c5fd" /> {/* light blue-300 */}
              <stop offset="100%" stopColor="#1d4ed8" /> /* dark blue-700 */
            </linearGradient>
          </defs>
          <Bar 
            dataKey="frequency" 
            fill="url(#barGradient)"
            radius={[0, 4, 4, 0]}
            animationBegin={100}
            animationDuration={1500}
          >
            {chartData.map((entry, index) => {
              // Calculate color intensity based on frequency (darker for higher values)
              const maxFreq = Math.max(...chartData.map(item => item.frequency));
              const ratio = entry.frequency / maxFreq;
              const blueValue = Math.round(210 - (150 * ratio)); // 210 to 60 (darker blue as frequency increases)
              const color = `hsl(210, 96%, ${65 - (25 * ratio)}%)`; // Adjust lightness based on frequency
              
              return (
                <rect 
                  key={`bar-${index}`}
                  x={entry.x}
                  y={entry.y}
                  width={entry.width}
                  height={entry.height}
                  fill={color}
                  rx={4}
                  ry={4}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicsChart;