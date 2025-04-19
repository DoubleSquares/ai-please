# AI, Please!

**AI, Please!** is a lightweight and modular JavaScript library that allows you to easily communicate with multiple AI providers using a unified interface.

## ✨ Features

- Unified `.ask()` method across multiple AI platforms
- Plug-and-play provider registration
- Modular and extendable architecture

## 🔌 Supported Providers

- **Gemini** – Google Generative AI (via PaLM/Gemini API)
- **ChatGPT** – OpenAI
- **Claude** – Anthropic
- **Copilot** – Microsoft *(in beta)*

## 🚀 Getting Started

### 1. Install

Include the library in your project (module export example shown here):

```javascript
import {
  AIPlease,
  OpenAIProvider,
  ClaudeProvider,
  GeminiProvider,
  CoPilotProvider
} from './ai-please.js';
```

The latest version of AI, please! may be taken from the [Releases](/releases) section.

### 2. Register Providers

```javascript
const ai = new AIPlease();

ai.registerProvider('openai', new OpenAIProvider({ apiKey: 'your-openai-key' }));
ai.registerProvider('claude', new ClaudeProvider({ apiKey: 'your-anthropic-key' }));
ai.registerProvider('gemini', new GeminiProvider({ apiKey: 'your-google-api-key' }));
ai.registerProvider('copilot', new CoPilotProvider({ apiKey: 'your-microsoft-api-key' }));
```

### 3. Ask a Question

```javascript
const response = await ai.ask('openai', 'Tell me a fun fact about space.');
console.log(response);
```

## 📄 Notes

- CoPilot API support is placeholder-only and requires official API access from Microsoft.
- Make sure you use valid API keys and have enabled the services in the relevant AIs developer portals.

---

Built with ❤️ in 🇬🇧 by DoubleSquare.

