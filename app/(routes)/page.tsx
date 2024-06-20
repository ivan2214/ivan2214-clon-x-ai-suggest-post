import Link from "next/link"
import {redirect} from "next/navigation"

import {auth} from "@/auth"
import {Social} from "@/components/auth/social"
import {TagIcon} from "@/components/icons/icons"
import {Button} from "@/components/ui/button"
import {getUserById} from "@/data/user"

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
]

export default async function InitPage() {
  const session = await auth()
  const currentUser = await getUserById(session?.user.id)

  if (currentUser) {
    redirect("/home")
  }

  return (
    <main className="grid h-full w-full place-items-center">
      <div className="flex w-full items-center gap-x-20 px-16 py-24">
        <section className="w-1/3">
          <TagIcon className="h-full w-full" name="premium" />
        </section>
        <section className="flex flex-col  items-start">
          <div className="flex w-2/3 flex-col gap-y-10">
            <h1 className="text-6xl font-extrabold">Lo que está pasando ahora</h1>
            <p className="mt-10 text-4xl font-extrabold">únete Hoy</p>
          </div>
          <div className="mt-6 flex w-2/5 flex-col gap-y-3">
            <Social />
            <section className="flex w-full items-center gap-x-2">
              <div className="w-2/3 border-b border-gray-300" />
              <p className="text-sm text-gray-300">o</p>
              <div className="w-2/3 border-b border-gray-300" />
            </section>
            <Button>
              <Link href="/auth/register">Crear Cuenta</Link>
            </Button>
            <p className="text-[10px] font-extralight">
              Al registrar, aceptas los <span className="text-primary">Términos de Servicio </span>y
              la <span className="text-primary">Política de Privacidad</span>, incluyenda la
              política de <span className="text-primary">Uso de Cookies</span>.
            </p>
          </div>
          <div className="mt-10 flex w-2/5 flex-col gap-y-3">
            <h4 className="font-bold">¿Ya tienes una cuenta?</h4>
            <Button
              className="bg-transparent text-primary"
              role="link"
              type="button"
              variant="outline"
            >
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </section>
      </div>
      <footer className="w-full px-10 py-7">
        <section className="flex flex-wrap items-center justify-center gap-2">
          {footerOptions.map((option) => (
            <p key={option} className="text-sm font-extralight text-gray-400">
              {option}
            </p>
          ))}
        </section>
      </footer>
    </main>
  )
}
