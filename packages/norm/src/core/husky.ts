import fs from 'fs-extra'
import { pathExists } from '../utils/check'
import { getPackageJson, getPath } from '../utils/env'
import { logError, logWarning } from '../utils/log'
import { run, writePackageDeps } from '../utils/spawn'

const deps = ['husky', 'lint-staged']

const huskyInit = async () => {
	if (!pathExists('.git', false)) {
		logWarning('请先初始化git')
		logError(`参考 git init`)
	}
	await writePackageDeps(deps)
	const packJson = await getPackageJson()
	packJson.scripts['prepare'] = 'husky install'
	packJson.scripts['pre-commit'] = 'lint-staged'
	packJson.scripts['postinstallmac'] = 'git config core.hooksPath .husky && chmod 700 .husky/*'
	packJson.scripts['eslint'] =
		'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,js,tsx}" --fix'
	packJson['lint-staged'] = {
		'*.{js,ts,vue,jsx,tsx}': ['npm run eslint'],
		'*.{js,jsx,ts,tsx,md,html,css,lees,scss,sass}': 'prettier --write'
	}
	fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })
	await run('pnpm run prepare')
	await run(`npx husky add .husky/pre-commit "npm-run-pre-commit"`)
}

export default huskyInit
