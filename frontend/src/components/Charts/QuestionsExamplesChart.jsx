import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const QuestionsExamplesChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No questions and examples data available</p>;
  }

  // Color palette
  const colors = {
    professor: '#2563eb', // blue-600
    student: '#3b82f6'   // blue-500
  };
  
  // Calculate the maximum value for the Y-axis
  const maxValue = Math.max(
    ...data.map(item => Math.max(
      item.professor_questions || 0,
      item.student_questions || 0
    ))
  ) + 1; // Add 1 for better visualization

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="minute" 
            label={{ value: 'Minute', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis 
            domain={[0, maxValue]}
            label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(label) => `Minute ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontSize: '0.875rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="professor_questions" 
            name="Professor Questions"
            stroke={colors.professor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="student_questions" 
            name="Student Questions"
            stroke={colors.student}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionsExamplesChart;