// src/components/Modal.jsx
const Modal = ({ visible, onClose, children }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600 text-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-fuchsia-300 transition"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
