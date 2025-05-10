// Example of how to use the Modal component
import React, { useState } from 'react';
import { Modal, Button } from '../../../components';

const Setting: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<
    'sm' | 'md' | 'lg' | 'xl' | 'full'
  >('md');

  const openModal = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
    setModalSize(size);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      <div className="space-y-2">
        <h1 className="mb-4 text-2xl font-bold">Modal Examples</h1>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openModal('sm')}>Small Modal</Button>
          <Button onClick={() => openModal('md')}>Medium Modal</Button>
          <Button onClick={() => openModal('lg')}>Large Modal</Button>
          <Button onClick={() => openModal('xl')}>Extra Large Modal</Button>
          <Button onClick={() => openModal('full')}>Full Screen Modal</Button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        size={modalSize}
        showOverlay={false}
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="text" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Your action here
                setIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <div className="py-4">
          <p>
            This is a {modalSize} modal example. You can put any content here.
          </p>
          <p className="mt-2">The modal supports:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Different sizes (sm, md, lg, xl, full)</li>
            <li>Custom headers and footers</li>
            <li>Close on outside click (can be disabled)</li>
            <li>Close on ESC key press (can be disabled)</li>
            <li>Body scroll lock (can be disabled)</li>
            <li>Animation effects</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Setting;
