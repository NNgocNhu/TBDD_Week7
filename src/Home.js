import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{ useState, useEffect } from "react";


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
   useEffect(() => {
       const unsubscribe = props.navigation.addListener('focus', () => {
          getLoginInfo();
       });
  
       return unsubscribe;
     }, [props.navigation]);
     const SaveProduct = () => {
      let objSP = { title: title, content: content,date:date  };
      let url_api = 'https://63db6922a3ac95cec5a10e24.mockapi.io/demo-api/sanpham';

      fetch(url_api, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(objSP)
      })
          .then((res) => {
              if (res.status == 201)
                  alert("Thêm thành công")
          })
          .catch((ex) => {
              console.log(ex);
          });

  }
   return (
    <View>
    <Text>Màn hình Home</Text>
    <Text>Username: {loginInfo.username}</Text>

    {loginInfo.notes && loginInfo.notes.length > 0 && (
      <View>
        <Text>Notes:</Text>
        {loginInfo.notes.map((note) => (
          <View key={note.id}>
            <Text>Title: {note.title}</Text>
            <Text>Content: {note.content}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
   )
}

export default HomeComp;