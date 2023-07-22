import styled from "styled-components";
import FilterItem from "./components/FilterItem";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0 10px;
    position: sticky;
    top: 92px;
    background: #f5f5f5;
    z-index: 99;
`;

const filterList = [
    {
        filterName: "Category",
        options: [
            { label: "Bakery" },
            { label: "Burger" },
            { label: "Beverage" },
        ],
    },
    {
        filterName: "Ingredient",
        options: [{ label: "Beef" }, { label: "Chicken" }],
    },
];

const Filters = () => {
    return (
        <Container>
            <h3>Filters:</h3>
            {filterList.map((filterItem) => (
                <FilterItem
                    key={filterItem.filterName}
                    filterName={filterItem.filterName}
                    options={filterItem.options}
                />
            ))}
        </Container>
    );
};

export default Filters;
