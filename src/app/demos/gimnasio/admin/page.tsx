"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/Admin/PageHeader";
import { 
  Users, LayoutGrid, Dumbbell, AlertTriangle, ArrowRightLeft, 
  Plus, CheckCircle, RefreshCw, Trash2, ShieldAlert, Sparkles 
} from "lucide-react";

interface GymStudent {
  id: string;
  name: string;
  avatar: string;
  shift: "Mañana" | "Tarde" | "Noche";
  track: "pierna-v1" | "pierna-v2" | "pecho" | "tren-superior";
}

interface ExerciseTemplate {
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  weight: string;
  rest: string;
  loopType: "bench" | "squat" | "fly" | "curl" | "pull";
}

const initialStudents: GymStudent[] = [
  // Column 1: Pierna V1 (Crowded)
  { id: "1", name: "María Rodríguez", avatar: "M", shift: "Tarde", track: "pierna-v1" },
  { id: "2", name: "Esteban Pintos", avatar: "E", shift: "Tarde", track: "pierna-v1" },
  { id: "3", name: "Cristina Gómez", avatar: "C", shift: "Tarde", track: "pierna-v1" },
  { id: "4", name: "Facundo Ortiz", avatar: "F", shift: "Tarde", track: "pierna-v1" },
  { id: "5", name: "Gero Maidana", avatar: "G", shift: "Tarde", track: "pierna-v1" },
  { id: "6", name: "Lucas Benítez", avatar: "L", shift: "Tarde", track: "pierna-v1" },
  // Column 2: Pierna V2 (Free Weights alternative)
  { id: "7", name: "Juan Pérez", avatar: "J", shift: "Tarde", track: "pierna-v2" },
  { id: "8", name: "Milagros Maidana", avatar: "M", shift: "Tarde", track: "pierna-v2" },
  // Column 3: Pecho
  { id: "9", name: "Santiago Cabrera", avatar: "S", shift: "Tarde", track: "pecho" },
  { id: "10", name: "Nicolás Sosa", avatar: "N", shift: "Tarde", track: "pecho" },
  { id: "11", name: "Ariel Blanco", avatar: "A", shift: "Tarde", track: "pecho" },
  // Column 4: Tren Superior
  { id: "12", name: "Franco Fleitas", avatar: "F", shift: "Tarde", track: "tren-superior" },
  { id: "13", name: "Romina Vallejos", avatar: "R", shift: "Tarde", track: "tren-superior" },
  { id: "14", name: "Clara Benítez", avatar: "C", shift: "Tarde", track: "tren-superior" }
];

const exerciseTemplates: ExerciseTemplate[] = [
  { name: "Sentadilla Goblet", muscle: "Cuádriceps / Glúteos", sets: "4", reps: "12 reps", weight: "15-22 kg", rest: "60s", loopType: "squat" },
  { name: "Press Inclinado con Mancuernas", muscle: "Pectoral Superior", sets: "4", reps: "10 reps", weight: "22-30 kg c/u", rest: "90s", loopType: "bench" },
  { name: "Remo apoyado en Banco", muscle: "Espalda Media", sets: "4", reps: "12 reps", weight: "18-24 kg c/u", rest: "60s", loopType: "pull" },
  { name: "Curl Alternado con Supinación", muscle: "Bíceps", sets: "3", reps: "12 reps", weight: "10-14 kg c/u", rest: "60s", loopType: "curl" },
  { name: "Aperturas Planas con Mancuernas", muscle: "Pectoral Mayor", sets: "3", reps: "12 reps", weight: "12-16 kg c/u", rest: "60s", loopType: "fly" }
];

export default function GymAdminPage() {
  const [activeTab, setActiveTab] = useState<"aforo" | "pizarron" | "biblioteca">("aforo");
  const [students, setStudents] = useState<GymStudent[]>(initialStudents);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Rutinas configurables en memoria para simular edición
  const [routines, setRoutines] = useState([
    { id: "pierna-v1", title: "Pierna - Variación 1", exercisesCount: 4 },
    { id: "pierna-v2", title: "Pierna - Variación 2", exercisesCount: 4 },
    { id: "pecho-hombros", title: "Pecho & Hombros", exercisesCount: 4 },
    { id: "tren-superior", title: "Tren Superior", exercisesCount: 4 }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Re-rutear inteligente alumno de Pierna V1 a Pierna V2
  const rerouteStudent = (studentId: string, name: string) => {
    setStudents(prev => 
      prev.map(s => s.id === studentId ? { ...s, track: "pierna-v2" } : s)
    );
    // Guardar en localStorage para simular Live Websocket en la PWA del alumno
    localStorage.setItem("gimnasio_active_variation", "pierna-v2");
    showToast(`💡 ${name} desviado a "Pierna V2 (Peso Libre)". Pizarrón del alumno sincronizado.`);
  };

  // Volver a alumno a V1 si se desocupa la máquina
  const resetStudent = (studentId: string, name: string) => {
    setStudents(prev => 
      prev.map(s => s.id === studentId ? { ...s, track: "pierna-v1" } : s)
    );
    localStorage.setItem("gimnasio_active_variation", "pierna-v1");
    showToast(`🔄 ${name} regresado a "Pierna V1 (Máquinas)".`);
  };

  // Contadores dinámicos por columna
  const piernaV1Count = students.filter(s => s.track === "pierna-v1").length;
  const piernaV2Count = students.filter(s => s.track === "pierna-v2").length;
  const pechoCount = students.filter(s => s.track === "pecho").length;
  const trenSuperiorCount = students.filter(s => s.track === "tren-superior").length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Toast flotante de sincronización en tiempo real */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl border border-slate-800 shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
          {toastMessage}
        </div>
      )}

      <PageHeader 
        title="SantiGym Control Tower" 
        description="Gestión en caliente del pizarrón de entrenamiento y distribución de flujo."
        action={
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Live Sync: Activo
          </div>
        }
      />

      {/* Tabs Hevy-style */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button 
          onClick={() => setActiveTab("aforo")}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "aforo" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Aforo & Distribución (Hoy)
        </button>
        <button 
          onClick={() => setActiveTab("pizarron")}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "pizarron" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Editor del Pizarrón
        </button>
        <button 
          onClick={() => setActiveTab("biblioteca")}
          className={`pb-3 text-xs font-black uppercase tracking-wider transition-all border-b-2 ${
            activeTab === "biblioteca" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-slate-400 hover:text-slate-600"
          }`}
        >
          Biblioteca de Ejercicios
        </button>
      </div>

      {/* CONTENIDO DEL DASHBOARD */}
      <div className="space-y-6">

        {/* TAB 1: AFORO Y DISTRIBUCIÓN */}
        {activeTab === "aforo" && (
          <div className="space-y-6">
            
            {/* Alerta inteligente de saturación */}
            {piernaV1Count >= 5 && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 flex gap-3 items-start transition-colors">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-amber-900 dark:text-amber-300">Congestión Crítica detectada en Sala de Musculación</h4>
                  <p className="text-xs font-semibold text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                    Hay **{piernaV1Count} alumnos** intentando usar la jaula de potencia y prensa (Límite: 5). Se sugiere presionar el desvío rápido para sugerirles la **Variación 2 (Peso Libre)** y liberar máquinas.
                  </p>
                </div>
              </div>
            )}

            {/* Grilla del Pizarrón Diario */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              
              {/* Columna 1: Pierna V1 (Máquinas) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-slate-800 dark:text-slate-200">Pierna V1</h3>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Máquinas en Sala</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    piernaV1Count >= 5 
                      ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600"
                  }`}>
                    {piernaV1Count}/5 Cap.
                  </span>
                </div>

                <div className="space-y-2 min-h-[150px]">
                  {students.filter(s => s.track === "pierna-v1").map(student => (
                    <div key={student.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-xs font-black text-blue-700 dark:text-blue-400">
                          {student.avatar}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.name}</span>
                      </div>
                      <button 
                        onClick={() => rerouteStudent(student.id, student.name)}
                        title="Desviar a Peso Libre"
                        className="p-1 hover:bg-amber-100 dark:hover:bg-amber-950/30 text-amber-600 rounded-lg transition-all active:scale-90"
                      >
                        <ArrowRightLeft className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {piernaV1Count === 0 && (
                    <p className="text-xs text-slate-400 text-center py-8 font-semibold">Sin alumnos activos</p>
                  )}
                </div>
              </div>

              {/* Columna 2: Pierna V2 (Peso Libre) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-slate-800 dark:text-slate-200">Pierna V2</h3>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Mancuernas / Libre</p>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    {piernaV2Count} Activos
                  </span>
                </div>

                <div className="space-y-2 min-h-[150px]">
                  {students.filter(s => s.track === "pierna-v2").map(student => (
                    <div key={student.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-xs font-black text-emerald-700 dark:text-emerald-400">
                          {student.avatar}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.name}</span>
                      </div>
                      {/* Botón para resetear si se desocupa la máquina */}
                      <button 
                        onClick={() => resetStudent(student.id, student.name)}
                        title="Regresar a Máquinas"
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-lg transition-all active:scale-90"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {piernaV2Count === 0 && (
                    <p className="text-xs text-slate-400 text-center py-8 font-semibold">Sin alumnos activos</p>
                  )}
                </div>
              </div>

              {/* Columna 3: Pecho */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-slate-800 dark:text-slate-200">Pecho & Hombros</h3>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bancos / Poleas</p>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    {pechoCount} Activos
                  </span>
                </div>

                <div className="space-y-2 min-h-[150px]">
                  {students.filter(s => s.track === "pecho").map(student => (
                    <div key={student.id} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors">
                      <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-850 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-400">
                        {student.avatar}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.name}</span>
                    </div>
                  ))}
                  {pechoCount === 0 && (
                    <p className="text-xs text-slate-400 text-center py-8 font-semibold">Sin alumnos activos</p>
                  )}
                </div>
              </div>

              {/* Columna 4: Tren Superior */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm transition-colors">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="font-black text-sm text-slate-800 dark:text-slate-200">Tren Superior</h3>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Espalda / Tracción</p>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    {trenSuperiorCount} Activos
                  </span>
                </div>

                <div className="space-y-2 min-h-[150px]">
                  {students.filter(s => s.track === "tren-superior").map(student => (
                    <div key={student.id} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors">
                      <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-850 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-400">
                        {student.avatar}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{student.name}</span>
                    </div>
                  ))}
                  {trenSuperiorCount === 0 && (
                    <p className="text-xs text-slate-400 text-center py-8 font-semibold">Sin alumnos activos</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: EDITOR DEL PIZARRÓN */}
        {activeTab === "pizarron" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm transition-colors">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Editor del Pizarrón Público</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Modificá las especificaciones que leen tus alumnos desde sus celulares.</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
              {routines.map((routine, idx) => (
                <div key={routine.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 first:pt-0">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{routine.title}</h4>
                    <p className="text-xs font-semibold text-slate-500">{routine.exercisesCount} Ejercicios en lista</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Nota de carga (ej: 60-80kg)" 
                      defaultValue={routine.id === "pierna-v1" ? "60-80 kg" : routine.id === "pierna-v2" ? "15-25 kg c/u" : "Carga Progresiva"}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                    <button 
                      onClick={() => showToast(`💾 Cambios guardados para ${routine.title}. Pizarrón sincronizado.`)}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BIBLIOTECA DE EJERCICIOS */}
        {activeTab === "biblioteca" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm transition-colors">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Biblioteca de Ejercicios Pre-diseñados</h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-medium">Añadí plantillas de movimientos directo a tus pizarrones activos para ahorrar tiempo.</p>
            </div>

            <div className="space-y-3">
              {exerciseTemplates.map((item) => (
                <div key={item.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 gap-4 transition-colors">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{item.name}</h4>
                    <div className="flex gap-2 items-center">
                      <span className="text-[9px] font-black uppercase bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">{item.muscle}</span>
                      <span className="text-xs text-slate-400 font-medium">{item.sets}x{item.reps} • {item.weight}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold focus:outline-none">
                      <option>Asignar a Pierna V1</option>
                      <option>Asignar a Pierna V2</option>
                      <option>Asignar a Pecho</option>
                      <option>Asignar a Tren Superior</option>
                    </select>
                    <button 
                      onClick={() => showToast(`➕ "${item.name}" añadido exitosamente a la rutina elegida.`)}
                      className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-90"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
