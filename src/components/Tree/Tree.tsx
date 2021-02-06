import React, { FunctionComponent, memo, useCallback, useEffect, useState } from 'react'

import getRootNodes from '../../utils/getRootNodes'
import getChildNodes from '../../utils/getChildNodes'
import TreeNode from './TreeNode'
import './Tree.css'
import RegionsService from '../../services/RegionsService'
import Region from '../../types/Region'

type TreeProps = Record<string, unknown>

const Tree: FunctionComponent<TreeProps> = () => {
  const [nodes, setNodes] = useState([] as Region[])
  const [error, setError] = useState('')

  /**
   * Request initial tree data on component mount
   */
  useEffect(() => {
    // TODO -> use dependency injection
    RegionsService.getRegions().then(({ err, regions }): void => {
      if (err) {
        setError(err)
        return
      }

      setNodes(regions)
    })
  }, [])

  const findRootNodes = useCallback(() => getRootNodes(nodes), [nodes])
  const findChildNodes = useCallback((parentNodePath) => getChildNodes(parentNodePath, nodes), [nodes])

  const rootNodes = findRootNodes()

  if (error) {
    return <div className="ErrorMessage">{`Error happened: ${error}`}</div>
  }

  return (
    <div className="Tree">
      {rootNodes.length > 0 ? (
        rootNodes.map((node) => <TreeNode key={node.id} node={node} findChildNodes={findChildNodes} />)
      ) : (
        <div className="Tree__emptyText">No nodes to show</div>
      )}
    </div>
  )
}

export default memo(Tree)
