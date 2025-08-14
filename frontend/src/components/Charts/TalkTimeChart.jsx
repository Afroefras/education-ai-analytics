import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const TalkTimeChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No hay datos de tiempo de habla</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Distribución del Tiempo de Habla</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minute" />
          <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
          <Tooltip 
            labelFormatter={(label) => `Minuto ${label}`}
            formatter={(value, name) => {
              const labels = {
                professor_percentage: 'Profesor',
                student_percentage: 'Estudiantes'
              };
              return [`${(value * 100).toFixed(1)}%`, labels[name] || name];
            }}
          />
          <Legend 
            formatter={(value) => {
              const labels = {
                professor_percentage: 'Profesor',
                student_percentage: 'Estudiantes'
              };
              return labels[value] || value;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="professor_percentage" 
            stroke="#3B82F6" 
            strokeWidth={3}
            name="professor_percentage"
          />
          <Line 
            type="monotone" 
            dataKey="student_percentage" 
            stroke="#10B981" 
            strokeWidth={3}
            name="student_percentage"
          />
        </LineChart>
      </ResponsiveContainer>
    {/* <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-full hover:bg-blue-700">
      Descargar
    </button> */}
    </div>
  );
};

export default TalkTimeChart;