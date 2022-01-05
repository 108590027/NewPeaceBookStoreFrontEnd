import React, {FC, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../../../setup'
import {PageTitle} from '../../../system/layout/core'
import SearchInput from '../../utils/SearchInput'
import getCategoriesAPI from '../category/API/GetCategoriesAPI'
import {CategoryState} from '../category/redux/CategoryRedux'
import searchTagsAPI from '../tag/API/SearchTagsAPI'

const NewArrivalPage: FC = () => {
  const categoryState: CategoryState = useSelector((state: RootState) => state.category)
  const onDrop = (acceptedFiles: any[]) => {
    const preImages: string[] = []
    let i = 0
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        i++
        const img = e.target?.result
        if (img) {
          preImages.push(img as string)
          console.log(images)
        }
        if (i >= acceptedFiles.length) {
          setImages([...preImages])
        }
      }
      reader.readAsDataURL(file)
    })
  }
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const [load, setLoad] = useState(false)
  const [onSubmit, setOnSubmit] = useState(false)
  const [images, setImages] = useState([] as string[])
  const [createName, setCreateName] = useState('')
  const [createDescription, setCreateDescription] = useState('')
  const [createPrice, setCreatePrice] = useState(0)
  const [createDepartment, setCreateDepartment] = useState(0)
  const [tags, setTags] = useState([''] as string[])
  const removeImage = (index: number) => {
    images.splice(index, 1)
    setImages([...images])
  }
  const setTag = (i: number, name: string) => {
    tags[i] = name
    setTags([...tags])
  }
  const addTag = () => {
    tags.push('')
    setTags([...tags])
  }
  const searchExistTag = async (name: string): Promise<string[]> => {
    if (name === '') {
      return []
    }
    const tags = await searchTagsAPI(name)
    const tagNames: string[] = []
    if ('message' in tags) {
      return tagNames
    } else {
      tags.forEach((tag) => {
        tagNames.push(tag.name)
      })
      return tagNames
    }
  }
  const createItem = () => {
    setOnSubmit(true)
    setTimeout(() => {
      setOnSubmit(false)
    }, 500)
  }

  if (!load) {
    setLoad(true)
    getCategoriesAPI()
  }
  return (
    <>
      <PageTitle breadcrumbs={[]}>{`商品上架`}</PageTitle>
      <div className='content d-flex flex-column flex-column-fluid'>
        <div className='post d-flex flex-column-fluid'>
          {/* begin::Container */}
          <div className='container-xxl'>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
              <div
                data-kt-swapper='true'
                data-kt-swapper-mode='prepend'
                data-kt-swapper-parent="{default: '#kt_content_container'}"
                className='page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0'
              ></div>
              <div className='card card-flush py-4'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2 className='required'>商品圖片</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <div className='fv-row mb-2'>
                    <div className='dropzone' {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className='dz-message needsclick d-flex'>
                        <i className='bi bi-file-earmark-arrow-up text-primary fs-3x'></i>
                        <div className='ms-4'>
                          <h3 className='fs-5 fw-bolder text-gray-900 my-3'>
                            將圖片拖移到此或點擊此處上傳照片
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex'>
                      {images.map((image, i) => (
                        <div>
                          <img src={image} style={{maxWidth: '175px'}} alt='' />
                          <button
                            style={{
                              position: 'relative',
                              right: '10px',
                              verticalAlign: 'top',
                              borderRadius: '50%',
                              border: '10px',
                              backgroundColor: '#cccccc',
                              color: '#000000',
                            }}
                            onClick={() => removeImage(i)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* end::Media */}
              {/* begin::Product */}
              <div className='card card-flush py-4'>
                <div className='card-header'>
                  <div className='card-title'>
                    <h2>商品設定</h2>
                  </div>
                </div>
                <div className='card-body pt-0'>
                  <div className='mb-10 fv-row'>
                    <label className='required form-label'>商品名稱</label>
                    <input
                      type='text'
                      className='form-control mb-2'
                      placeholder='商品名稱'
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                    />
                  </div>
                  <div className='mb-10 fv-row'>
                    <label className='required form-label'>商品價格</label>
                    <input
                      type='number'
                      className='form-control mb-2'
                      placeholder='價格'
                      value={createPrice}
                      onChange={(e) => setCreatePrice(parseInt(e.target.value))}
                    />
                  </div>
                  <div className='mb-10 fv-row'>
                    <label className='required form-label'>簡介</label>
                    <textarea
                      rows={10}
                      className='form-control mb-2'
                      placeholder='簡介'
                      value={createDescription}
                      style={{
                        resize: 'none',
                      }}
                      onChange={(e) => setCreateDescription(e.target.value)}
                    />
                  </div>
                  <div className='mb-10 fv-row'>
                    <label className='required form-label'>商品類(系)別</label>
                    <select
                      className='form-select mb-2'
                      data-control='select2'
                      data-allow-clear='true'
                      value={createDepartment}
                      onChange={(e) => setCreateDepartment(parseInt(e.target.value))}
                    >
                      {categoryState.categories.map((category) =>
                        category.is_department ? (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ) : (
                          <></>
                        )
                      )}
                    </select>
                  </div>
                  <div className='mb-10 fv-row'>
                    <label className='form-label d-block'>商品標籤</label>
                    <div className='row'>
                      {tags.map((tag, i) => (
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12' key={i}>
                          <SearchInput
                            state={tag}
                            setState={(msg: string) => setTag(i, msg)}
                            apiFunc={(msg: string) => searchExistTag(msg)}
                          />
                        </div>
                      ))}
                      <div className='col-xl-3 col-lg-4 col-md-6 col-12'>
                        <button className='w-100 btn btn-primary' onClick={() => addTag()}>
                          添加標籤
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-primary' disabled={onSubmit} onClick={createItem}>
                  {onSubmit ? (
                    <span className='indicator-label'>
                      請稍候
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  ) : (
                    <span className='indicator-label'>建立商品</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewArrivalPage
