import { Elysia } from "elysia"
import { env } from '@yolk-oss/elysia-env'
export interface extendsApp extends Elysia {
    env: any,
    startupTime: number,
}