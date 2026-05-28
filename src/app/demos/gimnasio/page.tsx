"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell, Clock, Flame, CheckCircle2, ArrowLeft, Users, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface Exercise {
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  rest: string;
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

const mockRoutinesWeekly: Record<string, Routine[]> = {
  Lunes: [
    {
      id: "lun-pierna-v1",
      title: "Pierna - V1 (Máquinas)",
      subtitle: "Fuerza en Jaula y Prensa",
      description: "Foco en sentadilla libre y prensa de 45°.",
      duration: "45 min",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Cuádriceps / Glúteos", sets: "4", reps: "10", rest: "90s", notes: "Técnica profunda. Controlar la bajada sin rebotar.", loopType: "squat" },
        { name: "Prensa de Piernas a 45°", muscle: "Cuádriceps", sets: "4", reps: "12", rest: "90s", notes: "Apoyo completo de espalda. No bloquear rodillas arriba.", loopType: "bench" },
        { name: "Camilla de Extensión", muscle: "Cuádriceps aislados", sets: "3", reps: "15", rest: "60s", notes: "Sostener 1 segundo en la máxima contracción arriba.", loopType: "curl" }
      ]
    },
    {
      id: "lun-pecho-triceps",
      title: "Pecho & Tríceps",
      subtitle: "Empuje Plano y Aislado",
      description: "Desarrollo de empuje plano y tríceps.",
      duration: "40 min",
      exercises: [
        { name: "Press de Banca Plano con Barra", muscle: "Pectoral Mayor", sets: "4", reps: "10", rest: "90s", notes: "Codos a 45 grados. Controlar el descenso.", loopType: "bench" },
        { name: "Aperturas Planas con Mancuernas", muscle: "Pectorales", sets: "3", reps: "12", rest: "60s", notes: "Movimiento semicircular controlado.", loopType: "fly" },
        { name: "Extensiones de Tríceps en Polea", muscle: "Tríceps", sets: "3", reps: "12", rest: "60s", notes: "Mantener los codos fijos a los costados.", loopType: "curl" }
      ]
    },
    {
      id: "lun-espalda-biceps",
      title: "Espalda & Bíceps",
      subtitle: "Tracción y Flexión",
      description: "Amplitud dorsal y bíceps.",
      duration: "45 min",
      exercises: [
        { name: "Jalón al Pecho Polea Alta", muscle: "Dorsal Ancho", sets: "4", reps: "12", rest: "90s", notes: "Tracción con los codos hacia abajo, pecho arriba.", loopType: "pull" },
        { name: "Remo con Mancuerna a una Mano", muscle: "Dorsal / Espalda Media", sets: "4", reps: "10", rest: "60s", notes: "Llevar la mancuerna hacia la cadera.", loopType: "pull" },
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12", rest: "60s", notes: "Codos pegados al cuerpo, recorrido completo.", loopType: "curl" }
      ]
    },
    {
      id: "lun-cardio-core",
      title: "Cardio & Core",
      subtitle: "Resistencia e Intervalos",
      description: "Mejorar fondo físico y estabilidad del core.",
      duration: "30 min",
      exercises: [
        { name: "Sentadillas con Salto", muscle: "Cardio / Piernas", sets: "4", reps: "45s", rest: "30s", notes: "Amortiguar la caída flexionando rodillas.", loopType: "squat" },
        { name: "Plancha Abdominal Isométrica", muscle: "Core / Abdomen", sets: "4", reps: "60s", rest: "30s", notes: "Apretar glúteos y abdomen.", loopType: "bench" },
        { name: "Escaladores (Mountain Climbers)", muscle: "Cardio / Core", sets: "4", reps: "45s", rest: "30s", notes: "Mantener ritmo constante sin levantar cadera.", loopType: "squat" }
      ]
    }
  ],
  Martes: [
    {
      id: "mar-pierna-v2",
      title: "Pierna - V2 (Peso Libre)",
      subtitle: "Mancuernas y Barra Libre",
      description: "Descongestiva de máquinas. Evita filas en prensa/jaulas.",
      duration: "40 min",
      exercises: [
        { name: "Sentadilla Búlgara con Mancuernas", muscle: "Cuádriceps / Glúteos", sets: "4", reps: "10 p/lado", rest: "90s", notes: "Empujar con el talón de la pierna delantera.", loopType: "squat" },
        { name: "Estocadas Caminando con Mancuernas", muscle: "Piernas / Glúteos", sets: "4", reps: "20 pasos", rest: "90s", notes: "Mantener el torso erguido.", loopType: "squat" },
        { name: "Peso Muerto Rumano con Mancuernas", muscle: "Isquiotibiales", sets: "4", reps: "12", rest: "60s", notes: "Llevar cadera hacia atrás con espalda recta.", loopType: "pull" }
      ]
    },
    {
      id: "mar-hombros-brazos",
      title: "Hombros & Brazos",
      subtitle: "Hipertrofia de Deltoides y Brazos",
      description: "Rutina para hombros redondos y brazos.",
      duration: "45 min",
      exercises: [
        { name: "Press de Hombro con Mancuerna", muscle: "Hombros", sets: "4", reps: "10", rest: "90s", notes: "Bajar mancuernas hasta la altura de las orejas.", loopType: "squat" },
        { name: "Vuelos Laterales con Mancuerna", muscle: "Hombro Lateral", sets: "4", reps: "15", rest: "60s", notes: "Subir codos alineados con los hombros.", loopType: "fly" },
        { name: "Curl Alternado tipo Martillo", muscle: "Bíceps / Antebrazo", sets: "3", reps: "12", rest: "60s", notes: "Mancuernas paralelas, codo fijo.", loopType: "curl" }
      ]
    },
    {
      id: "mar-espalda-espesor",
      title: "Espalda - Espesor",
      subtitle: "Fuerza en Espalda Media",
      description: "Remos e hipertrofia de espalda media.",
      duration: "40 min",
      exercises: [
        { name: "Remo con Barra Prono", muscle: "Espalda Media / Dorsal", sets: "4", reps: "10", rest: "90s", notes: "Tracción hacia el ombligo, espalda recta a 45°.", loopType: "pull" },
        { name: "Remo Bajo en Polea", muscle: "Espalda Media", sets: "4", reps: "12", rest: "60s", notes: "Llevar hombros atrás al contraer.", loopType: "pull" },
        { name: "Pullover en Polea Alta con Soga", muscle: "Dorsales", sets: "3", reps: "15", rest: "60s", notes: "Mantener codos rígidos y semiflexionados.", loopType: "pull" }
      ]
    },
    {
      id: "mar-funcional-hiit",
      title: "Funcional Express",
      subtitle: "Quemador Metabólico",
      description: "HIIT rápido para terminar el día.",
      duration: "25 min",
      exercises: [
        { name: "Kettlebell Swings", muscle: "Full Body / Cadena Post.", sets: "4", reps: "45s", rest: "30s", notes: "Empuje explosivo de cadera, no de brazos.", loopType: "pull" },
        { name: "Saltos de Soga", muscle: "Cardio", sets: "4", reps: "60s", rest: "30s", notes: "Mantener el salto bajo sobre puntas de pie.", loopType: "squat" },
        { name: "Burpees", muscle: "Cardio / Full Body", sets: "4", reps: "10", rest: "45s", notes: "Amortiguar caídas.", loopType: "squat" }
      ]
    }
  ],
  Miércoles: [
    {
      id: "mie-pierna-v1",
      title: "Pierna - V1 (Máquinas)",
      subtitle: "Enfoque en Cuádriceps e Isquios",
      description: "Variación clásica de empuje de piernas.",
      duration: "45 min",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Cuádriceps / Glúteos", sets: "4", reps: "10", rest: "90s", notes: "Técnica profunda. Controlar la bajada sin rebotar.", loopType: "squat" },
        { name: "Prensa de Piernas a 45°", muscle: "Cuádriceps", sets: "4", reps: "12", rest: "90s", notes: "Apoyo completo de espalda. No bloquear rodillas arriba.", loopType: "bench" },
        { name: "Camilla de Extensión", muscle: "Cuádriceps aislados", sets: "3", reps: "15", rest: "60s", notes: "Sostener 1 segundo en la máxima contracción arriba.", loopType: "curl" }
      ]
    },
    {
      id: "mie-pecho-hombro",
      title: "Pecho & Hombros",
      subtitle: "Fuerza General de Empuje",
      description: "Push day clásico enfocado en pecho y deltoides.",
      duration: "45 min",
      exercises: [
        { name: "Press de Banca Plano con Barra", muscle: "Pectoral Mayor", sets: "4", reps: "10", rest: "90s", notes: "Retracción escapular. Bajar controlado hasta rozar el pecho.", loopType: "bench" },
        { name: "Press de Hombro con Mancuerna", muscle: "Deltoides", sets: "4", reps: "10", rest: "90s", notes: "Espalda bien apoyada a 75 grados.", loopType: "squat" },
        { name: "Aperturas en Poleas Altas (Cruces)", muscle: "Pectoral Inferior", sets: "3", reps: "12", rest: "60s", notes: "Cruzar las manos levemente al final.", loopType: "fly" }
      ]
    },
    {
      id: "mie-espalda-biceps",
      title: "Espalda & Bíceps",
      subtitle: "Tracción y Flexión",
      description: "Dorsales y brazos.",
      duration: "45 min",
      exercises: [
        { name: "Jalón al Pecho Polea Alta", muscle: "Dorsal Ancho", sets: "4", reps: "12", rest: "90s", notes: "Tracción con los codos hacia abajo, pecho arriba.", loopType: "pull" },
        { name: "Remo con Mancuerna a una Mano", muscle: "Dorsal", sets: "4", reps: "10", rest: "60s", notes: "Llevar la mancuerna hacia la cadera.", loopType: "pull" },
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12", rest: "60s", notes: "Codos pegados al cuerpo, recorrido completo.", loopType: "curl" }
      ]
    },
    {
      id: "mie-cardio-express",
      title: "Cardio Express",
      subtitle: "Resistencia Cardiovascular",
      description: "Rutina rápida e intensa para el corazón.",
      duration: "25 min",
      exercises: [
        { name: "Saltos de Soga", muscle: "Cardio", sets: "4", reps: "60s", rest: "30s", notes: "Coordinación y agilidad.", loopType: "squat" },
        { name: "Burpees", muscle: "Full Body / Cardio", sets: "4", reps: "12", rest: "45s", notes: "Mantener ritmo constante.", loopType: "squat" },
        { name: "Elevaciones de Rodillas (High Knees)", muscle: "Cardio", sets: "4", reps: "45s", rest: "30s", notes: "Llevar rodillas a la altura de la cadera.", loopType: "squat" }
      ]
    }
  ],
  Jueves: [
    {
      id: "jue-pierna-v2",
      title: "Pierna - V2 (Peso Libre)",
      subtitle: "Glúteos e Isquios",
      description: "Peso libre para descongestionar el salón.",
      duration: "40 min",
      exercises: [
        { name: "Sentadilla Búlgara con Mancuernas", muscle: "Cuádriceps / Glúteos", sets: "4", reps: "10 p/lado", rest: "90s", notes: "Empujar con el talón de la pierna delantera.", loopType: "squat" },
        { name: "Estocadas Caminando con Mancuernas", muscle: "Piernas / Glúteos", sets: "4", reps: "20 pasos", rest: "90s", notes: "Mantener el torso erguido.", loopType: "squat" },
        { name: "Peso Muerto Rumano con Mancuernas", muscle: "Isquiotibiales", sets: "4", reps: "12", rest: "60s", notes: "Llevar cadera hacia atrás con espalda recta.", loopType: "pull" }
      ]
    },
    {
      id: "jue-brazos-completo",
      title: "Brazos Completos",
      subtitle: "Bíceps y Tríceps Antagónicos",
      description: "Brazos masivos combinando flexores y extensores.",
      duration: "45 min",
      exercises: [
        { name: "Curl de Bíceps con Barra W", muscle: "Bíceps", sets: "3", reps: "12", rest: "60s", notes: "Codos quietos a los costados.", loopType: "curl" },
        { name: "Extensiones de Tríceps con Soga", muscle: "Tríceps", sets: "3", reps: "12", rest: "60s", notes: "Abrir la soga abajo en el bloqueo.", loopType: "curl" },
        { name: "Curl tipo Martillo", muscle: "Bíceps / Antebrazo", sets: "3", reps: "12", rest: "60s", notes: "Agarre neutro con mancuernas.", loopType: "curl" }
      ]
    },
    {
      id: "jue-espalda-hombros",
      title: "Espalda & Hombros",
      subtitle: "Tracción y Fuerza Lateral",
      description: "Postura y hombros amplios.",
      duration: "45 min",
      exercises: [
        { name: "Remo con Mancuerna a una Mano", muscle: "Espalda", sets: "4", reps: "10", rest: "60s", notes: "Llevar codo hacia atrás rozando el torso.", loopType: "pull" },
        { name: "Jalón al Pecho Polea Alta", muscle: "Dorsales", sets: "4", reps: "12", rest: "90s", notes: "Tracción limpia sin inercia.", loopType: "pull" },
        { name: "Vuelos Laterales con Mancuerna", muscle: "Deltoides lateral", sets: "4", reps: "15", rest: "60s", notes: "Movimiento controlado al bajar.", loopType: "fly" }
      ]
    },
    {
      id: "jue-funcional-core",
      title: "Funcional Core",
      subtitle: "Estabilidad del Tronco",
      description: "Foco en abdominales y lumbares.",
      duration: "30 min",
      exercises: [
        { name: "Plancha Abdominal Isométrica", muscle: "Core", sets: "4", reps: "60s", rest: "30s", notes: "Apretar el cinturón abdominal.", loopType: "bench" },
        { name: "Rueda Abdominal (o Desplazamiento)", muscle: "Core / Abdomen", sets: "3", reps: "10", rest: "60s", notes: "No arquear la zona lumbar.", loopType: "squat" },
        { name: "Plancha Lateral", muscle: "Oblicuos", sets: "3", reps: "40s p/lado", rest: "30s", notes: "Alinear codo con hombro.", loopType: "bench" }
      ]
    }
  ],
  Viernes: [
    {
      id: "vie-pierna-full",
      title: "Pierna - Full Day",
      subtitle: "Día Completo de Tren Inferior",
      description: "Último empuje de la semana para piernas y pantorrillas.",
      duration: "45 min",
      exercises: [
        { name: "Sentadillas con Barra Libre", muscle: "Piernas", sets: "4", reps: "10", rest: "90s", notes: "Sentadilla profunda controlada.", loopType: "squat" },
        { name: "Peso Muerto Rumano con Barra", muscle: "Isquiotibiales", sets: "4", reps: "10", rest: "90s", notes: "Foco en la bisagra de cadera.", loopType: "pull" },
        { name: "Elevaciones de Talones de Pie", muscle: "Gemelos", sets: "4", reps: "20", rest: "45s", notes: "Máxima elongación y contracción abajo y arriba.", loopType: "squat" }
      ]
    },
    {
      id: "vie-torso-completo",
      title: "Torso Completo",
      subtitle: "Día de Fuerza Superior",
      description: "Rutina para pecho y espalda en súper-serie o bloques.",
      duration: "45 min",
      exercises: [
        { name: "Press de Banca Plano", muscle: "Pectoral", sets: "4", reps: "10", rest: "90s", notes: "Barra al pecho con recorrido completo.", loopType: "bench" },
        { name: "Jalón al Pecho Polea Alta", muscle: "Dorsales", sets: "4", reps: "12", rest: "90s", notes: "Traccionar con la espalda, no con los brazos.", loopType: "pull" },
        { name: "Press Militar de Hombros", muscle: "Deltoides", sets: "3", reps: "10", rest: "90s", notes: "Press con barra de pie o sentado.", loopType: "squat" }
      ]
    },
    {
      id: "vie-brazos-hombros",
      title: "Brazos & Hombros",
      subtitle: "Bombeo de Fin de Semana",
      description: "Combinación ideal para un bombeo final de brazos y hombros.",
      duration: "40 min",
      exercises: [
        { name: "Vuelos Laterales con Mancuerna", muscle: "Hombros", sets: "4", reps: "15", rest: "60s", notes: "Controlar el descenso.", loopType: "fly" },
        { name: "Curl Alternado de Bíceps", muscle: "Bíceps", sets: "3", reps: "12", rest: "60s", notes: "Muñecas firmes.", loopType: "curl" },
        { name: "Extensiones de Tríceps con Soga", muscle: "Tríceps", sets: "3", reps: "12", rest: "60s", notes: "Bloquear codos.", loopType: "curl" }
      ]
    },
    {
      id: "vie-desafio-hiit",
      title: "HIIT Desafío",
      subtitle: "Cardio Explosivo",
      description: "Intervalos intensos para terminar la semana con todo.",
      duration: "30 min",
      exercises: [
        { name: "Burpees", muscle: "Full Body / Cardio", sets: "4", reps: "15", rest: "45s", notes: "Ritmo explosivo.", loopType: "squat" },
        { name: "Escaladores", muscle: "Cardio", sets: "4", reps: "45s", rest: "30s", notes: "Espalda paralela al suelo.", loopType: "squat" },
        { name: "Sentadillas con Salto", muscle: "Cuádriceps / Cardio", sets: "4", reps: "45s", rest: "30s", notes: "Salto máximo.", loopType: "squat" }
      ]
    }
  ]
};

export default function GimnasioPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Miércoles");
  const [selectedRoutine, setSelectedRoutine] = useState<Routine>(mockRoutinesWeekly["Miércoles"][0]);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  // Cargar posible cambio dinámico hecho por el Coach (guardado en localStorage de la demo)
  useEffect(() => {
    const checkCoachRedirect = () => {
      const activeVariation = localStorage.getItem("gimnasio_active_variation");
      if (activeVariation) {
        // Encontrar en qué rutina del día actual está esa variación
        const currentDayRoutines = mockRoutinesWeekly[selectedDay] || [];
        const found = currentDayRoutines.find(r => r.id.endsWith(activeVariation.split("-").pop() || ""));
        if (found) {
          setSelectedRoutine(found);
          // Limpiar una vez cargado para permitir selección manual si lo desea
          localStorage.removeItem("gimnasio_active_variation");
        }
      }
    };

    checkCoachRedirect();
    const interval = setInterval(checkCoachRedirect, 2000);
    return () => clearInterval(interval);
  }, [selectedDay]);

  // Cargar completados y día actual nativamente al iniciar
  useEffect(() => {
    // Detectar día de la semana actual (Lunes a Viernes)
    const dayIndex = new Date().getDay(); // 0 = Dom, 1 = Lun, etc.
    const mapping = ["Viernes", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Viernes"];
    const currentDay = mapping[dayIndex] || "Miércoles";
    setSelectedDay(currentDay);
    setSelectedRoutine(mockRoutinesWeekly[currentDay][0]);

    // Cargar historial de completados desde localStorage
    const savedProgress = localStorage.getItem("gimnasio_completed_progress");
    if (savedProgress) {
      try {
        setCompletedExercises(JSON.parse(savedProgress));
      } catch (e) {
        // Ignorar si el formato está roto
      }
    }
  }, []);

  // Cambiar el día manual y resetear selección
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    const dayRoutines = mockRoutinesWeekly[day] || [];
    setSelectedRoutine(dayRoutines[0]);
  };

  const toggleComplete = (exerciseName: string) => {
    const key = `${selectedRoutine.id}-${exerciseName}`;
    const nextCompleted = {
      ...completedExercises,
      [key]: !completedExercises[key]
    };
    setCompletedExercises(nextCompleted);
    // Guardar en localStorage para prevenir pérdidas de red
    localStorage.setItem("gimnasio_completed_progress", JSON.stringify(nextCompleted));
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

  const dayRoutines = mockRoutinesWeekly[selectedDay] || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header Hevy-inspired (Súper limpio, libre de colapsos) */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2 transition-colors">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500 dark:text-slate-400">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-1.5">
              <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-lg font-black tracking-tight">SantiGym</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/demos/gimnasio/admin" 
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-lg transition-all active:scale-95"
              title="Panel Coach"
            >
              <Users className="h-5 w-5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main container (Optimizado para viewports pequeños y baja velocidad de carga) */}
      <main className="max-w-xl mx-auto px-4 py-4 space-y-4">
        
        {/* Selector de Día (Lunes a Viernes) */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Día de Entrenamiento</label>
          <div className="flex justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-xl shadow-sm transition-colors">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => {
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => handleDayChange(day)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-black text-center transition-all ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Banner del Pizarrón */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">Pizarrón Digital</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Hoy es {selectedDay}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white mt-1 leading-tight">
            Elegí tu track y entrená
          </h1>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
            Tacha cada ejercicio al completarlo. Se guarda en tu memoria local en caliente.
          </p>
        </div>

        {/* Selector de Tracks (Horizontal Scrollable en móvil, previene recortes y wrapping) */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Track asignado</label>
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {dayRoutines.map((routine) => {
              const isSelected = selectedRoutine.id === routine.id;
              return (
                <button
                  key={routine.id}
                  onClick={() => setSelectedRoutine(routine)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap focus:outline-none ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850"
                  }`}
                >
                  <span>{routine.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detalles de la rutina activa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-sm transition-colors">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                {selectedRoutine.title}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">
                {selectedRoutine.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                <Clock className="h-3.5 w-3.5" />
                {selectedRoutine.duration}
              </span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            {selectedRoutine.description}
          </p>
        </div>

        {/* Ejercicios del Alumno */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Ejercicios de la Rutina ({selectedRoutine.exercises.length})</h3>
          
          <div className="space-y-3">
            {selectedRoutine.exercises.map((exercise) => {
              const exerciseKey = `${selectedRoutine.id}-${exercise.name}`;
              const isDone = completedExercises[exerciseKey] || false;
              return (
                <div 
                  key={exercise.name}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 shadow-sm transition-all flex gap-4 items-center justify-between ${
                    isDone 
                      ? "border-emerald-500/20 bg-emerald-50/5 dark:bg-emerald-950/5" 
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div className="space-y-2 flex-1 w-full min-w-0">
                    {/* Fila del Título */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <h4 className={`text-sm font-bold leading-tight truncate ${isDone ? "text-slate-400 dark:text-slate-600 line-through" : "text-slate-900 dark:text-white"}`}>
                          {exercise.name}
                        </h4>
                        <span className="inline-block text-[9px] font-black uppercase tracking-wide px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md">
                          {exercise.muscle}
                        </span>
                      </div>
                      
                      {/* Checkbox de completado */}
                      <button 
                        onClick={() => toggleComplete(exercise.name)}
                        className={`p-1.5 rounded-lg border transition-all active:scale-90 shrink-0 ${
                          isDone 
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm" 
                            : "border-slate-200 dark:border-slate-700 text-transparent hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <CheckCircle2 className="h-5 w-5 fill-current" />
                      </button>
                    </div>

                    {/* Especificaciones en Grilla (Simplificada: Sin pesos fijos por pizarra general) */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-800/40 transition-colors text-center">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-none">Series</p>
                        <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">{exercise.sets}</p>
                      </div>
                      <div className="border-l border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-none">Repes</p>
                        <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">{exercise.reps}</p>
                      </div>
                      <div className="border-l border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-none">Mín. Descanso</p>
                        <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">{exercise.rest}</p>
                      </div>
                    </div>

                    {/* Notas del Profe */}
                    <p className={`text-[11px] font-semibold leading-relaxed ${isDone ? "text-slate-400 dark:text-slate-700" : "text-slate-500 dark:text-slate-400"}`}>
                      💡 <span className="font-bold text-slate-600 dark:text-slate-300">Tip:</span> {exercise.notes}
                    </p>
                  </div>

                  {/* Micro-Loop animador en CSS/SVG */}
                  <div className={`h-20 w-20 shrink-0 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-1 flex items-center justify-center relative overflow-hidden self-center transition-all duration-200 ${isDone ? "opacity-35" : "opacity-100"}`}>
                    {renderLoop(exercise.loopType)}
                    <span className="absolute bottom-0.5 right-1 text-[7px] font-black tracking-widest text-slate-400/80 uppercase leading-none">Demo</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer simple */}
        <footer className="text-center py-8 text-slate-400 dark:text-slate-500 text-[10px] font-semibold space-y-1 border-t border-slate-150 dark:border-slate-900 mt-4 transition-colors">
          <p>SantiGym Pizarrón • Hecho con ❤️ en Resistencia, Chaco.</p>
          <p>© {new Date().getFullYear()} Ecosistema Santi Soluciones.</p>
        </footer>

      </main>
    </div>
  );
}
