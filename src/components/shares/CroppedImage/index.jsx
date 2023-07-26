import React, { useState, useEffect, useRef } from "react";
import ReactCrop from "react-image-crop";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import getCroppedImgBlob from "./helpers/getCroppedImgSrc";
import centerAspectCrop from "./helpers/centerAspectCrop";
import { colors } from "@/styles/variables";
import button from "@/styles/button";
import Transition from "@/components/shares/Transition";
import LoadingSpinner from "../LoadingSpinner";

const { primaryColor } = colors;

const Container = styled.div`
    position: relative;
    width: max-content;
`;

const Image = styled.img`
    border-radius: 50%;
`;

const EditIcon = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 50%;
    font-size: 18px;
    color: ${primaryColor};
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
`;

const Popup = styled.div`
    position: fixed;
    top: 40vh;
    left: 50vw;
    z-index: 9999;
    max-width: 500px;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
`;

const CancelButton = styled.div`
    ${button("ghost")}
    width: 100%;
    padding: 6px;
`;

const ConfirmButton = styled.div`
    ${button()}
    width: 100%;
    padding: 6px;
`;

const CroppedImage = ({ initialImgSrc, width, aspect = 16 / 9, onConfirm }) => {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [displayImgSrc, setDisplayImgSrc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    const inputFileRef = useRef(null);

    useEffect(() => {
        setDisplayImgSrc(initialImgSrc);
    }, [initialImgSrc]);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    };

    const onConfirmHandler = () => {
        setIsLoading(true);
        if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            canvasRef.current
        ) {
            getCroppedImgBlob(
                imgRef.current,
                canvasRef.current,
                completedCrop,
                (blob) => {
                    setIsLoading(false);
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                        setDisplayImgSrc(reader.result?.toString() || "");
                    });
                    reader.readAsDataURL(blob);
                    const lastModified = Number(new Date());
                    const fileName = `logo-${lastModified}`;
                    const file = new File([blob], fileName, {
                        lastModified,
                        type: "image/png",
                    });
                    onConfirm(file);
                    setImgSrc("");
                }
            );
        }
    };

    return (
        <Container>
            <Image
                src={displayImgSrc}
                style={{
                    width,
                    aspectRatio: aspect,
                }}
                alt="avatar"
            />
            <EditIcon
                onClick={() => {
                    if (inputFileRef) {
                        inputFileRef.current.click();
                    }
                }}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </EditIcon>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputFileRef}
                onChange={onSelectFile}
            />
            <canvas
                ref={canvasRef}
                style={{
                    display: "none",
                }}
            />
            {!!imgSrc && (
                <Transition onClose={() => setImgSrc("")}>
                    <Popup>
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                        <ButtonGroup>
                            <CancelButton onClick={() => setImgSrc("")}>
                                Cancel
                            </CancelButton>
                            <ConfirmButton onClick={onConfirmHandler}>
                                {isLoading && <LoadingSpinner />}
                                Confirm
                            </ConfirmButton>
                        </ButtonGroup>
                    </Popup>
                </Transition>
            )}
        </Container>
    );
};

export default CroppedImage;
