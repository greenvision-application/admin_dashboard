import { Sparkles } from 'lucide-react';
import { FunctionsProps } from './propTypes';

const Functions = ({ functions }: FunctionsProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-3 flex items-center text-lg font-semibold">
        <Sparkles size={20} className="mr-2 text-purple-500" />
        Uses
      </h3>
      <ul className="list-disc space-y-1 pl-5">
        {functions.map((item: string, index: number) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Functions;
