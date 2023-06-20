import { getEnv } from '../../utils/env'
import { reactConfig, vue2Config, vue3Config, baseConfig } from './config'

const generatorEslintrc = () => {
	let config: any = baseConfig
	if (getEnv('isVue2')) {
		config = vue2Config
	}
	if (getEnv('isVue3')) {
		config = vue3Config
	}
	if (getEnv('isReact')) {
		config = reactConfig
	}
	return `module.exports = ${JSON.stringify(config, null, 2)}`
}

export default generatorEslintrc
