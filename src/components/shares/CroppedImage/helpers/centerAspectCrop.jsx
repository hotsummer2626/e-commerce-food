import { centerCrop, makeAspectCrop } from "react-image-crop";

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
};

export default centerAspectCrop;
