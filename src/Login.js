import { View, Text, Button , TextInput,Image} from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login =( props )=>{
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
                       props.navigation.navigate('Home');


                     } catch (e) {
                       console.log(e);
                     }
               }
           }
       })
   }
   return (
       <View style={{ margin:30, flex:1, flexDirection:"column", alignItems:'center'}} >
            <Image style={{height:100, width:'100%', resizeMode:'contain'}} source = {require("../assets/Image 96.png")}/>
           <Text style={{textAlign:'center', fontSize:40,fontFamily:'Roboto-Bold', margin:20,fontWeight: '700'}}>LOGIN</Text>
           <TextInput style={{height:40, width:350, borderWidth:1, borderBlockColor:'#ccc'}} placeholder="Username" onChangeText={  (txt)=>{ setusername(txt)} } />
           <TextInput style={{height:40, width:350, borderWidth:1, borderBlockColor:'#ccc', marginTop:10}}  placeholder="Password" onChangeText={  (txt)=>{ setpasswd(txt)} }
                   textContentType="password" secureTextEntry={true}  />
            <View style={{marginTop:30,height:80, width:'100%'}}>  
                <Button  title="Login" onPress={doLogin} />
            </View>
         


       </View>
   )
}


export default Login;
