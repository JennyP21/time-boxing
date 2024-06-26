import { UserI } from "@/interfaces"
import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { UseFormSetValue } from "react-hook-form"
import { FaCamera } from "react-icons/fa"
import ImageSelector from "./ImageSelector"

interface Props {
    setValue: UseFormSetValue<UserI>;
    defaultImage?: string;
}

const ImageSelectorContainer = ({ setValue, defaultImage }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [imagePreviewSrc, setImagePreviewSrc] = useState("");

    const onSavingImage = (blob: Blob | null, fileName: string) => {
        if (!blob) return;
        const file = new File([blob], fileName);
        setValue("imageData", file, { shouldDirty: true });
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImagePreviewSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    }

    return (
        <>
            <Flex className="flex-col">
                <Box className="relative w-fit rounded-full p-1" border="1px" borderColor="gray.400">
                    <Image
                        src={imagePreviewSrc ? imagePreviewSrc : (defaultImage ? defaultImage : "/fallback-user.webp")}
                        className="rounded-full"
                        width={42}
                        height={42}
                        alt="Select Avatar"
                    />
                    <Flex className="absolute items-center justify-center rounded-full right-[1%] bottom-[1%] cursor-pointer" onClick={onOpen}>
                        <Icon as={FaCamera} w={4} h={4} />
                    </Flex>
                </Box>
            </Flex>
            <ImageSelector isOpen={isOpen} onClose={onClose} onSavingImage={onSavingImage} />
        </>
    )
}

export default ImageSelectorContainer    