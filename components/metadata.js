import { Result } from 'postcss';
import React, { useState } from 'react'
import {bodybg} from './globle'
import Gallery from './gallery';
import Successfull from './successfull';

function Metadata({metaplex}) {
    const [data, setData] = useState({});
    const [result, setResult] = useState("");
    const [attributesList, setAttributesList] = useState([{ trait_type: "", value: "" }]);

    // handle when the user changes an attribute field
    const handleAttributesChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...attributesList];
        list[index][name] = value;
        setAttributesList(list);
    };

      // handle when the user deletes an attribute field
        const handleRemoveClick = (index) => {
            const list = [...attributesList];
            list.splice(index, 1);
            setAttributesList(list);
        };

        //handle when the user adds an attribute field
        const handleAddClick = () => {
            setAttributesList([...attributesList, { trait_type: "", value: "" }]);
        };

    const uploadMetaData = async(data) => {
        const metaD = await metaplex
        .nfts()
        .uploadMetadata(data)
        .run();
        // console.log(metaD.uri)  //eslint-disable-line
        setResult(metaD.uri+"");
    }
    return (
        <div className={`relative bg-white shadow-lg rounded-3xl w-full flex justify-center py-4 my-10`}>
                {result.length > 0 && (
                    <div className='w-full absolute top-0 left-0  flex justify-center items-center h-full'>
                        <Successfull link={result} setResult={setResult} />
                    </div>
                )}

                <div className='w-[80%]'>
                    <div className='pb-4 text-center text-2xl font-semibold'>Create Metadata</div>
                    <div className='form-section flex-col flex '>
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: e.target.value
                        })} name='name' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='Enter Name' />
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: e.target.value
                        })} name='symbol' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='Sysmbol' />
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: parseFloat(e.target.value) * 100
                        })} name='seller_fee_basis_points' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='Royalty Fee %' />
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: e.target.value
                        })} name='description' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='Description' />
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: e.target.value
                        })} name='image' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='Image Uri' />
                        <input onChange={(e) => setData({
                            ...data,
                            [e.target.name]: e.target.value
                        })} name='external_url' className='p-2 m-1 text-center border rounded-lg w-full bg-[#f5f8ff]' placeholder='External Url' />
                        
                        <div className='my-10'>
                            <div className='text-xl font-semibold'>Attributes</div>
                        {attributesList.map((x, i) => {
                            return (
                                <div key={i} className="md:flex items-center mt-2">
                                <div className="flex flex-col mx-2 w-[45%]">
                                    <label className="font-bold text-gray-700">Trait type</label>
                                    <input
                                    className="my-1 text-left bg-white pl-1 p-1 text-center border-2 rounded-2xl border"
                                    name="trait_type"
                                    type="text"
                                    placeholder="The type of attribute"
                                    value={x.trait_type}
                                    onChange={e => handleAttributesChange(e, i)}
                                    />
                                </div>
                                <div className="flex flex-col mx-2 w-[45%]">
                                    <label className="font-bold text-gray-700">Value</label>
                                    <input
                                    className="my-1 text-left bg-white pl-1 p-1 text-center border-2 rounded-2xl border"
                                    name="value"
                                    type="text"
                                    placeholder="The value for that attribute"
                                    value={x.value}
                                    onChange={e => handleAttributesChange(e, i)}
                                    />
                                </div>
                                <button className="h-[35px] w-[35px] rounded-full font-bold bg-white border hover:bg-[#e4ebf7]" onClick={() => handleRemoveClick(i)}>x</button>
                                </div>
                            );
                            })}
                            <button className="mt-3 text-gray-700 font-semibold text-ml px-3 py-1 bg-gray-200 hover:bg-gray-500 rounded-full shadow-xl border" onClick={handleAddClick}>+ Add</button>
                        </div>

                    </div>
                    <div className='bg-gradient-to-r from-pink-300 to-violet-500 hover:bg-green-400 rounded-md p-2 my-2 text-center cursor-pointer shadow-md' onClick={()=> {
                        const attcheck = attributesList.filter((val, index) => {
                            if(val.trait_type.length > 0 && val.value.length > 0) {
                                return true;
                            }
                            return false;
                        });
                        
                        uploadMetaData({
                            ...data,
                            attributes: attcheck
                        });
                        // console.log(attributesList);  //eslint-disable-line
                    }}>Submit</div>
                </div>
        </div>
    )
}

export default Metadata

// https://arweave.net/_pwkP3t4H9lnSpIZa6v9SVwRManmi_gVL6KqqFlrjq0