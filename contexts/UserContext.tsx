// // contexts/UserContext.tsx
// 'use client'
// import React, { createContext, useContext, useState, useEffect } from 'react'

// interface User {
//   _id: number
//   id: number
//   address: string
//   name: string
//   profilePic: string | null
//   firstConnected: string
// }

// interface UserContextType {
//   user: User | null
//   setUser: (user: User | null) => void
//   updateUser: (updates: Partial<User>) => void
//   refreshUser: () => Promise<void>
// }

// const UserContext = createContext<UserContextType | undefined>(undefined)

// export function UserProvider({ children, sessionToken }: { children: React.ReactNode; sessionToken?: string }) {
//   const [user, setUser] = useState<User | null>(null)

//   const updateUser = (updates: Partial<User>) => {
//     if (user) {
//       console.log("Yes ==>",updates)
//       setUser({ ...user, ...updates })
//     }
//   }

//   const refreshUser = async () => {
//     // Implement refresh logic if needed
//   }

//   return (
//     <UserContext.Provider value={{ user, setUser, updateUser, refreshUser }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// export function useUser() {
//   const context = useContext(UserContext)
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider')
//   }
//   return context
// }

// contexts/UserContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'

interface User {
  id: number
  address: string
  name: string
  profilePic: string | null
  firstConnected: string
}

interface UserContextType {
  user: User | null
  updateUser: (userData: User) => void
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null)

  const updateUser = (userData: User) => {
    console.log("Updating user with:", userData)
    setUser(userData)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}