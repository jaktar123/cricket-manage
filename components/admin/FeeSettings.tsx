"use client";

import React, { useState, useEffect } from 'react';
import { updateGlobalSetting } from '@/app/admin/actions';
import { FaMoneyBillWave, FaSave, FaCheckCircle, FaPlus, FaTrash, FaCalculator } from 'react-icons/fa';


interface FeeItem {
  name: string;
  amount: number;
}

export default function FeeSettings({ initialValue }: { initialValue: string }) {
  const [items, setItems] = useState<FeeItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(initialValue);
      if (Array.isArray(parsed)) {
        setItems(parsed);
      } else {
        setItems([{ name: "Registration Fee", amount: parseInt(initialValue) || 100 }]);
      }
    } catch {
      setItems([{ name: "Registration Fee", amount: parseInt(initialValue) || 100 }]);
    }
  }, [initialValue]);

  const addItem = () => {
    setItems([...items, { name: "New Fee Item", amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      alert("You must have at least one fee item.");
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof FeeItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'amount') {
      newItems[index].amount = parseInt(value.toString()) || 0;
    } else {
      newItems[index].name = value.toString();
    }
    setItems(newItems);
  };

  const totalFee = items.reduce((acc, item) => acc + item.amount, 0);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateGlobalSetting('registration_fee', JSON.stringify(items));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("Error updating fee structure: " + errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <FaMoneyBillWave size={20} />
          </div>
          <h3 className="text-white font-bold text-lg">Registration Fee Structure</h3>
        </div>
        <button
          onClick={addItem}
          className="p-2 rounded-lg bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
        >
          <FaPlus />
          Add Item
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 items-end group">
            <div className="flex-1">
              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5 ml-1">
                Item Description
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                placeholder="e.g. Platform Fee"
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:border-blue-500 outline-none transition-colors text-sm font-medium"
              />
            </div>
            <div className="w-24">
              <label className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5 ml-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">₹</span>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItem(index, 'amount', e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg pl-6 pr-3 py-2.5 focus:border-blue-500 outline-none transition-colors text-sm font-bold"
                />
              </div>
            </div>
            <button
              onClick={() => removeItem(index)}
              className="p-3 rounded-lg text-slate-600 hover:text-red-500 hover:bg-red-500/10 transition-all mb-0.5"
              title="Remove Item"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-800 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <FaCalculator size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Total Payable Fee</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">₹{totalFee}.00</span>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${
          showSuccess 
            ? 'bg-emerald-500 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50'
        }`}
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : showSuccess ? (
          <>
            <FaCheckCircle />
            <span>Structure Updated!</span>
          </>
        ) : (
          <>
            <FaSave />
            <span>Save Fee Structure</span>
          </>
        )}
      </button>
    </div>
  );
}
