import { DefaultOptionType } from 'antd/lib/select'
import { ReactNode } from 'react'
import {
  ViewMetaData,
  ModelPosition,
  ModelSeniority,
  ModelRole,
} from './schema'

export type WithChildren<T = {}> = T & { children: ReactNode }

export interface SelectOption
  extends Partial<DefaultOptionType>,
    ViewMetaData,
    ModelPosition,
    ModelSeniority,
    ModelRole {}
