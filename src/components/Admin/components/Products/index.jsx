import styled from "styled-components";
import Filter from "@/components/shares/Filter";
import Table from "@/components/shares/Table";
import { useState } from "react";
import burgerImg from "@/assets/images/burger.jpg";
import scrollbar from "@/styles/scrollbar";
import button from "@/styles/button";
import AddProduct from "./components/AddProduct";
import Modal from "@/components/shares/Modal";
import CroppedImage from "@/components/shares/CroppedImage";

const FilterContainer = styled.div`
    width: 100%;
    padding: 15px 0;
    position: sticky;
    top: 92px;
    background: #f5f5f5;
    z-index: 99;
    display: flex;
    justify-content: space-between;
`;

const Image = styled.img`
    width: 100px;
`;

const TableWrapper = styled.div`
    ${scrollbar()};
    flex-grow: 1;
    overflow-y: auto;
`;

const filterList = [
    {
        key: "category",
        name: "Category",
        options: [
            { label: "All", value: "" },
            { label: "Bakery", value: "bakery" },
            { label: "Burger", value: "burger" },
            { label: "Beverage", value: "beverage" },
        ],
    },
];

const tableHeads = [
    { label: "Image", width: "20%" },
    {
        label: "Name",
        width: "20%",
    },
    { label: "Price", width: "20%" },
    { label: "Category", width: "20%" },
];

const dataList = [
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
    {
        imgSrc: burgerImg,
        name: "beef burger",
        price: 12.99,
        category: "burger",
    },
];

const getFormattedDataList = (list) =>
    list.map((item) => [
        {
            content: <Image src={item.imgSrc} alt="food" />,
            width: "20%",
        },
        {
            content: item.name,
            width: "20%",
        },
        {
            content: item.price,
            width: "20%",
        },
        {
            content: item.category,
            width: "20%",
        },
    ]);

const Products = () => {
    const [filterValues, setFilterValues] = useState({
        category: "",
        ingredient: "",
    });

    return (
        <>
            <FilterContainer>
                <Filter
                    filterList={filterList}
                    initialValues={filterValues}
                    onChange={(values) => setFilterValues(values)}
                />
                <AddProduct />
            </FilterContainer>
            <TableWrapper>
                <Table
                    heads={tableHeads}
                    dataList={getFormattedDataList(dataList)}
                />
            </TableWrapper>
        </>
    );
};

export default Products;
