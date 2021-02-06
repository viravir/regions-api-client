import backendConfig from '../configs/backend'

const applyBaseUrlToPath = (path: string): URL => new URL(path, backendConfig.baseUrl)

export default applyBaseUrlToPath
