import { Suspense } from 'react';
import Preloader from "../components/common/preloader/Preloader";

export default function withSuspense(Component) {
    return props => {
        <Suspense fallback={<Preloader/>}><Component {...props} /></Suspense>
    }
}