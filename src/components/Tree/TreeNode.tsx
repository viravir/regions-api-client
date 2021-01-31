import React, { FunctionComponent, memo, useCallback, useMemo, useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'

import Region from '../../types/Region'

type TreeNodeProps = {
  node: Region;
  findChildNodes: Function;
}

const TreeNode: FunctionComponent<TreeNodeProps> = (props) => {
  const { findChildNodes, node } = props

  const [collapsed, setCollapsed] = useState(false)

  const childNodes = useMemo((): Region[] => findChildNodes(node.path), [findChildNodes, node.path])

  const canBeCollapsed = useMemo(() => childNodes.length > 0, [childNodes.length])

  const toggleCollapse = useCallback(() => canBeCollapsed ? setCollapsed(!collapsed) : null, [canBeCollapsed, collapsed])

  return <div className="Tree__node TreeNode">
    <div
      className={`TreeNode__header${canBeCollapsed ? ' TreeNode__header-canBeCollapsed' : ''}`}
      onClick={toggleCollapse}
    >
      <span className="TreeNode__collapseStateIcon">
        {canBeCollapsed && collapsed ? <FaChevronDown /> : <FaChevronRight />}
      </span>
      <span className="TreeNode__nodeIcon">
        <FiBox />
      </span>
      <span className="TreeNode__name">
        {node.name || 'Без имени'}
      </span>
    </div>
    {collapsed && 
      <div className="TreeNode__childNodes TreeNode__childNodes-collapsed">
        {childNodes.map(childNode =>
          <TreeNode node={childNode} findChildNodes={findChildNodes} />
        )}
      </div>
    }
  </div>
}

export default memo(TreeNode)