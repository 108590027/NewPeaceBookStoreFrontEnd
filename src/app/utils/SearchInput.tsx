import React, {FC, useState} from 'react'

interface Props {
  state: string
  setState: (msg: string) => void
  apiFunc: (msg: string) => Promise<string[]>
}

const SearchInput: FC<Props> = ({state, setState, apiFunc}) => {
  const [predicts, setPredicts] = useState([] as string[])

  const onChange = async (msg: string) => {
    setState(msg)
    const result = await apiFunc(msg)
    setPredicts([...result])
  }

  return (
    <>
      <input
        type='text'
        value={state}
        onChange={(e) => onChange(e.target.value)}
        className='form-control w-100'
      />
      {predicts.map((predict, i) => (
        <button
          className='w-100'
          onClick={() => onChange(predict)}
          style={
            i === predicts.length - 1
              ? {
                  position: 'relative',
                  top: '-5px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  backgroundColor: '#f1f1f1',
                  textAlign: 'left',
                  paddingLeft: '20px',
                  color: '#444444',
                }
              : {
                  position: 'relative',
                  top: '-5px',
                  backgroundColor: '#f1f1f1',
                  textAlign: 'left',
                  paddingLeft: '20px',
                  color: '#444444',
                }
          }
        >
          {predict}
        </button>
      ))}
    </>
  )
}

export default SearchInput
