import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

/**
 * AWS S3 Configuration
 *
 * Environment Variables Required:
 * - AWS_ACCESS_KEY_ID: AWS access key
 * - AWS_SECRET_ACCESS_KEY: AWS secret key
 * - AWS_REGION: AWS region (e.g., 'ap-southeast-1')
 * - AWS_S3_BUCKET: S3 bucket name
 * - AWS_S3_URL: (Optional) Custom S3 URL or CloudFront URL
 */

interface S3Config {
  accessKeyId: string
  secretAccessKey: string
  region: string
  bucket: string
  baseUrl?: string
}

interface UploadOptions {
  fileName: string
  fileData: Buffer
  contentType: string
  folder?: string
}

interface UploadResult {
  url: string
  key: string
  bucket: string
  region: string
}

/**
 * Get S3 Configuration from environment variables
 */
export function getS3Config(): S3Config {
  const config = useRuntimeConfig()

  const accessKeyId = config.awsAccessKeyId || process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = config.awsSecretAccessKey || process.env.AWS_SECRET_ACCESS_KEY
  const region = config.awsRegion || process.env.AWS_REGION || 'ap-southeast-1'
  const bucket = config.awsS3Bucket || process.env.AWS_S3_BUCKET
  const baseUrl = config.awsS3Url || process.env.AWS_S3_URL

  if (!accessKeyId || !secretAccessKey || !bucket) {
    throw new Error('AWS S3 configuration is missing. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET environment variables.')
  }

  return {
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
    baseUrl
  }
}

/**
 * Create S3 Client instance
 */
export function createS3Client(): S3Client {
  const config = getS3Config()

  return new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    }
  })
}

/**
 * Upload file to S3
 *
 * @param options - Upload options including file data and metadata
 * @returns Upload result with public URL and S3 key
 */
export async function uploadToS3(options: UploadOptions): Promise<UploadResult> {
  const config = getS3Config()
  const s3Client = createS3Client()

  // Generate S3 key (path in bucket)
  const folder = options.folder || 'uploads'
  const key = `${folder}/${options.fileName}`

  try {
    // Use multipart upload for better performance and reliability
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: config.bucket,
        Key: key,
        Body: options.fileData,
        ContentType: options.contentType,
        ACL: 'public-read'
      }
    })

    await upload.done()

    // Generate public URL
    const url = config.baseUrl
      ? `${config.baseUrl}/${key}`
      : `https://${config.bucket}.s3.${config.region}.amazonaws.com/${key}`

    return {
      url,
      key,
      bucket: config.bucket,
      region: config.region
    }
  } catch (error) {
    console.error('S3 upload error:', error)
    throw new Error(`Failed to upload file to S3: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Delete file from S3
 *
 * @param key - S3 object key to delete
 * @returns true if deletion was successful
 */
export async function deleteFromS3(key: string): Promise<boolean> {
  const config = getS3Config()
  const s3Client = createS3Client()

  try {
    const command = new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: key
    })

    await s3Client.send(command)
    return true
  } catch (error) {
    console.error('S3 delete error:', error)
    throw new Error(`Failed to delete file from S3: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Get file from S3
 *
 * @param key - S3 object key to retrieve
 * @returns File data as Buffer
 */
export async function getFromS3(key: string): Promise<Buffer> {
  const config = getS3Config()
  const s3Client = createS3Client()

  try {
    const command = new GetObjectCommand({
      Bucket: config.bucket,
      Key: key
    })

    const response = await s3Client.send(command)

    if (!response.Body) {
      throw new Error('No data returned from S3')
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of response.Body as any) {
      chunks.push(chunk)
    }

    return Buffer.concat(chunks)
  } catch (error) {
    console.error('S3 get error:', error)
    throw new Error(`Failed to get file from S3: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Check if S3 is configured and available
 *
 * @returns true if S3 is properly configured
 */
export function isS3Enabled(): boolean {
  try {
    getS3Config()
    return true
  } catch {
    return false
  }
}

/**
 * Generate unique filename with timestamp and random string
 *
 * @param originalFilename - Original file name
 * @returns Unique filename
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalFilename.split('.').pop()
  return `${timestamp}_${randomString}.${extension}`
}
