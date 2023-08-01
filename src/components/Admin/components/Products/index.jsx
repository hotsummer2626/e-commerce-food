import styled from "styled-components";
import Filter from "@/components/shares/Filter";
import Table from "@/components/shares/Table";
import { useCallback, useEffect, useState } from "react";
import defaultProductImg from "@/assets/images/default-product.jpg";
import scrollbar from "@/styles/scrollbar";
import EditIcon from "./components/EditIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/slices/product";
import EditingForm from "./components/EditingForm";
import DeletePopup from "./components/DeletePopup";
import button from "@/styles/button";

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

const AddProduct = styled.div`
    ${button()};
    padding: 0px 20px;
    gap: 0;
`;

const Image = styled.img`
    width: 100px;
    vertical-align: top;
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
            { label: "Chicken", value: "chicken" },
            { label: "Pizza", value: "pizza" },
            { label: "Seafood", value: "seafood" },
        ],
    },
];

const tableHeads = [
    { label: "Image", width: "40%" },
    {
        label: "Name",
        width: "20%",
    },
    { label: "Price", width: "20%" },
    { label: "Category", width: "20%" },
];

const Products = () => {
    const [filterValues, setFilterValues] = useState({
        category: "",
        ingredient: "",
    });
    const [isModalShow, setIsModalShow] = useState(false);
    const [isDeletePopupShow, setIsDeletePopupShow] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { products } = useSelector(({ product }) => product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const getFormattedDataList = useCallback(
        (list) =>
            list.map((item) => [
                {
                    content: (
                        <Image
                            src={item?.imgSrc?.url || defaultProductImg}
                            alt="food"
                        />
                    ),
                    width: "40%",
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
                    width: "15%",
                },
                {
                    content: (
                        <EditIcon
                            onEdit={() => {
                                setEditingProduct(item);
                                setIsModalShow(true);
                            }}
                            onDelete={() => {
                                setEditingProduct(item);
                                setIsDeletePopupShow(true);
                            }}
                        />
                    ),
                    width: "5%",
                },
            ]),
        []
    );

    return (
        <>
            <FilterContainer>
                <Filter
                    filterList={filterList}
                    initialValues={filterValues}
                    onChange={(values) => setFilterValues(values)}
                />
                <AddProduct
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalShow(true);
                    }}
                >
                    Add Product
                </AddProduct>
            </FilterContainer>
            <TableWrapper>
                {products && (
                    <Table
                        heads={tableHeads}
                        dataList={getFormattedDataList(products)}
                    />
                )}
            </TableWrapper>
            {isModalShow && (
                <EditingForm
                    editingProduct={editingProduct}
                    onClose={() => setIsModalShow(false)}
                />
            )}
            {isDeletePopupShow && (
                <DeletePopup
                    editingProduct={editingProduct}
                    onClose={() => setIsDeletePopupShow(false)}
                />
            )}
        </>
    );
};

export default Products;
