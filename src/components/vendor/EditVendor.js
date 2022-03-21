import { useEffect, useRef, useState } from "react"
import { getVendorTypes, getWeddingSizes } from "../auth/AuthManager"
import { updateCurrentVendor } from "../../managers/VendorManager"

export const EditVendor = ({ openEditModal, setOpenEditModal, vendor, setVendor }) => {
    const vendorTypeId = useRef()
    const businessName = useRef()
    const yearsInBusiness = useRef()
    const description = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const [vendorTypes, setVendorTypes] = useState([])
    const [weddingSizes, setWeddingSizes] = useState([])
    const [chosenWeddingSizes, setChosenWeddingSizes] = useState(new Set())

    useEffect(() => {
        getVendorTypes().then(setVendorTypes)
            .then(() => getWeddingSizes()).then(setWeddingSizes)
    }, [])

    useEffect(() => {
        vendorTypeId.current.value = vendor.vendor_type?.id
        businessName.current.value = vendor.business_name
        yearsInBusiness.current.value = vendor.years_in_business
        description.current.value = vendor.description
        city.current.value = vendor.city
        state.current.value = vendor.state
        zipCode.current.value = vendor.zip_code
        setChosenWeddingSizes(new Set(vendor.allowed_sizes?.map(size => size.wedding_size)))
    }, [vendor])



    const editVendor = (e) => {
        e.preventDefault()


        const newVendor = {
            vendor_type: vendorTypeId.current.value,
            business_name: businessName.current.value,
            years_in_business: yearsInBusiness.current.value,
            description: description.current.value,
            city: city.current.value,
            state: state.current.value,
            zip_code: zipCode.current.value,
            allowed_sizes: Array.from(chosenWeddingSizes)
        }

        updateCurrentVendor(newVendor)
            .then(setVendor)
            .then(() => setOpenEditModal(false))


    }

    return (
        <>
            <div id="edit-modal" className={openEditModal ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-content has-background-white">
                    <form className="m-6" onSubmit={editVendor} >
                        <h2>Edit your Business Info</h2>
                        <fieldset className="field my-5">
                            <label className="label">Vendor Type</label>
                            <div className="control">
                                <div className="select">
                                    <select ref={vendorTypeId}>
                                        <option> What do you specialize in? </option>
                                        {
                                            vendorTypes.map(vendorType => {
                                                return <option key={vendorType.id} value={vendorType.id}>{vendorType.label}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="field my-5">
                            <label className="label"> Sizes of weddings you are able to service </label>
                            {
                                weddingSizes.map(
                                    (weddingSize) => {
                                        return <div className="control my-2" key={weddingSize.id}>
                                            <label className="checkbox has-text-weight-medium">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    name="weddingSize"
                                                    value={weddingSize.id}
                                                    checked={chosenWeddingSizes.has(weddingSize.id) ? true : false}
                                                    onChange={
                                                        (evt) => {
                                                            const copy = new Set(chosenWeddingSizes)
                                                            copy.has(parseInt(evt.target.value))
                                                                ? copy.delete(parseInt(evt.target.value))
                                                                : copy.add(parseInt(evt.target.value))
                                                            setChosenWeddingSizes(copy)
                                                        }} />
                                                {
                                                    weddingSize.max_guests === null
                                                        ? `${weddingSize.min_guests} + (${weddingSize.label} wedding)`
                                                        : `${weddingSize.min_guests} - ${weddingSize.max_guests} (${weddingSize.label} wedding)`
                                                }
                                            </label>
                                        </div>
                                    }
                                )
                            }
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="yearsInBusiness"> Years in Business</label>
                            <div className="control">
                                <input className="input" ref={yearsInBusiness} type="number" name="yearsInBusiness" required />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="businessName">Business Name</label>
                            <div className="control">
                                <input className="input" ref={businessName} type="text" name="businessName" required />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="description"> Business Description </label>
                            <div className="control">
                                <textarea className="textarea" ref={description} name="description" placeholder="Describe your business" required ></textarea>
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="city"> City </label>
                            <div className="control">
                                <input className="input" ref={city} type="text" name="city" placeholder="Business city" required />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="state"> State </label>
                            <div className="control">
                                <input className="input" ref={state} type="text" name="state" placeholder="Business state" required />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <label className="label" htmlFor="zipCode"> Zip Code </label>
                            <div className="control">
                                <input className="input" ref={zipCode} type="text" name="zipCode" placeholder="Business zip code" required />
                            </div>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <button className="button is-link" type="submit">Submit</button>
                        </fieldset>
                        <fieldset className="field mb-5">
                            <button className="button is-link" onClick={() => setOpenEditModal(false)}>Cancel</button>
                        </fieldset>
                    </form>

                </div>
            </div>
        </>
    )
}