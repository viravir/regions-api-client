const { REACT_APP_BASE_URL: baseUrl = '/' } = process.env

const backendConfig = {
  baseUrl,
  applyBaseUrlToPath: (path: string): URL => new URL(path, baseUrl),
}

export default backendConfig
