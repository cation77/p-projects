import isBrowser from '../../../utils/isBrowser'

const isDocumentVisible = () => {
  if (isBrowser) {
    return document.visibilityState !== 'hidden'
  }
  return true
}

export default isDocumentVisible
