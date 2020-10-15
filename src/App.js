import React, { Component } from "react";
// import { Provider } from "react-redux";
import Router from "./router";
import "./style/base.less";
import "./style/App.less";

// 基础页面
class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;
