import React from 'react';

const Popup = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Judul Popup</h2>
        <p className="mb-4">Ini adalah teks konten dalam popup.</p>
        <div className="flex justify-between">
          <button onClick={onSave} className="bg-green-500 text-white px-4 py-2 rounded">Save to Favourite</button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
