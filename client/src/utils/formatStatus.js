const formatStatus = (status) => {
  if (status === 'supported') return '🟢 Supported';
  if (status === 'pending') return '🟡 Awaiting Help';
  return '⚪ Unknown';
};

export default formatStatus;
