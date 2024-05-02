// localStorageUtils.ts
export const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('Retrieved user data from localStorage:', userData);
      return userData;
    } else {
      console.log('No user data found in localStorage');
      return null;
    }
  };
  