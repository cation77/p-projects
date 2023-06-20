import fs from 'fs-extra'
import { getPath } from '../utils/env'

const eslintignore = `
.prettierrc
!commitlint.config.js
.babel.config.js
!.umirc.ts
 `
const eslintignoreInit = async () => {
	fs.outputFileSync(getPath('.eslintignore'), eslintignore)
}

export default eslintignoreInit
