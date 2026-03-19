<p align="center">
  <span style="font-size:64px">🦞</span>
</p>

<h1 align="center">OpenClaw</h1>

<p align="center">
  <strong>Your AI. Your Rules.</strong><br/>
  A self-hosted AI assistant for WhatsApp, Telegram, Discord, Slack, and more — running entirely on your hardware, on your terms.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-live-website">Live Website</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-supported-channels">Channels</a> •
  <a href="#%EF%B8%8F-configuration">Configuration</a> •
  <a href="#-troubleshooting">Troubleshooting</a> •
  <a href="#-resources">Resources</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/node-%3E%3D%20v22-green?style=flat-square" alt="Node.js" />
  <img src="https://img.shields.io/badge/license-open--source-purple?style=flat-square" alt="License" />
</p>

---

## 🌐 Live Website

> **🔗 [Visit the OpenClaw Setup Guide →]((https://16th-psyche.github.io/Openclaw-Installation-Guide/))**
>
> _The full interactive setup guide is hosted at: `<!-- PLACEHOLDER: your-domain.com -->`_

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 💬 | **Omnichannel Intelligence** | Chat through WhatsApp, Telegram, Discord, Slack, Signal, iMessage, and more — all from one unified AI brain. |
| 🔒 | **Privacy by Default** | Your data never touches an external server. OpenClaw runs locally on your machine or your cloud VM. |
| 🧠 | **Model Agnostic** | Use Claude Opus 4.5, Claude Sonnet 4.5, GPT-4, or mix models based on context and cost. |
| ⚡ | **Automation Ready** | Browse the web, manage files, run scripts, and orchestrate workflows — triggered by a simple message. |
| 🔧 | **Extensible with Skills** | Install community-built skills from [ClawHub](https://clawhub.ai) — Spotify control, calendar management, and more. |
| 🌐 | **Always Available** | The gateway daemon keeps OpenClaw running 24/7, even when you close your terminal. |

---

## 🚀 Quick Start

### Prerequisites

- A computer (macOS, Windows, or Linux) or a cloud VM (e.g. Oracle Cloud Free Tier)
- **Node.js v22** or higher — [download here](https://nodejs.org)
- An AI provider API key:
  - [Anthropic Claude](https://console.anthropic.com) _(recommended)_
  - [OpenAI GPT](https://platform.openai.com/api-keys)

### Installation

**macOS / Linux:**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows (PowerShell as Admin):**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

**npm (Universal):**
```bash
npm i -g openclaw
```

**Verify installation:**
```bash
openclaw --version
# e.g. v2025.2.14
```

### Onboarding

Run the interactive setup wizard:

```bash
openclaw onboard --install-daemon
```

The wizard will walk you through:

1. **Naming your assistant** — Jarvis, Alfred, or anything you like
2. **Choosing an AI provider** — Anthropic or OpenAI
3. **Entering your API key** — securely stored locally
4. **Selecting a model** — see the comparison below
5. **Configuring messaging channels** — WhatsApp, Telegram, Discord, etc.
6. **Installing the gateway daemon** — for 24/7 background operation

### Model Comparison

| Model | Strength | Cost |
|---|---|---|
| `claude-opus-4.5` ⭐ | Deep reasoning | Higher |
| `claude-sonnet-4.5` | Balanced | Medium |
| `gpt-4` | Versatile | Medium |

---

## 💬 Supported Channels

### WhatsApp _(Medium difficulty)_

```bash
# Step 1 — Initiate login
openclaw channels login whatsapp

# Step 2 — Approve a contact number
openclaw pairing approve whatsapp +15555551234
```
Scan the QR code displayed in your terminal via **WhatsApp → Linked Devices → Link a Device**.

### Telegram _(Easy — Recommended first channel)_

1. Open Telegram, search for **@BotFather**
2. Send `/newbot` and follow the naming prompts
3. Copy the API token and add it to your config:

```json
{
  "channels": {
    "telegram": {
      "botToken": "your-bot-token-here"
    }
  }
}
```

### Discord _(Moderate)_

1. Create a new app at [discord.com/developers/applications](https://discord.com/developers/applications)
2. Go to **Bot → Add Bot → Reset Token** and copy the token
3. Enable: **Presence Intent**, **Server Members Intent**, **Message Content Intent**
4. Generate an OAuth2 invite URL with bot permissions and invite to your server

```json
{
  "channels": {
    "discord": {
      "token": "your-bot-token-here"
    }
  }
}
```

### More Channels

`Slack` · `Signal` · `Google Chat` · `iMessage` _(macOS)_ · `Matrix` · and more...

> Full setup instructions for all channels: [docs.openclaw.ai](https://docs.openclaw.ai)

---

## ⚙️ Configuration

### Gateway Commands

```bash
openclaw gateway status    # Check if the gateway is running
openclaw gateway start     # Start the gateway
openclaw gateway restart   # Restart after config changes
openclaw dashboard         # Open the web dashboard
```

> 🎯 Web dashboard available at: [http://127.0.0.1:18789/](http://127.0.0.1:18789/)

### Skills & Tools

Browse and install community skills from [ClawHub](https://clawhub.ai):

```bash
openclaw skills install web-search
```

Available skills: `calendar` · `weather` · `spotify` · `file-organizer` · `code-helper` · `web-search`

### Customizing Personality

Edit the `SOUL.md` file to define your assistant's character, tone, and behaviour:

```bash
nano ~/.openclaw/workspace/SOUL.md
```

### Multi-Model Routing

Route different task types to different models for cost efficiency:

```json
{
  "models": {
    "chat":  "claude-opus-4.5",
    "quick": "claude-sonnet-4.5",
    "cheap": "gpt-3.5-turbo"
  }
}
```

### Cost Controls

Protect against runaway API spend:

```json
{
  "limits": {
    "maxTokensPerDay": 100000,
    "alertWhenOver":   50000
  }
}
```

---

## 🔧 Troubleshooting

<details>
<summary><strong>Command not found after install</strong></summary>

Close your terminal, open a new session, and retry. If the issue persists, re-run the installer.
</details>

<details>
<summary><strong>Gateway won't start — port already in use</strong></summary>

```bash
openclaw gateway --port 18790
```
</details>

<details>
<summary><strong>AI is not responding to messages</strong></summary>

Verify your API key is valid and your provider account has remaining credits:

```bash
openclaw logs
```
</details>

<details>
<summary><strong>WhatsApp keeps disconnecting</strong></summary>

Ensure your host machine maintains a stable internet connection. Re-scan the QR code:

```bash
openclaw channels login whatsapp
```
</details>

---

## 📚 Resources

| Resource | Link |
|---|---|
| 📖 Official Docs | [docs.openclaw.ai](https://docs.openclaw.ai) |
| ⚙️ GitHub Source | [github.com/openclaw](https://github.com/openclaw/openclaw) |
| 🛒 ClawHub Marketplace | [clawhub.ai](https://clawhub.ai) |

---

## 🙌 Credits

Made by [@life.after.logout](https://instagram.com/life.after.logout)

---

<p align="center">
  <strong>Your AI. Your Data. Your Rules.</strong><br/>
  <sub>OpenClaw is open-source software — use it freely and responsibly.</sub>
</p>
