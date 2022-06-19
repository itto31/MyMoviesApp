/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View,Image, StyleSheet, Alert, BackHandler } from 'react-native';
import logoApp from '../assets/Logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {signInApi} from '../api/auth';
import { TOKEN } from '../../src/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HelperText,TextInput,Surface ,Button,Text,Dialog} from 'react-native-paper';


export default function Login(props) {
    const { setRefreshCheckLogin, navigation } = props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('')
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
          'Are you sure?',
          'Do you want to exit?',
          [
            { text: "Cancel", style: 'cancel', onPress: () => {} },
            {
              text: 'Close',
              style: 'destructive',
              onPress: () => (BackHandler.exitApp()),
            },
          ]
        );
        });
      }, [navigation]);
  





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
                navigation.navigate('Home', { initial: 'Home' });
                }
            }).catch((error) =>{
                console.log(error);
            });
        },
    });


  return (
    <View style={styles.container}> 
    <View >
    <Image source={logoApp}resizeMode="contain" style={styles.logo}/>
    </View>
    <Surface onSubmit={formik.handleSubmit}>

    <TextInput  placeholder="Email"
    placeholderTextColor="#fff"
    style={[{color:'#fff'}, formik.errors.email && styles.error]}
    mode="flat  "
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
    </View>
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
