import { OverviewProps } from './propTypes';

const Overview = ({ paragraphs }: OverviewProps) => {
  return (
    <div className="mb-6 space-y-2">
      {paragraphs.map((paragraph: string, index: number) => (
        <p key={index} className="text-gray-700">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Overview;
