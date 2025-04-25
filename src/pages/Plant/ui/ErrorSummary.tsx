import { X } from 'lucide-react';
import { ErrorSummaryProps } from './propTypes';

function ErrorSummary({ errors }: ErrorSummaryProps) {
  return (
    <div className="mt-4 rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <X className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Please correct the following errors:
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="list-disc space-y-1 pl-5">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorSummary;
