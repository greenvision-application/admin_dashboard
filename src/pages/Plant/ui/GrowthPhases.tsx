import { Sprout } from 'lucide-react';
import { GrowthPhasesProps } from './propTypes';
import { Phase } from '../../../types/plant';

const GrowthPhases = ({ phases }: GrowthPhasesProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center text-lg font-semibold">
        <Sprout size={20} className="mr-2 text-green-500" />
        Growth phases
      </h3>
      <div className="relative mt-8">
        {/* Horizontal connecting line */}
        <div className="absolute top-4 left-0 -z-10 h-0.5 w-full bg-gray-200"></div>

        <div className="flex flex-wrap justify-between">
          {phases.map((phase: Phase, index: number) => (
            <div
              key={phase.id}
              className="relative mb-6 flex flex-col items-center px-2"
              style={{ minWidth: '120px' }}
            >
              {/* Circle indicator */}
              <div className="absolute top-4 left-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-green-500"></div>

              {/* Phase number above the line */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform">
                <span className="text-md inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 font-medium text-green-800">
                  {index + 1}
                </span>
              </div>

              {/* Content below the line */}
              <div className="mt-8 w-full rounded-lg bg-gray-50 p-3 text-center">
                <h4 className="font-medium">{phase.phase_name}</h4>
                <p className="text-xs text-gray-500">Phase {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthPhases;
