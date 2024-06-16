import { HTMLAttributes, ReactNode } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";

interface CardSidebarSearchProps {
  children: ReactNode;
  title: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export const CardSidebarSearch: React.FC<CardSidebarSearchProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="font-bold text-xl p-3">{title}</CardHeader>
      <CardContent className="p-3">{children}</CardContent>
    </Card>
  );
};
