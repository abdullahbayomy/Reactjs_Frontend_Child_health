const getToken = () => {
  return localStorage.getItem('auth');
};

export default getToken;
