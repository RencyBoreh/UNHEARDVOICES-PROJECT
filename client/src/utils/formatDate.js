const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default formatDate;
