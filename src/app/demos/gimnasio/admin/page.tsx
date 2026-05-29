"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Dumbbell, ArrowLeft, Plus, Trash2, Users, AlertTriangle,
  ArrowRightLeft, RefreshCw, Sparkles, Lock, ShieldCheck, GripVertical
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Exercise {
  name: string;
  muscle: string;
  sets: string;
  reps: string;
}

interface Routine {
  id: string;
  title: string;
  exercises: Exercise[];
}

interface GymStudent {
  id: string;
  name: string;
  avatar: string;
  track: "pierna-v1" | "pierna-v2" | "pecho" | "tren-superior";
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
const STORAGE_KEY = "gimnasio_coach_routines";
const PIN_KEY = "gimnasio_coach_pin_verified";
const COACH_PIN = "1234"; // Demo PIN — en producción sería un hash en backend

const initialStudents: GymStudent[] = [
  { id: "1", name: "María Rodríguez", avatar: "M", track: "pierna-v1" },
  { id: "2", name: "Esteban Pintos", avatar: "E", track: "pierna-v1" },
  { id: "3", name: "Cristina Gómez", avatar: "C", track: "pierna-v1" },
  { id: "4", name: "Facundo Ortiz", avatar: "F", track: "pierna-v1" },
  { id: "5", name: "Gero Maidana", avatar: "G", track: "pierna-v1" },
  { id: "6", name: "Lucas Benítez", avatar: "L", track: "pierna-v1" },
  { id: "7", name: "Juan Pérez", avatar: "J", track: "pierna-v2" },
  { id: "8", name: "Milagros Maidana", avatar: "M", track: "pierna-v2" },
  { id: "9", name: "Santiago Cabrera", avatar: "S", track: "pecho" },
  { id: "10", name: "Nicolás Sosa", avatar: "N", track: "pecho" },
  { id: "11", name: "Ariel Blanco", avatar: "A", track: "pecho" },
  { id: "12", name: "Franco Fleitas", avatar: "F", track: "tren-superior" },
  { id: "13", name: "Romina Vallejos", avatar: "R", track: "tren-superior" },
  { id: "14", name: "Clara Benítez", avatar: "C", track: "tren-superior" },
];

// Default routines — fallback if coach hasn't edited yet
const defaultRoutines: Record<string, Routine[]> = {
  Lunes: [
    { id: "lun-pierna-v1", title: "Pierna V1 + Hombros", exercises: [
      { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Prensa de Piernas a 45°", muscle: "Pierna", sets: "4", reps: "12" },
      { name: "Camilla de Extensión", muscle: "Pierna", sets: "3", reps: "15" },
      { name: "Press Militar con Mancuernas", muscle: "Hombros", sets: "4", reps: "10" },
    ]},
    { id: "lun-pecho-triceps", title: "Pecho & Tríceps", exercises: [
      { name: "Press de Banca Plano con Barra", muscle: "Pecho", sets: "4", reps: "10" },
      { name: "Aperturas Planas con Mancuernas", muscle: "Pecho", sets: "3", reps: "12" },
      { name: "Extensiones de Tríceps en Polea", muscle: "Tríceps", sets: "3", reps: "12" },
    ]},
  ],
  Martes: [
    { id: "mar-pierna-v2", title: "Pierna V2 + Hombros", exercises: [
      { name: "Sentadilla Búlgara con Mancuernas", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Estocadas Caminando", muscle: "Pierna", sets: "4", reps: "20" },
      { name: "Peso Muerto Rumano", muscle: "Pierna", sets: "4", reps: "12" },
    ]},
    { id: "mar-espalda", title: "Espalda & Bíceps", exercises: [
      { name: "Remo con Barra Prono", muscle: "Espalda", sets: "4", reps: "10" },
      { name: "Remo Bajo en Polea", muscle: "Espalda", sets: "4", reps: "12" },
      { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12" },
    ]},
  ],
  Miércoles: [
    { id: "mie-pierna-v1", title: "Pierna V1 + Hombros", exercises: [
      { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Prensa de Piernas a 45°", muscle: "Pierna", sets: "4", reps: "12" },
      { name: "Camilla de Extensión", muscle: "Pierna", sets: "3", reps: "15" },
    ]},
    { id: "mie-pecho-hombro", title: "Pecho & Hombros", exercises: [
      { name: "Press de Banca Plano con Barra", muscle: "Pecho", sets: "4", reps: "10" },
      { name: "Press de Hombro con Mancuerna", muscle: "Hombros", sets: "4", reps: "10" },
    ]},
  ],
  Jueves: [
    { id: "jue-pierna-v2", title: "Pierna V2 + Hombros", exercises: [
      { name: "Sentadilla Búlgara con Mancuernas", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Estocadas Caminando", muscle: "Pierna", sets: "4", reps: "20" },
      { name: "Peso Muerto Rumano", muscle: "Pierna", sets: "4", reps: "12" },
    ]},
    { id: "jue-brazos", title: "Brazos Completos", exercises: [
      { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12" },
      { name: "Extensiones de Tríceps con Soga", muscle: "Tríceps", sets: "3", reps: "12" },
      { name: "Curl tipo Martillo", muscle: "Bíceps", sets: "3", reps: "12" },
    ]},
  ],
  Viernes: [
    { id: "vie-pierna-full", title: "Pierna Full + Hombros", exercises: [
      { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Peso Muerto Rumano con Barra", muscle: "Pierna", sets: "4", reps: "10" },
      { name: "Elevaciones de Talones de Pie", muscle: "Pierna", sets: "4", reps: "20" },
    ]},
    { id: "vie-torso", title: "Torso Completo", exercises: [
      { name: "Press de Banca Plano", muscle: "Pecho", sets: "4", reps: "10" },
      { name: "Jalón al Pecho Polea Alta", muscle: "Espalda", sets: "4", reps: "12" },
      { name: "Press Militar de Hombros", muscle: "Hombros", sets: "3", reps: "10" },
    ]},
  ],
};

// ─── PIN Gate Component ──────────────────────────────────────────────────────

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (pin === COACH_PIN) {
      sessionStorage.setItem(PIN_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6 transition-colors">
      <div className={`w-full max-w-xs space-y-6 ${shake ? "animate-shake" : ""}`}>
        {/* Lock Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              Área del Coach
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Ingresá el PIN para acceder al panel de gestión.
            </p>
          </div>
        </div>

        {/* PIN Input */}
        <div className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder="• • • •"
            className={`w-full text-center text-2xl font-black tracking-[0.5em] py-4 px-4 rounded-xl border-2 bg-white dark:bg-slate-900 outline-none transition-all ${
              error
                ? "border-red-500 text-red-500"
                : "border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500"
            }`}
            autoFocus
          />
          {error && (
            <p className="text-xs font-bold text-red-500 text-center">
              PIN incorrecto. Intentá de nuevo.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={pin.length < 4}
          className="w-full py-4 bg-blue-600 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 shadow-sm"
        >
          Ingresar
        </button>

        {/* Back link */}
        <Link
          href="/demos/gimnasio"
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al pizarrón
        </Link>

        {/* Demo hint */}
        <p className="text-[9px] font-bold text-slate-400/60 dark:text-slate-600 text-center uppercase tracking-wider">
          Demo PIN: 1234
        </p>
      </div>
    </div>
  );
}

// ─── Main Coach Page ─────────────────────────────────────────────────────────

export default function GymAdminPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"pizarron" | "aforo">("pizarron");
  const [selectedDay, setSelectedDay] = useState<string>("Miércoles");
  const [routinesData, setRoutinesData] = useState<Record<string, Routine[]>>(defaultRoutines);
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(0);
  const [students, setStudents] = useState<GymStudent[]>(initialStudents);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for adding a new student
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentTrack, setNewStudentTrack] = useState<GymStudent["track"]>("pierna-v1");

  // Check PIN on mount
  useEffect(() => {
    const verified = sessionStorage.getItem(PIN_KEY);
    if (verified === "true") setIsUnlocked(true);
  }, []);

  // Load coach routines and students from localStorage
  useEffect(() => {
    const savedRoutines = localStorage.getItem(STORAGE_KEY);
    if (savedRoutines) {
      try {
        setRoutinesData(JSON.parse(savedRoutines));
      } catch (e) {}
    }

    const savedStudents = localStorage.getItem("gimnasio_coach_students");
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch (e) {}
    }
  }, []);

  // Set current day on mount
  useEffect(() => {
    const dayIndex = new Date().getDay();
    const mapping = ["Viernes", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Viernes"];
    setSelectedDay(mapping[dayIndex] || "Miércoles");
  }, []);

  // Auto-save to localStorage whenever routinesData changes
  const persistRoutines = useCallback((data: Record<string, Routine[]>) => {
    setRoutinesData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ── CRUD Operations ──────────────────────────────────────────────────────

  const currentDayRoutines = routinesData[selectedDay] || [];
  const currentRoutine = currentDayRoutines[selectedRoutineIndex];

  const updateExercise = (exerciseIdx: number, field: keyof Exercise, value: string) => {
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    const routine = { ...dayRoutines[selectedRoutineIndex] };
    const exercises = [...routine.exercises];
    exercises[exerciseIdx] = { ...exercises[exerciseIdx], [field]: value };
    routine.exercises = exercises;
    dayRoutines[selectedRoutineIndex] = routine;
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
  };

  const addExercise = () => {
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    const routine = { ...dayRoutines[selectedRoutineIndex] };
    routine.exercises = [
      ...routine.exercises,
      { name: "", muscle: "", sets: "4", reps: "10" },
    ];
    dayRoutines[selectedRoutineIndex] = routine;
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
    showToast("➕ Ejercicio agregado");
  };

  const removeExercise = (exerciseIdx: number) => {
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    const routine = { ...dayRoutines[selectedRoutineIndex] };
    const removed = routine.exercises[exerciseIdx];
    routine.exercises = routine.exercises.filter((_, i) => i !== exerciseIdx);
    dayRoutines[selectedRoutineIndex] = routine;
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
    showToast(`🗑️ "${removed.name || "Ejercicio"}" eliminado`);
  };

  const addRoutine = () => {
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    const newId = `${selectedDay.toLowerCase().slice(0, 3)}-nueva-${Date.now()}`;
    dayRoutines.push({
      id: newId,
      title: `Rutina ${dayRoutines.length + 1}`,
      exercises: [],
    });
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
    setSelectedRoutineIndex(dayRoutines.length - 1);
    showToast("📋 Nueva rutina creada");
  };

  const updateRoutineTitle = (value: string) => {
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    dayRoutines[selectedRoutineIndex] = { ...dayRoutines[selectedRoutineIndex], title: value };
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
  };

  const removeRoutine = () => {
    if (currentDayRoutines.length <= 1) {
      showToast("⚠️ Debe haber al menos 1 rutina por día");
      return;
    }
    const next = { ...routinesData };
    const dayRoutines = [...(next[selectedDay] || [])];
    const removed = dayRoutines[selectedRoutineIndex];
    dayRoutines.splice(selectedRoutineIndex, 1);
    next[selectedDay] = dayRoutines;
    persistRoutines(next);
    setSelectedRoutineIndex(Math.max(0, selectedRoutineIndex - 1));
    showToast(`🗑️ Rutina "${removed.title}" eliminada`);
  };

  // ── Aforo Operations ─────────────────────────────────────────────────────

  const updateStudents = (nextStudents: GymStudent[]) => {
    setStudents(nextStudents);
    localStorage.setItem("gimnasio_coach_students", JSON.stringify(nextStudents));
  };

  const rerouteStudent = (studentId: string, name: string) => {
    const next = students.map((s) => (s.id === studentId ? { ...s, track: "pierna-v2" as const } : s));
    updateStudents(next);
    localStorage.setItem("gimnasio_active_variation", "pierna-v2");
    showToast(`💡 ${name} → Pierna V2 (Peso Libre)`);
  };

  const resetStudent = (studentId: string, name: string) => {
    const next = students.map((s) => (s.id === studentId ? { ...s, track: "pierna-v1" as const } : s));
    updateStudents(next);
    localStorage.setItem("gimnasio_active_variation", "pierna-v1");
    showToast(`🔄 ${name} → Pierna V1 (Máquinas)`);
  };

  const deleteStudent = (studentId: string, name: string) => {
    const next = students.filter((s) => s.id !== studentId);
    updateStudents(next);
    showToast(`🗑️ Alumno "${name}" removido`);
  };

  const addStudent = (name: string, track: GymStudent["track"]) => {
    if (!name.trim()) return;
    const newStudent: GymStudent = {
      id: `student-${Date.now()}`,
      name: name.trim(),
      avatar: name.trim().charAt(0).toUpperCase(),
      track: track,
    };
    const next = [...students, newStudent];
    updateStudents(next);
    showToast(`👥 "${newStudent.name}" registrado en el gimnasio`);
  };

  const piernaV1 = students.filter((s) => s.track === "pierna-v1");
  const piernaV2 = students.filter((s) => s.track === "pierna-v2");
  const pecho = students.filter((s) => s.track === "pecho");
  const trenSuperior = students.filter((s) => s.track === "tren-superior");

  // ── PIN Gate ─────────────────────────────────────────────────────────────

  if (!isUnlocked) {
    return <PinGate onUnlock={() => setIsUnlocked(true)} />;
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none">
          <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-black px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 pointer-events-auto">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header — same style as student but with COACH badge */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 transition-colors">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/demos/gimnasio"
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5">
              <Dumbbell className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-sm font-black tracking-tight uppercase">SantiGym</span>
            </div>
            <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md leading-none">
              Coach
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sync
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Tabs */}
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab("pizarron")}
            className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase tracking-wider text-center transition-all ${
              activeTab === "pizarron"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            📋 Pizarrón
          </button>
          <button
            onClick={() => setActiveTab("aforo")}
            className={`flex-1 py-2 rounded-md text-[10px] font-black uppercase tracking-wider text-center transition-all ${
              activeTab === "aforo"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            👥 Aforo
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            TAB: PIZARRÓN — CRUD de rutinas
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "pizarron" && (
          <div className="space-y-4">
            {/* Day Selector */}
            <div className="flex justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-lg shadow-sm">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedRoutineIndex(0);
                  }}
                  className={`flex-1 py-1.5 rounded-md text-[10px] font-black text-center transition-all ${
                    selectedDay === day
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {day.substring(0, 3).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Routine Track Selector */}
            <div className="flex overflow-x-auto gap-1.5 pb-1.5 -mx-4 px-4 scrollbar-none">
              {currentDayRoutines.map((routine, idx) => (
                <button
                  key={routine.id}
                  onClick={() => setSelectedRoutineIndex(idx)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-md border font-black text-[10px] uppercase tracking-wide transition-all whitespace-nowrap ${
                    selectedRoutineIndex === idx
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {routine.title}
                </button>
              ))}
              <button
                onClick={addRoutine}
                className="flex-shrink-0 px-3 py-1.5 rounded-md border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-wide transition-all hover:border-blue-400 hover:text-blue-500 active:scale-95"
              >
                + Nueva
              </button>
            </div>

            {/* Current Routine Header */}
            {currentRoutine && (
              <div className="space-y-4">
                {/* Routine Title (editable) */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentRoutine.title}
                    onChange={(e) => updateRoutineTitle(e.target.value)}
                    className="flex-1 text-sm font-black text-slate-800 dark:text-white bg-transparent border-b-2 border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 outline-none py-1.5 transition-colors"
                    placeholder="Nombre de la rutina..."
                  />
                  <button
                    onClick={removeRoutine}
                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all active:scale-90"
                    title="Eliminar rutina"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Exercise List */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 select-none">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Ejercicios ({currentRoutine.exercises.length})
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentRoutine.exercises.map((exercise, idx) => (
                      <div key={idx} className="p-4 space-y-3">
                        {/* Exercise name */}
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-slate-300 dark:text-slate-700 shrink-0" />
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(idx, "name", e.target.value)}
                            className="flex-1 text-sm font-bold text-slate-800 dark:text-white bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                            placeholder="Nombre del ejercicio..."
                          />
                          <button
                            onClick={() => removeExercise(idx)}
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all active:scale-90"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Sets & Reps row */}
                        <div className="flex items-center gap-2 pl-7">
                          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2">
                            <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Series</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={exercise.sets}
                              onChange={(e) => updateExercise(idx, "sets", e.target.value)}
                              className="w-8 text-center text-sm font-black text-slate-800 dark:text-white bg-transparent outline-none"
                            />
                          </div>
                          <span className="text-xs font-black text-slate-300 dark:text-slate-700">×</span>
                          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2">
                            <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Reps</span>
                            <input
                              type="text"
                              value={exercise.reps}
                              onChange={(e) => updateExercise(idx, "reps", e.target.value)}
                              className="w-10 text-center text-sm font-black text-slate-800 dark:text-white bg-transparent outline-none"
                              placeholder="10"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Exercise Button */}
                  <button
                    onClick={addExercise}
                    className="w-full py-4 flex items-center justify-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-blue-50 dark:hover:bg-blue-950/10 transition-colors active:scale-[0.99]"
                  >
                    <Plus className="h-5 w-5" />
                    Agregar Ejercicio
                  </button>
                </div>

                {/* Auto-save indicator */}
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider select-none">
                  <ShieldCheck className="h-3 w-3" />
                  Cambios guardados automáticamente • Sincronizado al pizarrón
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            TAB: AFORO — Distribución de alumnos (mobile stack)
            ════════════════════════════════════════════════════════════════════ */}
        {activeTab === "aforo" && (
          <div className="space-y-4">
            
            {/* Formulario para agregar alumno */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  👥 Registrar Nuevo Alumno
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Nombre y apellido del alumno..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-800 dark:text-white outline-none focus:border-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-650 transition-colors"
                />
                <div className="flex gap-2">
                  <select
                    value={newStudentTrack}
                    onChange={(e) => setNewStudentTrack(e.target.value as GymStudent["track"])}
                    className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-800 dark:text-white outline-none transition-colors"
                  >
                    <option value="pierna-v1">Pierna V1 (Máquinas)</option>
                    <option value="pierna-v2">Pierna V2 (Peso Libre)</option>
                    <option value="pecho">Pecho & Hombros</option>
                    <option value="tren-superior">Tren Superior</option>
                  </select>
                  <button
                    onClick={() => {
                      if (newStudentName.trim()) {
                        addStudent(newStudentName, newStudentTrack);
                        setNewStudentName("");
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-xs font-black hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <Plus className="h-4 w-4" /> Registrar
                  </button>
                </div>
              </div>
            </div>

            {/* Congestion Alert */}
            {piernaV1.length >= 5 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-amber-900 dark:text-amber-300">
                    Congestión en Pierna V1
                  </h4>
                  <p className="text-xs font-semibold text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                    {piernaV1.length} alumnos en máquinas (Límite: 5). Derivá alumnos a Pierna V2 (Peso Libre).
                  </p>
                </div>
              </div>
            )}

            {/* Student Columns — vertical stack for mobile */}
            {[
              { title: "Pierna V1", subtitle: "Máquinas", students: piernaV1, cap: 5, color: "blue", showReroute: true },
              { title: "Pierna V2", subtitle: "Peso Libre", students: piernaV2, cap: null, color: "emerald", showReset: true },
              { title: "Pecho & Hombros", subtitle: "Bancos / Poleas", students: pecho, cap: null, color: "slate" },
              { title: "Tren Superior", subtitle: "Espalda / Tracción", students: trenSuperior, cap: null, color: "slate" },
            ].map((col) => (
              <div
                key={col.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm text-slate-800 dark:text-slate-200">{col.title}</h3>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {col.subtitle}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      col.cap && col.students.length >= col.cap
                        ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                        : col.color === "emerald"
                        ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {col.students.length}
                    {col.cap ? `/${col.cap}` : ""} {col.cap ? "Cap." : "Activos"}
                  </span>
                </div>

                <div className="space-y-2">
                  {col.students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black ${
                            col.color === "blue"
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                              : col.color === "emerald"
                              ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {student.avatar}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {student.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {col.showReroute && (
                          <button
                            onClick={() => rerouteStudent(student.id, student.name)}
                            className="p-2 hover:bg-amber-100 dark:hover:bg-amber-950/30 text-amber-600 rounded-lg transition-all active:scale-90 animate-in fade-in"
                            title="Desviar a Peso Libre"
                          >
                            <ArrowRightLeft className="h-4 w-4" />
                          </button>
                        )}
                        {col.showReset && (
                          <button
                            onClick={() => resetStudent(student.id, student.name)}
                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-lg transition-all active:scale-90 animate-in fade-in"
                            title="Regresar a Máquinas"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteStudent(student.id, student.name)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-950/30 text-red-500 rounded-lg transition-all active:scale-90"
                          title="Eliminar Alumno"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {col.students.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6 font-semibold">
                      Sin alumnos activos
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-4 text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-wider space-y-1">
          <p>SantiGym Coach Panel • Gestión desde el Celular.</p>
          <p>© {new Date().getFullYear()} Resistencia PWAs.</p>
        </footer>
      </main>

      {/* Shake animation for PIN error */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
