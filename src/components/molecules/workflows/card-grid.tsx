import React from "react"

import type { ReactNode } from "react"


interface CardGridProps {
  children: ReactNode
}

export function CardGrid({ children }: CardGridProps) {
  const childrenCount = React.Children.count(children)

  const gridClasses =
    childrenCount === 1
      ? "w-full max-w-full"
      : "grid gap-6 w-full max-w-7xl" +
        (childrenCount <= 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")

  return <div className={gridClasses}>{children}</div>
}