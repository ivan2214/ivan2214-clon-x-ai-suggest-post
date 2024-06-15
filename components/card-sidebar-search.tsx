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
      <CardHeader className="font-bold text-xl">{title}</CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
