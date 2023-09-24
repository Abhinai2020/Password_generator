import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length,setLength] = useState(8);
  const [number,setNumber]= useState(false);
  const [character,setCharacter]= useState(false);
  const [password,setPassword]= useState("");

  const passGenerator=useCallback(
    ()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(number)str += "0123456789"
      if(character)str += "~!@#$%^&*()"
      for(let i=1;i<=length;i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char);
      }
      setPassword(pass)
    },
    [length,number,character,setPassword]
  )
  useEffect(()=>{passGenerator()},[length,number,character,passGenerator])

  const passwordRef=useRef(null)

  const copy=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
    
    <div className="bg-teal-300 w-fit text-blue-800 text-center mx-auto  rounded-sm ">
    <h1 className="text-center py-1">Password Generator</h1>
    <div className="flex rounded-lg overflow-hidden mb-4">
      <input type="text" value={password} className="outline-none  w-full ml-3 rounded-full mb-3" placeholder=" Password" readOnly ref={passwordRef}/>
      <button type="button" className="bg-orange-500 rounded-full px-3 py-3 mb-3 mr-4" onClick={copy}>copy</button>
    </div>
    <div className="flex text-sm gap-x-2 ml-2 pb-2">
      <div className="flex item-center gap-x-2">
        <input type="range" min={5} max={100} value={length} className="curser-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
        <label className="mr-1">Length:{length}</label>
      </div>
      <div className="flex item-center gap-x-1">
        <input type="checkbox" defaultChecked={number}  onChange={()=>{setNumber((prev)=>!prev)}} />
        <label className="mr-1" >Number</label>
      </div>
      <div className="flex item-center gap-x-1">
        <input type="checkbox" defaultChecked={character}  onChange={()=>{setCharacter((prev)=>!prev)}} />
        <label className="mr-1" >Specialcharacter</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
