// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';
const ROOT_URL = 'https://ferreteria-stock.herokuapp.com/api';
 
export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();

    if (data.usuario) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.msg });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: 'Usuario/Password incorrectos '});
  }
}
 
export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}