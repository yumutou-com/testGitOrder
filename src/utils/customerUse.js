/**
 * @Title: customerUse
 * @ProjectName sei-blank-app
 * @Description:
 * @author yulan
 * @date 2023/4/315:22
 */

import { useEffect, useRef, useState } from 'react'

export const useXState = (initState) => {
  const [state, setState] = useState(initState)
  const isUpdate = useRef()
  const setXState = (myState, cb) => {
    setState(prev => {
      isUpdate.current = cb
      return typeof myState === 'function' ? myState(prev) : myState
    })
  }
  useEffect(() => {
    if(isUpdate.current) {
      isUpdate.current(state)
    }
  })
  return [state, setXState]
}
