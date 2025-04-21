import React from 'react'
import { Button } from '@/components/ui/button'

const ButtonCircularIcon = React.forwardRef((props, ref) => {
  const { icon, onClick, label = "", className = "", variant = "default" } = props
  return (
    <Button className={`rounded-full p-3 ${className}`} onClick={onClick} variant={variant}>
      {icon}
    </Button>
  )
})

export default ButtonCircularIcon