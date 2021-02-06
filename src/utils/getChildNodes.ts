import Region from '../types/Region'

const getChildNodes = (parentNodePath: string, availableNodes: Region[]): Region[] =>
  availableNodes.filter((node) => node.path.match(new RegExp(`^${parentNodePath}\\.\\d*$`)))

export default getChildNodes
