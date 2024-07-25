import React from "react";
import { Card, CardHeader, Image, CardBody } from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { user } from "../atoms/userAtom";

export default function userCard({ username = "Loading", firstName = "Loading", }) {
    return (
        <Card className="hover:bg-black/80 hover:text-[20px] hover:text-white/70 hover:font-medium active:scale-90 hover:scale-95 hover:rounded-lg transition-all ease-out duration-100 py-4 w-fit p-2 m-[1.5vw] bg-black/40 rounded-2xl">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">name:{firstName}</p>
                <small className="text-[15px]">{`@ ${username}`}</small>
                {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-2xl hover:rounded-3xl transition-all ease-out duration-100"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={300}
                />
            </CardBody>
        </Card>
    );
}


// calc(100%_-_5px)

{/* <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-fit m-[2vw] rounded-3xl flex items-center justify-center"
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={280}
                src="https://nextui.org/images/hero-card.jpeg"
                width={280}
            />
            <CardFooter className="justify-between bg-black/40 bg-blend-exclusion before:bg-white/80 border-white/80 border-1 overflow-hidden absolute before:rounded-xl rounded-xl bottom-1 h-[25%] w-[90%] shadow-small ml-1 z-10">
                <p className="text-tiny text-white font-bold">Available soon.
                    lorem21</p>
                <Button className="text-[0.8vw] w-[50%] text-white flex items-center justify-center" variant="flat" color="default" radius="lg" size="sm">
                    Notify me
                </Button>
            </CardFooter>
        </Card> */}