import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './screens/signinScreen';
import SignupScreen from './screens/signupScreen';
import HomeScreen from './screens/homeScreen';
import SkillsScreen from './screens/skillsScreen';
import ChatBot from './screens/chatBot';
const Stack = createNativeStackNavigator();

export default function  Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        {/*<Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
         />*/}


      <Stack.Screen name="Skills" component={SkillsScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatBot} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}