'use client'

import { ArrowUp } from 'lucide-react'

type CollapseComparisonButtonProps = {
  detailsId: string
}

export function CollapseComparisonButton({ detailsId }: CollapseComparisonButtonProps) {
  function collapseComparison() {
    const details = document.getElementById(detailsId)
    if (!(details instanceof HTMLDetailsElement)) return

    details.open = false
    details.querySelector('summary')?.focus()
  }

  return <button className="feature-collapse-button" type="button" onClick={collapseComparison}>
    <ArrowUp size={14} aria-hidden="true" />
    Minimise comparison
  </button>
}
