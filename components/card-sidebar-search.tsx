import {type HTMLAttributes, type ReactNode} from "react"

import {cn} from "@/lib/utils"

import {Card, CardContent, CardHeader} from "./ui/card"

interface CardSidebarSearchProps {
  children: ReactNode
  title: string
  className?: HTMLAttributes<HTMLDivElement>["className"]
}

export const CardSidebarSearch: React.FC<CardSidebarSearchProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="p-3 text-xl font-bold">{title}</CardHeader>
      <CardContent className="p-3">{children}</CardContent>
    </Card>
  )
}
