import React, { Suspense } from "react";

import { AddPost } from './components/AddPost';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
const Profile = React.lazy(() => import("./components/Profile.js"))

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Profile />
                </React.Fragment>
              }
            />
            <Route
              path="/addPost"
              element={
                <React.Fragment>
                  <AddPost />
                </React.Fragment>
              }
            />
            <Route
              path="/signUp"
              element={
                <React.Fragment>
                  <SignUp />
                </React.Fragment>
              }
            />
            <Route
              path="/login"
              element={
                <React.Fragment>
                  <Login />
                </React.Fragment>
              }
            />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}