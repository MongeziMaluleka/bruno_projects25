import { useState, useRef, useEffect } from "react";


/**
 * Hook that returns state and functions for managing a task form.
 *
 * @param {{ title: string, notes: string }} initial Initial values for the form.
 * @returns {{ title: string, setTitle: (string) => void, notes: string, setNotes: (string) => void, isValid: boolean, reset: () => void, submitWith: (onAdd: (task) => void) => (e: React.FormEvent<HTMLFormElement>) => void, titleRef: React.MutableRefObject<HTMLInputElement | null> }}
 */
export function useTaskForm(initial = { title: "", notes: "" }) {
  // State for title and notes, and validity check
  const [title, setTitle] = useState(initial.title);                         
  const [notes, setNotes] = useState(initial.notes);                         
  const isValid = title.trim().length > 0;                         

  // Ref and function to focus the title input
  const titleRef = useRef(null);                                             
  const focusTitle = () => titleRef.current?.focus();                         

  const reset = () => { setTitle(""); setNotes(""); };                        

  // After fields become empty, focus the title input
  useEffect(() => { if (title === "") focusTitle(); }, [title]);              

  // Common submit handler generator
  const submitWith = (onAdd) => (e) => {
    // Prevent default form submission
    e.preventDefault();                                                       
    if (!isValid) return;                                                     
    onAdd({ title: title.trim(), notes: notes.trim() });                      
    reset();                                                                  
  };

  return {
    title, setTitle,
    notes, setNotes,
    isValid,
    reset,
    submitWith,
    titleRef,                                                                  
  };
}
