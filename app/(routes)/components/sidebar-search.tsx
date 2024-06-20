import {CardSidebarSearch} from "@/components/card-sidebar-search"
import {TagIcon} from "@/components/icons/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export const SidebarSearch = ({}) => {
  return (
    <section className="w-full px-6 py-2">
      {/* buscador */}
      <section className="sticky top-0 flex h-full w-full items-center justify-center bg-black py-3">
        <div className="flex w-full items-center rounded-3xl bg-gray-500/45 px-4">
          <TagIcon className="h-8 w-8" name="explore" />
          <Input
            className="w-full border-none focus-visible:ring-0"
            placeholder="Buscar"
            type="text"
          />
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-y-4">
        <CardSidebarSearch className="w-full border bg-transparent" title="Suscribite a Premiun">
          <div className="flex flex-col items-start gap-y-4">
            <p className="text-sm font-semibold">
              Suscríbete para desbloquear nuevas funciones y, si eres elegible, recibir un pago de
              cuota de ingresos por anuncios.
            </p>
            <Button className="bg-sky-600">Suscribirse</Button>
          </div>
        </CardSidebarSearch>

        {/* en directo een X */}

        <CardSidebarSearch className="w-full border bg-transparent" title="En directo en X">
          <section className="flex flex-col gap-y-4">
            <article className="flex w-full items-start gap-x-2 overflow-hidden">
              <div className="max-w-44">
                <p className="text-sm">#CafeLibertario 🥐☕🛠️ Hincarle un diente al universo 2</p>
              </div>
              <div className="rounded-full border-2 border-violet-600">
                <div className="flex items-center justify-between p-2">
                  <div className="flex h-full overflow-hidden">
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                  </div>
                  <span className="text-sm">+38</span>
                </div>
              </div>
            </article>
            <article className="flex w-full items-start gap-x-2 overflow-hidden">
              <div className="max-w-44">
                <p className="text-sm">Edem @ Sobre La Venus de las pieles porneeta</p>
              </div>
              <div className="rounded-full border-2 border-violet-600">
                <div className="flex items-center justify-between p-2">
                  <div className="flex h-full overflow-hidden">
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                    <img
                      alt=""
                      className="h-6 w-6 rounded-full object-cover"
                      src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                    />
                  </div>
                  <span className="text-sm">+38</span>
                </div>
              </div>
            </article>
          </section>
        </CardSidebarSearch>

        {/* A quien seguir */}

        <CardSidebarSearch className="w-full border bg-transparent" title="A quien seguir">
          <section className="flex w-full flex-col gap-y-4">
            <article className="flex w-full items-start gap-x-2">
              <div className="h-12 w-16 overflow-hidden rounded-full">
                <img
                  alt=""
                  className="aspect-square h-full w-full object-cover"
                  src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold">La nación Más</h3>
                  <span className="text-sm font-extralight text-gray-500">@lanacionmas</span>
                </div>
                <Button className="bg-white text-black" variant="outline">
                  Seguir
                </Button>
              </div>
            </article>
            <article className="flex w-full items-start gap-x-2">
              <div className="h-12 w-16 overflow-hidden rounded-full">
                <img
                  alt=""
                  className="aspect-square h-full w-full object-cover"
                  src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold">La nación Más</h3>
                  <span className="text-sm font-extralight text-gray-500">@lanacionmas</span>
                </div>
                <Button className="bg-white text-black" variant="outline">
                  Seguir
                </Button>
              </div>
            </article>
            <article className="flex w-full items-start gap-x-2">
              <div className="h-12 w-16 overflow-hidden rounded-full">
                <img
                  alt=""
                  className="aspect-square h-full w-full object-cover"
                  src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start">
                  <h3 className="text-lg font-bold">La nación Más</h3>
                  <span className="text-sm font-extralight text-gray-500">@lanacionmas</span>
                </div>
                <Button className="bg-white text-black" variant="outline">
                  Seguir
                </Button>
              </div>
            </article>
          </section>
        </CardSidebarSearch>
      </section>
    </section>
  )
}
