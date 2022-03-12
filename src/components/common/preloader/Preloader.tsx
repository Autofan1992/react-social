import preloader from '../../../images/preloader.svg'

const Preloader = () => {
    return (
        <div className="wrapper full-screen justify-content-center">
            <div className="preloader d-flex justify-content-center">
                <img src={preloader} alt=""/>
            </div>
        </div>
    )
}

export default Preloader

