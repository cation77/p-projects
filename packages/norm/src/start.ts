import { getPackageJson, initProjectInfo } from './utils/env'
import { logError, logInfo, logProcess } from './utils/log'
import eslintInit from './core/eslint'
import huskyInit from './core/husky'
import eslintignoreInit from './core/eslintignore'
import vscodeInit from './core/vscode'

const start = async () => {
	const packJson = await getPackageJson()
	await initProjectInfo(packJson)
	try {
		await eslintInit()
		await huskyInit()
		await eslintignoreInit()
		await vscodeInit()
		logInfo('success')
		logProcess('请重新安装依赖！推荐使用 pnpm install')
	} catch (error) {
		logError(JSON.stringify(error))
	}
}

export default start
