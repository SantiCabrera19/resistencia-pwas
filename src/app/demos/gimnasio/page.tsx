"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, Clock, Flame, ChevronRight, CheckCircle2, Moon, Sun, ArrowLeft, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface Exercise {
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  rest: string;
  weight: string;
  notes: string;
  loopType: "bench" | "squat" | "fly" | "curl" | "pull";
}

interface Routine {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  exercises: Exercise[];
}

const mockRoutines: Routine[] = [
  {
    id: "pierna-v1",
    title: "Pierna - Variación 1",
    subtitle: "Enfoque en Máquinas (Musculación)",
    description: "Rutina enfocada en fuerza e hipertrofia usando prensa de 45° y camillas. Cuidado con los tiempos de descanso.",
    duration: "45 min",
    exercises: [
      {
        name: "Sentadillas con Barra Libre",
        muscle: "Cuádriceps / Glúteos",
        sets: "4",
        reps: "10 reps",
        rest: "90s",
        weight: "60-80 kg",
        notes: "Técnica profunda. Controlar la bajada sin rebotar.",
        loopType: "squat"
      },
      {
        name: "Prensa de Piernas a 45°",
        muscle: "Cuádriceps",
        sets: "4",
        reps: "12 reps",
        rest: "90s",
        weight: "120-160 kg",
        notes: "Apoyo completo de espalda. No bloquear rodillas arriba.",
        loopType: "bench"
      },
      {
        name: "Camilla de Extensión",
        muscle: "Cuádriceps aislados",
        sets: "3",
        reps: "15 reps",
        rest: "60s",
        weight: "40 kg",
        notes: "Sostener 1 segundo en la máxima contracción arriba.",
        loopType: "curl"
      },
      {
        name: "Curl Femoral Tumbado",
        muscle: "Isquiotibiales",
        sets: "4",
        reps: "12 reps",
        rest: "60s",
        weight: "35 kg",
        notes: "Mantener la cadera pegada al banco durante la flexión.",
        loopType: "curl"
      }
    ]
  },
  {
    id: "pierna-v2",
    title: "Pierna - Variación 2",
    subtitle: "Peso Libre (Descongestiva)",
    description: "Alternativa inteligente de peso libre para evitar colas en la jaula o la prensa. Trabaja el mismo grupo muscular.",
    duration: "40 min",
    exercises: [
      {
        name: "Sentadilla Búlgara con Mancuernas",
        muscle: "Cuádriceps / Glúteos",
        sets: "4",
        reps: "10 reps por pierna",
        rest: "90s",
        weight: "15-25 kg c/u",
        notes: "Foco en mantener el equilibrio y empujar con el talón delantero.",
        loopType: "squat"
      },
      {
        name: "Estocadas Caminando con Mancuernas",
        muscle: "Piernas / Core",
        sets: "4",
        reps: "20 pasos totales",
        rest: "90s",
        weight: "12-20 kg c/u",
        notes: "Paso amplio para enfatizar el trabajo de glúteo.",
        loopType: "squat"
      },
      {
        name: "Peso Muerto Rumano con Mancuernas",
        muscle: "Isquiotibiales / Lumbar",
        sets: "4",
        reps: "12 reps",
        rest: "60s",
        weight: "20-30 kg c/u",
        notes: "Espalda recta, cadera hacia atrás hasta sentir el estiramiento.",
        loopType: "pull"
      },
      {
        name: "Hip Thrust con Barra en Colchoneta",
        muscle: "Glúteos",
        sets: "4",
        reps: "12 reps",
        rest: "90s",
        weight: "50-70 kg",
        notes: "Contracción de 2 segundos arriba. Empujar con la cadera.",
        loopType: "squat"
      }
    ]
  },
  {
    id: "pecho-hombros",
    title: "Pecho & Hombros",
    subtitle: "Fuerza y Empuje General",
    description: "Rutina clásica de empuje (Push day) para desarrollo pectoral y deltoides. Carga de forma progresiva.",
    duration: "45 min",
    exercises: [
      {
        name: "Press de Banca Plano con Barra",
        muscle: "Pectoral Mayor",
        sets: "4",
        reps: "10 reps",
        rest: "90s",
        weight: "50-70 kg",
        notes: "Retracción escapular. Bajar controlado hasta rozar el pecho.",
        loopType: "bench"
      },
      {
        name: "Press de Hombro con Mancuernas Sentado",
        muscle: "Deltoides anterior",
        sets: "4",
        reps: "10 reps",
        rest: "90s",
        weight: "18-24 kg c/u",
        notes: "Espalda bien apoyada en el banco a 75°.",
        loopType: "squat"
      },
      {
        name: "Aperturas en Poleas Altas (Cruces)",
        muscle: "Pectoral Inferior",
        sets: "3",
        reps: "12 reps",
        rest: "60s",
        weight: "15 kg por polea",
        notes: "Cruzar las manos levemente al final para máxima contracción.",
        loopType: "fly"
      },
      {
        name: "Vuelos Laterales con Mancuernas",
        muscle: "Deltoides lateral",
        sets: "4",
        reps: "15 reps",
        rest: "60s",
        weight: "8-12 kg c/u",
        notes: "Elevar los codos sin forzar las muñecas. No balancear el torso.",
        loopType: "fly"
      }
    ]
  },
  {
    id: "tren-superior",
    title: "Tren Superior",
    subtitle: "Tracción e Hipertrofia general",
    description: "Excelente para balancear y compensar los días de empuje. Trabaja dorsales, bíceps y espalda media.",
    duration: "40 min",
    exercises: [
      {
        name: "Jalón al Pecho en Polea Alta",
        muscle: "Dorsal Ancho",
        sets: "4",
        reps: "12 reps",
        rest: "90s",
        weight: "45-60 kg",
        notes: "Tracción con los codos hacia abajo, pecho levantado.",
        loopType: "pull"
      },
      {
        name: "Remo a una Mano con Mancuerna",
        muscle: "Dorsal / Trapecios",
        sets: "4",
        reps: "10 reps por brazo",
        rest: "60s",
        weight: "20-28 kg",
        notes: "Llevar la mancuerna hacia la cadera, codo pegado.",
        loopType: "pull"
      },
      {
        name: "Curl de Bíceps con Barra W",
        muscle: "Bíceps braquial",
        sets: "3",
        reps: "12 reps",
        rest: "60s",
        weight: "20-30 kg",
        notes: "Codos fijos a los costados. Evitar la inercia del cuerpo.",
        loopType: "curl"
      },
      {
        name: "Extensiones de Tríceps con Soga",
        muscle: "Tríceps",
        sets: "3",
        reps: "12 reps",
        rest: "60s",
        weight: "20-25 kg",
        notes: "Abrir la soga al final del movimiento abajo. Codos quietos.",
        loopType: "curl"
      }
    ]
  }
];

export default function GimnasioPage() {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine>(mockRoutines[0]);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [clientRoutine, setClientRoutine] = useState<Routine | null>(null);

  // Cargar posible cambio dinámico hecho por el Coach (guardado en localStorage de la demo)
  useEffect(() => {
    const checkCoachRedirect = () => {
      const activeVariation = localStorage.getItem("gimnasio_active_variation");
      if (activeVariation) {
        const found = mockRoutines.find(r => r.id === activeVariation);
        if (found) {
          setSelectedRoutine(found);
          // Limpiar una vez cargado para permitir selección manual si lo desea
          localStorage.removeItem("gimnasio_active_variation");
        }
      }
    };

    checkCoachRedirect();
    // Revisar periódicamente si el coach actualizó el pizarrón desde su admin
    const interval = setInterval(checkCoachRedirect, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleComplete = (exerciseName: string) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseName]: !prev[exerciseName]
    }));
  };

  // Renderizador del Loop de Técnica minimalista en CSS/SVG
  const renderLoop = (type: Exercise["loopType"]) => {
    switch (type) {
      case "bench":
        return (
          <svg className="w-full h-full text-blue-500 dark:text-blue-400" viewBox="0 0 100 100">
            {/* Banco */}
            <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="30" y1="65" x2="30" y2="85" stroke="currentColor" strokeWidth="3" />
            <line x1="70" y1="65" x2="70" y2="85" stroke="currentColor" strokeWidth="3" />
            {/* Barra animada */}
            <g className="animate-bounce" style={{ animationDuration: "2.5s" }}>
              <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <rect x="15" y="27" width="6" height="16" rx="2" fill="currentColor" />
              <rect x="79" y="27" width="6" height="16" rx="2" fill="currentColor" />
            </g>
          </svg>
        );
      case "squat":
        return (
          <svg className="w-full h-full text-emerald-500 dark:text-emerald-400" viewBox="0 0 100 100">
            {/* Piso */}
            <line x1="15" y1="85" x2="85" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Rack de potencia lateral */}
            <line x1="25" y1="20" x2="25" y2="85" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <line x1="75" y1="20" x2="75" y2="85" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            {/* Barra subiendo/bajando */}
            <g className="animate-bounce" style={{ animationDuration: "3s" }}>
              <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              <circle cx="20" cy="40" r="6" fill="currentColor" />
              <circle cx="80" cy="40" r="6" fill="currentColor" />
            </g>
          </svg>
        );
      case "pull":
        return (
          <svg className="w-full h-full text-indigo-500 dark:text-indigo-400" viewBox="0 0 100 100">
            {/* Polea alta soporte */}
            <line x1="20" y1="15" x2="80" y2="15" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="15" r="4" fill="currentColor" />
            {/* Barra de tracción subiendo/bajando */}
            <g className="animate-bounce" style={{ animationDuration: "2.8s" }}>
              {/* Cable de polea */}
              <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        );
      case "curl":
        return (
          <svg className="w-full h-full text-teal-500 dark:text-teal-400" viewBox="0 0 100 100">
            {/* Eje de articulación del brazo (codo) */}
            <circle cx="30" cy="65" r="3" fill="currentColor" />
            {/* Brazo y mancuerna rotando */}
            <g className="origin-[30px_65px] animate-spin" style={{ animation: "curlRotate 2.4s ease-in-out infinite" }}>
              <line x1="30" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <circle cx="70" cy="65" r="7" fill="currentColor" />
              <line x1="63" y1="65" x2="77" y2="65" stroke="currentColor" strokeWidth="8" />
            </g>
            <style>{`
              @keyframes curlRotate {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-55deg); }
              }
            `}</style>
          </svg>
        );
      case "fly":
      default:
        return (
          <svg className="w-full h-full text-sky-500 dark:text-sky-400" viewBox="0 0 100 100">
            {/* Centro */}
            <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3" />
            {/* Brazos abriendo y cerrando en mariposa */}
            <g className="origin-[15px_50px] animate-spin" style={{ animation: "flyLeft 2.2s ease-in-out infinite" }}>
              <line x1="15" y1="50" x2="48" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <rect x="42" y="44" width="6" height="12" rx="1" fill="currentColor" />
            </g>
            <g className="origin-[85px_50px] animate-spin" style={{ animation: "flyRight 2.2s ease-in-out infinite" }}>
              <line x1="85" y1="50" x2="52" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <rect x="52" y="44" width="6" height="12" rx="1" fill="currentColor" />
            </g>
            <style>{`
              @keyframes flyLeft {
                0%, 100% { transform: rotate(40deg); }
                50% { transform: rotate(0deg); }
              }
              @keyframes flyRight {
                0%, 100% { transform: rotate(-40deg); }
                50% { transform: rotate(0deg); }
              }
            `}</style>
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header Hevy-inspired */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3.5 transition-colors">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-extrabold tracking-tight">SantiGym</span>
              <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider">Pizarrón</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/demos/gimnasio/admin" 
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Users className="h-4 w-4" />
              Panel Coach
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main container */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Banner del día */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-colors">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Hoy es Miércoles</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Pizarrón Sincronizado</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1 leading-tight">
              Rutinas del Ecosistema SantiGym
            </h1>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              Seleccioná abajo la variación indicada por tu Coach Mateo.
            </p>
          </div>
        </div>

        {/* Selector de Tracks en Formato Píldora Hevy */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Track asignado de hoy</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {mockRoutines.map((routine) => {
              const isSelected = selectedRoutine.id === routine.id;
              return (
                <button
                  key={routine.id}
                  onClick={() => {
                    setSelectedRoutine(routine);
                    setCompletedExercises({});
                  }}
                  className={`px-3 py-3 rounded-xl border font-bold text-xs text-center transition-all focus:outline-none flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span className="truncate max-w-full">{routine.title}</span>
                  <span className={`text-[9px] font-medium leading-none ${isSelected ? "text-blue-100" : "text-slate-400 dark:text-slate-500"}`}>
                    {routine.id.includes("v2") ? "Peso Libre" : "General"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detalles de la rutina activa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {selectedRoutine.title}
              </h2>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                {selectedRoutine.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Clock className="h-3.5 w-3.5" />
                {selectedRoutine.duration}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg">
                <Flame className="h-3.5 w-3.5" />
                Día: Pierna/Empuje
              </span>
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            {selectedRoutine.description}
          </p>
        </div>

        {/* Biblioteca de Ejercicios del Alumno */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Ejercicios de la Rutina ({selectedRoutine.exercises.length})</h3>
          
          <div className="space-y-4">
            {selectedRoutine.exercises.map((exercise) => {
              const isDone = completedExercises[exercise.name] || false;
              return (
                <div 
                  key={exercise.name}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 shadow-sm transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between ${
                    isDone 
                      ? "border-emerald-500/30 bg-emerald-50/5 dark:bg-emerald-950/5" 
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="space-y-3 flex-1 w-full">
                    {/* Fila del Título */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h4 className={`text-base font-bold leading-tight ${isDone ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-900 dark:text-white"}`}>
                          {exercise.name}
                        </h4>
                        <span className="inline-block text-[10px] font-black uppercase tracking-wide px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md">
                          {exercise.muscle}
                        </span>
                      </div>
                      
                      {/* Checkbox de completado */}
                      <button 
                        onClick={() => toggleComplete(exercise.name)}
                        className={`p-1.5 rounded-lg border transition-all active:scale-90 ${
                          isDone 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : "border-slate-200 dark:border-slate-700 text-transparent hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5 fill-current" />
                      </button>
                    </div>

                    {/* Especificaciones en Grilla */}
                    <div className="grid grid-cols-4 gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 transition-colors">
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Series</p>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">{exercise.sets}</p>
                      </div>
                      <div className="text-center border-l border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Repes</p>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">{exercise.reps}</p>
                      </div>
                      <div className="text-center border-l border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Carga Rec.</p>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">{exercise.weight}</p>
                      </div>
                      <div className="text-center border-l border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Descanso</p>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">{exercise.rest}</p>
                      </div>
                    </div>

                    {/* Notas del Profe */}
                    <p className={`text-xs font-semibold leading-relaxed ${isDone ? "text-slate-400 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}>
                      💡 <span className="font-bold text-slate-600 dark:text-slate-300">Nota:</span> {exercise.notes}
                    </p>
                  </div>

                  {/* Micro-Loop animador en CSS/SVG */}
                  <div className={`h-28 w-28 shrink-0 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center relative overflow-hidden self-center transition-opacity duration-200 ${isDone ? "opacity-30" : "opacity-100"}`}>
                    {renderLoop(exercise.loopType)}
                    <span className="absolute bottom-1 right-1.5 text-[8px] font-bold tracking-widest text-slate-400 uppercase">Técnica</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer simple */}
        <footer className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs font-medium space-y-1">
          <p>SantiGym Pizarrón • Hecho con ❤️ para tu entrenamiento diario.</p>
          <p>© {new Date().getFullYear()} Ecosistema Santi Soluciones.</p>
        </footer>

      </main>
    </div>
  );
}
