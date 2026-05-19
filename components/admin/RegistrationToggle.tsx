"use client";

import React, { useState } from 'react';
import { updateGlobalSetting } from '@/app/admin/actions';
import { FaPause, FaPlay, FaCheckCircle } from 'react-icons/fa';

export default function RegistrationToggle({ initialValue }: { initialValue: string }) {
  const [isDisabled, setIsDisabled] = useState(initialValue === 'true');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = async () => {
    const newValue = !isDisabled;
    setIsSaving(true);
    try {
      await updateGlobalSetting('registration_disabled', newValue ? 'true' : 'false');
      setIsDisabled(newValue);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("Error updating registration status: " + errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
            isDisabled ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
          }`}>
            {isDisabled ? <FaPause size={18} /> : <FaPlay size={18} />}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Registration Status</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              {isDisabled 
                ? 'Form fill-up is paused. Users cannot submit new registrations.' 
                : 'Form fill-up is active. Users can register and pay.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={isSaving}
          className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isDisabled ? 'bg-rose-600' : 'bg-emerald-600'
          } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isDisabled ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {showSuccess && (
        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-500 animate-in fade-in slide-in-from-top-1 duration-200">
          <FaCheckCircle />
          <span>Status saved successfully</span>
        </div>
      )}
    </div>
  );
}
