module.exports = {
  setLoggedInUser: (payload) => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', JSON.stringify(payload));
    return {
      type: 'SET_LOGGED_IN_USER',
      payload
    }
  },
  unSetLoggedInUser: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    return {
      type: 'UNSET_LOGGED_IN_USER'
    }
  }
}
