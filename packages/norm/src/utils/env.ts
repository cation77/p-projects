import path from 'path'
import fs from 'fs-extra'
import { checkVersion } from '../utils/check'

type IPackage = {
	dependencies: Record<string, string>
	devDependencies: Record<string, string>
	scripts: Record<string, string>
	eslintConfig?: Record<string, string>
	[x: string]: any
}

export const env = {
	base: '',
	isVue: false,
	isVue2: false,
	isVue3: false,
	isReact: false,
	isEslint: false,
	isZh: false, // 中英文
	simple: false, // 是否是简单模式 默认是否
	noEmoji: false // 是否不要表情 默认是要
}

type IEnvKey = keyof typeof env

export const setEnv = (key: IEnvKey, val: any) => {
	env[key] = val as never
}

export const getEnvBase = () => env.base

export const getEnv = (key: Exclude<IEnvKey, 'base'>) => env[key]

export const getPath = (name: string) => {
	return path.resolve(env.base, name)
}

export const getPackageJson = async (): Promise<IPackage> => {
	const file = path.resolve(env.base, 'package.json')
	return fs.readJSON(file)
}

export const initProjectInfo = async (packJson: IPackage) => {
	const deps = { ...packJson.devDependencies, ...packJson.dependencies }
	if (deps?.vue) {
		setEnv('isVue', true)
		if (checkVersion(deps.vue) === 2) {
			setEnv('isVue2', true)
		}
		if (checkVersion(deps.vue) === 3) {
			setEnv('isVue3', true)
		}
	}
	if (deps?.react) {
		setEnv('isReact', true)
	}
	if (deps?.eslint) {
		setEnv('isEslint', true)
	}
}
