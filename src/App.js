import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;
  
  state = {
    progress:0
  }

  setProgress = (progress) =>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />

          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />

          <Routes>
            <Route
              exact
              path="/business"
              element={
                <News setProgress = {this.setProgress}
                  key="business"
                  pageSize={this.pageSize}
                  country="us"
                  category="Business"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress = {this.setProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
                  country="us"
                  category="Entertainment"
                />
              }
            />
            <Route
              exact
              path="/"
              element={
                <News setProgress = {this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
                  country="us"
                  category="General"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News setProgress = {this.setProgress}
                  key="health"
                  pageSize={this.pageSize}
                  country="us"
                  category="Health"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News setProgress = {this.setProgress}
                  key="science"
                  pageSize={this.pageSize}
                  country="us"
                  category="Science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News setProgress = {this.setProgress}
                  key="sports"
                  pageSize={this.pageSize}
                  country="us"
                  category="Sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News setProgress = {this.setProgress}
                  key="technology"
                  pageSize={this.pageSize}
                  country="us"
                  category="Technology"
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}
