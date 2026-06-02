"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { MapWidget } from "@/components/ui/MapWidget";

export function OdontologoContact() {
  return (
    <section className="bg-white px-5 py-20 border-t border-slate-100" id="contacto">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Contactanos
          </h2>
          <p className="mt-2 text-slate-600 font-medium">
            Estamos para cuidarte. Escribinos para coordinar un turno o hacernos tu consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Info Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Consultorio Dra. Ana López</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Dirección</h4>
                  <p className="text-slate-600 text-sm mt-1">Av. Sarmiento 123, Resistencia, Chaco.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Teléfono Fijo</h4>
                  <p className="text-slate-600 text-sm mt-1">(362) 412-3456</p>
                  <p className="text-slate-400 text-xs mt-0.5">Lun a Vie · 09:00 a 18:00 hs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-emerald-600 rounded-3xl p-8 shadow-lg shadow-emerald-600/20 text-white flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2">Reserva Rápida</h3>
            <p className="text-emerald-100 text-sm mb-8">
              Escribinos por WhatsApp o Instagram y te asignamos el primer turno disponible.
            </p>
            
            <div className="space-y-4">
              <a
                href="https://wa.me/5493621234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white text-emerald-700 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                Escribir por WhatsApp
              </a>
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-emerald-700 text-white py-4 rounded-xl font-bold hover:bg-emerald-800 border border-emerald-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Seguinos en Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <MapWidget 
          address="Av. Sarmiento 123, Resistencia, Chaco" 
          lat={-27.4485}
          lon={-58.9845}
          googleMapsUrl="https://maps.google.com/?q=Av.+Sarmiento+123,+Resistencia,+Chaco" 
          theme="emerald" 
        />
      </div>
    </section>
  );
}
