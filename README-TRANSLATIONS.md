# Multilingual Chat Widget - Translation System

## Overview

This chatbot widget supports **95+ languages** with automatic browser detection. The UI translates instantly while Claude handles conversation content in any language natively.

## How It Works

**Three-layer translation:**

1. **UI Strings** (buttons, labels, placeholders)
   - Pre-translated into 95+ languages
   - Loaded from `translations.json` based on browser language
   - Zero API calls, instant load

2. **Conversation Content** (questions & answers)
   - Claude automatically detects and responds in the same language
   - Visitor asks in Polish → Claude responds in Polish
   - No configuration needed

3. **Email Notifications**
   - Business owner receives conversation in original language
   - Example: Polish conversation is emailed in Polish

## Setup (One-Time)

### Generate All Translations
```bash
