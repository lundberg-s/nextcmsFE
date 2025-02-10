import React from 'react'

import { ReactNode } from 'react';

export default function SettingsWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2">{children}</div>
  )
}
