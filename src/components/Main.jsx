import React from 'react';
import { View } from 'react-native';
import { Route, Routes } from 'react-router-native';
import Login from '../pages/Login.jsx'
import Home from '../pages/Home';
import AppBar from './AppBar.jsx';
import Gallery from '../pages/Gallery.jsx';


const Main = (navigation) => {
  return (
    <View style={{flex: 1}}>
      <AppBar navigation={navigation} />
    </View>
  );
}

export default Main;
