const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const Redis = require('ioredis')

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  useAccelerateEndpoint: true
})

const getKeyFromUrl = (url) => {
  const bucketUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/`
  if (url.startsWith(bucketUrl)) {
    return url.replace(bucketUrl, '')
  }
  return null
}

const uploadFileToS3 = async (file, slug, key, folderPath) => {
  const { mimetype, buffer, originalname } = file
  const uniqueFilename = `${originalname.split('.')[0]}_${Date.now()}`

  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderPath}/${uniqueFilename}`

  // Store metadata in Redis
  await redisClient.set(`upload:${slug}:${key}`, JSON.stringify({
    buffer, mimetype, originalname, uniqueFilename, folderPath
  }), 'EX', 3600) // Expire after 1 hour

  return fileUrl // Return the URL for storage in the DB
}

// Function to upload files stored in Redis to S3 (background process)
const uploadRedisFilesToS3 = async (slug, files) => {
  for (const key of files) {
    const redisKey = `upload:${slug}:${key}`
    const fileData = await redisClient.get(redisKey)

    if (fileData) {
      const {
        buffer, mimetype, uniqueFilename, folderPath
      } = JSON.parse(fileData)
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${folderPath}/${uniqueFilename}`,
        Body: Buffer.from(buffer),
        ACL: 'public-read',
        ContentType: mimetype
      }

      const command = new PutObjectCommand(uploadParams)
      await s3Client.send(command)

      // Clean up Redis entry after successful upload
      await redisClient.del(redisKey)
    }
  }
}

module.exports = {
  getKeyFromUrl,
  uploadFileToS3,
  uploadRedisFilesToS3
}
