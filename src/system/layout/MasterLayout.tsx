import React from 'react'
import {AsideDefault} from './components/aside/AsideDefault'
import {Footer} from './components/Footer'
import {HeaderWrapper} from './components/header/HeaderWrapper'
import {ScrollTop} from './components/ScrollTop'
import {Content} from './components/Content'
import {MasterInit} from './MasterInit'
import {LayoutTitle} from './LayoutTitle'
import {PageDataProvider, useLayout} from './core'
import clsx from 'clsx'

const MasterLayout: React.FC = ({children}) => {
  const {classes} = useLayout()
  return (
    <PageDataProvider>
      <div className='page d-flex flex-row flex-column-fluid'>
        <AsideDefault />
        <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
          <HeaderWrapper />

          <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
            <div className='toolbar' id='kt_toolbar'>
              {/* begin::Container */}
              <div
                id='kt_toolbar_container'
                className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
              >
                <LayoutTitle />

                {/* begin::Actions */}
                <div className='d-flex align-items-center py-1'>
                  {/* begin::Wrapper */}
                  <div className='me-4'>
                    {/* begin::Menu */}

                    {/* end::Menu */}
                  </div>
                  {/* end::Wrapper */}

                  {/* begin::Button */}

                  {/* end::Button */}
                </div>
                {/* end::Actions */}
              </div>
              {/* end::Container */}
            </div>
            <div className='post d-flex flex-column-fluid' id='kt_post'>
              <Content>{children}</Content>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <MasterInit />
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MasterLayout}
