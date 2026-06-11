"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, CheckCircle2, ArrowLeft, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PwaInstallBanner } from "@/components/ui/PwaInstallBanner";

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

const mockRoutinesWeekly: Record<string, Routine[]> = {
  Lunes: [
    {
      id: "lun-pierna-v1",
      title: "Pierna - V1 (Máquinas) + Hombros",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Prensa de Piernas a 45°", muscle: "Pierna", sets: "4", reps: "12" },
        { name: "Camilla de Extensión", muscle: "Pierna", sets: "3", reps: "15" },
        { name: "Press Militar con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "10" },
        { name: "Vuelos Laterales con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "12" }
      ]
    },
    {
      id: "lun-pecho-triceps",
      title: "Pecho & Tríceps",
      exercises: [
        { name: "Press de Banca Plano con Barra", muscle: "Pecho", sets: "4", reps: "10" },
        { name: "Aperturas Planas con Mancuernas", muscle: "Pecho", sets: "3", reps: "12" },
        { name: "Extensiones de Tríceps en Polea", muscle: "Tríceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "lun-espalda-biceps",
      title: "Espalda & Bíceps",
      exercises: [
        { name: "Jalón al Pecho Polea Alta", muscle: "Espalda", sets: "4", reps: "12" },
        { name: "Remo con Mancuerna a una Mano", muscle: "Espalda", sets: "4", reps: "10" },
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "lun-cardio-core",
      title: "Cardio & Core",
      exercises: [
        { name: "Sentadillas con Salto", muscle: "Cardio", sets: "4", reps: "45s" },
        { name: "Plancha Abdominal Isométrica", muscle: "Core", sets: "4", reps: "60s" },
        { name: "Escaladores (Mountain Climbers)", muscle: "Cardio", sets: "4", reps: "45s" }
      ]
    }
  ],
  Martes: [
    {
      id: "mar-pierna-v2",
      title: "Pierna - V2 (Peso Libre) + Hombros",
      exercises: [
        { name: "Sentadilla Búlgara con Mancuernas", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Estocadas Caminando con Mancuernas", muscle: "Pierna", sets: "4", reps: "20" },
        { name: "Peso Muerto Rumano con Mancuernas", muscle: "Pierna", sets: "4", reps: "12" },
        { name: "Vuelos Laterales con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "12" }
      ]
    },
    {
      id: "mar-hombros-brazos",
      title: "Hombros & Brazos",
      exercises: [
        { name: "Press de Hombro con Mancuerna", muscle: "Hombros", sets: "4", reps: "10" },
        { name: "Vuelos Laterales con Mancuerna", muscle: "Hombros", sets: "4", reps: "15" },
        { name: "Curl Alternado tipo Martillo", muscle: "Bíceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "mar-espalda-espesor",
      title: "Espalda - Espesor",
      exercises: [
        { name: "Remo con Barra Prono", muscle: "Espalda", sets: "4", reps: "10" },
        { name: "Remo Bajo en Polea", muscle: "Espalda", sets: "4", reps: "12" },
        { name: "Pullover en Polea Alta con Soga", muscle: "Espalda", sets: "3", reps: "15" }
      ]
    },
    {
      id: "mar-funcional-hiit",
      title: "Funcional Express",
      exercises: [
        { name: "Kettlebell Swings", muscle: "Cardio", sets: "4", reps: "45s" },
        { name: "Saltos de Soga", muscle: "Cardio", sets: "4", reps: "60s" },
        { name: "Burpees", muscle: "Cardio", sets: "4", reps: "10" }
      ]
    }
  ],
  Miércoles: [
    {
      id: "mie-pierna-v1",
      title: "Pierna - V1 (Máquinas) + Hombros",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Prensa de Piernas a 45°", muscle: "Pierna", sets: "4", reps: "12" },
        { name: "Camilla de Extensión", muscle: "Pierna", sets: "3", reps: "15" },
        { name: "Press Militar con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "10" },
        { name: "Vuelos Laterales con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "12" }
      ]
    },
    {
      id: "mie-pecho-hombro",
      title: "Pecho & Hombros",
      exercises: [
        { name: "Press de Banca Plano con Barra", muscle: "Pecho", sets: "4", reps: "10" },
        { name: "Press de Hombro con Mancuerna", muscle: "Hombros", sets: "4", reps: "10" },
        { name: "Aperturas en Poleas Altas (Cruces)", muscle: "Pecho", sets: "3", reps: "12" }
      ]
    },
    {
      id: "mie-espalda-biceps",
      title: "Espalda & Bíceps",
      exercises: [
        { name: "Jalón al Pecho Polea Alta", muscle: "Espalda", sets: "4", reps: "12" },
        { name: "Remo con Mancuerna a una Mano", muscle: "Espalda", sets: "4", reps: "10" },
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "mie-cardio-express",
      title: "Cardio Express",
      exercises: [
        { name: "Saltos de Soga", muscle: "Cardio", sets: "4", reps: "60s" },
        { name: "Burpees", muscle: "Cardio", sets: "4", reps: "12" },
        { name: "Elevaciones de Rodillas (High Knees)", muscle: "Cardio", sets: "4", reps: "45s" }
      ]
    }
  ],
  Jueves: [
    {
      id: "jue-pierna-v2",
      title: "Pierna - V2 (Peso Libre) + Hombros",
      exercises: [
        { name: "Sentadilla Búlgara con Mancuernas", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Estocadas Caminando con Mancuernas", muscle: "Pierna", sets: "4", reps: "20" },
        { name: "Peso Muerto Rumano con Mancuernas", muscle: "Pierna", sets: "4", reps: "12" },
        { name: "Vuelos Laterales con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "12" }
      ]
    },
    {
      id: "jue-brazos-completo",
      title: "Brazos Completos",
      exercises: [
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12" },
        { name: "Extensiones de Tríceps con Soga", muscle: "Tríceps", sets: "3", reps: "12" },
        { name: "Curl tipo Martillo", muscle: "Bíceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "jue-espalda-hombros",
      title: "Espalda & Hombros",
      exercises: [
        { name: "Remo con Mancuerna a una Mano", muscle: "Espalda", sets: "4", reps: "10" },
        { name: "Jalón al Pecho Polea Alta", muscle: "Espalda", sets: "4", reps: "12" },
        { name: "Vuelos Laterales con Mancuerna", muscle: "Hombros", sets: "4", reps: "15" }
      ]
    },
    {
      id: "jue-funcional-core",
      title: "Funcional Core",
      exercises: [
        { name: "Plancha Abdominal Isométrica", muscle: "Core", sets: "4", reps: "60s" },
        { name: "Rueda Abdominal (o Desplazamiento)", muscle: "Core", sets: "3", reps: "10" },
        { name: "Plancha Lateral", muscle: "Core", sets: "3", reps: "40s" }
      ]
    }
  ],
  Viernes: [
    {
      id: "vie-pierna-full",
      title: "Pierna - Full Day + Hombros",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Peso Muerto Rumano con Barra", muscle: "Pierna", sets: "4", reps: "10" },
        { name: "Elevaciones de Talones de Pie", muscle: "Pierna", sets: "4", reps: "20" },
        { name: "Vuelos Posteriores con Mancuernas (Hombros)", muscle: "Hombros", sets: "4", reps: "15" }
      ]
    },
    {
      id: "vie-torso-completo",
      title: "Torso Completo",
      exercises: [
        { name: "Press de Banca Plano", muscle: "Pecho", sets: "4", reps: "10" },
        { name: "Jalón al Pecho Polea Alta", muscle: "Espalda", sets: "4", reps: "12" },
        { name: "Press Militar de Hombros", muscle: "Hombros", sets: "3", reps: "10" }
      ]
    },
    {
      id: "vie-brazos-hombros",
      title: "Brazos & Hombros",
      exercises: [
        { name: "Vuelos Laterales con Mancuerna", muscle: "Hombros", sets: "4", reps: "15" },
        { name: "Curl Alternado de Bíceps", muscle: "Bíceps", sets: "3", reps: "12" },
        { name: "Extensiones de Tríceps con Soga", muscle: "Tríceps", sets: "3", reps: "12" }
      ]
    },
    {
      id: "vie-desafio-hiit",
      title: "HIIT Desafío",
      exercises: [
        { name: "Burpees", muscle: "Cardio", sets: "4", reps: "15" },
        { name: "Escaladores", muscle: "Cardio", sets: "4", reps: "45s" },
        { name: "Sentadillas con Salto", muscle: "Cardio", sets: "4", reps: "45s" }
      ]
    }
  ]
};

export default function GimnasioPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Miércoles");
  const [routinesData, setRoutinesData] = useState<Record<string, Routine[]>>(mockRoutinesWeekly);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine>(mockRoutinesWeekly["Miércoles"][0]);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Cargar las rutinas del Coach y sincronizar cambios de aforo / ediciones en vivo
  useEffect(() => {
    const syncData = () => {
      // 1. Cargar rutinas personalizadas del coach
      const coachData = localStorage.getItem("gimnasio_coach_routines");
      let activeRoutines = mockRoutinesWeekly;

      if (coachData) {
        try {
          const parsed = JSON.parse(coachData);
          if (parsed && typeof parsed === "object") {
            activeRoutines = parsed;
            setRoutinesData(prev => {
              if (JSON.stringify(prev) !== JSON.stringify(parsed)) {
                return parsed;
              }
              return prev;
            });
          }
        } catch (e) {
          // Fallback silencioso
        }
      }

      const currentDayRoutines = activeRoutines[selectedDay] || [];

      // 2. Controlar redirección de aforo hecha por el Coach (V1 -> V2)
      const activeVariation = localStorage.getItem("gimnasio_active_variation");
      if (activeVariation) {
        const found = currentDayRoutines.find(r => r.id.endsWith(activeVariation.split("-").pop() || ""));
        if (found) {
          setSelectedRoutine(found);
          localStorage.removeItem("gimnasio_active_variation");
          return;
        }
      }

      // 3. Mantener la rutina seleccionada sincronizada con ediciones en vivo del Coach
      setSelectedRoutine(prev => {
        const matchingRoutine = currentDayRoutines.find(r => r.id === prev.id);
        if (matchingRoutine) {
          if (JSON.stringify(matchingRoutine) !== JSON.stringify(prev)) {
            return matchingRoutine;
          }
          return prev;
        }
        // Si no se encuentra la rutina (borrada), usar la primera disponible del día
        if (currentDayRoutines.length > 0) {
          return currentDayRoutines[0];
        }
        return { id: "empty", title: "Sin Rutinas", exercises: [] };
      });
    };

    syncData();
    const interval = setInterval(syncData, 1500); // Polling rápido para mantener la demo en tiempo real
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Cargar completados, rutinas iniciales y día actual al montar el componente
  useEffect(() => {
    const dayIndex = new Date().getDay(); // 0 = Dom, 1 = Lun, etc.
    const mapping = ["Viernes", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Viernes"];
    const currentDay = mapping[dayIndex] || "Miércoles";
    setSelectedDay(currentDay);

    // Cargar inmediatamente de localStorage para evitar parpadeo con data vieja
    const coachData = localStorage.getItem("gimnasio_coach_routines");
    let initialRoutines = mockRoutinesWeekly;
    if (coachData) {
      try {
        const parsed = JSON.parse(coachData);
        if (parsed && typeof parsed === "object") {
          initialRoutines = parsed;
          setRoutinesData(parsed);
        }
      } catch (e) {}
    }
    const dayRoutines = initialRoutines[currentDay] || [];
    setSelectedRoutine(dayRoutines[0] || { id: "empty", title: "Sin Rutinas", exercises: [] });

    const savedProgress = localStorage.getItem("gimnasio_completed_progress");
    if (savedProgress) {
      try {
        setCompletedExercises(JSON.parse(savedProgress));
      } catch (e) {
        // Ignorar
      }
    }
  }, []);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    const dayRoutines = routinesData[day] || [];
    setSelectedRoutine(dayRoutines[0] || { id: "empty", title: "Sin Rutinas", exercises: [] });
  };

  const toggleComplete = (exerciseName: string) => {
    const key = `${selectedRoutine.id}-${exerciseName}`;
    const nextCompleted = {
      ...completedExercises,
      [key]: !completedExercises[key]
    };
    setCompletedExercises(nextCompleted);
    localStorage.setItem("gimnasio_completed_progress", JSON.stringify(nextCompleted));
  };

  const dayRoutines = routinesData[selectedDay] || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header Hevy-inspired (Compacto, ultra rápido) */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 transition-colors">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5">
              <Dumbbell className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-sm font-black tracking-tight uppercase">SECGym</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        
        {/* Selector de Día (Lunes a Viernes) */}
        <div className="space-y-1">
          <div className="flex justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-lg shadow-sm transition-colors">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => {
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  className={`flex-1 py-1.5 rounded-md text-[10px] font-black text-center transition-all ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {day.substring(0, 3).toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cabecera de la Rutina (Súper minimalista) */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-550 block">Rutina Activa</span>
            <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 mt-0.5">
              {selectedRoutine.title}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            En Vivo
          </div>
        </div>

        {/* Selector de Tracks (Horizontal Scrollable) */}
        <div className="space-y-1">
          <div className="flex overflow-x-auto gap-1.5 pb-1.5 -mx-4 px-4 scrollbar-none">
            {dayRoutines.map((routine) => {
              const isSelected = selectedRoutine.id === routine.id;
              return (
                <button
                  key={routine.id}
                  onClick={() => setSelectedRoutine(routine)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-md border font-black text-[10px] uppercase tracking-wide transition-all whitespace-nowrap focus:outline-none ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850"
                  }`}
                >
                  {routine.title.replace(" + Hombros", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pizarrón / Listita de Supermercado (Optimización Extrema) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden transition-colors">
          
          <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors select-none">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Ejercicios ({selectedRoutine.exercises.length})</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Sets x Reps</span>
          </div>

          <div className="divide-y divide-slate-150 dark:divide-slate-800">
            {selectedRoutine.exercises.map((exercise) => {
              const exerciseKey = `${selectedRoutine.id}-${exercise.name}`;
              const isDone = completedExercises[exerciseKey] || false;
              return (
                <div 
                  key={exercise.name}
                  className={`flex items-center justify-between py-4.5 px-5 transition-colors select-none ${
                    isDone ? "bg-emerald-500/[0.01] dark:bg-emerald-500/[0.005] opacity-40" : ""
                  }`}
                >
                  {/* Lado izquierdo: Check y Nombre */}
                  <div className="flex items-center gap-4 min-w-0">
                    <button 
                      onClick={() => toggleComplete(exercise.name)}
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 transition-all active:scale-95 ${
                        isDone 
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                          : "border-slate-300 dark:border-slate-700 hover:border-slate-455 dark:hover:border-slate-650 text-transparent"
                      }`}
                    >
                      <CheckCircle2 className="h-4.5 w-4.5 fill-current" />
                    </button>
                    <span className={`text-sm font-black truncate leading-tight tracking-tight mt-0.5 ${
                      isDone 
                        ? "text-slate-400 dark:text-slate-600 line-through" 
                        : "text-slate-800 dark:text-slate-100"
                    }`}>
                      {exercise.name}
                    </span>
                  </div>

                  {/* Lado derecho: Píldora de Series x Repes */}
                  <div className="shrink-0 pl-3">
                    <span className={`text-xs font-black px-3 py-1.5 rounded-md tracking-wider transition-colors ${
                      isDone 
                        ? "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450"
                    }`}>
                      {exercise.sets}x{exercise.reps}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer ultraliviano */}
        <footer className="text-center py-4 text-slate-400 dark:text-slate-500 text-[9px] font-black uppercase tracking-wider space-y-1">
          <p>SECGym Pizarrón • Carga Ultra Veloz.</p>
          <p>© {new Date().getFullYear()} Resistencia.</p>
        </footer>

      </main>
      <PwaInstallBanner />
    </div>
  );
}
