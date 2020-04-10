import { Maybe } from "purify-ts"

export const log = (str?: string) => <A>(data: A): A => {
  Maybe.fromNullable(str)
    .ifJust(str => console.log(`${str}: ${data}`))
    .ifNothing(() => console.log(data))
  
  return data
}

export default log
