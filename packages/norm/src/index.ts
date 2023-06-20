import cac from 'cac'
import start from './start'
import { setEnv } from './utils/env'

const cli = cac('norm')
export default function () {
	cli
		.command('[root]')
		.alias('alias')
		.option('-n', '--en')
		.option('-s', '--simple')
		.option('-n', '--noEmoji')
		.action(async (_root, options) => {
			let base = options.base
			const { en, simple, noEmoji } = options
			en && setEnv('isZh', true)
			simple && setEnv('simple', true)
			noEmoji && setEnv('noEmoji', true)
			if (!base) {
				base = process.cwd()
			}
			setEnv('base', base)
			await start()
		})

	cli.help()
	cli.version('1.0.0')
	cli.parse()
}
