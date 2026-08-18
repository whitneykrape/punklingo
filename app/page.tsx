'use client' // <--- CRITICAL: Enables interactivity in App Router pages

import { useState, useEffect, useRef } from 'react'; 

const arrayOfQuestions = [
  { id: 1, questionText: "Thank You", correctAnswer: "ありがとうございます" },
  { id: 2, questionText: "You're Welcome", correctAnswer: "おはよう" },
  { id: 3, questionText: "Good Morning", correctAnswer: "おはようございます" }
];

export default function Home() {  
  const [validationState, setValidationState] = useState<{[key:string]: boolean|null}>({});
  const [answers, setAnswers] = useState<Record<string, string>>({}); 

  const timeoutsRef = new Map<number, NodeJS.Timeout>(); 

  // Handle change on any input field using the data-id as key for lookup and updating state maps.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    
    // Update the user's answer input 
    setAnswers(prev => ({ ...prev, [String(questionId)]: e.target.value }));

    // Clear any existing timer for this question ID (prevents race conditions during typing).
    if (timeoutsRef.has(questionId)) clearTimeout(timeoutsRef.get(questionId)!);

    const timeoutId = setTimeout(() => {      
      const isCorrect = e.target.value === (arrayOfQuestions.find(q => q.id == questionId)?.correctAnswer || "");

      setValidationState(prev => ({ ...prev, [String(questionId)]: isCorrect })); 

    }, 800); // Debounce wait time in milliseconds
    
    timeoutsRef.set(questionId, timeoutId as unknown as NodeJS.Timeout); 
  };  



  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        </p>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">


      {/* Container for all questions */}
      <div className="w-full max-w-lg space-y-6">  
        {arrayOfQuestions.map((q) => { 
          const questionId = String(q.id); // Use string key to match state object keys
          
          return (
            <fieldset 
              key={questionId}
              style={{ 
                border: validationState[questionId] === true ? '2px solid #16a34a' :  // Green if correct
                       validationState[questionId] === false && answers[questionId]?.length > 0 ? '2px solid #dc2626' : '', 
                borderRadius: '8px', padding: '1rem'} } 
              className="transition-all duration-300"
            >  
              
              {/* Question Label */}
              <legend className="font-semibold mb-2 text-white"> {q.questionText}</legend>

              {/* Input field with onChange tied to question ID and input value tracking logic.  */} 
              <input
                type="text"
                id={`question-${questionId}`}
                data-id={questionId} // Pass question ID as a key for validation lookup inside handlers 
                value={answers[questionId] || ""} // Current user's typed answer stored in answers state object.  
                onChange={(e) => handleInputChange(e, parseInt(questionId))}  // Trigger handler with proper type conversion
                placeholder={`Enter your answer...`} 
                className="w-full p-2 border rounded focus:outline-none transition-colors duration-300" />

              {/* Status Message */}
               <p style={{ color: validationState[questionId] === true ? 'green' : (validationState[questionId] === false && answers[questionId]?.length > 0) ? 'red': '', fontSize: '.9rem', marginTop: '5px'}}> 
                 {validationState[questionId] === null ? "" : validationState[questionId] === true ? "✅ Correct!" : (answers[questionId]?.length > 0 && "❌ Incorrect.")}
               </p> 

            </fieldset>  
          );      
        })}

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