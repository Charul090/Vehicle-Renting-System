import React, { useState,useEffect } from 'react'
import {useDispatch} from "react-redux"
import { Row, Pagination, Col } from 'react-bootstrap'
import {Change_Current_Page} from "../../Redux/prevrides/action.js"
import { PrevRides_Info_Query } from "../../Redux/prevrides/action.js"

export default function Pages({ page, total_pages ,perpage,user_id}) {

    let dispatch = useDispatch()

    let elements = []

    useEffect(() => {
        dispatch(PrevRides_Info_Query(user_id,page,perpage))
    }, [page,perpage])

    const handleClick = (e) => {
        let val = e.target.textContent

        if (val == "Next") {
            dispatch(Change_Current_Page(page+1))
        }
        else if (val === "Prev") {
            dispatch(Change_Current_Page(page-1))
        }
        else if (Number(val[0]) !== page) {
            dispatch(Change_Current_Page(Number(val)))
        }
    }

    for (let i = page-1; i < page+4; i++) {
        if (i === page-1) {
            elements.push(<Pagination.Item onClick={handleClick} disabled={page === 1}>Prev</Pagination.Item>)
            continue
        }

        if (i === page+3) {
            console.log("!")
            elements.push(<Pagination.Item onClick={handleClick} disabled={page === total_pages}>Next</Pagination.Item>)
            continue
        }

        if (i <= total_pages) {
            elements.push(<Pagination.Item onClick={handleClick} active={i === page}>{i}</Pagination.Item>)
        }

    }

    console.log(elements)

    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                {elements}
            </Pagination>
        </div>
    )
}
