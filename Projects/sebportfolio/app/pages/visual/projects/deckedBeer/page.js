"use client"

import styles from "./decked.module.css"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ViewCanvas from "./cans/page"

export default function DeckedBeer({}) {
    return (
        <div className="container">
            <ViewCanvas />
        </div>
    )
}