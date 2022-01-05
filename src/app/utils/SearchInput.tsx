import React, {FC, useState} from 'react'

interface Props {
  placeholder: string
  state: string
  event: (msg: string) => void
  setState: (msg: string) => void
  apiFunc: (msg: string) => Promise<string[]>
}

const SearchInput: FC<Props> = ({placeholder, state, event, setState, apiFunc}) => {
  const [focus, setFocus] = useState(false)
  const [predicts, setPredicts] = useState([] as string[])

  const onChange = async (msg: string) => {
    setState(msg)
    const result = await apiFunc(msg)
    setPredicts([...result])
  }

  return (
    <div className='w-100' onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
      <input
        type='text'
        placeholder={placeholder}
        value={state}
        onFocus={() => setFocus(true)}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && event(state)}
        className='form-control w-100'
      />
      {focus ? (
        predicts.map((predict, i) => (
          <button
            className='w-100'
            onClick={() => {
              onChange(predict)
              setFocus(false)
              event(predict)
            }}
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
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default SearchInput
