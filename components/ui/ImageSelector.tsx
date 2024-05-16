"use client"
import { Crop } from "@/components/ui/ReactCrop"
import { UserI } from "@/interfaces"
import { Box, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import Image from "next/image"
import { UseFormSetValue } from "react-hook-form"
import { FaCamera } from "react-icons/fa"
import ImageSelectorModal from "./ImageSelectorModal"

interface Props {
    setValue: UseFormSetValue<UserI>;
}

const ImageSelector = ({ setValue }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const onSavingImage = (crop: Crop) => {
    }

    return (
        <>
            <Flex className="flex-col">
                <Box className="relative w-fit rounded-full p-1" border="1px" borderColor="gray.400">
                    <Image src="/fallback-user.webp" className="rounded-full" width={42} height={42} alt="Select Avatar" />
                    <Flex className="absolute items-center justify-center rounded-full right-[1%] bottom-[1%] cursor-pointer" onClick={onOpen}>
                        <Icon as={FaCamera} w={4} h={4} />
                    </Flex>
                </Box>
            </Flex>
            <ImageSelectorModal isOpen={isOpen} onClose={onClose} onSavingImage={onSavingImage} />
        </>
    )
}

export default ImageSelector