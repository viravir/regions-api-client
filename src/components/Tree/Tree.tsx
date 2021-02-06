import React, { FunctionComponent, memo, useCallback, useEffect, useMemo, useState } from 'react'

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
    RegionsService.getRegions((regions, err) => {
      if (err) {
        setError(err)
        return
      }
      setNodes(regions)
    })
  }, [])

  const findRootNodes = useCallback(() => getRootNodes(nodes), [nodes])
  const findChildNodes = useCallback((parentNodePath) => getChildNodes(parentNodePath, nodes), [nodes])

  const rootNodes = useMemo(() => findRootNodes(), [findRootNodes])

  if (error) {
    return <div className="ErrorMessage">{`Error happened: ${error}`}</div>
  }

  return (
    <div className="Tree">
      {rootNodes.map((node) => (
        <TreeNode node={node} findChildNodes={findChildNodes} />
      ))}
    </div>
  )
}

export default memo(Tree)
