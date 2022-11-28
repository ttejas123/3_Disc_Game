import React from 'react'
import { useDrag } from 'react-dnd/dist/hooks'

function DragableItem({children, id, type}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: { id:id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
  return (
    <div ref={drag} style={{"border":  isDragging ? "2px solid pink" : ""}} className="w-full  flex items-center justify-center p-2 rounded-lg mb-2" >
        {children}
    </div>
  )
}

export default DragableItem