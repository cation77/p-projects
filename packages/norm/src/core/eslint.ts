import fs from 'fs-extra'
import { getEnv, getPackageJson, getPath } from '../utils/env'
import { writePackageDeps } from '../utils/spawn'
import generatorEslintrc from '../template/eslint'
import generatorPrettierrc from '../template/prettier'
const baseDep = [
	'eslint',
	'prettier',
	'eslint-friendly-formatter',
	'eslint-plugin-prettier',
	'eslint-plugin-html',
	'eslint-config-prettier'
]

const eslintInit = async () => {
	const devPeps = baseDep
	if (getEnv('isVue2')) {
		devPeps.push('eslint-plugin-vue@^6.2.2')
	}
	if (getEnv('isVue3')) {
		devPeps.push(
			'eslint-plugin-vue',
			'@typescript-eslint/parser',
			'@typescript-eslint/eslint-plugin'
		)
	}
	if (getEnv('isReact')) {
		devPeps.push(
			'eslint-plugin-react',
			'eslint-plugin-jsx-a11y',
			'@typescript-eslint/parser',
			'@typescript-eslint/eslint-plugin'
		)
	}

	await writePackageDeps(devPeps, 'devDependencies')
	fs.outputFileSync(getPath('./.eslintrc.js'), generatorEslintrc())
	fs.outputFileSync(getPath('./.prettierrc.js'), generatorPrettierrc())
	const packJson = await getPackageJson()
	if (packJson?.eslintConfig) {
		Reflect.deleteProperty(packJson, 'eslintConfig')
	}
	fs.writeJsonSync(getPath('package.json'), packJson, { spaces: 2 })
}

export default eslintInit
