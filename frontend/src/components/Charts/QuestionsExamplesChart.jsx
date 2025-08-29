import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const QuestionsExamplesChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No questions and examples data available</p>;
  }

  // Prepare data - ensure we have the expected structure
  const chartData = Array.isArray(data) 
    ? data 
    : [];

  // Blue and purple color palette
  const colors = {
    'Professor': '#4f46e5', // indigo-600
    'Students': '#6366f1',  // indigo-500
    'Examples': '#8b5cf6'   // purple-500
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData}
          margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, dataMax => Math.ceil(dataMax * 1.1)]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontSize: '0.875rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
          />
          <Bar 
            dataKey="questions" 
            name="Questions" 
            fill={colors.Professor}
            radius={[4, 4, 0, 0]}
            animationBegin={200}
            animationDuration={1500}
          />
          <Bar 
            dataKey="examples" 
            fill={colors.examples} 
            name="examples"
            radius={[4, 4, 0, 0]}
            animationBegin={300}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionsExamplesChart;