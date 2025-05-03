import Image from "next/image";
import background from "~/../public/car-background.jpg";

export default function BackgroundImage() {
  return (
    <div className="BackgroundImage from-s22 to-s14 absolute inset-0 bg-gradient-to-br">
      <Image
        className="BackgroundImage h-full w-full object-cover mix-blend-multiply"
        src={background}
        alt="background"
        placeholder="blur"
        height={1536}
        width={1920}
        sizes="100vw"
      />
    </div>
  );
}
