import Region from '../types/Region'
import applyBaseUrlToPath from '../utils/applyBaseUrlToPath'

interface GetRequestCallback { (regions: Region[], err?: string): void }

class RegionsService {
  public static async getRegions(cb: GetRequestCallback): Promise<void> {
    try {
      const request = new Request(applyBaseUrlToPath('/api/regions').toString(), {
        method: 'GET',
        cache: 'default',
        mode: 'cors',
      })
      const regionsRequestResponse = await fetch(request)

      if (regionsRequestResponse.ok) {
        const regions = await regionsRequestResponse.json() as Region[]
        cb(regions)
        return
      }

      cb([], regionsRequestResponse.statusText)
    } catch (e) {
      console.log(e)
      cb([], e.message)
    }
  }
}

export default RegionsService