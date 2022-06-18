/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View,SafeAreaView,StatusBar,Image, StyleSheet } from 'react-native';
import logoApp from '../assets/Logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {signInApi} from '../api/auth';
import { TOKEN } from '../../src/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HelperText,TextInput,Surface ,Button,Text,Dialog} from 'react-native-paper';


export default function Login(props) {
    const { setRefreshCheckLogin } = props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('')
    const hideDialog = () => setVisible(false);

    const setDate = async (token) => {
        try {
            await AsyncStorage.setItem(TOKEN, token);
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: initialFormValue(),
        validationSchema: Yup.object({
            email: Yup.string(true).required('Email is required ').email('Email is not valid'),
            password: Yup.string(true).required('Password is required').min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: (formValue) => {
            signInApi(formValue).then(response =>{
                if (response.message){
                    setVisible(true);
                    setMessage(response.message);
                } else {
                setDate(response.token);
                setRefreshCheckLogin(true);
                }
            }).catch((error) =>{
                console.log(error);
            });
        },
    });


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'light-content'}/>
    <View>
    <Image source={logoApp}resizeMode="contain" style={styles.logo}/>
    </View>
    <Surface onSubmit={formik.handleSubmit}>

    <TextInput  placeholder="Email"
    placeholderTextColor="#fff"
    style={[{color:'#fff'}, formik.errors.email && styles.error]}
    mode="flat"
    value={formik.values.name}
    name= "email"
    onChangeText={formik.handleChange('email')}
    />
    <HelperText type="error">
    {formik.errors.email}
    </HelperText>

    <TextInput  placeholder="Password"
    placeholderTextColor="#fff"
    secureTextEntry
    style={[{color:'#fff'}, formik.errors.password && styles.error]}
    mode="flat"
    name= "password"
    value={formik.values.name}
    onChangeText={formik.handleChange('password')}
    />
    <HelperText type="error">
    {formik.errors.password}
    </HelperText>
    </Surface>
     <Button style={styles.btnLogin} onPress={formik.handleSubmit}>
        <Text>Login</Text>
    </Button>
    <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Text>{message}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
                    </Dialog>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:50,
        marginVertical:50,
    },
    logo:{
        width:'100%',
        height:200,
        marginBottom:30,
    },
    btnLogin:{
        marginTop:40,
        justifyContent:'center',
        backgroundColor:'#0098d3',
    },
    error:{
     borderBottomColor:'#e83f3f',
        borderBottomWidth:2,
    },
});

function initialFormValue() {
    return {
        email: '',
        password: '',
    };
}
