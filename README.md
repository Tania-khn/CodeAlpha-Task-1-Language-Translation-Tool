# CodeAlpha-Task-1-Language-Translation-Tool
Language Translation Tool is a software application that converts text from one language to another quickly and accurately. It helps users communicate and understand content across different languages, making global communication easier and more accessible.
## Learn Smarter, Translate Better with Tania
**AI-powered language translation app supporting 36+ languages with auto-detect, text-to-speech, copy, and dark/light theme features.**

## Features
AI-Powered Translation — Uses z-ai-web-dev-sdk LLM for accurate, context-aware translations
36+ Languages — English, Chinese, Spanish, French, German, Arabic, Urdu, Hindi, Japanese, Korean, and many more
Auto Detect — Automatically detect the source language
Swap Languages — One-click swap between source and target languages
Copy to Clipboard — Copy source or translated text instantly
Text-to-Speech — Listen to both source and translated text
Dark/Light Theme — Toggle between themes with system preference support
Responsive Design — Works on mobile, tablet, and desktop
Splash Page — Beautiful animated landing page before entering the app
## Tech Stack
Framework: Next.js 16 (App Router)
Language: TypeScript 5
Styling: Tailwind CSS 4 + shadcn/ui
Animations: Framer Motion
Theme: next-themes
AI SDK: z-ai-web-dev-sdk (backend only)
Text-to-Speech: Web Speech API
## Getting Started
Prerequisites
Node.js 18+ or Bun
npm or bun package manager
## Installation
Extract the zip file

## Open the folder in VSCode

Open terminal (Ctrl + `)

## **npm install**

## Running the App

## **npm run dev**

## Open http://localhost:3000 in your browser.

## Project Structure
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── translate/
│   │   │       └── route.ts      # Translation API endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── page.tsx              # Splash page + Translation app
│   ├── components/
│   │   └── ui/                   # shadcn/ui components
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── lib/
│       ├── db.ts                 # Prisma client
│       └── utils.ts
├── public/
│   ├── logo.png                  # Custom bird-wings logo
│   ├── logo.svg
│   └── robots.txt
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json
├── eslint.config.mjs
└── Caddyfile
## Usage
Splash Page — Click "Get Started" to enter the translation app
Select Languages — Choose source language (or Auto Detect) and target language
Enter Text — Type or paste text (max 5000 characters)
Translate — Click the Translate button
Copy / Listen — Use copy button or speaker icon on either panel
Swap — Click the swap icon to swap source and target languages
Theme — Toggle dark/light mode from the header
## Author
Tania
## License
This project is for intership purpose use. Gaining hand-on practice in Artificial Intelligence.

