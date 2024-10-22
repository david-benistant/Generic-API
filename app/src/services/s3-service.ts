import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";

const credentials = {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  };
  
  let params: { region: string; credentials: { accessKeyId: string; secretAccessKey: string }; endpoint?: string } = {
    region: process.env.REGION!,
    credentials,
  };
const client = new S3Client(params);

class S3Service {
    generatePutPreSignedUrl = async (
        bucketName: string,
        fileName: string,
        expiresIn: number = 60
    ): Promise<{ signedUrl: string; fileKey: string }> => {
        const outFile = `${v4()}/${fileName}`;
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: outFile,
        });

        let signedUrl = await getSignedUrl(client, command, { expiresIn });
        return { signedUrl, fileKey: btoa(outFile) };
    };

    generateGetPreSignedUrl = async (
        bucketName: string,
        fileKey: string,
        expiresIn: number = 60
    ): Promise<string> => {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: atob(fileKey),
        });
        let signedUrl = await getSignedUrl(client, command, { expiresIn });
        return signedUrl;
    };

    generateDownloadPreSignedUrl =async (
        bucketName: string,
        fileKey: string,
        expiresIn: number = 60
    ): Promise<string> => {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: atob(fileKey),
            ResponseContentDisposition: 'attachment',
        });
        let signedUrl = await getSignedUrl(client, command, { expiresIn });
        return signedUrl;
    };

    deleteObject = async (
        bucketName: string,
        fileKey: string
    ): Promise<void> => {
        const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: atob(fileKey),
        });

        await client.send(command);
    };
}

export default new S3Service();
