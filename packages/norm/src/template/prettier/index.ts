const config = {
	semi: false,
	singleQuote: true,
	printWidth: 100,
	tabWidth: 2,
	trailingComma: 'none'
}

const generatorPrettierrc = () => {
	return `module.exports = ${JSON.stringify(config, null, 2)}`
}

export default generatorPrettierrc
