/**
 * vscode 配置
 */
import fs from 'fs-extra'
import { getPath } from '../utils/env'
import settings from '../template/vscode'

const vscodeInit = async () => {
	const haveVscodeSetting = await fs.pathExists(getPath('./vscode/settings.json'))
	let vscodeSetting = {}
	if (!haveVscodeSetting) {
		vscodeSetting = settings
	} else {
		const nowSetting = fs.readJSON(getPath('./vscode/settings.json'))
		vscodeSetting = { ...nowSetting, ...vscodeSetting }
	}
	fs.outputFileSync(getPath('./.vscode/settings.json'), JSON.stringify(vscodeSetting, null, 2))
}

export default vscodeInit
