import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const QuestionsExamplesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No hay datos de preguntas y ejemplos</p>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Preguntas y Ejemplos por Minuto</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="minute" />
          <YAxis />
          <Tooltip 
            labelFormatter={(label) => `Minuto ${label}`}
            formatter={(value, name) => {
              const labels = {
                professor_questions: 'Preguntas del Profesor',
                student_questions: 'Preguntas de Estudiantes', 
                examples: 'Ejemplos'
              };
              return [value, labels[name] || name];
            }}
          />
          <Legend 
            formatter={(value) => {
              const labels = {
                professor_questions: 'Preguntas del Profesor',
                student_questions: 'Preguntas de Estudiantes',
                examples: 'Ejemplos'
              };
              return labels[value] || value;
            }}
          />
          <Bar dataKey="professor_questions" fill="#3B82F6" name="professor_questions" />
          <Bar dataKey="student_questions" fill="#10B981" name="student_questions" />
          <Bar dataKey="examples" fill="#F59E0B" name="examples" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionsExamplesChart;