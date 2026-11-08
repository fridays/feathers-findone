declare function findOne(): (app: { mixins: unknown[] }) => void
export = findOne

type FindParams<S> = S extends { find(params?: infer P): any } ? P : any
type FindResult<S> = S extends { find(params?: any): Promise<infer R> }
  ? R extends { data: Array<infer T> } ? T : R extends Array<infer T> ? T : R
  : any

// Feathers 5
declare module '@feathersjs/feathers/lib/declarations' {
  interface ServiceAddons<A, S> {
    findOne(params?: FindParams<S>): Promise<FindResult<S> | undefined>
  }
}

// Feathers 4
declare module '@feathersjs/feathers/index' {
  interface ServiceAddons<T> {
    findOne(params?: { [key: string]: any }): Promise<T | undefined>
  }
}
