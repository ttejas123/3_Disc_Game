import React, { useRef, useState } from 'react'
import DragableItem from './DragableItem'
import { useDrop } from 'react-dnd/dist/hooks'

export function H1Component () {
    const h1dataRef = useRef();
    const [state, setState] = useState(false);
    
    return <div className='p-1 bg-green-200 flex flex-col justify-center items-center w-full'>
        {
            state ? (<>
                <h1 onClick={()=> setState((pre)=> {return !pre})}>{h1dataRef.current && h1dataRef.current.value}</h1>
            </>
            ) : (
            <>
                <div>H1 Component</div>
                <input ref={h1dataRef} />
                <div onClick={()=> setState((pre)=> {return !pre})}>Save</div>
            </>)
        }

    </div>
}

export function PComponent () {
    const pdataRef = useRef();
    const [state, setState] = useState(false);
    return <div className='p-1 bg-green-200 flex flex-col justify-center items-center w-full'>
        {
            state ? (<>
                <p className='w-full' onClick={()=> setState((pre)=> {return !pre})}>{pdataRef.current && pdataRef.current.value}</p>
            </>
            ) : (
            <>
                <div>p Component</div>
                <input ref={pdataRef}  />
                <div onClick={()=> setState((pre)=> {return !pre})}>Save</div>
            </>)
        }
    </div>
}

const PicturList = [
    {
        id: 1,
        url: <H1Component />
    },
    {
        id: 2,
        url: <PComponent />,
    }
]

function Dnd() {
    const [board, setBoard] = useState([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    
    const addImageToBoard = (id) => {
        const pictureList = PicturList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };

    const removeFromBoard = (idx) => {
        setBoard((board)=> {
            console.log(board)
            board.splice(idx, 1)
            console.log(board)
            return [...board]
        })
    }
  return (
    <div className='flex '>
        <div className='w-[20%] h-screen bg-pink-400 Items flex items-center justify-center flex-col '>
            {
                PicturList.map((val, index) => {
                    return (
                        <DragableItem id={val.id} key={index} > 
                            {val.url} 
                        </DragableItem>
                    )
                })
            }
        </div>
        <div className='Drop flex flex-col w-[80%] h-screen bg-yellow-400' ref={drop}>
            {
                board.map((val, index) => {
                    return (
                        
                            <DragableItem id={val.id} key={index} > 
                                {val.url} 
                            </DragableItem>
                        
                    )
                })
            }
        </div>
    </div>
  )
}

export default Dnd