import { toast } from "@/components/error/Toast";
import { Crop, ReactCrop, centerCrop, convertToPixelCrop, makeAspectCrop } from "@/components/ui/ReactCrop";
import { ASPECT_RATIO, IMAGE_DIMENTION_ERROR, INVALID_IMAGE_ERROR, MIN_DIMENTION, getCroppedImg } from "@/constants";
import { Button, ButtonGroup, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { SyntheticEvent, useRef, useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSavingImage: (blob: Blob | null, fileName: string) => void;
}

const ImageSelector = ({ isOpen, onClose, onSavingImage }: Props) => {
    const [imageData, setImageData] = useState({
        imageSrc: "",
        imageType: "",
        fileName: ""
    });
    const [crop, setCrop] = useState<Crop>();
    const imgRef = useRef<HTMLImageElement>(null);

    const onSelectFile = (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        const image = target.files ? target.files[0] : null;
        if (!image) return;
        if (image.size === 0) {
            toast.error(INVALID_IMAGE_ERROR.message, { toastId: INVALID_IMAGE_ERROR.type });
            return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImageData({ fileName: image.name, imageSrc: imageUrl, imageType: image.type });
        });
        reader.readAsDataURL(image);
    }

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height, naturalHeight, naturalWidth } = e.currentTarget;
        if (naturalWidth < MIN_DIMENTION && naturalHeight < MIN_DIMENTION) {
            toast.error(IMAGE_DIMENTION_ERROR.message, { toastId: IMAGE_DIMENTION_ERROR.type });
            setImageData({ ...imageData, imageSrc: "" });
            return;
        }

        const cropWidthInPercent = (MIN_DIMENTION / width) * 100;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: cropWidthInPercent
                },
                ASPECT_RATIO,
                width,
                height
            ),
            width,
            height
        )
        setCrop(crop);
    }

    const handleImageSave = async () => {
        if (!crop || !imgRef.current) return;
        const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
        const blob = await getCroppedImg(imgRef.current, pixelCrop, imageData.imageType);
        onSavingImage(blob, imageData.fileName);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={2}>
                <ModalHeader>
                    <label className='w-fit' htmlFor='image'>
                        <input
                            className='w-full text-xs file:mr-3 file:rounded-md file:outline-none file:border file:border-gray-200
                                        text-gray-400'
                            id='image'
                            type='file'
                            accept='image/*'
                            placeholder='Choose'
                            onChange={(e) => onSelectFile(e)}
                            autoFocus={false}
                        />
                    </label>
                </ModalHeader>
                <ModalBody>
                    <Flex className='min-w-60 min-h-60 max-w-96 max-h-96 items-center justify-center p-5' border="1px" borderColor="gray.300">
                        {imageData.imageSrc ? (
                            <ReactCrop
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                crop={crop}
                                circularCrop
                                keepSelection
                                aspect={ASPECT_RATIO}
                                minWidth={MIN_DIMENTION}
                            >
                                <img
                                    ref={imgRef}
                                    src={imageData.imageSrc}
                                    alt="Upload"
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        ) : <Text fontSize="small" textColor="gray.500">No image selected</Text>}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup gap={1}>
                        <Button onClick={handleImageSave} size='sm' type='button' colorScheme='blue'>Save</Button>
                        <Button onClick={() => {
                            onClose();
                            setImageData({ ...imageData, imageSrc: "" })
                        }} size='sm' type='button'>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ImageSelector