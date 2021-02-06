import Region from '../types/Region'

const getRootNodes = (availableNodes: Region[]): Region[] => availableNodes.filter((node) => node.path.match(/^\d*$/))

export default getRootNodes
