import React, { FunctionComponent, memo, useCallback, useState } from 'react'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'

import Region from '../../types/Region'

type TreeNodeProps = {
  node: Region
  findChildNodes: (parentPath: string) => Region[]
}

const TreeNode: FunctionComponent<TreeNodeProps> = (props) => {
  const { findChildNodes, node } = props

  const [collapsed, setCollapsed] = useState(false)

  const childNodes = findChildNodes(node.path)

  const canBeCollapsed = childNodes.length > 0

  const toggleCollapse = useCallback(() => (canBeCollapsed ? setCollapsed(!collapsed) : null), [
    canBeCollapsed,
    collapsed,
  ])

  const handleTreeNodeHeaderKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        toggleCollapse()
      }
    },
    [toggleCollapse],
  )

  return (
    <div className="Tree__node TreeNode">
      <div
        role="button"
        tabIndex={0}
        className={`TreeNode__header${canBeCollapsed ? ' TreeNode__header-canBeCollapsed' : ''}`}
        onClick={toggleCollapse}
        onKeyDown={handleTreeNodeHeaderKeyDown}
      >
        <span className="TreeNode__collapseStateIcon">
          {canBeCollapsed && collapsed ? <FaChevronDown /> : <FaChevronRight />}
        </span>
        <span className="TreeNode__nodeIcon">
          <FiBox />
        </span>
        <span className="TreeNode__name">{node.name || 'Без имени'}</span>
      </div>
      {collapsed && (
        <div className="TreeNode__childNodes TreeNode__childNodes-collapsed">
          {childNodes.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} findChildNodes={findChildNodes} />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(TreeNode)
