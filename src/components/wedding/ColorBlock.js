import React, { useEffect, useState } from "react"
import { createPalette, editPalette, getCurrentPalette, getPalette } from "../../managers/PaletteManager"

export const ColorBlocks = ({ isVendor, hostId }) => {
    const [openEdit, setOpenEdit] = useState(false)
    const [palette, setPalette] = useState({
        color1: "#FFFFFF",
        color2: "#FFFFFF",
        color3: "#FFFFFF"
    })
    const [hasPalette, setHasPalette] = useState(false)

    useEffect(() => {
        if (isVendor) {
            getPalette(hostId).then(setPalette)
        } else if (isVendor === false) {
            getCurrentPalette()
            .then((res) => {
                if(res.color1){
                    setPalette(res)
                    setHasPalette(true)
                }
            })
        }

    }, [isVendor, hostId])

    return (
        <div className="box" style={{ height: 300}}>
            <div className="subtitle has-text-centered">Color Theme</div>
            <div className="is-flex columns is-justify-content-center">
                <div className="is-flex is-flex-direction-column is-justify-content-center column is-3 ">
                    <div className="box m-0 r" style={{ backgroundColor: palette.color1, height: 150 }}></div>
                    {
                        openEdit && !isVendor
                            ? <fieldset className="fieldset is-flex is-flex-direction-column is-justify-content-center">
                                <label className="label is-align-self-center">Color 1:</label>
                                <input
                                    className="is-align-self-center"
                                    value={palette.color1}
                                    onChange={(evt) => {
                                        let copy = { ...palette }
                                        copy.color1 = evt.target.value
                                        setPalette(copy)
                                    }}
                                    type="color"
                                    name="hexCode"
                                    required />
                            </fieldset>
                            : ""
                    }

                </div>
                <div className="is-flex is-flex-direction-column is-justify-content-center column is-3 ">
                    <div className="box m-0 r" style={{ backgroundColor: palette.color2, height: 150 }}></div>
                    {
                        openEdit && !isVendor
                            ? <fieldset className="fieldset is-flex is-flex-direction-column is-justify-content-center">
                                <label className="label is-align-self-center">Color 2:</label>
                                <input
                                    className="is-align-self-center"
                                    value={palette.color2}
                                    onChange={(evt) => {
                                        let copy = { ...palette }
                                        copy.color2 = evt.target.value
                                        setPalette(copy)
                                    }}
                                    type="color"
                                    name="hexCode"
                                    required />
                            </fieldset>
                            : ""
                    }
                </div>
                <div className="is-flex is-flex-direction-column is-justify-content-center column is-3 ">
                    <div className="box m-0 r" style={{ backgroundColor: palette.color3, height: 150 }}></div>
                    {
                        openEdit && !isVendor
                            ? <fieldset className="fieldset is-flex is-flex-direction-column is-justify-content-center">
                                <label className="label is-align-self-center">Color 1:</label>
                                <input
                                    className="is-align-self-center"
                                    value={palette.color3}
                                    onChange={(evt) => {
                                        let copy = { ...palette }
                                        copy.color3 = evt.target.value
                                        setPalette(copy)
                                    }}
                                    type="color"
                                    name="hexCode"
                                    required />
                            </fieldset>
                            : ""
                    }
                </div>
            </div>
            {
                !isVendor
                    ? <>{
                        openEdit
                            ? <div className="is-flex is-justify-content-center">
                                <button className="button" onClick={() => {
                                    if(hasPalette){
                                        editPalette(palette.id, palette)
                                        .then(() => getCurrentPalette())
                                        .then(setPalette)
                                        .then(() => setOpenEdit(false))
                                    } else{
                                        createPalette(palette)
                                        .then(setPalette)
                                        .then(() => setHasPalette(true))
                                        .then(() => setOpenEdit(false))
                                    }
                                }}>Submit</button>
                            </div>
                            : <div className="is-flex is-justify-content-center">
                                <button onClick={() => setOpenEdit(true)} className="button">Edit</button>
                            </div>
                    }</>
                    : ""
            }


        </div>
    )
}