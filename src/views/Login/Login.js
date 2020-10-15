import React, { Component } from "react";
import {
  Layout,
  Input,
  Form,
  Button,
  Divider,
  message,
  notification,
} from "antd";
import axios from "axios";
// import { API } from '@/api/config'
import "./login.less";

class Login extends Component {
  state = {
    loading: false,
  };

  enterLoading = () => {
    this.setState({
      loading: true,
    });
  };

  // 定义表单
  formRef = React.createRef();

  handleSubmit = (e) => {
    this.formRef.current.validateFields().then((values) => {
      const { userName, password } = values;
      axios
        .post(`https://www.easy-mock.com/mock/5f87ea516c242c6643ac36f2/login`, {
          userName,
          password,
        })
        .then((res) => {
          const data = res.data.data;
          if (data.code === 1) {
            this.timer = setTimeout(() => {
              message.success("登录成功!");
              this.props.history.push("/home");
            }, 2000);
          } else {
            // 这里处理一些错误信息
          }
        })
        .catch((err) => {});
    });
  };

  componentDidMount() {
    notification.open({
      message: "欢迎使用后台管理平台",
      duration: null,
      description: "账号 admin(管理员) 其他(游客) 密码随意",
    });
  }

  componentWillUnmount() {
    notification.destroy();
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Layout className="login animated fadeIn">
        <div className="model">
          <div className="login-form">
            <h3>后台管理系统</h3>
            <Divider />
            <Form ref={this.formRef}>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input placeholder="用户名" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input type="password" placeholder="密码" />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              登录
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Login;
