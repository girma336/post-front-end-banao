export const authenticated = () => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken; // Return true if the authToken exists, otherwise false
};