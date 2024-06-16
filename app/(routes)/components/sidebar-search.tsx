import { CardSidebarSearch } from "@/components/card-sidebar-search";
import { TagIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({}) => {
  return (
    <aside className="py-2 px-6 max-w-lg overflow-hidden">
      <section className="flex flex-col gap-y-4 w-full items-start">
        {/* buscador */}
        <div className="flex items-center w-full bg-gray-500/45 rounded-3xl px-4">
          <TagIcon name="explore" className="h-8 w-8" />
          <Input
            type="text"
            placeholder="Buscar"
            className="w-full border-none focus-visible:ring-0"
          />
        </div>
        {/* Cards */}
        <div className="flex flex-col items-start gap-y-4 w-full">
          <CardSidebarSearch
            title="Suscribite a Premiun"
            className="bg-transparent border w-full"
          >
            <div className="flex flex-col items-start gap-y-4">
              <p className="text-sm font-semibold">
                Suscríbete para desbloquear nuevas funciones y, si eres
                elegible, recibir un pago de cuota de ingresos por anuncios.
              </p>
              <Button className="bg-sky-600">Suscribirse</Button>
            </div>
          </CardSidebarSearch>

          {/* en directo een X */}

          <CardSidebarSearch
            title="En directo en X"
            className="bg-transparent border w-full"
          >
            <section className="flex flex-col gap-y-4">
              <article className="flex gap-x-2 w-full items-start overflow-hidden">
                <div className="max-w-44">
                  <p className="text-sm">
                    #CafeLibertario 🥐☕🛠️ Hincarle un diente al universo 2
                  </p>
                </div>
                <div className="border-2 border-violet-600 rounded-full">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex h-full overflow-hidden">
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                    </div>
                    <span className="text-sm">+38</span>
                  </div>
                </div>
              </article>
              <article className="flex gap-x-2 w-full items-start overflow-hidden">
                <div className="max-w-44">
                  <p className="text-sm">
                    Edem @ Sobre La Venus de las pieles porneeta
                  </p>
                </div>
                <div className="border-2 border-violet-600 rounded-full">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex h-full overflow-hidden">
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                      <img
                        src="https://i.ytimg.com/vi/8HqE2s5u-6k/maxresdefault.jpg"
                        className="rounded-full object-cover h-6 w-6"
                        alt=""
                      />
                    </div>
                    <span className="text-sm">+38</span>
                  </div>
                </div>
              </article>
            </section>
          </CardSidebarSearch>

          {/* A quien seguir */}

          <CardSidebarSearch
            title="A quien seguir"
            className="bg-transparent border w-full"
          >
            <section className="flex w-full gap-y-4 flex-col">
              <article className="flex gap-x-2 items-start w-full">
                <div className="w-16 h-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full aspect-square object-cover"
                    src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                    alt=""
                  />
                </div>
                <div className="items-center w-full flex justify-between">
                  <div className="flex items-start flex-col">
                    <h3 className="text-lg font-bold">La nación Más</h3>
                    <span className="text-sm text-gray-500 font-extralight">
                      @lanacionmas
                    </span>
                  </div>
                  <Button variant="outline" className="bg-white text-black">
                    Seguir
                  </Button>
                </div>
              </article>
              <article className="flex gap-x-2 items-start w-full">
                <div className="w-16 h-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full aspect-square object-cover"
                    src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                    alt=""
                  />
                </div>
                <div className="items-center w-full flex justify-between">
                  <div className="flex items-start flex-col">
                    <h3 className="text-lg font-bold">La nación Más</h3>
                    <span className="text-sm text-gray-500 font-extralight">
                      @lanacionmas
                    </span>
                  </div>
                  <Button variant="outline" className="bg-white text-black">
                    Seguir
                  </Button>
                </div>
              </article>
              <article className="flex gap-x-2 items-start w-full">
                <div className="w-16 h-12 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full aspect-square object-cover"
                    src="https://pbs.twimg.com/profile_images/1790004218088050689/nhev9ozZ_400x400.jpg"
                    alt=""
                  />
                </div>
                <div className="items-center w-full flex justify-between">
                  <div className="flex items-start flex-col">
                    <h3 className="text-lg font-bold">La nación Más</h3>
                    <span className="text-sm text-gray-500 font-extralight">
                      @lanacionmas
                    </span>
                  </div>
                  <Button variant="outline" className="bg-white text-black">
                    Seguir
                  </Button>
                </div>
              </article>
            </section>
          </CardSidebarSearch>
        </div>
      </section>
    </aside>
  );
};
