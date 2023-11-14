import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Login';
import Home from './src/Home';
const StackDemo = createNativeStackNavigator();


const App = () => {
 return (
   <NavigationContainer>
     <StackDemo.Navigator  >
       
       <StackDemo.Screen name='Login' component={Login} options={{headerShown: false}}
                        />
  <StackDemo.Screen name='Home' component={Home} options={{headerShown: false}} />
     </StackDemo.Navigator>
   </NavigationContainer>


 )


}


export default App;