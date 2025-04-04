const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { NlpManager } = require('node-nlp');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const manager = new NlpManager({ languages: ['en'] });
manager.addDocument('en', 'Can you help me with', 'question.intent');
manager.addDocument('en', 'I have a question about', 'question.intent');
manager.addDocument('en', 'What is', 'question.intent');
manager.addDocument('en', 'How does', 'question.intent');
manager.addDocument('en', 'When will', 'question.intent');
manager.addDocument('en', 'Where is', 'question.intent');
manager.addDocument('en', 'Who is', 'question.intent');

manager.addDocument('en', 'I feel anxious', 'anxiety.intent');
manager.addDocument('en', 'How to manage stress', 'stress-management.intent');
manager.addDocument('en', 'What are the symptoms of depression', 'depression-symptoms.intent');
manager.addDocument('en', 'How to improve mental well-being', 'mental-wellbeing.intent');

manager.train();

app.post('/api/conversation', handleConversation);

function extractQuestionFromMessage(message) {
  const response = manager.process('en', message);
  const intent = response.intent;
  if (intent === 'question.intent') {
    const entities = response.entities;
    const questionEntity = entities.find(entity => entity.entity === 'question');
    if (questionEntity) {
      return questionEntity.sourceText;
    }
  } else if (intent === 'anxiety.intent') {
   
    return null;
  } else if (intent === 'stress-management.intent') {
    
    return null;
  } else if (intent === 'depression-symptoms.intent') {
    
    return null;
  } else if (intent === 'mental-wellbeing.intent') {
   
    return null;
  }
  return null;
}

async function handleConversation(req, res) {
  try {
    const { message } = req.body;
    const question = extractQuestionFromMessage(message);
    const modifiedPrompt = `User: ${message}\nBot:${question ? ` ${question}` : ''}`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: modifiedPrompt,
      max_tokens: 100,
      temperature: 0.5, 
      top_p: 0.9,
      frequency_penalty: 0.2, 
      presence_penalty: 0.3, 
      n: 1,
      stop: '\n',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    });

    const aiReply = response.data.choices[0].text.trim();
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

