import fs from 'fs-extra'
import { logError } from './log'
import { getEnvBase } from './env'

export const pathExists = async (name: string, ext = true) => {
	const base = getEnvBase()
	const res = await fs.pathExists(`${base}/${name}`)
	if (!res) {
		ext && logError(`${base}/${name}不存在`)
		return false
	}
	return true
}

export const checkVersion = (version: string) => {
	const v = version.split('.')[0] as string
	return Number(v.match(/\d+/g))
}

export const checkPackageManager = () => {
	if (/pnpm/.test(process.env.npm_execpath || '')) {
		return ['pnpm', 'install']
	}
	if (/yarn/.test(process.env.npm_execpath || '')) {
		return ['yarn', 'add']
	}
	return ['npm', 'install']
}
