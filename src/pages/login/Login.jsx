import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useEffect, useLayoutEffect } from 'react';
import Cookies from 'js-cookie';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import TTCSconfig from '../../helpers/config';
import { encrypt } from '../../utils/crypto';
import styles from './Login.module.scss';
import {
  requestGetUserFromToken,
  requestLogin,
} from '../../stores/slices/authSlice';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingCheckLogin = useSelector(
    (state) => state.user.loadingCheckLogin
  );
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const cookie = Cookies.get('tokenAdmin');
    try {
      const result = await dispatch(
        requestGetUserFromToken({ token: cookie || '' })
      );
      const data = unwrapResult(result);
      if (data.userInfo?._id) {
        navigate('/');
      }
    } catch (error) {
      if (cookie)
        notification.error({
          message: 'Server đang bị lỗi',
        });
    }
  };

  const handleLogin = async (data) => {
    try {
      const encodePassword = encrypt(data.password);
      const actionResult = await dispatch(
        requestLogin({
          account: data.account,
          password: encodePassword,
          userRole: TTCSconfig.ROLE_ADMIN,
        })
      );

      const res = unwrapResult(actionResult);
      switch (res.loginCode) {
        case TTCSconfig.LOGIN_FAILED:
          return notification.error({
            message: 'Đăng nhập thất bại',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_ACCOUNT_NOT_EXIST:
          return notification.warning({
            message: 'Tài khoản hoặc mật khẩu không đúng',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_WRONG_PASSWORD:
          return notification.warning({
            message: 'Tài khoản hoặc mật khẩu không đúng',
            duration: 1.5,
          });

        case TTCSconfig.LOGIN_SUCCESS:
          Cookies.set('tokenAdmin', res.token, {
            expires: 60 * 60 * 24 * 30,
          });
          navigate('/');
          return notification.success({
            message: 'Đăng nhập thành công',
            duration: 1.5,
          });
      }
    } catch (err) {
      return notification.error({
        message: 'Đăng nhập thất bại, lỗi server',
        duration: 1.5,
      });
    }
  };

  return (
    <>
      <div className={clsx(styles.loginOver)}>
        {loadingCheckLogin ? (
          <LoadingOutlined />
        ) : (
          <div className={clsx(styles.loginWrapper)}>
            <h2 className={clsx(styles.loginTitle)}>Đăng Nhập</h2>
            <Form
              name="normal_login"
              className={clsx(styles.loginForm)}
              initialValues={{
                remember: true,
              }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="account"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này!',
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      className={clsx(styles.inputIcon)}
                      style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}
                    />
                  }
                  placeholder="Nhập tài khoản"
                  style={{ padding: '12px' }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này!',
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <LockOutlined
                      className={clsx(styles.inputIcon)}
                      style={{ fontSize: '1.5rem', marginRight: '0.8rem' }}
                    />
                  }
                  type="password"
                  placeholder="Nhập mật khẩu"
                  style={{ padding: '12px' }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={clsx(styles.loginFormBtn)}
                  // loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
