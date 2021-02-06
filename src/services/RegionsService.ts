import Region from '../types/Region'
import applyBaseUrlToPath from '../utils/applyBaseUrlToPath'

type GetRegionsResult = {
  err?: string
  regions: Region[]
}
class RegionsService {
  public static async getRegions(): Promise<GetRegionsResult> {
    try {
      const request = new Request(applyBaseUrlToPath('/api/regions').toString(), {
        method: 'GET',
        cache: 'default',
        mode: 'cors',
      })
      const regionsRequestResponse = await fetch(request)

      if (regionsRequestResponse.ok) {
        const regions = (await regionsRequestResponse.json()) as Region[]
        return { regions }
      }

      throw new Error(regionsRequestResponse.statusText)
    } catch (e) {
      console.log(e)
      return { err: e.message, regions: [] }
    }
  }
}

export default RegionsService
