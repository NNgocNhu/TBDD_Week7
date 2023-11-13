import { View, Text, Button , TextInput} from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginComp =( props )=>{
   const [username, setusername] = useState("");
   const [passwd, setpasswd] = useState("");
   const doLogin = ()=>{
       if(username.length == 0) {
           alert("Chưa nhập Username"); return;
       }
       if(passwd.length == 0) {
           alert("Chưa nhập Password"); return;
       }


       let url_check_login = "http://192.168.2.143:3000/users?username=" + username;


       fetch (url_check_login)
       .then ( (res)=>{ return res.json (); } )
       .then (   async  (res_login) => {  
           if(res_login.length != 1)
           {
               alert("Sai username hoặc lỗi trùng lặp dữ liệu");
               return;
           }else{
               let objU = res_login[0];
               if(objU.password != passwd){
                   alert("Sai password"); return;
               }else{
                   try {
                       await AsyncStorage.setItem('loginInfo',  JSON.stringify( objU )   );
                       props.navigation.navigate('HomeComp');


                     } catch (e) {
                       console.log(e);
                     }
               }
           }
       })
   }
   return (
       <View style={{ margin:30}} >
           <Text>Màn hình đăng nhập</Text>
           <TextInput placeholder="Username" onChangeText={  (txt)=>{ setusername(txt)} } />
           <TextInput placeholder="Passwd" onChangeText={  (txt)=>{ setpasswd(txt)} }
                   textContentType="password" secureTextEntry={true} />
           <Button title="Login" onPress={doLogin} />


       </View>
   )
}


export default LoginComp;
