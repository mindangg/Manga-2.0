import React from 'react'

import '../styles/Admin.css'

export default function UserCard() {
    return (
        <div className='user-info'>
            <span>Tran Minh Dang</span>
            <span>mindang</span>
            <span>mindang@gmail.com</span>
            <span>0901234567</span>
            <span>123 An Duong Vuong Ward 05</span>
            <span>19/05/2005</span>
            <span className='user-status'>Available</span>
            <span className='user-action'>
                <i className='fa-solid fa-pen-to-square'></i>
                <i className='fa-solid fa-trash-can'></i>
            </span>
        </div>
    )
}
