/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View,SafeAreaView,StatusBar,Image, StyleSheet } from 'react-native';
import { Input, Text,Button,FormControl, useToast} from 'native-base';
import logoApp from '../assets/Logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {signInApi} from '../api/auth';
import { TOKEN } from '../../src/utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login(props) {
    const { setRefreshCheckLogin } = props;
    const toast = useToast();
    const setDate = async () => {
        try {
            await AsyncStorage.setItem(TOKEN, 'token');
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
                    toast.show({
                        description: response.message,
                      });
                } else {
                setDate();
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
    <FormControl onSubmit={formik.handleSubmit}>

    <FormControl>
    <Input  placeholder="Email"
    placeholderTextColor="#fff"
    style={[{color:'#fff'}, formik.errors.email && styles.error]}
    variant="underlined"
    value={formik.values.name}
    name= "email"
    onChangeText={formik.handleChange('email')}
    />
    <FormControl.HelperText>
    {formik.errors.email}
    </FormControl.HelperText>
     </FormControl>


    <FormControl isRequired>
    <Input  placeholder="Password"
    placeholderTextColor="#fff"
    style={[{color:'#fff'}, formik.errors.password && styles.error]}
    variant="underlined"
    type="password"
    name= "password"
    value={formik.values.name}
    onChangeText={formik.handleChange('password')}
    />
    <FormControl.HelperText>
    {formik.errors.password}
    </FormControl.HelperText>
    </FormControl>
    </FormControl>
     <Button style={styles.btnLogin} onPress={formik.handleSubmit}>
        <Text>Login</Text>
    </Button>
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
