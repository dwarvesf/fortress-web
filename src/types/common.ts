import { ReactNode } from 'react'

export type WithChildren<T = {}> = T & { children: ReactNode }

export type Nullable<T> = { [K in keyof T]: T[K] | null }
