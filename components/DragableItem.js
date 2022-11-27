import React, { Children } from 'react'
import Image from 'next/image'
import { useDrag } from 'react-dnd/dist/hooks'

function DragableItem({children, id, url}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'div',
        item: { id:id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
  return (
    <div ref={drag} style={{"border":  isDragging ? "5px solid pink" : ""}} className="w-full bg-red-400 flex items-center justify-center p-2 rounded-lg" >
        {children}
    </div>
  )
}

export default DragableItem