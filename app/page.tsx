'use client' // <--- CRITICAL: Enables interactivity in App Router pages

import { useState, useEffect, useRef } from 'react'; 

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  
  // Validation status: null (idle), true (correct), false (incorrect)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); 
  const isCheckingRef = useRef(false); 

  const answerArray = [
     "おはよう ございます"
  ];

  // Timer Ref for debouncing
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (!inputValue.trim()) {
      setIsCorrect(null);
      isCheckingRef.current = false;
      return; 
    }
    
    clearTimeout(timeoutIdRef.current); 

    timeoutIdRef.current = setTimeout(() => {
      const correct = inputValue === answerArray[0];
      setIsCorrect(correct); 
      isCheckingRef.current = false; 
    }, 800); 

    return () => {
      clearTimeout(timeoutIdRef.current); 
      isCheckingRef.current = false; 
    };
  }, [inputValue]); // Re-run whenever inputValue changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    setInputValue(e.target.value); 
    setIsCorrect(null); 

    isCheckingRef.current = true; 
    
    return () => {};
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        </p>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

          <div className={`p-8 rounded-lg shadow-md border w-full max-w-sm transition-all duration-300 
            ${isCorrect === null ? '' : ''}
            ${isCorrect !== null && isCorrect === true ? 'border-green-500 bg-green-50 text-green-700' : ''}
            ${isCorrect !== null && isCorrect === false ? 'border-red-400 bg-red-50 text-red-600 animate-pulse-short' : ''}
          `}>

            <h1 className="text-xl font-bold mb-2">Quick Check</h1>
            <p className={`mb-4 ${isCorrect === true ? 'font-semibold' : 'text-gray-500'}`}>
              {inputValue.length > 0 
                ? (isCorrect === true ? "✅ Correct!" : isCorrect === false ? "❌ Try again..." : "") 
                : "Type the secret code..."}
            </p>

            {/* Input Field */}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Type the answer...`} 
              className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-200 ${isCorrect === true ? 'border-green-500 ring-4 ring-green-100' : isCorrect === false && inputValue.length > 0 ? 'border-red-400 ring-4 ring-red-50 shake-effect animate-pulse-once' : 'border-gray-300 focus:border-blue-500'}`}
            />

          </div>

        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">

          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation (this does not exist)
          </a>
        </div>
      </main>
    </div>
  );
}