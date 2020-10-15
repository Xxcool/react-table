import React, { Fragment } from "react";
import {
  Button,
  Table,
  Popconfirm,
  Select,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import axios from "axios";
import "./home.less";
class Home extends React.Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <Button type="link" size="small">
                Delete
              </Button>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      columns: columns,
      data: [],
      inputValue: "",
      visible: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    var api = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(api)
      .then((res) => {
        this.setState({ data: res.data });
        // 将原数据储存到本地，用于排序时候切换
        sessionStorage.setItem("data", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  };

  handleDelete = (id) => {
    const data = [...this.state.data];
    this.setState({ data: data.filter((item) => item.id !== id) });
  };

  handleChange = (value) => {
    const data = [...this.state.data];
    // 当value存在并且为id的时候，按照id降序排列
    // 当value存在并且为name的时候，按照a-z的顺序排列
    if (value) {
      if (value === "id") {
        this.setState({ data: this.sortKey(data, "id") });
      } else {
        let arr = data.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({ data: arr });
      }
    } else {
      // 当value不存在得时候，显示原来的数据
      let oldData = JSON.parse(sessionStorage.getItem("data"));
      this.setState({ data: oldData });
    }
  };

  handelFilter = (e) => {
    const dataList = JSON.parse(sessionStorage.getItem("data"));
    const value = e.target.value;
    this.setState({ inputValue: value });
    let newListData = [];
    // 当输入有值时候进行模糊查询，为空的时候显示原数据
    if (value) {
      dataList.filter((item) => {
        if (item.name.search(value) !== -1) {
          newListData.push(item);
        }
        return newListData;
      });
      this.setState({ data: newListData });
    } else {
      let oldData = JSON.parse(sessionStorage.getItem("data"));
      this.setState({ data: oldData });
    }
  };

  // 排序函数
  sortKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return y - x;
    });
  }

  handelAdd = () => {
    this.setState({
      visible: true,
    });
  };

  // 定义表单
  formRef = React.createRef();

  handleOk = (e) => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        this.formRef.current.resetFields();
        this.setState({
          visible: false,
        });

        const addData = [...this.state.data];
        addData.push(values);
        let count = 0;
        addData.map((item) => {
          count++;
          if (!item.id) {
            item.id = count;
          }
          return item.id;
        });
        message.success("successful");
        // 将新增的数据储存到本地
        sessionStorage.setItem("data", JSON.stringify(addData));
        this.setState({ data: addData });
        console.log(addData);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Option } = Select;
    return (
      <Fragment>
        <div className="container">
          <Form layout="inline">
            <Form.Item label="Filter By">
              <Input
                allowClear
                style={{ width: 120 }}
                value={this.state.inputValue}
                onChange={this.handelFilter}
              />
            </Form.Item>
            <Form.Item label="Sort By">
              <Select
                allowClear
                onChange={this.handleChange}
                style={{ width: 120 }}
              >
                <Option value="id">ID</Option>
                <Option value="name">Name</Option>
              </Select>
            </Form.Item>
            <Button type="primary" onClick={this.handelAdd}>
              Add User
            </Button>
          </Form>
          <Table
            size="small"
            columns={this.state.columns}
            dataSource={this.state.data}
            rowKey={(record) => record.id}
            bordered
          />
        </div>

        <Modal
          title="Add User"
          visible={this.state.visible}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={this.handleOk}>
              Add
            </Button>,
          ]}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            ref={this.formRef}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,

                  message: "E-mail format is incorrect",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
