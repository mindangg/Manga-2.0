import React from 'react'

import Card from '../components/Card'

import '../styles/Display.css'

export default function Display({ currentManga }) {
    return (
        <div className='container'>
            {currentManga && currentManga.map((manga) => (
                <Card key={manga._id} manga={manga}/>
            ))}
        </div>
        
    )
}
