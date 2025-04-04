import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

import tw from 'twrnc';

const skillImages = {
  'Literacy and Numeracy': 'https://images.pexels.com/photos/18183947/pexels-photo-18183947/free-photo-of-fashion-man-people-woman.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Digital Literacy': 'https://images.pexels.com/photos/17246772/pexels-photo-17246772/free-photo-of-sea-landscape-nature-beach.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Health and Hygiene': 'https://images.pexels.com/photos/12140792/pexels-photo-12140792.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Job Readiness': 'https://images.pexels.com/photos/14244864/pexels-photo-14244864.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Cultural Competence': 'https://images.pexels.com/photos/18184529/pexels-photo-18184529/free-photo-of-cow-on-a-hillside.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Financial Management': 'https://images.pexels.com/photos/15978352/pexels-photo-15978352/free-photo-of-close-up-of-pendant-with-stone.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  'Social and Interpersonal Skills': 'https://images.pexels.com/photos/15327222/pexels-photo-15327222/free-photo-of-cars-and-bus-on-street-in-new-york.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
};

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [country, setCountry] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentSeconds, setCurrentSeconds] = useState('');
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);

      const reverseGeocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=35d96259721142acba68b961a47b5ff3`;

      axios
        .get(reverseGeocodingUrl)
        .then((response) => {
          const { data } = response;
          const { results } = data;

          if (results.length > 0) {
            const countryName = results[0].components.country;
            setCountry(countryName);
            fetchNews(countryName); 
          } else {
            console.log('No results found for the given location.');
          }
        })
        .catch((error) => {
          console.error('Error reverse geocoding:', error);
          setCountry('Unknown');
        });
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      setCurrentTime(timeString);
      setCurrentSeconds(date.getSeconds().toString().padStart(2, '0'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `${country}`;
  }

  const route = useRoute();
  const { selectedSkills } = route.params || { selectedSkills: [] };
  const [generatedContent, setGeneratedContent] = useState({});
  const [showFullContent, setShowFullContent] = useState({}); 

  const navigation = useNavigation();

  const fetchNews = async (country) => {
    try {
      const newsApiKey = '05e33daaf0e545d083f04b8e32a76636';
      const newsUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsApiKey}`;

      const response = await axios.get(newsUrl);
      const { articles } = response.data;

      setNews(articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const generateContent = async () => {
    try {
      const generatedContentObj = {};

      for (const skill of selectedSkills) {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci/completions',
          {
            prompt: `Provide a comprehensive and informative description of the skill: ${skill}. Explain its key concepts, benefits, real-world applications, and offer tips for improving proficiency. Ensure the content is well-structured and insightful.`,
            max_tokens: 500,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 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',
            },
          }
        );

        const content = response.data.choices[0].text;
        generatedContentObj[skill] = content;
        setShowFullContent((prev) => ({ ...prev, [skill]: false }));
      }

      setGeneratedContent(generatedContentObj);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent({ error: 'An error occurred while generating content.' });
    }
  };

  useEffect(() => {
    generateContent();
  }, [selectedSkills]);

  const formatContent = (content, skill) => {
    const skillImage = skillImages[skill];
    const paragraphs = content.split('\n');

    return (
      <View style={{ width: '100%' }}>
        {skillImage && (
          <Image
            source={{ uri: skillImage }}
            style={[styles.skillImage, { width: '100%' }]} 
          />
        )}
        {showFullContent[skill] ? (
          paragraphs.map((paragraph, index) => (
            <Text key={index} style={tw`mb-2`}>
              {paragraph}
            </Text>
          ))
        ) : (
          paragraphs.map((paragraph, index) => {
            if (index < 3) {
              return (
                <Text key={index} style={tw`mb-2`}>
                  {paragraph}
                </Text>
              );
            }
            return null;
          }))
        }
        {paragraphs.length > 3 && (
          <TouchableOpacity
            onPress={() =>
              setShowFullContent((prev) => ({
                ...prev,
                [skill]: !prev[skill], 
              }))
            }
            style={styles.viewMoreButton}
          >
            <Text style={styles.viewMoreText}>
              {showFullContent[skill] ? 'View Less' : 'View More'} 
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={tw`pt-10 px-3`}>
      <ScrollView>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`font-semibold text-2xl`}>Hello, Nathy</Text>
          <View style={tw`p-2 bg-gray-400 rounded-full`}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <FontAwesome name="comment" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={tw`font-bold text-xl`}>Current Location: {text}</Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-lg font-bold`}>Safest Rate: 3 </Text>
            <FontAwesome name="star" size={18} color="gold" />
          </View>
        </View>
        <View style={tw`flex-1 bg-green-700 py-8 mt-3 rounded-2xl mb-4 `}>
          <Text style={tw`text-7xl text-center font-bold text-white`}>{currentTime}:{currentSeconds}</Text>
          <Text style={tw`text-center text-white text-base font-bold`}>
            Currently in {country}
          </Text>
        </View>
        <View>
          <View style={tw`w-full p-3`}>
            <Text style={tw`text-lg font-bold`}>News:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {news.map((article, index) => (
                <View key={index} style={styles.newsArticle}>
                  <Text style={tw`text-xl font-semibold`}>{article.title}</Text>
                  <Text style={tw`text-gray-600`}>{article.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <View>
          <Text style={tw`text-lg font-bold`}>Generated Content:</Text>
          <View style={tw`py-3`}>
            {Object.entries(generatedContent).map(([skill, content], index) => (
              <View key={index} style={styles.generatedContent}>
                {formatContent(content, skill)}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  generatedContent: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  newsArticle: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    marginRight: 20, 
  },
  viewMoreButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  skillImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
};
