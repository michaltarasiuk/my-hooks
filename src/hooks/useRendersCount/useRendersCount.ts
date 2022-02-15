import { useRef } from 'react'

export const useRendersCount = () => ++useRef(0).current
