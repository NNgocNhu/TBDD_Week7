import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComp from './src/LoginComp';
import HomeComp from './src/HomeComp';
const StackDemo = createNativeStackNavigator();


const App = () => {
 return (
   // Bước 3: Định nghĩa Navigation
   //Tình huống 1: App chính chỉ có Nav
   <NavigationContainer>
     <StackDemo.Navigator initialRouteName='LoginComp'>
       <StackDemo.Screen name='HomeComp' component={HomeComp} options={{ title: 'Trang chủ' }} />
       <StackDemo.Screen name='LoginComp' component={LoginComp}
                       options={{headerShown: false}} />
  
     </StackDemo.Navigator>
   </NavigationContainer>


 )


}


export default App;