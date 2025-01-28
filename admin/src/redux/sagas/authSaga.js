import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from '../slices/authSlice';
import { BASE_URL } from '../../utils/constants';

// API calls
function loginApi(data) {
  return axios.post(`${BASE_URL}/login`, data);
}

function logoutApi() {
  return axios.post(`${BASE_URL}/logout`);
}

// Handle login
function* handleLogin({ payload }) {
  try {
    // Dispatch loading state
    yield put({ type: 'auth/loading', payload: true });

    const response = yield call(loginApi, payload);
    console.log('Login API Response:', response);

    // On successful login, save the token to localStorage
    const { token } = response.data;
    localStorage.setItem('authToken', token); // Store token in localStorage

    // Dispatch success action with the response data
    yield put(loginSuccess(response.data));
  } catch (error) {
    console.error('Login Error:', error);
    yield put(
      loginFailure(
        error.response?.data?.message || 'Login failed. Please try again.'
      )
    );
  } finally {
    // Dispatch loading state
    yield put({ type: 'auth/loading', payload: false });
  }
}

// Handle logout
function* handleLogout() {
  try {
    // Dispatch loading state
    yield put({ type: 'auth/loading', payload: true });

    yield call(logoutApi);

    // On logout, remove the token from localStorage
    localStorage.removeItem('authToken'); // Remove token from localStorage

    yield put(logoutSuccess());
  } catch (error) {
    console.error('Logout Error:', error);
    yield put(
      logoutFailure(
        error.response?.data?.message || 'Logout failed. Please try again.'
      )
    );
  } finally {
    // Dispatch loading state
    yield put({ type: 'auth/loading', payload: false });
  }
}

// Root saga
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
}