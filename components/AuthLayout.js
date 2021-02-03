import React from 'react';
import { View } from 'react-native';

const AuthLayout = ({ children }) => (
  <View style={{ flex: 1, backgroundColor: '#FFF' }}>{children}</View>
);

export default AuthLayout;
