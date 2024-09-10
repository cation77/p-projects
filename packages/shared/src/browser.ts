export const isMobileBrowser = () => {
  const regE =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  return !!window.navigator.userAgent.match(regE)
}

export const downloadFile = (filePath: Blob, fileName: string) => {
  const a = document.createElement('a')
  document.appendChild(a)
  a.style.display = 'none'
  a.href = URL.createObjectURL(filePath)
  a.download = fileName
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(a.href)
  }, 1000)
}
