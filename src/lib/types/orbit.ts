import type { LucideIcon } from "lucide-react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    reverse?: boolean;
    duration?: number;
    delay?: number;
    radius?: number;
    path?: boolean;
    iconSize?: number;
    speed?: number;
    centerIcon?: React.ReactNode | LucideIcon | React.SVGProps<SVGSVGElement>;
    centerIconSize?: number;
    centerIconClassName?: string;
}