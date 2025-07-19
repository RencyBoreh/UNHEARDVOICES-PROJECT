// server/utils/generateChildAccount.js
const generateChildAccount = (childName, id = '') => {
  if (!childName) return 'UNKNOWN001';
  const cleanName = childName.replace(/\s+/g, '').toUpperCase();
  return `${cleanName}${id.slice(-3) || '001'}`; // Example: GRACEM001
};

module.exports = generateChildAccount;
