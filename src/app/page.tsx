'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Loader2,
  Trash2,
  Globe,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Feather,
  MessageCircle,
  Shield,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const LANGUAGES = [
  { code: 'auto', name: 'Auto Detect', flag: '🌐' },
  { code: 'English', name: 'English', flag: '🇬🇧' },
  { code: 'Chinese', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'Chinese (Traditional)', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { code: 'French', name: 'French', flag: '🇫🇷' },
  { code: 'German', name: 'German', flag: '🇩🇪' },
  { code: 'Italian', name: 'Italian', flag: '🇮🇹' },
  { code: 'Portuguese', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'Russian', name: 'Russian', flag: '🇷🇺' },
  { code: 'Japanese', name: 'Japanese', flag: '🇯🇵' },
  { code: 'Korean', name: 'Korean', flag: '🇰🇷' },
  { code: 'Arabic', name: 'Arabic', flag: '🇸🇦' },
  { code: 'Hindi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'Turkish', name: 'Turkish', flag: '🇹🇷' },
  { code: 'Vietnamese', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'Thai', name: 'Thai', flag: '🇹🇭' },
  { code: 'Dutch', name: 'Dutch', flag: '🇳🇱' },
  { code: 'Polish', name: 'Polish', flag: '🇵🇱' },
  { code: 'Swedish', name: 'Swedish', flag: '🇸🇪' },
  { code: 'Danish', name: 'Danish', flag: '🇩🇰' },
  { code: 'Finnish', name: 'Finnish', flag: '🇫🇮' },
  { code: 'Norwegian', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'Greek', name: 'Greek', flag: '🇬🇷' },
  { code: 'Czech', name: 'Czech', flag: '🇨🇿' },
  { code: 'Romanian', name: 'Romanian', flag: '🇷🇴' },
  { code: 'Hungarian', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'Ukrainian', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'Indonesian', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'Malay', name: 'Malay', flag: '🇲🇾' },
  { code: 'Filipino', name: 'Filipino', flag: '🇵🇭' },
  { code: 'Bengali', name: 'Bengali', flag: '🇧🇩' },
  { code: 'Punjabi', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'Urdu', name: 'Urdu', flag: '🇵🇰' },
  { code: 'Persian', name: 'Persian', flag: '🇮🇷' },
  { code: 'Hebrew', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'Swahili', name: 'Swahili', flag: '🇰🇪' },
];

const LANG_CODE_MAP: Record<string, string> = {
  'auto': '',
  'English': 'en-US',
  'Chinese': 'zh-CN',
  'Chinese (Traditional)': 'zh-TW',
  'Spanish': 'es-ES',
  'French': 'fr-FR',
  'German': 'de-DE',
  'Italian': 'it-IT',
  'Portuguese': 'pt-PT',
  'Russian': 'ru-RU',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR',
  'Arabic': 'ar-SA',
  'Hindi': 'hi-IN',
  'Turkish': 'tr-TR',
  'Vietnamese': 'vi-VN',
  'Thai': 'th-TH',
  'Dutch': 'nl-NL',
  'Polish': 'pl-PL',
  'Swedish': 'sv-SE',
  'Danish': 'da-DK',
  'Finnish': 'fi-FI',
  'Norwegian': 'nb-NO',
  'Greek': 'el-GR',
  'Czech': 'cs-CZ',
  'Romanian': 'ro-RO',
  'Hungarian': 'hu-HU',
  'Ukrainian': 'uk-UA',
  'Indonesian': 'id-ID',
  'Malay': 'ms-MY',
  'Filipino': 'fil-PH',
  'Bengali': 'bn-BD',
  'Punjabi': 'pa-IN',
  'Urdu': 'ur-PK',
  'Persian': 'fa-IR',
  'Hebrew': 'he-IL',
  'Swahili': 'sw-KE',
};

/* ─────────── Splash / Landing Page ─────────── */
function SplashPage({ onEnter }: { onEnter: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // hydrated mount flag — safe to read theme after first render
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/30 flex flex-col">
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/30 dark:bg-emerald-800/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-teal-200/30 dark:bg-teal-800/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-cyan-200/20 dark:bg-cyan-800/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Theme toggle - top right */}
      <div className="absolute top-4 right-4 z-50">
        {mounted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full h-10 w-10 border-border/40 bg-background/60 backdrop-blur-md hover:bg-accent/50 transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 blur-xl opacity-40"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src="/logo.png"
              alt="Learn Smarter, Translate Better with Tania"
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover shadow-2xl shadow-emerald-500/30"
            />
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Learn Smarter,
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Translate Better with Tania
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground text-center mb-10 max-w-md"
        >
          Break language barriers with AI-powered translation across 36+ languages
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40">
            <MessageCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">36+ Languages</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40">
            <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Auto Detect</span>
          </div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={onEnter}
              className="group px-10 h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 rounded-2xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating language chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-14 flex flex-wrap justify-center gap-2 max-w-lg"
        >
          {['Hello', '你好', 'Hola', 'Bonjour', 'مرحبا', 'こんにちは', '안녕하세요', 'Привет'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1, type: 'spring', stiffness: 300 }}
              className="px-3 py-1 text-xs rounded-full bg-background/80 backdrop-blur-sm border border-border/40 text-muted-foreground shadow-sm"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="py-6 text-center relative z-10"
      >
        <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1">
          Made with <Feather className="w-3 h-3 text-emerald-500" /> by Tania
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────── Translation App ─────────── */
function TranslationApp() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('Chinese');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState<'source' | 'target' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<'source' | 'target' | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const targetTextareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setCharCount(sourceText.length); }, [sourceText]);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      toast({ title: 'No text to translate', description: 'Please enter some text first.', variant: 'destructive' });
      return;
    }
    setIsTranslating(true);
    setTranslatedText('');
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, sourceLanguage, targetLanguage }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Translation failed');
      setTranslatedText(data.translatedText);
    } catch (error) {
      toast({ title: 'Translation Error', description: error instanceof Error ? error.message : 'Something went wrong.', variant: 'destructive' });
    } finally {
      setIsTranslating(false);
    }
  }, [sourceText, sourceLanguage, targetLanguage, toast]);

  const handleSwapLanguages = useCallback(() => {
    if (sourceLanguage === 'auto') {
      toast({ title: 'Cannot swap', description: 'Auto-detect cannot be set as target. Select a specific source language first.', variant: 'destructive' });
      return;
    }
    const tempLang = sourceLanguage;
    const tempText = sourceText;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLang);
    setSourceText(translatedText);
    setTranslatedText(tempText);
  }, [sourceLanguage, targetLanguage, sourceText, translatedText, toast]);

  const handleCopy = useCallback(async (text: string, type: 'source' | 'target') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      toast({ title: 'Copied!', description: 'Text copied to clipboard.' });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: 'Copy failed', description: 'Could not copy to clipboard.', variant: 'destructive' });
    }
  }, [toast]);

  const handleTextToSpeech = useCallback((text: string, language: string, type: 'source' | 'target') => {
    if (!text) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(null); return; }
    const langCode = LANG_CODE_MAP[language];
    if (!langCode) { toast({ title: 'Speech not supported', description: `TTS not available for ${language}.`, variant: 'destructive' }); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => { setIsSpeaking(null); toast({ title: 'Speech failed', description: 'Could not play audio.', variant: 'destructive' }); };
    setIsSpeaking(type);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, toast]);

  const handleClear = useCallback(() => {
    setSourceText(''); setTranslatedText(''); window.speechSynthesis.cancel(); setIsSpeaking(null);
  }, []);

  const handleSourceTextChange = useCallback((value: string) => {
    setSourceText(value);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
  }, []);

  const getLanguageFlag = useCallback((code: string) => LANGUAGES.find(l => l.code === code)?.flag || '🌐', []);
  const getLanguageName = useCallback((code: string) => LANGUAGES.find(l => l.code === code)?.name || code, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20"
    >
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo.png" alt="Learn Smarter, Translate Better with Tania Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg" />
              <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-tight leading-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Learn Smarter, Translate Better with Tania</span>
                <span className="sm:hidden">Translate Better with Tania</span>
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Translation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-full h-9 w-9 border-border/50 hover:bg-accent/50 transition-all" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                      <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Sun className="h-4 w-4 text-amber-400" />
                      </motion.div>
                    ) : (
                      <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Moon className="h-4 w-4 text-slate-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            )}
            <Badge variant="secondary" className="hidden sm:flex gap-1 text-xs"><Sparkles className="w-3 h-3" />AI Translation</Badge>
            <Badge variant="outline" className="text-xs"><Globe className="w-3 h-3 mr-1" />{LANGUAGES.length - 1} Languages</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Language Selector Bar */}
        <Card className="mb-6 border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex-1 w-full sm:w-auto">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">FROM</label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger className="w-full bg-background hover:bg-accent/50 transition-colors">
                    <SelectValue><span className="flex items-center gap-2"><span className="text-base">{getLanguageFlag(sourceLanguage)}</span><span>{getLanguageName(sourceLanguage)}</span></span></SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {LANGUAGES.map((lang) => (<SelectItem key={lang.code} value={lang.code}><span className="flex items-center gap-2"><span className="text-base">{lang.flag}</span><span>{lang.name}</span></span></SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center pt-2 sm:pt-5">
                <motion.div whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Button variant="outline" size="icon" onClick={handleSwapLanguages} className="rounded-full h-10 w-10 border-dashed hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all" title="Swap languages">
                    <ArrowRightLeft className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">TO</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="w-full bg-background hover:bg-accent/50 transition-colors">
                    <SelectValue><span className="flex items-center gap-2"><span className="text-base">{getLanguageFlag(targetLanguage)}</span><span>{getLanguageName(targetLanguage)}</span></span></SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {LANGUAGES.filter(l => l.code !== 'auto').map((lang) => (<SelectItem key={lang.code} value={lang.code}><span className="flex items-center gap-2"><span className="text-base">{lang.flag}</span><span>{lang.name}</span></span></SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Source Panel */}
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border/30">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">{getLanguageFlag(sourceLanguage)}{getLanguageName(sourceLanguage)}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleTextToSpeech(sourceText, sourceLanguage === 'auto' ? 'English' : sourceLanguage, 'source')} disabled={!sourceText.trim()} title="Listen to source">
                    {isSpeaking === 'source' ? <VolumeX className="w-4 h-4 text-destructive" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(sourceText, 'source')} disabled={!sourceText.trim()} title="Copy source text">
                    {copied === 'source' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClear} disabled={!sourceText.trim() && !translatedText.trim()} title="Clear all text">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Textarea value={sourceText} onChange={(e) => handleSourceTextChange(e.target.value)} placeholder="Enter text to translate..." className="min-h-[200px] sm:min-h-[280px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed p-4 bg-transparent" maxLength={5000} />
                <div className="absolute bottom-3 right-4 flex items-center gap-2">
                  <span className={`text-xs ${charCount > 4500 ? 'text-destructive' : 'text-muted-foreground'}`}>{charCount}/5000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target Panel */}
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border/30">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">{getLanguageFlag(targetLanguage)}{getLanguageName(targetLanguage)}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleTextToSpeech(translatedText, targetLanguage, 'target')} disabled={!translatedText.trim()} title="Listen to translation">
                    {isSpeaking === 'target' ? <VolumeX className="w-4 h-4 text-destructive" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleCopy(translatedText, 'target')} disabled={!translatedText.trim()} title="Copy translation">
                    {copied === 'target' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="relative">
                {isTranslating ? (
                  <div className="min-h-[200px] sm:min-h-[280px] p-4 flex items-center justify-center">
                    <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="relative">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                        <motion.div className="absolute inset-0 rounded-full border-2 border-emerald-200 dark:border-emerald-800" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      </div>
                      <span className="text-sm text-muted-foreground">Translating...</span>
                    </motion.div>
                  </div>
                ) : (
                  <Textarea ref={targetTextareaRef} value={translatedText} readOnly placeholder="Translation will appear here..." className="min-h-[200px] sm:min-h-[280px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed p-4 bg-transparent" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Translate Button */}
        <div className="flex justify-center mt-6">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" onClick={handleTranslate} disabled={isTranslating || !sourceText.trim()} className="px-8 sm:px-12 h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300">
              {isTranslating ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Translating...</>) : (<><Languages className="w-5 h-5 mr-2" />Translate</>)}
            </Button>
          </motion.div>
        </div>

        {/* Quick Phrases */}
        <AnimatePresence>
          {!sourceText && !translatedText && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: 0.3 }} className="mt-8">
              <p className="text-sm text-muted-foreground mb-3 text-center">Try a quick phrase:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Hello, how are you?', 'Where is the nearest restaurant?', 'Thank you very much!', 'I need help, please.', 'What time is it?', 'Nice to meet you.'].map((phrase) => (
                  <motion.button key={phrase} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSourceText(phrase)} className="px-4 py-2 text-sm rounded-full border border-border/60 bg-background hover:bg-accent/50 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-200 text-muted-foreground hover:text-foreground">
                    {phrase}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground/60">Powered by AI • Supports {LANGUAGES.length - 1} languages • Auto-detect available</p>
        </div>
      </main>
    </motion.div>
  );
}

/* ─────────── Main Page (Router) ─────────── */
export default function Home() {
  const [showApp, setShowApp] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!showApp ? (
        <motion.div
          key="splash"
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <SplashPage onEnter={() => setShowApp(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <TranslationApp />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
