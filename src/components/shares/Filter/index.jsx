import styled from "styled-components";
import FilterItem from "./components/FilterItem";
import { useEffect, useState } from "react";

const Container = styled.div`
    width: max-content;
    display: flex;
    gap: 10px;
`;

const getFilterValues = (list) =>
    list.reduce((prev, curr) => ({ ...prev, [curr.key]: "" }), {});

const Filter = ({ filterList, initialValues, onChange }) => {
    const [filterValues, setFilterValues] = useState(
        initialValues || getFilterValues(filterList)
    );

    useEffect(() => {
        onChange(filterValues);
    }, [filterValues]);

    return (
        <Container>
            {filterList.map((filterItem) => (
                <FilterItem
                    key={filterItem.key}
                    value={
                        filterItem.options.find(
                            (item) =>
                                item.value === filterValues[filterItem.key]
                        )?.label
                    }
                    setFilterValues={setFilterValues}
                    filterItem={filterItem}
                    options={filterItem.options}
                />
            ))}
        </Container>
    );
};

export default Filter;
