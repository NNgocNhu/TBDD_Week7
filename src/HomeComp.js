import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useState } from "react";


const HomeComp =(props)=>{
   const [loginInfo, setloginInfo] = useState({})
   const getLoginInfo = async()=>{
       try {
           const value = await AsyncStorage.getItem('loginInfo')
           if(value !== null) {
               setloginInfo (   JSON.parse (value)  );


           }
         } catch(e) {
           console.log(e);
         }
   }


   React.useEffect(() => {
       const unsubscribe = props.navigation.addListener('focus', () => {
          getLoginInfo();
       });
  
       return unsubscribe;
     }, [props.navigation]);






   return (
       <View>
           <Text>Màn hình Home</Text>
           <Text>Username:  {loginInfo.username} -- {loginInfo.fullname} </Text>
       </View>
   )
}


export default HomeComp;