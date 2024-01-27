import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import Loading from './components/Loading/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import DefaultLayout from './layout/DefaultLayout';
import { Suspense, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { requestGetUserFromToken } from './stores/slices/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const isLoading = false;

function App() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    const cookie = Cookies.get('tokenAdmin');
    try {
      const result = await dispatch(
        requestGetUserFromToken({ token: cookie || '' })
      );
      unwrapResult(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOutlined />}>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return isLoading ? (
              <Route key={index} path={route.path} element={<Loading />} />
            ) : (
              <Route key={index} path={route.path} element={<Page />} />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route element={<DefaultLayout />} key={index}>
                <Route
                  path={route.path}
                  element={
                    userInfo?._id ? <Page /> : <Navigate to={'/dang-nhap'} />
                  }
                />
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
