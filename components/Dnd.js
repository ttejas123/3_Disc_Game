import React, { useRef, useState } from 'react'
import DragableItem from './DragableItem'
import { useDrop } from 'react-dnd/dist/hooks'
import Card from './Card';
import H1DND from './H1DND';
import PDND from './PDND';
import ImageDND from './ImageDND';

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
        type:"cardcomponents",
        url: <H1DND />
    },
    {
        id: 2,
        type:"cardcomponents",
        url: <PDND />,
    },
    {
        id: 3,
        type:"cardcomponents",
        url: <ImageDND />,
    },
    {
        id: 4,
        type:"maincard",
        url: <Card />,
    }
]

function Dnd() {
    const [board, setBoard] = useState([]);
    const [divide, setdivide] = useState("");
    const [collaps, setCollaps] = useState(false);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "maincard",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    
    const addImageToBoard = (id) => {
        if(id == 4) {
            setBoard((board) => [...board, 1]);
            return;
        }
        return;
    };

  return (
    <div className='flex '>
        {collaps && (<div className='bg-blue-400 shadow-md p-2 rounded-full absolute left-2 top-3 z-10 cursor-pointer' onClick={()=> setCollaps(false)}>➡️</div>)}
        <div className={`w-[10%] h-screen bg-gray-400 Items flex items-center justify-center flex-col overflow-y-auto transition-width ease-in-out duration-1000 ${collaps && ("w-[0%]")} relative`}>
            <div className='bg-blue-400 shadow-md p-2 rounded-full absolute right-2 top-3 cursor-pointer' onClick={()=> setCollaps(true)}>⬅️</div>

            {
                PicturList.map((val, index) => {
                    return (
                        <DragableItem id={val.id} key={index} type={val.type} > 
                            {val.url} 
                        </DragableItem>
                    )
                })
            }
        </div>
        <div className={`Drop grid gap-5  ${divide}  ${collaps ? (`w-full`) : ("w-[90%]")} transition-width ease-in-out duration-1000 h-screen bg-gray-300 px-5 overflow-y-auto pb-5`} ref={drop}>
            <div className='flex p-2 absolute right-10 z-10 bottom-3 cursor-pointer'>
                <div onClick={()=> setdivide("grid-cols-2")} className='w-8 h-8   rounded-md bg-white shadow-2xl text-[14px] flex justify-center items-center'>📛</div>
                <div onClick={()=> setdivide("grid-cols-3")} className='w-8 h-8  ml-1 rounded-md bg-white shadow-2xl text-[14px] flex justify-center items-center'>🌸</div>
                <div onClick={()=> setdivide("grid-cols-4")} className='w-8 h-8  ml-1 rounded-md bg-white shadow-2xl text-[14px] flex justify-center items-center'>🍃</div>
             </div>

            {
                board.length == 0  && (<div className='w-full h-full flex justify-center items-center'> Want to See magic? <br></br >Add Card Tag Here. </div>)
            }

            {
                board.map((val, index) => {
                    return (
                        
                        <Card key={index} dropArea={true} idx={index} />   
                        
                    )
                })
            }

            
        </div>
    </div>
  )
}

export default Dnd