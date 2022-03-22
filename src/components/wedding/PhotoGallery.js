import { useState } from "react"
import Gallery from "react-photo-gallery"
import {SingleImage} from "./SingleImage"

export const PhotoGallery = () => {
    const [photos, setPhotos] = useState([])

    return (
        <div>
            <Gallery photos={photos} renderImage={({ index, left, top, key, photo }) => (
                <SingleImage
                    key={key}
                    margin={"2px"}
                    index={index}
                    photo={photo}
                    left={left}
                    top={top}
                />
            )} />
        </div>
    )
}
