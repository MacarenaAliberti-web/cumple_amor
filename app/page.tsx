"use client";
import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import TerminalLoader from "@/components/TerminalLoader";
import MainContent from "@/components/MainContent";

export default function Page() {
  const [step, setStep] = useState<"login" | "loading" | "main">("login");

  if (step === "login") {
    return <LoginScreen onUnlock={() => setStep("loading")} />;
  }

  if (step === "loading") {
    return <TerminalLoader onComplete={() => setStep("main")} />;
  }

  return <MainContent />;
}
