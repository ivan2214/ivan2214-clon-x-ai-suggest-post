import {type SVGProps} from "react"

export interface SidebarOption {
  name: string
  href?: string
  popover?: true
  popoverOptions?: SidebarOption[]
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element // El icono es un componente React
}
