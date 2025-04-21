import { CheckCircle2 } from 'lucide-react';
import { CharacteristicsProps } from './propTypes';

const Characteristics = ({ characteristics }: CharacteristicsProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-3 flex items-center text-lg font-semibold">
        <CheckCircle2 size={20} className="mr-2 text-green-500" />
        Characteristics
      </h3>
      <ul className="list-disc space-y-1 pl-5">
        {characteristics.map((item: string, index: number) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characteristics;
