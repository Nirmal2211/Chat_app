// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const sendMessage = () => {
//     if (inputMessage.trim() === '') return;
//     const newMessage = {
//       id: messages.length + 1,
//       text: inputMessage,
//       sentByUser: true, // You can set this based on your logic
//     };
//     setMessages([...messages, newMessage]);
//     setInputMessage('');
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View style={[styles.messageContainer, item.sentByUser ? styles.sentByUser : styles.received]}>
//             <Text style={styles.messageText}>{item.text}</Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         // invertStickyHeaders // To show the latest messages at the bottom
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           value={inputMessage}
//           onChangeText={(text) => setInputMessage(text)}
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   messageContainer: {
//     maxWidth: '80%',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   sentByUser: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#0084ff',
//     color: '#fff',
//   },
//   received: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#ddd',
//     color: '#000',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#fff',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#0084ff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default ChatRoom;



// // ChatroomScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';
import { database, auth, firestore } from '../firebase';
// import auth_ from '@react-native-firebase/auth';




const Chatroom = ({ route, navigation }) => {

  const { uid, displayName, name } = auth().currentUser;

  const { userdata } = route.params;
// console.log(userdata);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages')
      .on('child_added', snapshot => {
        setMessages(prevMessages => [...prevMessages, snapshot.val()]);
      });

    return () => database().ref('/messages').off('child_added', onChildAdd);
  }, []);


  const onlogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate("login")
  }


  const sendMessage = async () => {
    if (message) {
      const { uid, displayName, name } = auth().currentUser;
      // const useralldata = await firestore().collection('users').doc(uid).get()
      // console.log();
      database().ref('/messages').push({
        text: message,
        user: {
          id: uid,
          name:displayName
        },
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <>
      <View style={style.head}>
        <Text style={style.txt} >{userdata.email}</Text>
        <Pressable style={style.outbtn} onPress={onlogout} >
          <Text style={style.txt}>Logout</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1, padding:5}}>
        <FlatList
          data={messages}
          style={{backgroundColor:"#c7f9cc",padding:6,marginBottom:5}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            (item.user.name == displayName) ?
            <View style={{margin:5}}>
              <Text style={{textAlign:"right",padding:5,borderWidth:1,borderRadius:20,backgroundColor:"#588157", alignSelf:"flex-end" ,letterSpacing:1.5,fontSize:15}} >{item.text}</Text>
            </View>
            :
            <View style={{margin:5,padding:3,borderWidth:1,borderRadius:13,backgroundColor:"#a3b18a", alignSelf:"flex-start" ,}} >
              <Text style={{letterSpacing:1.5,fontSize:12,fontWeight:"800"}} >{item.user.name}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <View style={style.inputContainer} >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          style={style.input}
        />
        <Button
          title="Send"
          onPress={sendMessage}
          style={style.sendButton}
        />
        </View>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  head: {
    height: 40,
    margin: 3,
    backgroundColor: "grey",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5
  },
  outbtn: {
    // alignSelf:"flex-end",
    width: "25%",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
  },
  txt: {
    color: "black",
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0084ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Chatroom;
