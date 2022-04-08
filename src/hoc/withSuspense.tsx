import { FC, Suspense } from 'react'
import Preloader from '../components/common/Preloader/Preloader'

const withSuspense = <WCP, >(WrappedComponent: FC<WCP>) => (props: WCP) => {
    return <Suspense fallback={<Preloader/>}><WrappedComponent {...props} /></Suspense>
}

export default withSuspense