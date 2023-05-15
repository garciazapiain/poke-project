import { useAtom } from "jotai";
import { filter, typesList } from "../store"

function Filter(props) {
    const [filterList] = useAtom(typesList);
    const [selectedType, setSelectedType] = useAtom(filter);

    function handleSelect(event){
        setSelectedType(event.target.value)
    }

    return (
        <div className="filterContainer">
            <h2>Filter by type</h2>
            <select selected={selectedType} onChange={handleSelect} >
                {filterList.map((type) => (
                    <option disabled={type.disabled} key={type.value} value={type.value}>
                        {type.text}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Filter;