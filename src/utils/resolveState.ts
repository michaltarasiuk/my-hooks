export type ResolveableState<TState> = ((prevState?: TState) => TState) | TState

const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const resolveState = <TState>(
  resolveableState: ResolveableState<TState>,
  prevState: TState
) => {
  if (isFunction(resolveableState)) {
    return resolveableState.length
      ? resolveableState(prevState)
      : resolveableState()
  }

  return resolveableState
}
