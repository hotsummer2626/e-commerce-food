import styled, { css } from "styled-components";
import { colors } from "@/styles/variables";

const { primaryColor, greyColor } = colors;

const Row = styled.div`
    width: 100%;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${greyColor};
    ${({ isHead }) =>
        isHead
            ? css`
                  background: ${primaryColor};
                  color: #fff;
                  font-weight: bold;
                  border-radius: 10px;
                  position: sticky;
                  top: 0;
              `
            : css`
                  background: transparent;
              `}
`;

const Head = styled.div`
    width: ${({ width }) => width};
`;

const Data = styled.div`
    width: ${({ width }) => width};
`;

const Table = ({ heads, dataList }) => {
    return (
        <>
            <Row isHead>
                {heads.map((item) => (
                    <Head key={item.label} width={item.width}>
                        {item.label}
                    </Head>
                ))}
            </Row>
            {dataList.map((item, index) => (
                <Row key={index}>
                    {item.map((data, index) => (
                        <Data key={index} width={data.width}>
                            {data.content}
                        </Data>
                    ))}
                </Row>
            ))}
        </>
    );
};

export default Table;
