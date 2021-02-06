import Region from '../types/Region'

const getRootNodes = (availableNodes: Region[]): Region[] => availableNodes.filter((node) => node.path.match(/^[0-9]$/))

export default getRootNodes
