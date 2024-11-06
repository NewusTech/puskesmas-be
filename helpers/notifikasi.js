const Redis = require('ioredis')

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})

const notifikasi = async (dataGet, pesansocket) => {
  try {
    const newNotification = {
      id: Date.now(),
      data_id: dataGet.id,
      // userinfo: dataGet.,
      isopen: 0,
      title: `Pendataan ${pesansocket}`,
      description: `Yth. ${dataGet?.Userinfo?.name}, pendataan Anda dengan id toponim ${dataGet?.id} telah selesai diproses.`,
      url: `${process.env.WEBSITE_URL}naming/detail/${dataGet.id}`,
      date: new Date().toISOString().split('T')[0]
    }

    await redisClient.set(`notification:${newNotification.id}`, JSON.stringify(newNotification))
  } catch (err) {
    console.error('Error creating notification:', err)
    throw err
  }
}

module.exports = { notifikasi }
