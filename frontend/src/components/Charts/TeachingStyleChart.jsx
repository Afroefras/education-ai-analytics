import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

// Lighter blue color palette
const COLORS = [
  '#3b82f6', // blue-500 (lighter)
  '#60a5fa', // blue-400 (lighter)
  '#93c5fd', // blue-300 (lighter)
  '#bfdbfe'  // blue-200 (lighter)
];

const textColor = '#414141';

const TeachingStyleChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No teaching style data available</p>;
  }

  // If data is already in the right format, use it directly
  const pieData = Array.isArray(data) 
    ? data 
    : Object.entries(data).map(([name, value]) => ({
        name: name === 'encouraging' ? 'Encouragement' : name.charAt(0).toUpperCase() + name.slice(1),
        value: value * 100, // Convert to percentage if coming from decimal
        originalKey: name
      })).filter(item => item.value > 0);

  return (
    <div className="h-full w-full flex items-center justify-center p-2">
      <div className="relative w-full h-full min-h-[250px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
            <Pie 
              data={pieData} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={1}
              animationBegin={100}
              animationDuration={1500}
              label={({ name, percent, value }) => {
                // Always show label with consistent format
                return `${(percent * 100).toFixed(0)}% ${name}`;
              }}
              labelLine={{
                stroke: '#94a3b8',
                strokeWidth: 0.5,
                length: 10,
                lengthType: 'pixel',
              }}
              labelStyle={{
                fontSize: '11px',
                fill: textColor,
                fontWeight: '500',
                textShadow: '0 0 5px white',
              }}
            >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
            </Pie>
          <Tooltip 
            formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Percentage']} 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
            {/* Legend removed - labels are now directly on the chart */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeachingStyleChart;