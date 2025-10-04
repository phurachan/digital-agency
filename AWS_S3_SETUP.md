# AWS S3 Upload Configuration Guide

## Overview
ระบบ upload file รองรับการ upload ไฟล์ได้ 2 แบบ:
1. **Local Storage** (Default) - บันทึกไฟล์ในโฟลเดอร์ `public/uploads/`
2. **AWS S3** (Optional) - บันทึกไฟล์บน AWS S3 Bucket

ระบบจะตรวจสอบการตั้งค่า AWS S3 อัตโนมัติ หากตั้งค่าครบถ้วนจะใช้ S3 หากไม่ครบจะใช้ Local Storage

## Features
- ✅ **Auto-detection**: ตรวจสอบ AWS credentials อัตโนมัติ
- ✅ **Fallback**: หาก S3 upload ล้มเหลวจะกลับไปใช้ local storage
- ✅ **Organized folders**: จัดเก็บไฟล์แยกตามประเภท (images/, videos/, files/)
- ✅ **Response metadata**: ระบุว่าไฟล์ถูกเก็บที่ S3 หรือ local storage
- ✅ **CloudFront support**: รองรับการใช้ CloudFront CDN

## AWS S3 Setup

### 1. Create S3 Bucket

1. เข้าสู่ [AWS Console](https://console.aws.amazon.com/s3/)
2. สร้าง S3 Bucket ใหม่:
   - **Bucket name**: เช่น `digital-agency-uploads`
   - **Region**: เช่น `ap-southeast-1` (Singapore)
   - **Block Public Access**: ปิด (Allow public access)
   - **Bucket Versioning**: ตามความต้องการ

3. ตั้งค่า Bucket Policy สำหรับ public read access:
   - ไปที่ Bucket → Permissions → Bucket Policy
   - เพิ่ม Policy นี้:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::digital-agency-uploads/*"
    }
  ]
}
```

4. ตั้งค่า CORS (Bucket → Permissions → CORS):

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 2. Create IAM User

1. เข้าสู่ [IAM Console](https://console.aws.amazon.com/iam/)
2. สร้าง IAM User ใหม่:
   - **User name**: เช่น `digital-agency-s3-user`
   - **Access type**: Programmatic access (Access key)

3. สร้าง Policy สำหรับ S3 access:
   - ไปที่ IAM → Policies → Create policy
   - เลือก JSON และใส่:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::digital-agency-uploads/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": "arn:aws:s3:::digital-agency-uploads"
    }
  ]
}
```

4. Attach Policy ไปยัง User
5. สร้าง Access Key และเก็บ:
   - **Access Key ID**: `AKIA...`
   - **Secret Access Key**: `...`

### 3. Environment Configuration

แก้ไขไฟล์ `.env`:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=digital-agency-uploads
```

### 4. (Optional) Setup CloudFront CDN

หากต้องการใช้ CloudFront CDN:

1. สร้าง CloudFront Distribution:
   - **Origin Domain**: `digital-agency-uploads.s3.ap-southeast-1.amazonaws.com`
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache Policy**: CachingOptimized

2. เพิ่ม CloudFront URL ใน `.env`:

```env
AWS_S3_URL=https://d1234567890abc.cloudfront.net
```

## Usage

### Upload Image

```typescript
// POST /api/digital-agency/upload/image
const formData = new FormData()
formData.append('file', imageFile)

const response = await $fetch('/api/digital-agency/upload/image', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: formData
})

// Response
{
  success: true,
  data: {
    url: "https://digital-agency-uploads.s3.ap-southeast-1.amazonaws.com/images/1234567890_abc123.jpg",
    filename: "profile.jpg",
    savedFilename: "1234567890_abc123.jpg",
    size: 123456,
    type: "image/jpeg",
    storageType: "s3",  // หรือ "local"
    s3Key: "images/1234567890_abc123.jpg",
    uploadedAt: "2024-01-01T00:00:00.000Z"
  }
}
```

### Upload File/Video

```typescript
// POST /api/digital-agency/upload/file
const formData = new FormData()
formData.append('file', videoFile)

const response = await $fetch('/api/digital-agency/upload/file', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  body: formData
})

// Response
{
  success: true,
  data: {
    url: "https://digital-agency-uploads.s3.ap-southeast-1.amazonaws.com/videos/1234567890_xyz789.mp4",
    filename: "demo.mp4",
    savedFilename: "1234567890_xyz789.mp4",
    size: 5242880,
    type: "video/mp4",
    isVideo: true,
    storageType: "s3",
    s3Key: "videos/1234567890_xyz789.mp4",
    uploadedAt: "2024-01-01T00:00:00.000Z"
  }
}
```

## File Organization

ไฟล์จะถูกจัดเก็บในโฟลเดอร์ตามประเภท:

- **Images**: `s3://bucket-name/images/filename.jpg`
- **Videos**: `s3://bucket-name/videos/filename.mp4`
- **Files**: `s3://bucket-name/files/filename.pdf`

## Server Utilities

### Available Functions

```typescript
import {
  uploadToS3,
  deleteFromS3,
  getFromS3,
  isS3Enabled,
  generateUniqueFilename
} from '~/server/digital-agency/utils/s3'

// Check if S3 is configured
const isEnabled = isS3Enabled() // true/false

// Upload file
const result = await uploadToS3({
  fileName: 'example.jpg',
  fileData: Buffer.from(...),
  contentType: 'image/jpeg',
  folder: 'images'
})

// Delete file
await deleteFromS3('images/1234567890_abc123.jpg')

// Get file
const fileBuffer = await getFromS3('images/1234567890_abc123.jpg')

// Generate unique filename
const filename = generateUniqueFilename('profile.jpg')
// Returns: "1234567890_abc123.jpg"
```

## Behavior

### With S3 Configured
1. ตรวจสอบ AWS credentials
2. Upload ไฟล์ไปยัง S3
3. หาก upload สำเร็จ → ส่ง S3 URL กลับ
4. หาก upload ล้มเหลว → Fallback ไปยัง local storage

### Without S3 Configured
1. ตรวจสอบ AWS credentials (ไม่ครบ)
2. บันทึกไฟล์ไปยัง `public/uploads/`
3. ส่ง local URL กลับ (`/uploads/filename.jpg`)

## File Size Limits

- **Images**: 5MB
- **Videos**: 50MB
- **Files**: 50MB

## Security

- ✅ Authentication required (Admin only)
- ✅ File type validation
- ✅ File size validation
- ✅ Unique filename generation (prevent overwrite)
- ✅ S3 credentials stored in environment variables (not exposed to client)

## Troubleshooting

### S3 Upload Fails

1. ตรวจสอบ AWS credentials ใน `.env`
2. ตรวจสอบ S3 bucket permissions
3. ตรวจสอบ IAM user permissions
4. ตรวจสอบ CORS configuration
5. ดู error logs ใน console

### Files Not Accessible

1. ตรวจสอบ Bucket Policy (public read access)
2. ตรวจสอบ ACL settings (`public-read`)
3. ตรวจสอบ Block Public Access settings

### CloudFront Issues

1. ตรวจสอบ Origin configuration
2. ตรวจสอบ Cache behaviors
3. Wait for distribution deployment (15-20 minutes)

## Cost Optimization

### S3 Storage Classes

พิจารณาใช้ S3 Storage Classes ตามการใช้งาน:
- **S3 Standard**: ไฟล์ที่เข้าถึงบ่อย
- **S3 Intelligent-Tiering**: ไฟล์ที่ไม่แน่ใจว่าจะเข้าถึงบ่อยแค่ไหน
- **S3 Standard-IA**: ไฟล์เก่าที่เข้าถึงน้อย

### Lifecycle Rules

ตั้งค่า Lifecycle rules เพื่อลบหรือย้ายไฟล์อัตโนมัติ:
- ย้ายไฟล์อายุ > 30 วันไป Standard-IA
- ลบไฟล์อายุ > 90 วันโดยอัตโนมัติ

## Monitoring

### CloudWatch Metrics

ติดตาม metrics ผ่าน CloudWatch:
- **NumberOfObjects**: จำนวนไฟล์ใน bucket
- **BucketSizeBytes**: ขนาดรวมของ bucket
- **AllRequests**: จำนวน requests ทั้งหมด

### S3 Access Logs

เปิดใช้ S3 Access Logs เพื่อติดตามการเข้าถึง:
- Bucket → Properties → Server access logging

## Migration from Local to S3

หากต้องการย้ายไฟล์จาก local ไป S3:

```bash
# Install AWS CLI
brew install awscli  # macOS
# or
apt-get install awscli  # Ubuntu

# Configure AWS CLI
aws configure

# Sync local files to S3
aws s3 sync ./public/uploads/ s3://digital-agency-uploads/uploads/ --acl public-read
```

## References

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [S3 Pricing](https://aws.amazon.com/s3/pricing/)

---

© 2024 Digital Agency. All rights reserved.
