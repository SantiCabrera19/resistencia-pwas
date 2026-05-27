import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

interface DemoBannerProps {
  adminLink: string;
}

export function DemoBanner({ adminLink }: DemoBannerProps) {
  return (
    <div className="bg-indigo-600 px-4 py-3 text-white sm:px-6 lg:px-8 z-[100] relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 opacity-80" />
          <p className="text-sm font-medium">
            <span className="font-bold">Modo Demo:</span> Estás viendo la vista pública del cliente.
          </p>
        </div>
        <Link
          href={adminLink}
          className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold hover:bg-white/20 transition-colors"
        >
          Ir al Panel Admin
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
