import React from "react";
import { Card, CardHeader, Image, CardBody, user } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function userCard({ username, firstName, lastName }) {

    const router = useRouter();

    return (
        <Card className="hover:bg-white/80 text-white overflow-hidden hover:text-black/70 hover:font-medium hover:rounded-xl flex items-center justify-center gap-3 transition-all ease-out duration-100 md:min-w-[15rem] max-w-[75%] md:w-fit md:max-h-fit pt-3 m-[1.5vw] bg-white/20 rounded-2xl">
            <CardHeader className="pb-0 w-[100%] pt-2 px-4 flex-col gap-2 items-start">
                <p className="text-tiny font-bold">{firstName} {lastName}</p>
                <small className="text-[15px]">{`@${username}`}</small>
                <button onClick={() => {
                    router.push(`/SendMoney?name=${firstName}&username=${username}`);
                }} className=" active:scale-95 transition-all ease-in duration-100 rounded-lg h-fit w-fit px-4 py-2 bg-green-400">Send Money</button>
            </CardHeader>
            <CardBody className="overflow-hidden">
                <Image
                    alt="Card background"
                    className="object-cover transition-all ease-out duration-100"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                // width={300}
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