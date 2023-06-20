import chalk from 'chalk'

const log = console.log

let shouldLog = true

export const toggleLog = (log: boolean) => (shouldLog = log)

export const logError = (msg: string) => {
	shouldLog && log(chalk.hex('#646cff')(`['norm: ']`) + chalk.red(msg))
	process.exit(0)
}

export const logInfo = (msg: string) => {
	shouldLog && log(chalk.hex('#646cff')(`['norm: ']`) + chalk.green(msg))
}

export const logProcess = (msg: string) => {
	shouldLog && log(chalk.hex('#646cff')(`['norm: ']`) + chalk.yellow(msg))
}

export const logWarning = (msg: string) => {
	log(chalk.hex('#646cff')(`['norm: ']`) + chalk.yellow(msg))
}

export const logText = (msg: string) => {
	log(chalk.hex('#646cff')(`['norm: ']`) + chalk.hex('#5c6d82')(msg))
}
