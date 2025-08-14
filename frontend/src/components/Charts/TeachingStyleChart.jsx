import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const TeachingStyleChart = ({ data }) => {
  if (!data) {
    return <p className="text-gray-500">No hay datos de estilo de enseñanza</p>;
  }

  const labels = {
    questioning: 'Preguntas',
    correcting: 'Correcciones', 
    explanation: 'Explicaciones',
    encouraging: 'Aliento'
  };

  const pieData = Object.entries(data).map(([name, value]) => ({ 
    name: labels[name] || name, 
    value: value,
    originalKey: name
  }));

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Estilo de Enseñanza</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={pieData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={80}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeachingStyleChart;