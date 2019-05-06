import React from 'react'
import { Link } from 'gatsby'

import './NavLink.css'

export default ({ className, children, ...props }) => (
  <Link {...props} className={`NavLinkMetaCategory ${className || ''}`}>
    {children}
  </Link>
)
