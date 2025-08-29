import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

// Blue and purple color palette
const COLORS = [
  '#4f46e5', // indigo-600
  '#6366f1', // indigo-500
  '#8b5cf6', // purple-500
  '#a78bfa'  // purple-400
];

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
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={pieData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            labelLine={false}
            animationBegin={100}
            animationDuration={1500}
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
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: '1rem'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeachingStyleChart;