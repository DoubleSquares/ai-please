// ai-please.js

class AIProvider {
  constructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }

  async sendPrompt(prompt) {
    throw new Error('sendPrompt must be implemented by the provider subclass');
  }
}

class OpenAIProvider extends AIProvider {
  async sendPrompt(prompt) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.options.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.options.model || 'gpt-4',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || '[No response]';
  }
}

class ClaudeProvider extends AIProvider {
  async sendPrompt(prompt) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.options.apiKey,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.options.model || 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await res.json();
    return data.content?.[0]?.text?.trim() || '[No response]';
  }
}

class GeminiProvider extends AIProvider {
  async sendPrompt(prompt) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.options.model || 'gemini-pro'}:generateContent?key=${this.options.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '[No response]';
  }
}

class CoPilotProvider extends AIProvider {
  async sendPrompt(prompt) {
    // Note: CoPilot API is in beta and may not be publicly documented
    return '[CoPilot response placeholder - API in beta]';
  }
}

class AIPlease {
  constructor() {
    this.providers = {};
  }

  registerProvider(name, providerInstance) {
    if (!(providerInstance instanceof AIProvider)) {
      throw new Error('Provider must extend AIProvider');
    }
    this.providers[name] = providerInstance;
  }

  async ask(providerName, prompt) {
    const provider = this.providers[providerName];
    if (!provider) throw new Error(`Provider '${providerName}' not registered`);
    return await provider.sendPrompt(prompt);
  }

  listProviders() {
    return Object.keys(this.providers);
  }
}

export {
  AIPlease,
  AIProvider,
  OpenAIProvider,
  ClaudeProvider,
  GeminiProvider,
  CoPilotProvider
};
