"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2 } from "lucide-react";

export function OdontologoBooking() {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = [12, 13, 14, 15, 16]; // Simulados
  const times = ["09:00", "09:30", "10:00", "11:30", "16:00", "17:30"];

  const handleNext = () => setStep(step + 1);

  return (
    <section className="bg-white px-5 py-20" id="turnos">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Sacá tu turno online
          </h2>
          <p className="mt-2 text-slate-600 font-medium">
            Sin llamadas en espera. Elegí tu horario y confirmamos en el acto.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-emerald-600" />
                1. Elegí el día
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-4">
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex min-w-[80px] flex-col items-center justify-center rounded-xl border-2 p-4 transition-all ${
                      selectedDay === day
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase">Nov</span>
                    <span className="text-2xl font-black">{day}</span>
                  </button>
                ))}
              </div>

              {selectedDay && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    2. Elegí el horario
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-lg border-2 py-2 text-sm font-bold transition-all ${
                          selectedTime === time
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex justify-end">
                <button
                  disabled={!selectedDay || !selectedTime}
                  onClick={handleNext}
                  className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                3. Tus datos
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nombre completo</label>
                  <input type="text" className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm font-medium focus:border-emerald-600 focus:outline-none" placeholder="Ej. Juan Pérez" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Celular</label>
                  <input type="tel" className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-sm font-medium focus:border-emerald-600 focus:outline-none" placeholder="Tu número para confirmar" />
                </div>
              </div>
              <div className="mt-10 flex justify-between">
                <button onClick={() => setStep(1)} className="text-sm font-bold text-slate-500 hover:text-slate-900">
                  Volver
                </button>
                <button onClick={handleNext} className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700">
                  Confirmar Turno
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">¡Turno Confirmado!</h3>
              <p className="text-slate-600 font-medium max-w-sm mx-auto mb-8">
                Te enviamos un WhatsApp con los detalles. Te esperamos el día <strong>{selectedDay} de Noviembre</strong> a las <strong>{selectedTime} hs</strong>.
              </p>
              <button onClick={() => { setStep(1); setSelectedDay(null); setSelectedTime(null); }} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                Sacar otro turno
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
