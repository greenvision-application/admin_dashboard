import { Heart } from 'lucide-react';
import { MeaningProps } from './propTypes';

const Meaning = ({ meanings }: MeaningProps) => {
  return (
    <div className="rounded-lg bg-gray-100 p-6 shadow-sm">
      <h3 className="mb-3 flex items-center text-lg font-semibold">
        <Heart size={20} className="mr-2 text-red-500" />
        Meaning
      </h3>
      <ul className="list-disc space-y-1 pl-5">
        {meanings.map((item: string, index: number) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Meaning;
