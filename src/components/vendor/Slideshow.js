import { useEffect, useState } from "react"
import { getExampleImages, deleteExampleImage, createExampleImage } from "../../managers/ExampleImageManager"
import './Slideshow.css'

export const Slideshow = ({ isVendor, vendorId }) => {
    const [images, setImages] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [string, setString] = useState("")
    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {
        if (vendorId) {
            getExampleImages(vendorId)
                .then(setImages)
                .then(() => setSlideIndex(1))
        }
    }, [vendorId])

    useEffect(() => {
        const showSlides = n => {
            //grab html elements
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            //if the slide index is greater than the length of slides 
            //(happens when clicking right arrow on last slide)
            //then set slide index back to 1
            //and vice versa for going to the left past the 1st slide
            if (n > slides.length) { setSlideIndex(1) }
            if (n < 1) { setSlideIndex(slides.length) }

            //if the slide index is within the range of the slides we have
            if (n <= slides.length && n >= 1) {
                //and at least one slide exists
                if (slides[0]) {
                    //set the display of all slides to none 
                    //(allowing us to hide the previously shown slide)
                    for (let i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";
                    }
                    //and display the current slide
                    slides[slideIndex - 1].style.display = "block";
                }
                if (dots[0]) {
                    for (let x = 0; x < dots.length; x++) {
                        dots[x].className = dots[x].className.replace(" active", "");
                    }
                    dots[slideIndex - 1].className += " active";
                }
            }
        }
        showSlides(slideIndex)
    }, [slideIndex, images])

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
        <>{
            images.length > 0
                ? <div className="slideshow-box box">
                    <div className="slideshow-container is-flex is-justify-content-center">
                        {
                            images.map((image, i) => {
                                return <div key={image.id} className="mySlides fade">
                                    <div className="number-text">{i + 1} / {images.length}</div>
                                    <div className="img-wrap">
                                        <img src={`http://localhost:8000${image.file}`} />
                                        {
                                            isVendor
                                                ? <span className="close delete"
                                                    onClick={() => {
                                                        deleteExampleImage(image.id)
                                                            .then(() => getExampleImages(vendorId))
                                                            .then(setImages)
                                                    }}>
                                                </span>
                                                : ""
                                        }
                                    </div>
                                </div>
                            })
                        }

                        <div className="prev" onClick={() => setSlideIndex(slideIndex - 1)}>&#10094;</div>
                        <div className="next" onClick={() => setSlideIndex(slideIndex + 1)}>&#10095;</div>
                    </div>
                    <br />

                    <div className="has-text-centered">
                        {
                            images.map((image, i) => {
                                return <span key={i} className="dot" onClick={() => setSlideIndex(i + 1)}></span>
                            })
                        }

                    </div>
                    {
                        isVendor
                            ? <div className="is-flex is-justify-content-center mt-2">
                                {
                                    openEdit
                                        ? <div className="is-flex is-justify-content-center mb-5">
                                            <fieldset className="field my-0 mx-2">
                                                <label className="label m-0 has-text-centered" htmlFor="profilePhoto">New Example Image</label>
                                                <input className="input m-0" type="file" onChange={createImageString} />
                                                <input className="file-input m-0" type="hidden" name="profilePhoto" value={string} />
                                            </fieldset>
                                            <button className="button is-normal is-align-self-flex-end" onClick={() => {
                                                createExampleImage(string)
                                                    .then(() => getExampleImages(vendorId))
                                                    .then((res) => {
                                                        setImages(res)
                                                        setSlideIndex(res.length)
                                                    })
                                                    .then(() => setOpenEdit(false))
                                            }}>Submit</button>
                                        </div>
                                        : <button className="button mt-2" onClick={() => setOpenEdit(true)}> Add Image </button>
                                }

                            </div>
                            : ""
                    }
                </div>
                : <>
                    {
                        isVendor
                            ? <div className="is-flex is-justify-content-center mt-2">
                                {
                                    openEdit
                                        ? <div className="is-flex is-justify-content-center mb-5">
                                            <fieldset className="field my-0 mx-2">
                                                <label className="label m-0 has-text-centered" htmlFor="profilePhoto">New Example Image</label>
                                                <input className="input m-0" type="file" onChange={createImageString} />
                                                <input className="file-input m-0" type="hidden" name="profilePhoto" value={string} />
                                            </fieldset>
                                            <button className="button is-normal is-align-self-flex-end" onClick={() => {
                                                createExampleImage(string)
                                                    .then(() => getExampleImages(vendorId))
                                                    .then((res) => {
                                                        setImages(res)
                                                        setSlideIndex(res.length)
                                                    })
                                                    .then(() => setOpenEdit(false))
                                            }}>Submit</button>
                                        </div>
                                        : <button className="button mt-2" onClick={() => setOpenEdit(true)}> Add Image </button>
                                }

                            </div>
                            : ""
                    }
                </>
        }
        </>

    )
}
