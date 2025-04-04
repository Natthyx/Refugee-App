## Install

`yarn install react-native-language-detection`

## Usage

The library will provide: `Promise<{language: string, confidence: number}[]>`.

### Example

```
import detect from 'react-native-language-detection'

detect('Testing language detection').then(res => console.log(res))
```