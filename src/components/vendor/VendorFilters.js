

export const VendorFilters = ({ userFilters, setUserFilters}) => {

    const changeFilters = (evt) => {
        let copy = {...userFilters}
        copy[evt.target.name] = evt.target.value
        setUserFilters(copy)
    }

    return (
        <form className="level box">
            <fieldset className="field level-item">
                <div className="control">
                    <div className="select">
                        <select name="rating" onChange={changeFilters}>
                            <option value={0}> Filter by rating </option>
                            <option value={1}> 1 +</option>
                            <option value={2}> 2 +</option>
                            <option value={3}> 3 +</option>
                            <option value={4}> 4 +</option>
                        </select>
                    </div>
                </div>
            </fieldset>
            <fieldset className="field level-item">
                <label className="label mr-2" htmlFor="minPrice"> Min $/hr</label>
                <div className="control">
                    <input className="input" onChange={changeFilters} type="number" placeholder="Min $/hr" name="minPrice" required />
                </div>
            </fieldset>
            <fieldset className="field level-item">
                <label className="label mr-2" htmlFor="maxPrice"> Max $/hr</label>
                <div className="control">
                    <input className="input" onChange={changeFilters} type="number" placeholder="Max $/hr" name="maxPrice" required />
                </div>
            </fieldset>
        </form>

    )
}