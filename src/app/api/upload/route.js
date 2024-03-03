const { NextResponse } = require("next/server");
const { s3Client } = require('../libs/s3Client');
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.error("No se ha enviado ningún archivo", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.type.split("/").pop();

    const params = {
      Bucket: "fingerstorage",
      Key: `${uuid()}.${fileExtension}`,
      Body: buffer,
      ACL: "public-read",
    };

    const result = await s3Client.send(new PutObjectCommand(params));
    console.log("Archivo subido a S3:", result);

    return NextResponse.json("Archivo subido correctamente");
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.error("Ocurrió un error al procesar la solicitud", { status: 500 });
  }
}
