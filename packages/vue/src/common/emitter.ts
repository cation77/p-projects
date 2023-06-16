import mitt from '@pnpm-monorepo/mitt'

export type EventType = 'mouse' | 'keyup'

export type EventCallback = { code: number; msg: string }

const emitter = mitt<Record<EventType, EventCallback>>()

export default emitter
