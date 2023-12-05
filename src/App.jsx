import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import Loading from './components/Loading/Loading';
import { LoadingOutlined } from '@ant-design/icons';
import DefaultLayout from './layout/DefaultLayout';
import { Suspense } from 'react';

const isLoading = false;
const userInfo = {
  _id: 1,
};
function App() {
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
