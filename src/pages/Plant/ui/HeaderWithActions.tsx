import { Pencil, Trash2 } from 'lucide-react';
import { HeaderWithActionsProps } from './propTypes';

const HeaderWithActions = ({
  plantName,
  scientificName,
  onEdit,
  onDelete
}: HeaderWithActionsProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">{plantName}</h2>
        <p className="text-gray-500 italic">{scientificName}</p>
      </div>
      {onEdit && onDelete && (
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderWithActions;
