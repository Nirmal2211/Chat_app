
// import React, { useEffect, useState } from 'react';
// import { View, Button, Text, StyleSheet, TextInput, Alert } from 'react-native';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { auth } from '../firebase';

// const Login = ({ navigation }) => {


//     const [email, setemail] = useState();
//     const [Password, setpassword] = useState();

//     const handleEmailLogin = () => {
//         auth()
//             .signInWithEmailAndPassword(email,Password)
//             .then(() => {
//                 Alert.alert('...', 'User account signed in!');
//             })
//             .catch(error => {
//                 if (error.code === 'auth/email-already-in-use') {
//                     console.log('That email address is already in use!');
//                 }

//                 if (error.code === 'auth/invalid-email') {
//                     console.log('That email address is invalid!');
//                 }

//                 console.error(error);
//             });
//     }

//     // Set an initializing state whilst Firebase connects
//     const [initializing, setInitializing] = useState(true);
//     const [user, setUser] = useState();

//     // Handle user state changes
//     function onAuthStateChanged(user) {
//         setUser(user);
//         if (initializing) setInitializing(false);
//     }

//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//     }, []);



//     useEffect(() => {
//         GoogleSignin.configure({
//             webClientId: '21528469527-gfrj2vmijvvlm02l9qq2e3kqfeiot2gj.apps.googleusercontent.com', // From Firebase Console
//         });
//     }, []);

//     const onGoogleButtonPress = async () => {
//         try {
//             const { idToken } = await GoogleSignin.signIn();
//             const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//             console.log(googleCredential);
//             await auth().signInWithCredential(googleCredential);
//             navigation.navigate('chat');
//         } catch (error) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 console.log("User cancelled the login flow")
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 console.log('Operation (f.e. sign in) is in progress already')
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 console.log('Play services not available or outdated')
//             } else {
//                 console.log('Some other error happened')
//             }
//         }
//     };

//     if (!user) {
//         return (
//             <View>
//                 <TextInput
//                     style={style.input}
//                     placeholder="Email"
//                     onChangeText={setemail}
//                 />
//                 <TextInput
//                     style={style.input}
//                     placeholder="Password"
//                     onChangeText={setpassword}
//                     secureTextEntry
//                 />
//                 <Button
//                     title="Login"
//                     onPress={handleEmailLogin}
//                 />
//                 <Button title='if u not user register first ' onPress={()=>{navigation.navigate('ragister')}}/>
//                 <Text style={style.txt} >Login with GOOGLE</Text>
//                 <Button
//                     title="Google Sign-In"
//                     onPress={onGoogleButtonPress}
//                 />
//             </View>
//         );
//     }else{
//         return(
//             navigation.navigate('chat',{'userdata':user})
//         )
//     }
// };

// const style = StyleSheet.create({
//     txt: {
//         fontSize: 20,
//         fontWeight: "900",
//         textAlign: "center",
//         padding: 10,
//         margin: 10
//     },
//     input: {
//         height: 40,
//         width: '100%',
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
// })

// export default Login;



// Updates to keyboard shortcuts … On Thursday, August 1, 2024, Drive keyboard shortcuts will be updated to give you first-letters navigation.Learn more
import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth } from '../firebase';

const Login = ({ navigation }) => {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [Response, setResponse] = useState();
    const [userID, setuserID] = useState();



    function login() {
        if (email != "" && password != "") {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    Alert.alert('...', 'User account signed in!');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });
            setemail('');
            setpassword('');
        }
        else {
            Alert.alert('enter valide email or password !')
        }
    }

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);



    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '21528469527-gfrj2vmijvvlm02l9qq2e3kqfeiot2gj.apps.googleusercontent.com', // From Firebase Console
        });
    }, []);

    const onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log(googleCredential);
            await auth().signInWithCredential(googleCredential);
            navigation.navigate('chat');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("User cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Operation (f.e. sign in) is in progress already')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated')
            } else {
                console.log('Some other error happened')
            }
        }
    };

    const [no, setno] = useState(0)
    function click() {
        setno(no + 1);
        if (no == 1) {
            setno(0)
        }
    }

    if (initializing) return false;

    if (user) {
        return (
            navigation.navigate('chat', { 'userdata': user })
        )
    } else {
        return (
            <ScrollView>
                <View style={style.main}>
                    <ImageBackground source={require('./img/lobg1.jpg')} style={style.mainbg}>
                        <View style={style.txtperent}>
                            <Text style={style.txt}>Welcome !</Text>
                            <Text style={style.txt1}>Sign in to your account.</Text>
                        </View>
                        <View style={style.formparent}>
                            <TextInput style={style.email} placeholder="email" onChangeText={(n) => { setemail(n) }}></TextInput>
                            <View style={style.eeeppp}>
                                <TextInput style={style.passw} placeholder="password" onChangeText={(n) => { setpassword(n) }} secureTextEntry={(no == 0) ? true : false}></TextInput>
                                <Pressable style={style.eyeperent} onPress={() => { click() }} >
                                    <Image source={(no == 0) ? require('./img/eye.png') : require('./img/view.png')} style={style.eye}></Image>
                                </Pressable>
                            </View>
                            <Text style={style.txt2} >Forgot password ?</Text>
                            <Pressable style={style.loginbtn} onPress={() => { login() }} >
                                <Text style={style.txt3}>LogIn</Text>
                            </Pressable>
                        </View>
                        <Text style={style.txt4}>-------------Or Continue With--------------</Text>
                        <View style={style.socialperent}>
                            <Pressable style={style.googalbtn} onPress={onGoogleButtonPress} >
                                <Image source={require('./img/google.png')} style={style.iconimg}></Image>
                            </Pressable>
                        </View>
                        <View style={style.go}>
                            <Text style={style.question}>Not A Member? </Text>
                            <Pressable style={style.chngebtn} onPress={() => { navigation.navigate('ragister') }}>
                                <Text style={style.txt5}>Join Now</Text>
                            </Pressable>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    main: {
        height: 700,
        backgroundColor: "yellow",
    },
    mainbg: {
        height: "100%",
        resizeMode: "center",
        justifyContent: "space-evenly"
    },
    txtperent: {
        width: "90%",
        alignSelf: "center",
        height: "10%",
        // backgroundColor:"grey",
    },
    txt: {
        fontSize: 40,
        color: "white",
        fontWeight: "500",
    },
    txt1: {
        fontSize: 17,
        color: "white"
    },
    formparent: {
        height: "30%",
        width: "90%",
        backgroundColor: "rgba(255,255,255,0.1)",
        alignSelf: "center",
        justifyContent: "space-evenly"
    },
    email: {
        height: "20%",
        fontSize: 23,
        fontWeight: "700",
        color: "black",
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        paddingLeft: 20
    },
    eeeppp: {
        height: "20%",
        flexDirection: "row",
        // backgroundColor:"red",
        justifyContent: "space-between"
    },
    passw: {
        width: "83%",
        fontSize: 23,
        fontWeight: "700",
        color: "black",
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        paddingLeft: 20
    },
    eyeperent: {
        height: "100%",
        alignSelf: "center",
        width: "16%",
        backgroundColor: "red",
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
    },
    eye: {
        height: "60%",
        width: "60%",
        alignSelf: "center",
        resizeMode: "center"
    },
    txt2: {
        fontSize: 16,
        color: "white",
        fontWeight: "700",
        textAlign: "right",
    },
    loginbtn: {

    },
    txt3: {
        fontSize: 20,
        color: "rgba(255,255,255,0.7)",
        fontWeight: "800",
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 5,
        borderRadius: 10,
        textAlign: "center"

    },
    txt4: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontWeight: "500"
    },
    socialperent: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    googalbtn: {
        height: "50%",
        width: "25%",
        borderRadius: 10,
        backgroundColor: "white",
        alignSelf: "center",
        justifyContent: "center"
    },
    iconimg: {
        height: "70%",
        width: "70%",
        alignSelf: "center",
        resizeMode: "center"
    },
    question: {
        fontSize: 15,
        fontWeight: "800",
        color: "white",
        textAlignVertical: "center"
    },
    go: {
        height: "5%",
        // backgroundColor:"orange",
        flexDirection: "row",
        justifyContent: "center"
    },
    txt5: {
        height: "100%",
        textAlignVertical: "center",
        fontSize: 15,
        fontWeight: "900",
        color: "black"
    }
})
export default Login