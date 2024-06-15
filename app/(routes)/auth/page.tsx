import { Social } from "@/components/auth/social";
import { TagIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const footerOptions = [
  "Información",
  "Descarga la app de X",
  "Centro de ayuda",
  "Condiciones de servicio",
  "Politica de privacidad",
  "Politica de cookies",
  "Accesibilidad",
  "Informacion de anuncios",
  "Blog",
  "Empleos",
  "Recursos para marcas",
  "Publicidad",
  "Marketing",
  "X para empresas",
  "Desarrolladores",
  "Guía",
  "Configuración",
  "© 2024 X Corp.",
];

export default function InitPage({}: Props) {
  return (
    <main className="w-full h-full grid place-items-center">
      <div className="flex items-center w-full py-24 px-16 gap-x-20">
        <section className="w-1/3">
          <TagIcon name="premium" className="w-full h-full" />
        </section>
        <section className="flex flex-col  items-start">
          <div className="flex flex-col w-2/3 gap-y-10">
            <h1 className="text-6xl font-extrabold">
              Lo que está pasando ahora
            </h1>
            <p className="text-4xl font-extrabold mt-10">únete Hoy</p>
          </div>
          <div className="flex flex-col gap-y-3 w-2/5 mt-6">
            <Social />
            <section className="flex gap-x-2 items-center w-full">
              <div className="border-b w-2/3 border-gray-300"></div>
              <p className="text-gray-300 text-sm">o</p>
              <div className="border-b w-2/3 border-gray-300"></div>
            </section>
            <Button>
              <Link href="/auth/register">Crear Cuenta</Link>
            </Button>
            <p className="font-extralight text-[10px]">
              Al registrar, aceptas los{" "}
              <span className="text-primary">Términos de Servicio </span>y la{" "}
              <span className="text-primary">Política de Privacidad</span>,
              incluyenda la política de{" "}
              <span className="text-primary">Uso de Cookies</span>.
            </p>
          </div>
          <div className="flex flex-col gap-y-3 w-2/5 mt-10">
            <h4 className="font-bold">¿Ya tienes una cuenta?</h4>
            <Button
              className="bg-transparent text-primary"
              variant="outline"
              role="link"
              type="button"
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </section>
      </div>
      <footer className="w-full py-7 px-10">
        <section className="flex flex-wrap gap-2 items-center justify-center">
          {footerOptions.map((option) => (
            <p key={option} className="text-sm font-extralight text-gray-400">
              {option}
            </p>
          ))}
        </section>
      </footer>
    </main>
  );
}
