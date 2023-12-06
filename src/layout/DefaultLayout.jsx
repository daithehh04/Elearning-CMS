import Sider from 'antd/es/layout/Sider';
import Layout, { Content, Footer } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { VideoCameraOutlined, FileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import styles from './DefaultLayout.module.scss';

function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const items = [
    {
      key: '/category',
      icon: <FileOutlined />,
      label: 'Danh mục',
      path: '/category',
    },
    {
      key: '/course',
      icon: <VideoCameraOutlined />,
      label: 'Khóa học',
      path: '/course',
    },
  ];
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
    const path = location.pathname.split('/');
    if (path[1] === 'course' && path[2] === 'chi-tiet-khoa-hoc') {
      setCollapsed(true);
    }
  }, [location, current]);
  const handleClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          zIndex: '5',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={clsx(styles.adminWrapper)}>
          <img
            className={clsx(styles.adminImg)}
            src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
            alt=""
          />
          {!collapsed && (
            <div className={clsx(styles.adminText)}>
              <h5 className={clsx(styles.adminName)}>Admin</h5>
              <button
                className={clsx(styles.adminLogout)}
                onClick={() => {
                  navigate('/dang-nhap');
                  Cookies.remove('tokenAdmin');
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[current]}
          mode="inline"
          onClick={handleClick}
          items={items}
        />
      </Sider>
      <Content className={clsx(styles.content)}>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default DefaultLayout;
