import { toast } from "@/components/error/Toast";
import { Crop, ReactCrop, centerCrop, makeAspectCrop } from "@/components/ui/ReactCrop";
import { ASPECT_RATIO, IMAGE_DIMENTION_ERROR, IMAGE_SAVE_ERROR, INVALID_IMAGE_ERROR, MIN_DIMENTION } from "@/constants";
import { Button, ButtonGroup, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSavingImage: (crop: Crop) => void;
}

const ImageSelectorModal = ({ isOpen, onClose, onSavingImage }: Props) => {
    const [imageSrc, setImageSrc] = useState("");
    const [crop, setCrop] = useState<Crop>();

    const onSelectFile = (e: SyntheticEvent) => {
        const target = (e.target as HTMLInputElement);
        const image = target.files ? target.files[0] : null;
        if (!image) return;
        if (image.size === 0) {
            toast.error(INVALID_IMAGE_ERROR.message, { toastId: INVALID_IMAGE_ERROR.type });
            return;
        }
        console.log(image);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImageSrc(imageUrl);
        });
        reader.readAsDataURL(image);
    }

    const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height, naturalHeight, naturalWidth } = e.currentTarget;
        if (naturalWidth < MIN_DIMENTION && naturalHeight < MIN_DIMENTION) {
            toast.error(IMAGE_DIMENTION_ERROR.message, { toastId: IMAGE_DIMENTION_ERROR.type });
            setImageSrc("");
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
        setCrop(crop)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
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
                        {imageSrc ? (
                            <ReactCrop
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                crop={crop}
                                circularCrop
                                keepSelection
                                aspect={ASPECT_RATIO}
                                minWidth={MIN_DIMENTION}
                            >
                                <img
                                    src={imageSrc}
                                    alt="Upload"
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        ) : <Text fontSize="small" textColor="gray.500">No image selected</Text>}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup gap={1}>
                        <Button onClick={() => {
                            if (crop) {
                                onSavingImage(crop);
                            } else {
                                toast.error(IMAGE_SAVE_ERROR.message, { toastId: IMAGE_SAVE_ERROR.type });
                            }
                            onClose();
                        }} size='sm' type='button' colorScheme='blue'>Save</Button>
                        <Button onClick={() => {
                            onClose();
                            setImageSrc("");
                        }} size='sm' type='button'>Cancel</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default ImageSelectorModal