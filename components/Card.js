import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import H1DND from './H1DND'
import ImageDND from './ImageDND'
import PDND from './PDND'

function Card({dropArea = false, idx=""}) {
  const [imgdrop, setImgDrop] = useState();
  const [headerdrop, setHeaderDrop] = useState();
  const [paradrop, setParaDrop] = useState();
  const [{ isOver }, drop] = useDrop(() => ({
      accept: "cardcomponents",
      drop: (item) => add(item.id),
      collect: (monitor) => ({
          isOver: !!monitor.isOver(),
      }),
  }));

  const add = (id) => {
      if(id == 1) {
        setHeaderDrop(1);
        return;
      }
      
      if(id == 2){
        setParaDrop(2);
        return;
      }

      if(id == 3){
        setImgDrop(3);
        return;
      }
  };
  return (
    <>{
      dropArea ? (
        <div className="w-full bg-white p-2 rounded-lg shadow-xl mt-5" ref={drop}>
            <div className='Image-Component-DND w-full h-48 bg-green-300 rounded-lg relative'>
                {imgdrop ? (<ImageDND dropArea={true} idx={idx} />) : (<></>)}
            </div>
            <div className='Header-Component-DND text-xl w-full my-1 px-3 pt-3 font-semibold'>
                {headerdrop ? (<H1DND dropArea={true} />) : (<></>)}
            </div>
            <div className='paragraph-Componet-DND text-sm font-thin px-3 pb-3 pt-1'>
                {paradrop ? (<PDND dropArea={true} />) : (<></>)}
            </div>
        </div>
      ) : (
        <div className=' p-5 rounded-lg shadow-md text-center bg-white'>
          {"<"}Card{" />"}
        </div>
      )
    }</>
  )
}

export default Card


// Lorazepam is a benzodiazepine with anxiolytic, anti-anxiety, anticonvulsant, anti-emetic and sedative properties. Lorazepam enhances the effect of the inhibitory neurotransmitter gamma-aminobutyric acid on the GABA receptors by binding to a site that is distinct from the GABA binding site in the central nervous system. This leads to an increase in chloride channel opening events, a facilitation of chloride ion conductance, membrane hyperpolarization, and eventually inhibition of the transmission of nerve signals, thereby decreasing nervous excitation.