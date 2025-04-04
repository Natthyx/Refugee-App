import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function SignupScreen() {
  const [selectedCountry, setSelectedCountry] = useState('Country of Origin');
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        const countriesData = response.data.map((country) => ({
          name: country.name,
          code: country.alpha2Code,
          languages: country.languages.map((language) => language.name),
        }));
        setCountries(countriesData);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    const selectedCountryData = countries.find(
      (country) => country.code === selectedCountry
    );
    if (selectedCountryData) {
      setLanguages(selectedCountryData.languages);
      setSelectedLanguage('');
    }
  }, [selectedCountry, countries]);

  const handleSignup = () => {
    if (!selectedCountry || !selectedLanguage) {
      setError('Please fill in all the required fields.');
    } else {
      setError('');
      // Perform signup logic here
    }
  };

  return (
    <View style={tw`pt-7`}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
        style={tw`flex bg-white p-2`}
      >
        <View style={tw`relative`}>
          <Text style={tw`font-extrabold text-7xl mb-10 text-center text-green-500`}>
            A<Text style={tw`font-semibold text-17 text-gray-600`}>ssister</Text>
          </Text>
          <Text style={tw`font-extrabold text-4xl text-center`}>Signup</Text>
        </View>
        <View style={tw`mt-2`}>
        <Text style={tw`text-base font-semibold mb-2`}>Username</Text>

          <TextInput
            placeholder="Username"
            style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
          />
        <Text style={tw`text-base font-semibold mb-2`}>Password</Text>

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
          />
        <Text style={tw`text-base font-semibold mb-2`}>Confirm password</Text>

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
          />

          <View style={tw`flex-row items-center w-full justify-between gap-3`}>

            <TextInput
              placeholder="First Name"
              style={tw`flex-1 border w-40% text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />

            <TextInput
              placeholder="Last Name"
              style={tw`flex-1 border w-40% border-2 text-base text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Country of Origin</Text>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(country) => setSelectedCountry(country)}
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            >
              {countries.map((country, index) => (
                <Picker.Item key={index} label={country.name} value={country.code} />
              ))}
            </Picker>
          </View>
          {languages.length > 0 && (
            <View>
              <Text style={tw`text-base font-semibold mb-2`}>Preferred Language</Text>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(language) => setSelectedLanguage(language)}
                style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
              >
                {languages.map((language, index) => (
                  <Picker.Item key={index} label={language} value={language} />
                ))}
              </Picker>
            </View>
          )}
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Educational Background in Your Country of Origin</Text>
            <TextInput
              placeholder="Enter your educational background"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Did you attend school or receive any formal education before leaving your home country?</Text>
            <TextInput
              placeholder="Yes/No"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Are there any specific subjects or areas of study that you are interested in?</Text>
            <TextInput
              placeholder="Enter your interests"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Have you had any previous vocational or technical training?</Text>
            <TextInput
              placeholder="Yes/No"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>How would you describe your experience with education in your host country so far?</Text>
            <TextInput
              placeholder="Enter your experience"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Are there any language barriers or challenges you have encountered in accessing education here?</Text>
            <TextInput
              placeholder="Enter any language barriers or challenges"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>What are your educational goals or aspirations for the future?</Text>
            <TextInput
              placeholder="Enter your goals or aspirations"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Are there any particular skills or knowledge you would like to acquire?</Text>
            <TextInput
              placeholder="Enter the skills or knowledge you want to acquire"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Are there any specific areas where you feel you need additional support or assistance in your education?</Text>
            <TextInput
              placeholder="Enter areas where you need support or assistance"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          <View>
            <Text style={tw`text-base font-semibold mb-2`}>Is there anything else you would like us to know about your educational background or needs?</Text>
            <TextInput
              placeholder="Enter any additional information"
              style={tw`border w-full text-base border-2 text-black rounded-2xl p-3 mb-6 shadow-xl bg-white`}
            />
          </View>
          {error ? (
            <Text style={tw`text-red-500 mb-4`}>{error}</Text>
          ) : null}
          <TouchableOpacity
            onPress={handleSignup}
            style={tw`bg-green-500 py-3 rounded-2xl w-full mb-6`}
          >
            <Text style={tw`text-center text-white text-lg font-semibold`}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row justify-center items-center`}>
            <Text style={tw`text-base text-gray-400`}>Already have an account?</Text>
            <Text style={tw`text-base text-green-500 font-semibold ml-1`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
