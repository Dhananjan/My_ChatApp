import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";



SplashScreen.preventAutoHideAsync();

export default function signUp() {

  //  const logoPath = require("../assets/images/emptyUser.png");

  const [getImage, setImage] = useState(null);
 const [getMobile, setMobile] = useState("");
 const [getFname, setFname] = useState("");
 const [getLname, setLname] = useState("");
 const [getPassword, setPassword] = useState("");


  

  const [loaded, error] = useFonts({
    "Kanit-SemiBold": require("../assets/fonts/Kanit-SemiBold.ttf"),
    "PlayfairDisplay-Italic-VariableFont_wght": require("../assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "PlayfairDisplay-VariableFont_wght": require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  


  return (
    <View style={styleSheet.scrollView}>

<StatusBar hidden={true}/>

<ScrollView >

      <LinearGradient
        colors={["#632374", "#421579"]}
        style={styleSheet.header}
      >
        <Pressable style={styleSheet.backBtn} onPress={() => {}}>
          <FontAwesome6
            name="house"
            size={20}
            color="#ffffff"
            marginTop={2}
          />
          <Text style={styleSheet.backBtntext} onPress={()=>{router.replace("/")}}>Back</Text>
        </Pressable>

        <Text style={styleSheet.text1}>Sign Up</Text>

        <Text style={styleSheet.text2}> Welcome to MyChat. </Text>
      </LinearGradient>



      <Pressable
        style={styleSheet.imageButton}
        onPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync({});
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        }}
      >
        <Image source={getImage} style={styleSheet.profileImage} borderRadius={50} contentFit={"contain"}/>
      </Pressable>




      <LinearGradient colors={["#632374", "#421579"]} style={styleSheet.formContainer}>
        <Text style={styleSheet.text3}>Mobile</Text>
        <TextInput style={styleSheet.input1} placeholder="Enter Your Mobile" placeholderTextColor="#777" inputMode={"tel"} maxLength={10} onChangeText={
            (text)=>{
              setMobile(text);
            }}
        />

        <Text style={styleSheet.text3}>First Name</Text>
        <TextInput
          style={styleSheet.input1}
          placeholder="Enter Your First Name"
          placeholderTextColor="#777"
          inputMode={"text"}
          onChangeText={(text)=>{
            setFname(text);
          }}
        />

        <Text style={styleSheet.text3}>Last Name</Text>
        <TextInput
          style={styleSheet.input1}
          placeholder="Enter Your Last Name"
          placeholderTextColor="#777"
          inputMode={"text"}
          onChangeText={(text)=>{
            setLname(text);
          }}
        />

        <Text style={styleSheet.text3}>Password</Text>
        <TextInput
          style={styleSheet.input1}
          placeholder="Enter Password"
          placeholderTextColor="#777"
          secureTextEntry={true} maxLength={20}
          onChangeText={(text)=>{
            setPassword(text);
          }}
        />

        <Pressable style={styleSheet.pressable1} onPress={
         async ()=>{

        let formData =  new FormData();
        formData.append("mobile",getMobile);
        formData.append("firstName",getFname);
        formData.append("lastName",getLname);
        formData.append("password",getPassword);

        if(getImage != null){
          formData.append("profileImage",
            {
              name:"avatar.jpg",
              type:"image/jpeg",
              uri:getImage
            }
          );
        }else{
          Alert.alert("Error","Please select Profile Photo");
        }


           let response =await fetch(
            "http://192.168.1.3:8080/My_ChatApp/SignUp",
                {
                  method:"POST",
                  body:formData,

                }
           );


           if(response.ok){
              let json =await response.json();

             if(json.success){
              Alert.alert("Message",json.message);
              router.replace("/");

             }else{
              Alert.alert("Message",json.message);

             }

           }else{
            Alert.alert("Error", "Request failed with status ");

           }

          }
        }>
          <Text style={styleSheet.pressabletext}>Sign Up</Text>
        </Pressable>
      </LinearGradient>

      </ScrollView >

    </View>
  );
}





const styleSheet = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingVertical: 1,
    justifyContent: "center",
  },

  header: {
    width: 255,
    height: 180,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
    columnGap: 9,
    alignSelf: "flex-start",
    marginLeft: 25,
  },

  backBtntext: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  text1: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    alignSelf: "center",
    color: "#ffffff",
    marginTop: 10,
    alignSelf: "flex-start",
    marginLeft: 25,
  },

  formContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    paddingTop: 100,
    paddingHorizontal: 30,
    marginTop: 5,
    height:590
  },

  text2: {
    fontSize: 16,
    fontFamily: "PlayfairDisplay-Italic-VariableFont_wght",
    alignSelf: "flex-start",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
    marginLeft: 25,
  },

  text3: {
    fontSize: 15,
    fontFamily: "PlayfairDisplay-VariableFont_wght",
    color: "#ffffff",
    marginBottom: 3,
  },

  input1: {
    backgroundColor: "#030106",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 17,
  },

  pressable1: {
    backgroundColor: "#2A0C4E",
    borderRadius: 10,
    width:120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    alignSelf:"center",
    marginBottom:30
  },

  pressabletext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  imageButton:{
    width:100,
    height:100,
    borderRadius:50,
    alignSelf:"flex-end",
    marginRight:20,
    backgroundColor:"#2A0C4E"
    
  },

  
  profileImage:{
    borderColor:"hsl(240, 65%, 50%)",
    borderWidth:3,
    height:100,
    width:100,
    
  },


});
