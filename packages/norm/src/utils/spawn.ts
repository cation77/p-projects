import spawn from 'cross-spawn'
import fs from 'fs-extra'
import { getPath, getPackageJson, getEnvBase } from './env'
import { logInfo, logWarning } from './log'

type IDep = 'devDependencies' | 'dependencies'

export const writePackageDeps = async (deps: string[], key: IDep = 'devDependencies') => {
	const packJson = await getPackageJson()
	deps.forEach((item) => {
		const index = item.lastIndexOf('@')
		const k = index === -1 ? item : item.slice(0, index)
		const v = index === -1 ? 'latest' : item.slice(index + 1) || 'latest'
		packJson[key][k] = v
		logInfo(`${item}✅`)
	})
	fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })
}

export const run = async (command: string) => {
	const commandArr = command.split(' ')
	if (commandArr.length < 2) {
		logWarning(`运行参数错误${command}`)
		return false
	}
	const [npm, ...args] = commandArr
	logInfo(`${command}✅`)
	spawn.sync(npm, args, {
		stdio: 'pipe',
		cwd: getEnvBase()
	})
}
