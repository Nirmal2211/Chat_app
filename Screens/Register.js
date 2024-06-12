
import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, Alert, ScrollView, ImageBackground, Pressable, Image } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth, firestore } from '../firebase';
import { firebase } from '@react-native-firebase/auth';

export default Ragister = ({ navigation }) => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [contact, setcontact] = useState("")
    const [error, setError] = useState('');

    // const [n, sn] = useState("name");
    // const [e, se] = useState("email");
    // const [p, sp] = useState("password");
    // const [c, sc] = useState("contact");

    // const [nam, setnam] = useState()
    // const [eml, seteml] = useState()
    // const [pasw, setpasw] = useState()
    // const [conta, setconta] = useState()

    // const clear = () => {
    //     setname(''); setemail(''); setpassword(''); setcontact('');
    //     setnam(''); seteml(''); setpasw(''); setconta('');
    //     sn("name"); se('email'); sp('password'); sc('contact')
    // }

   async function handleEmailregister() {
        if (name != "" && email != "" && password != "" && contact != "") {
            try{
                var usercredit = await auth().createUserWithEmailAndPassword(email, password)
            
                await usercredit.user.updateProfile({
                    "displayName": name,
                    // "photoURL": photoURL,
                  });

                const {uid} = usercredit.user ;
                await firestore().collection('users').doc(uid).set({
                    "name":name,
                    "email":email,
                    "password":password,
                    "contact":contact
                })
                console.log(usercredit);
                Alert.alert('...', 'User account created & signed in!');
            }catch(error) {
                if (error.code === 'auth/email-already-in-use') {setError('That email address is already in use!')}
                if (error.code === 'auth/invalid-email') {setError('That email address is invalid!')}
            }
        }
        else {
            Alert.alert("Please enter all data !")
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

    if (initializing) return null;
    if (user) {
        navigation.navigate('chat', { 'userdata': user })
    } else {
        return (
            <ScrollView >
                <View style={style.helo}>
                    <ImageBackground source={require('./img/rgbg.jpg')} style={style.mainbg}>
                        <View style={{ height: "70%", justifyContent: "space-evenly", marginBottom:50}}>
                            <View style={style.txtperent}>
                                <Text style={style.txt}>Sign up </Text>
                                <Text style={style.txt1}>create an free account for enjoy chat whit friends .</Text>
                            </View>
                            <View style={style.formperent}>
                                <View style={style.from}>
                                    <Text style={style.heading}>Register</Text>
                                    <View style={style.formcontener} >
                                        <View style={style.namefild} >
                                            {/* <Text style={style.name} >{nam}</Text> */}
                                            <TextInput
                                                placeholder="name"
                                                style={style.nameinput}
                                                onChangeText={(n) => { setname(n) }}
                                            ></TextInput>
                                        </View>
                                        <View style={style.namefild} >
                                            {/* <Text style={style.name} >{eml}</Text> */}
                                            <TextInput
                                                placeholder="email"
                                                style={style.nameinput}
                                                onChangeText={(n) => { setemail(n) }}
                                            ></TextInput>
                                        </View>
                                        <View style={style.namefild} >
                                            {/* <Text style={style.name} >{pasw}</Text> */}
                                            <TextInput placeholder="password" style={style.nameinput}  onChangeText={(n) => { setpassword(n) }} ></TextInput>
                                        </View>
                                        <View style={style.namefild} >
                                            {/* <Text style={style.name} >{conta}</Text> */}
                                            <TextInput placeholder="mobail no" style={style.nameinput}  onChangeText={(n) => { setcontact(n) }} ></TextInput>
                                        </View>
                                        <View style={style.butonperent}>
                                            <Pressable style={style.button} onPress={() => { handleEmailregister() }} ><Text style={style.butntxt}>Submit</Text></Pressable>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {error ? <Text style={{ color: 'red', textAlign:"center" }}>{error}</Text> : null}
                        <View style={style.googleperent} >
                            <Text style={style.txt4}>-------------Or Continue With--------------</Text>
                            <View style={style.socialperent}>
                                <Pressable style={style.googalbtn}>
                                    <Image source={require('./img/google.png')} style={style.iconimg}></Image>
                                </Pressable>
                            </View>
                            <View style={style.go}>
                                <Text style={style.question}>Alrady Have An Account? </Text>
                                <Pressable style={style.chngebtn} onPress={() => { navigation.navigate('login') }}>
                                    <Text style={style.txt5}>Log in</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>

        )


    };
}
const style = StyleSheet.create({
    txt: {
        fontSize: 20,
        fontWeight: "900",
        textAlign: "center",
        padding: 10,
        margin: 10
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    helo: {
        height: 650,
    },
    mainbg: {
        height: "100%",
        width: "100%",
        resizeMode: "stretch",
    },
    txtperent: {
        width: "80%",
        alignSelf: "center",
        height: "14%",
        // backgroundColor:"grey",
    },
    txt: {
        fontSize: 30,
        color: "black",
        fontWeight: "900",
    },
    txt1: {
        fontSize: 17,
        color: "black"
    },
    formperent: {
        height: "70%",
        width: "80%",
        backgroundColor: "rgba(135,206,235,0.6)",
        borderRadius: 40,
        alignSelf: "center",
        shadowColor: "black",
        elevation: 160,
        justifyContent: "center",
    },
    from: {
        height: "95%",
        width: "95%",
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 30,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    formcontener: {
        height: "85%",
        width: "99%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        // backgroundColor:"red",
        alignSelf: "center"
    },
    heading: {
        alignSelf: "center",
        width: "50%",
        fontSize: 20,
        fontWeight: "900",
        color: "black",
        borderBottomWidth: 2,
        textAlign: "center"
    },
    namefild: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        // backgroundColor:"white"
    },
    name: {
        // backgroundColor:"yellow",
        fontSize: 18,
        color: "black",
        fontWeight: "800",
        paddingLeft: 15,
        color: "grey",
    },
    nameinput: {
        padding: 5,
        // backgroundColor:"grey",
        paddingLeft: 15,
        borderBottomWidth: 4,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        fontSize: 18,
        fontWeight: "500",
        color: "black",
    },
    butonperent: {
        position:"absolute",
        bottom:-70,
        width: "50%",
        alignSelf: "center",
    },
    butntxt: {
        padding: 5,
        fontSize: 20,
        color: "black",
        fontWeight: "900",
        backgroundColor: "orange",
        textAlign: "center",
        borderRadius: 7
    },
    googleperent:{
        height:"18%",
        // backgroundColor:"red"
    },
    txt4: {
        fontSize: 11,
        color: "white",
        textAlign: "center",
        fontWeight: "500",
        // backgroundColor:"black",
    },
    socialperent: {
        height: "40%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        // backgroundColor:"black",
    },
    googalbtn: {
        height: "75%",
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
        fontSize: 13,
        fontWeight: "800",
        color: "white",
        textAlignVertical: "center"
    },
    go: {
        height: "20%",
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
// export default Ragister


// import React, {useEffect, useState } from 'react';
// import { Alert, Button, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from "react-native";

// const Ragister = ({ navigation }) => {

//     const [name, setname] = useState("")
//     const [email, setemail] = useState("")
//     const [password, setpassword] = useState("")
//     const [contact, setcontact] = useState("")

//     const [n, sn] = useState("name");
//     const [e, se] = useState("email");
//     const [p, sp] = useState("password");
//     const [c, sc] = useState("contact");

//     const [nam, setnam] = useState()
//     const [eml, seteml] = useState()
//     const [pasw, setpasw] = useState()
//     const [conta, setconta] = useState()

//     const clear = () => {
//         setname(''); setemail(''); setpassword(''); setcontact('');
//         setnam(''); seteml(''); setpasw(''); setconta('');
//         sn("name"); se('email'); sp('password'); sc('contact')
//     }

//     function submitdata() {
//         if (name != "" && email != "" && password != "" && contact != "") {
//             auth()
//                 .createUserWithEmailAndPassword(email, password)
//                 .then(() => {
//                     Alert.alert('...', 'User account created & signed in!');
//                 })
//                 .catch(error => {
//                     if (error.code === 'auth/email-already-in-use') {
//                         Alert.alert('That email address is already in use!');
//                     }

//                     if (error.code === 'auth/invalid-email') {
//                         Alert.alert('That email address is invalid!');
//                     }

//                     console.error(error);
//                 });
//         }
//         else {
//             Alert.alert("Please enter all data !")
//         }
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

//     if (initializing) return null;

//     if(user){
//         navigation.navigate('chat',{'userdata':user})
//     } else {
//     return (
//         <ScrollView >
//             <View style={style.main}>
//                 <ImageBackground source={require('./img/rgbg.jpg')} style={style.mainbg}>
//                     <View style={{ height: "70%", justifyContent: "space-evenly" }}>
//                         <View style={style.txtperent}>
//                             <Text style={style.txt}>Sign up </Text>
//                             <Text style={style.txt1}>create an account so you can order your favorite products easily and quickly.</Text>
//                         </View>
//                         <View style={style.formperent}>
//                             <View style={style.from}>
//                                 <Text style={style.heading}>Register</Text>
//                                 <View style={style.formcontener} >
//                                     <View style={style.namefild} >
//                                         <Text style={style.name} >{nam}</Text>
//                                         <TextInput
//                                             placeholder={n}
//                                             style={style.nameinput}
//                                             onFocus={() => { setnam("Name :"), sn('') }}
//                                             onChangeText={(n) => { setname(n) }}
//                                         ></TextInput>
//                                     </View>
//                                     <View style={style.namefild} >
//                                         <Text style={style.name} >{eml}</Text>
//                                         <TextInput
//                                             placeholder={e}
//                                             style={style.nameinput}
//                                             onFocus={() => { seteml("Email :", se('')), placeholder = "" }}
//                                             onChangeText={(n) => { setemail(n) }}
//                                         ></TextInput>
//                                     </View>
//                                     <View style={style.namefild} >
//                                         <Text style={style.name} >{pasw}</Text>
//                                         <TextInput placeholder={p} style={style.nameinput} onFocus={() => { setpasw("Password :", sp('')) }} onChangeText={(n) => { setpassword(n) }} ></TextInput>
//                                     </View>
//                                     <View style={style.namefild} >
//                                         <Text style={style.name} >{conta}</Text>
//                                         <TextInput placeholder={c} style={style.nameinput} onFocus={() => { setconta("Contact no. :", sc('')) }} onChangeText={(n) => { setcontact(n) }} ></TextInput>
//                                     </View>
//                                     <View style={style.butonperent}>
//                                         <Pressable style={style.button} onPress={() => { submitdata(), clear() }} ><Text style={style.butntxt}>Submit</Text></Pressable>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                     <Text style={style.txt4}>-------------Or Continue With--------------</Text>
//                     <View style={style.socialperent}>
//                         <Pressable style={style.googalbtn}>
//                             <Image source={require('./img/google.png')} style={style.iconimg}></Image>
//                         </Pressable>
//                         <Pressable style={style.googalbtn}>
//                             <Image source={require('./img/facebook.png')} style={style.iconimg}></Image>
//                         </Pressable>
//                     </View>
//                     <View style={style.go}>
//                         <Text style={style.question}>Alrady Have An Account? </Text>
//                         <Pressable style={style.chngebtn} onPress={() => { navigation.navigate('login') }}>
//                             <Text style={style.txt5}>Log in</Text>
//                         </Pressable>
//                     </View>
//                 </ImageBackground>
//             </View>
//         </ScrollView>

//     )
// }
// }
// const style = StyleSheet.create({
//     main: {
//         height: 750,
//     },
//     mainbg: {
//         height: "100%",
//         width: "100%",
//         resizeMode: "stretch",
//         justifyContent: "space-evenly"

//     },
//     txtperent: {
//         width: "80%",
//         alignSelf: "center",
//         height: "16%",
//         // backgroundColor:"grey",
//     },
//     txt: {
//         fontSize: 30,
//         color: "black",
//         fontWeight: "900",
//     },
//     txt1: {
//         fontSize: 17,
//         color: "black"
//     },
//     formperent: {
//         height: "80%",
//         width: "90%",
//         backgroundColor: "rgba(135,206,235,0.6)",
//         borderRadius: 40,
//         alignSelf: "center",
//         shadowColor: "black",
//         elevation: 160,
//         justifyContent: "center",
//     },
//     from: {
//         height: "95%",
//         width: "90%",
//         alignSelf: "center",
//         backgroundColor: "rgba(255,255,255,0.2)",
//         borderRadius: 30,
//         flexDirection: "column",
//         justifyContent: "space-evenly",
//     },
//     formcontener: {
//         height: "85%",
//         width: "99%",
//         flexDirection: "column",
//         justifyContent: "space-evenly",
//         // backgroundColor:"red",
//         alignSelf: "center"
//     },
//     heading: {
//         alignSelf: "center",
//         width: "50%",
//         fontSize: 25,
//         fontWeight: "900",
//         color: "black",
//         borderBottomWidth: 2,
//         textAlign: "center"
//     },
//     namefild: {
//         flexDirection: "column",
//         justifyContent: "space-evenly",
//         // backgroundColor:"white"
//     },
//     name: {
//         // backgroundColor:"yellow",
//         fontSize: 18,
//         color: "black",
//         fontWeight: "800",
//         paddingLeft: 15,
//         color: "grey",
//     },
//     nameinput: {
//         padding: 5,
//         // backgroundColor:"grey",
//         paddingLeft: 15,
//         borderBottomWidth: 4,
//         borderBottomRightRadius: 30,
//         borderBottomLeftRadius: 30,
//         fontSize: 18,
//         fontWeight: "500",
//         color: "black",
//     },
//     butonperent: {
//         width: "50%",
//         alignSelf: "center",
//     },
//     butntxt: {
//         padding: 5,
//         fontSize: 25,
//         color: "black",
//         fontWeight: "900",
//         backgroundColor: "orange",
//         textAlign: "center",
//         borderRadius: 7
//     },
//     txt4: {
//         fontSize: 15,
//         color: "white",
//         textAlign: "center",
//         fontWeight: "500",
//         // backgroundColor:"black",
//     },
//     socialperent: {
//         height: "6%",
//         flexDirection: "row",
//         justifyContent: "space-evenly",
//         // backgroundColor:"black",
//     },
//     googalbtn: {
//         height: "100%",
//         width: "40%",
//         borderRadius: 10,
//         backgroundColor: "white",
//         alignSelf: "center",
//         justifyContent: "center"
//     },
//     iconimg: {
//         height: "70%",
//         width: "70%",
//         alignSelf: "center",
//         resizeMode: "center"
//     },
//     question: {
//         fontSize: 15,
//         fontWeight: "800",
//         color: "white",
//         textAlignVertical: "center"
//     },
//     go: {
//         height: "5%",
//         // backgroundColor:"orange",
//         flexDirection: "row",
//         justifyContent: "center"
//     },
//     txt5: {
//         height: "100%",
//         textAlignVertical: "center",
//         fontSize: 15,
//         fontWeight: "900",
//         color: "black"
//     }
// })






// const [email, setemail] = useState();
// const [Password, setpassword] = useState();

// const handleEmailregister = () => {
//     auth()
//         .createUserWithEmailAndPassword(email, Password)
//         .then(() => {
//             Alert.alert('...', 'User account created & signed in!');
//         })
//         .catch(error => {
//             if (error.code === 'auth/email-already-in-use') {
//                 Alert.alert('That email address is already in use!');
//             }

//             if (error.code === 'auth/invalid-email') {
//                 Alert.alert('That email address is invalid!');
//             }

//             console.error(error);
//         });
// }

// // Set an initializing state whilst Firebase connects
// const [initializing, setInitializing] = useState(true);
// const [user, setUser] = useState();

// // Handle user state changes
// function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   },[]);

//   if (initializing) return null;

// if (!user) {
// return (
//     <View>
//         <TextInput
//             style={style.input}
//             placeholder="Email"
//             onChangeText={setemail}
//         />
//         <TextInput
//             style={style.input}
//             placeholder="Password"
//             onChangeText={setpassword}
//             secureTextEntry
//         />
//         <Button
//             title="Ragister"
//             onPress={handleEmailregister}
//         />
//         <Button title='Login With Existing Account ' onPress={() => { navigation.navigate('login') }} />
//     </View>
// );
// }
//     return(
//         navigation.push('chat',{ 'userdata': user })
//     )