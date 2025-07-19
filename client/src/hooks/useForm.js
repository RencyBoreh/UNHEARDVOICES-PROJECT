import { useForm as useReactHookForm } from 'react-hook-form';
import { useState } from 'react';

const useForm = (onSubmitCallback) => {
  const { register, handleSubmit, reset } = useReactHookForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();

      formData.append('storyId', data.storyId);
      formData.append('amount', data.amount);
      formData.append('mpesaCode', data.mpesaCode);
      formData.append('proofImage', data.proofImage[0]); // ✅ File input returns array

      // Optional donor info fallback
      formData.append('donorInfo', 'Anonymous'); // or pull from auth context if available

      await onSubmitCallback(formData);

      reset();
      setMessage('Submission successful!');
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, onSubmit, loading, message };
};

export default useForm;
