import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, SplashScreen, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";



SplashScreen.preventAutoHideAsync();


export default function ProfileUpdate() {

    
    //get parameters from home
 

    // const profileView = "http://192.168.1.2:8080/My_ChatApp/ProfileImages/"+user.mobile+"/profile.jpg";

    
    const [getImage, setImage] = useState(null);
    const [getMobile, setMobile] = useState(null);
    const [getFname, setFname] = useState(null);
    const [getLname, setLname] = useState(null);



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
    

      useEffect(() => {
        // Fetch user data from AsyncStorage on component mount
        async function fetchData() {
          try {
            const userJson = await AsyncStorage.getItem('user');
            if (userJson) {
              const user = JSON.parse(userJson);
              setMobile(user.mobile);
              setFname(user.first_name);
              setLname(user.last_name);
              setImage("http://192.168.1.3:8080/My_ChatApp/ProfileImages/"+user.mobile+"/profile.jpg"); // Update profile image URL

              


            } else {
              Alert.alert('Error', 'User data not found.');
            }
          } catch (error) {
            console.error('Error loading user data:', error);
            Alert.alert('Error', 'Failed to load user data.');
          }
        }
    
        fetchData();
      }, []); // Empty dependency array ensures this runs only once on load
    





  return (
    <LinearGradient
      colors={["#05295C", "#062836", "#0d1b2a"]}
      style={styleSheet.view1}
    >
      <StatusBar hidden={true} />


      <Pressable style={styleSheet.view2}
       onPress={async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }}>

        <Image source={{ uri: getImage }} contentFit="contain" style={styleSheet.profilePhoto} />
      </Pressable>



      <View>
        <Text style={styleSheet.text1}>First Name</Text>
        <TextInput
          style={styleSheet.input1}
          value={getFname}
          placeholderTextColor="#777"
          inputMode={"text"}
          onChangeText={(text) => {
            setFname(text)
          }}
          edieditable={false}
        />

        <Text style={styleSheet.text1}>Last Name</Text>
        <TextInput
          style={styleSheet.input1}
          value={getLname}
          placeholderTextColor="#777"
          inputMode={"text"}
          onChangeText={(text) => {
            setLname(text)
          }}
          edieditable={false}
        />

        <Text style={styleSheet.text1}>Mobile</Text>
        <TextInput
          style={styleSheet.input1}
          value={getMobile}
          placeholderTextColor="#777"
          inputMode={"tel"}
          maxLength={10}
          edieditable={false}
        />

      

      </View>

      <Pressable style ={styleSheet.updateProfileButton} onPress={
        async()=>{

              let form = new FormData();
              form.append("firstName",getFname);
              form.append("lastName",getLname);
              form.append("mobile",getMobile);

              if(getImage != null){
                form.append("profileImage",
                  {
                    name:"avatar.jpg",
                    type:"image/jpeg",
                    uri:getImage
                  }
                );
              }else{
                Alert.alert("Error","Please select Profile Photo");
              }


              let response = await fetch(
                "http://192.168.1.3:8080/My_ChatApp/UpdateProfile",

                {
                  method:"POST",
                  body:form,
                }
              );


              if(response.ok){
                let json =await response.json();

                if(json.success){
                 
                    
                  await AsyncStorage.setItem("user",JSON.stringify(json.user));  //memagin promis ekak return we. Promise -> yamkisi welawak yana wadak

                  console.log("update User "+json.user);

                  Alert.alert("Message",json.message);

                   router.replace("/home");


                }else{
                  Alert.alert("Message",json.message);
                }

              }else{
                Alert.alert("Error","Error");
              }


      }}>
        <Text style={styleSheet.text10}>Update</Text>
      </Pressable>




    </LinearGradient>
  );
}

const styleSheet = StyleSheet.create({
  view1: {
    flex: 1,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  view2: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    marginBottom:100
  },

  profilePhoto: {
    width: 210,
    height: 210,
    borderRadius: 105,
    color: "white",
  },

  text1: {
    fontSize: 15,
    fontFamily: "PlayfairDisplay-VariableFont_wght",
    color: "#ffffff",
    marginBottom: 3,
  },

  input1: {
    backgroundColor: "#2e3a4b",
    borderRadius: 10,
    width:350,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 17,
  },

  updateProfileButton:{
    height:55,
    width:150,
    backgroundColor:"#05295C",
    
    alignItems:"center",
    justifyContent:"center",
    borderRadius:8,
    marginTop:20
  },

  text10:{
    fontSize:17,
    fontWeight:"bold",
    color:"white",
  }


});
