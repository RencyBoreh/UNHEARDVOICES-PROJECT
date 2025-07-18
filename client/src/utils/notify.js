import toast from 'react-hot-toast';

const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
};

export default notify;
