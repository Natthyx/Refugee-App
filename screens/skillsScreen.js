import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

export default function SkillsScreen({ navigation }) {
  const [responses, setResponses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillPress = (skill) => {
    let updatedSkills = [...selectedSkills];

    if (updatedSkills.includes(skill)) {
      updatedSkills = updatedSkills.filter((selectedSkill) => selectedSkill !== skill);
    } else {
      updatedSkills.push(skill);
    }

    setSelectedSkills(updatedSkills);
  };

  const isSkillSelected = (skill) => {
    return selectedSkills.includes(skill);
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) {
      Alert.alert('Select Skills', 'Please select at least one skill before submitting.');
    } else {
      navigation.navigate('Home', { selectedSkills });
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, marginTop: 20, textAlign: 'center' }}>
        Skills You Want to Develop
      </Text>

      {skills.map((skill) => (
        <TouchableOpacity
          key={skill}
          style={{
            marginBottom: 16,
            backgroundColor: isSkillSelected(skill) ? 'green' : undefined,
            padding: 8,
            borderRadius: 4,
          }}
          onPress={() => handleSkillPress(skill)}
        >
          <Text style={{ color: isSkillSelected(skill) ? 'white' : undefined }}>{skill}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 12,
          borderRadius: 3,
          alignItems: 'center',
        }}
        onPress={handleSubmit}
        disabled={selectedSkills.length === 0}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const skills = [
  'Language Skills',
  'Literacy and Numeracy',
  'Digital Literacy',
  'Job Readiness',
  'Cultural Competence',
  'Financial Management',
  'Health and Hygiene',
  'Social and Interpersonal Skills',
];