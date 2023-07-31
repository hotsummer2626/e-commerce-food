import styled from "styled-components";
import Filter from "@/components/shares/Filter";
import { useState } from "react";

const Container = styled.div`
    width: 100%;
    padding: 5px 0 10px;
    position: sticky;
    top: 92px;
    background: #f5f5f5;
    z-index: 99;
`;

const filterList = [
    {
        key: "category",
        name: "Category",
        options: [
            { label: "Bakery", value: "bakery" },
            { label: "Burger", value: "burger" },
            { label: "Beverage", value: "beverage" },
        ],
    },
];

const Filters = () => {
    const [filterValues, setFilterValues] = useState({
        category: "",
        ingredient: "",
    });

    return (
        <Container>
            <Filter
                filterList={filterList}
                initialValues={filterValues}
                onChange={(values) => setFilterValues(values)}
            />
        </Container>
    );
};

export default Filters;
