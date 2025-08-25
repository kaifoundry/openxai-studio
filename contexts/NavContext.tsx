'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export const NavContext = createContext<{
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  toggleCollapsed: (newCollapsed: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
  toggleCollapsed: () => {}
})

/**
 * Hook to get the collapsed state and toggleCollapsed function for the nav sidebar
 * Can be used in any child component
 * @returns { collapsed, setCollapsed, toggleCollapsed }
 */
export const useNavContext = () => useContext(NavContext)

// Global Nav Provider Component
export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true)

  // Load collapsed state from local storage
  useEffect(() => {
    const stored = localStorage.getItem('nav-collapsed')
    if (stored === 'true') setCollapsed(true)
  }, [])

  const toggleCollapsed = (newCollapsed: boolean) => {
    console.log("Calling toggleCollapsed:", newCollapsed)
    setCollapsed(newCollapsed)
    localStorage.setItem('nav-collapsed', String(newCollapsed))
  
    window.dispatchEvent(
      new CustomEvent('nav-collapsed-change', {
        detail: { collapsed: newCollapsed },
      })
    )
  }

  return (
    <NavContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed
      }}
    >
      {children}
    </NavContext.Provider>
  )
}