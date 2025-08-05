import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { minute: 0, professor_questions: 0, examples: 0 },
  { minute: 1, professor_questions: 1, examples: 3 },
  { minute: 2, professor_questions: 2, examples: 2 },
  { minute: 3, professor_questions: 1, examples: 2 },
  { minute: 4, professor_questions: 0, examples: 5 },
];

export default function QuestionsExamplesChart() {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Questions and examples</h2>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="minute" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="professor_questions" fill="#8884d8" />
        <Bar dataKey="examples" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}