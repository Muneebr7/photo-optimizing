import { NextRequest, NextResponse } from "next/server";
import { promises as fsPromises } from "fs";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const image:File = data.get("image") as File;

    if(!image){
        return NextResponse.json({
            status : 400,
            message : "Please Upload The Image"
        })
    }
    
    const buffer = Buffer.from(await image.arrayBuffer())

    const imagePath = `./public/uploads/original/${image.name}`;
    await fsPromises.writeFile(imagePath, buffer);

    console.log(`Image stored at: ${imagePath}`);

    const webPFolder = `./public/uploads/webp/${image.name.replace(/\.[^/.]+$/, "")}.webp`;

    await sharp(buffer)
      .webp()
      .withMetadata()
      .toFile(webPFolder);

    console.log(`WEBP image stored at: ${webPFolder}`);


    return NextResponse.json({
      status: 200,
      message: "success",
      originalImage : imagePath,
      covertedImage : webPFolder
    });
  } catch (error) {
        return NextResponse.json({
            status : 400,
            message : "Please Upload The File"
        })

  }
}
