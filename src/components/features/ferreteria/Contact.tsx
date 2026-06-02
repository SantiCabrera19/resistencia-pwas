"use client";

import { FERRETERIA_DATA } from "@/data/ferreteria";
import { MapPin, Clock } from "lucide-react";
import { MapWidget } from "@/components/ui/MapWidget";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function Contact() {
  const { contacto } = FERRETERIA_DATA;

  return (
    <section className="bg-orange-50 px-5 py-16 sm:py-24" id="contacto">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contactanos
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Hacé tu pedido o consultá stock por WhatsApp.
          </p>
        </div>
        
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm border border-orange-100 sm:p-10 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Dirección</p>
              <p className="mt-1 text-base text-slate-600">{contacto.direccion}</p>
            </div>
          </div>
          
          <div className="h-px w-full bg-slate-100" />
          
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Horarios de Atención</p>
              <p className="mt-1 text-base text-slate-600">{contacto.horarios}</p>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={`https://wa.me/${contacto.whatsapp.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-bold text-white shadow-sm transition-all hover:bg-[#20bd5a] active:scale-95"
            >
              <WhatsAppIcon className="h-6 w-6" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* Interactive Map */}
        <MapWidget 
          address={contacto.direccion} 
          lat={-27.4578}
          lon={-58.9930}
          googleMapsUrl={`https://maps.google.com/?q=${encodeURIComponent(contacto.direccion)}`} 
          theme="orange" 
        />
      </div>
    </section>
  );
}
