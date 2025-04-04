import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
export default function SigninScreen() {
    const navigation = useNavigation()
  return (
    <View style={tw`relative flex bg-white h-full justify-center px-5`}>
    

    <Text style={tw`font-extrabold text-7xl mb-10 text-center text-green-500`}>A<Text style={tw`font-semibold text-17 text-gray-600`}>ssister</Text></Text>
      <Text style={tw`font-extrabold text-4xl text-center`}>Login</Text>
      <Text style={tw`text-gray-600 text-base font-bold text-center`}>Please signin to continue</Text>
      <View style={tw`mt-8`}>
        <View style={tw`flex-row items-center`}>
            <TextInput placeholder='Username' style={tw`flex-1 border text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}/>
        </View>
        <View style={tw`flex-row items-center`}>
        <TextInput placeholder='Password' style={tw`flex-1 border border-2 text-base text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}/>
        </View>
      </View>
      <View style={tw`flex-row items-center justify-between`}>
      <TouchableOpacity style={tw``}>
        <Text style={tw`text-green-600 font-semibold text-base`}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw``}>
        <Text style={tw` bg-green-500 py-3 px-6 font-bold text-xl text-white rounded-full shadow-lg`}>Login</Text>
      </TouchableOpacity>
      </View>
      <View style={tw`flex-row flex-1 w-full absolute bottom-4 items-center justify-center left-4`}>
      <Text style={tw`font-bold text-gray-500`}>Don't Have an account? </Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
        <Text style={tw`text-green-700 font-extrabold`}>Signup</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    borderRight:{
        borderBottomLeftRadius:50,
        borderBottomRightRadius:5,
        borderTopLeftRadius:90,
        borderTopRightRadius:10,
        backgroundColor:'green',
        width:'60%',
        height:100
    },
    borderLeft:{
        borderBottomLeftRadius:50,
        borderBottomRightRadius:5,
        borderTopLeftRadius:90,
        borderTopRightRadius:10,
        backgroundColor:'green',
        width:'30%',
        height:40
    }
})
