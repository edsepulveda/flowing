import type { Transition } from "motion/react";

export interface MotionHighlightContextType {
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  id: string;
  hover: boolean;
  className?: string;
  transition?: Transition;
  disabled?: boolean;
  exitDelay?: number;
}


export interface BaseMotionHighlightProps {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  className?: string;
  transition?: Transition;
  hover?: boolean;
  containerClassName?: string;
  disabled?: boolean;
  exitDelay?: number;
}


export interface ControlledMotionHighlightProps extends BaseMotionHighlightProps {
  controlledItems: true;
  children: React.ReactNode;
}
 
export interface UncontrolledMotionHighlightProps extends BaseMotionHighlightProps {
  controlledItems?: false;
  children: React.ReactElement | React.ReactElement[];
}


export type MotionHighlightProps =
  | ControlledMotionHighlightProps
  | UncontrolledMotionHighlightProps;


export interface ExtendedChildProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  'data-active'?: string;
  'data-value'?: string;
  'data-disabled'?: string;
}
  
export interface MotionHighlightItemProps {
  children: React.ReactElement;
  id?: string;
  value?: string;
  className?: string;
  transition?: Transition;
  activeClassName?: string;
  disabled?: boolean;
  exitDelay?: number;
}