import { TagIcon } from "@/components/icons/icons";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({}) => {
  return (
    <aside className="fixed top-0 p-2 w-1/4">
      <div className="flex items-center gap-x-4 bg-gray-500/45 rounded-xl w-full px-4">
        <TagIcon name="explore" className="h-8 w-8" />
        <Input type="text" placeholder="Buscar" className="border-none" />
      </div>
    </aside>
  );
};
