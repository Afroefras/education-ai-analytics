import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TalkTimeChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No talk time data available</p>;
  }

  // Lighter blue color palette
  const colors = {
    professor: '#3b82f6', // blue-500 (lighter)
    student: '#93c5fd'   // blue-300 (lighter)
  };
  
  const textColor = '#414141';

  // Calculate the maximum value for the Y-axis
  const maxValue = Math.max(
    ...data.map(item => Math.max(
      item.professor_percentage * 100 || 0,
      item.student_percentage * 100 || 0
    ))
  );

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="minute" 
            label={{ value: 'Minute', position: 'insideBottomRight', offset: -5, fill: textColor }}
            tick={{ fill: textColor }}
          />
          <YAxis 
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fill: textColor }}
            tick={{ fill: textColor }}
          />
          <Tooltip 
            formatter={(value, name) => [
              <span style={{ color: textColor }}>{`${Math.round(value)}%`}</span>, 
              <span style={{ color: textColor }}>{name === 'professor_percentage' ? 'Professor' : 'Students'}</span>
            ]}
            labelFormatter={(label) => <span style={{ color: textColor }}>{`Minute ${label}`}</span>}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              fontSize: '0.875rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: textColor
            }}
          />
          <Legend 
            formatter={(value) => (
              <span style={{ color: textColor }}>
                {value === 'professor_percentage' ? 'Professor' : 'Students'}
              </span>
            )}
            wrapperStyle={{ color: textColor }}
          />
          <Area 
            type="monotone" 
            dataKey="professor_percentage" 
            stroke={colors.professor}
            fill={colors.professor}
            fillOpacity={0.3}
            name="Professor"
            unit="%"
            strokeWidth={2}
            dot={false}
          />
          <Area 
            type="monotone" 
            dataKey="student_percentage" 
            stroke={colors.student}
            fill={colors.student}
            fillOpacity={0.3}
            name="Students"
            unit="%"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TalkTimeChart;