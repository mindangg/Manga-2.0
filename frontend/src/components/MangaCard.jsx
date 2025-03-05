import React from 'react'

import testCover from '../assets/books/my dress up darling/my-dress-up-darling-volume-1-primary.jpg'

import '../styles/Admin.css'

export default function MangaCard() {
    return (
        <div className='manga-info'>
            <span>
                <img src={testCover}></img>
            </span>
            <span>My Dress Up Darling - Volume 01</span>
            <span>Rom Com</span>
            <span>Shinichi Fukuda</span>
            <span>150</span>
            <span>$ 18.60</span>
            <span className='manga-action'>
                <i className='fa-solid fa-pen-to-square'></i>
                <i className='fa-solid fa-trash-can'></i>
            </span>
        </div>
    )
}
