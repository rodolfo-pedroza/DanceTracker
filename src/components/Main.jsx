import React from 'react';
import { View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import Login from '../pages/Login.jsx'
import Home from '../pages/Home';
import AppBar from './AppBar.jsx';
import Gallery from '../pages/Gallery.jsx';


const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </View>
  );
}

export default Main;
