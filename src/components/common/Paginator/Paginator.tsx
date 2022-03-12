import styles from './Paginator.module.scss'
import { FC, useState } from 'react'
import classes from 'classnames'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number, pageSize: number) => void
    portionSize?: number
}

const Paginator: FC<PropsType> = ({ onPageChanged, currentPage, pageSize, totalItemsCount, portionSize = 5 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = [] as Array<number>

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <nav aria-label="Page navigation" className="mt-5">
            <ul className={`pagination justify-content-center ${styles.usersPagination}`}>
                {portionNumber > 1 &&
                    <li className="page-item prev" onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}>
                        <span className="page-link" aria-hidden="true">&laquo;</span>
                    </li>}
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return (
                            <li
                                className={classes('page-item', { [styles.selectedPage]: currentPage === p })}
                                key={p}
                            >
                                <span className="page-link" onClick={() => {
                                    onPageChanged(p, pageSize)
                                }}>{p}</span>
                            </li>
                        )
                    })}
                {portionCount > portionNumber &&
                    <li className="page-item next" onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>
                        <span className="page-link" aria-hidden="true">&raquo;</span>
                    </li>}
            </ul>
        </nav>
    )
}

export default Paginator