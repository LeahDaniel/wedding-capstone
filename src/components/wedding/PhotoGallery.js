import { useEffect, useState } from "react"
import { getVisionPhotos, deleteVisionPhoto, createVisionPhoto } from "../../managers/VisionPhotoManager"

export const PhotoGallery = ({ isVendor, hostId }) => {
    const [photos, setPhotos] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [string, setString] = useState("")

    useEffect(() => {
        if (hostId) {
            getVisionPhotos(hostId)
                .then(setPhotos)
        }
    }, [hostId])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setString(base64ImageString)
        });
    }

    return (
        <>
            <div>
                <div id="gallery">
                    {
                        photos.map(photo => {
                            return <div className="img-wrap" key={photo.id}>
                                {
                                    isVendor === false
                                        ? <span className="close delete"
                                            onClick={() => {
                                                deleteVisionPhoto(photo.id)
                                                    .then(() => getVisionPhotos(hostId))
                                                    .then(setPhotos)
                                            }}
                                        ></span>
                                        : ""
                                }
                                <img src={`http://localhost:8000${photo.file}`} alt="inspiration" />
                            </div>
                        })
                    }
                </div>
                {
                    isVendor === false
                        ? <div className="is-flex is-justify-content-center mb-5">
                            {
                                openEdit
                                    ? <div className="is-flex is-justify-content-center mb-5">
                                        <fieldset className="field my-0 mx-2">
                                            <label className="label m-0 has-text-centered" htmlFor="profilePhoto">New Inspiration Image</label>
                                            <input className="input m-0" type="file" onChange={createImageString} />
                                            <input className="file-input m-0" type="hidden" name="profilePhoto" value={string} />
                                        </fieldset>
                                        <button className="button is-normal is-align-self-flex-end" onClick={() => {
                                            createVisionPhoto(string)
                                                .then(() => getVisionPhotos(hostId))
                                                .then(setPhotos)
                                                .then(() => setOpenEdit(false))
                                        }}>Submit</button>
                                    </div>
                                    : <button className="button mb-5" onClick={() => setOpenEdit(true)}> Add Image </button>
                            }

                        </div>
                        : ""
                }

            </div>

        </>

    )
}
