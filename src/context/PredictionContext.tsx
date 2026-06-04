"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CloudCostInput, PredictionResult } from "@/lib/types";
import { predictBiaya } from "@/lib/api";

interface PredictionContextType {
  predictionResult: PredictionResult | null;
  history: PredictionResult[];
  isLoading: boolean;
  handlePredict: (input: CloudCostInput) => Promise<void>;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const PredictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<PredictionResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load initial states from localStorage on client side
  useEffect(() => {
    const savedResult = localStorage.getItem("cloudcost_prediction_result");
    const savedHistory = localStorage.getItem("cloudcost_prediction_history");
    if (savedResult) {
      try {
        setPredictionResult(JSON.parse(savedResult));
      } catch (e) {
        console.error("Error loading prediction result:", e);
      }
    }
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Error loading prediction history:", e);
      }
    }
  }, []);

  const handlePredict = async (input: CloudCostInput) => {
    setIsLoading(true);
    try {
      const result = await predictBiaya(input);
      setPredictionResult(result);
      
      // Update history list (max 50 items)
      setHistory((prevHistory) => {
        const updatedHistory = [result, ...prevHistory].slice(0, 50);
        localStorage.setItem("cloudcost_prediction_history", JSON.stringify(updatedHistory));
        return updatedHistory;
      });

      localStorage.setItem("cloudcost_prediction_result", JSON.stringify(result));
    } catch (error) {
      console.error("Failed to predict cost:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PredictionContext.Provider value={{ predictionResult, history, isLoading, handlePredict }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error("usePrediction must be used within a PredictionProvider");
  }
  return context;
};
