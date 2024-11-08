const Employee = require('../../models/Employee')
const Pagination = require('../../pagination/pagination')
const { response } = require('../../helpers/response.formatter')
const logger = require('../../errorHandler/logger')
const JobPosition = require('../../models/JobPosition')
const WorkUnit = require('../../models/WorkUnit')
const GolonganHistory = require('../../models/GolonganHistory')
const JobHistory = require('../../models/JobHistory')
const EducationBg = require('../../models/EducationBg')
const JobTraining = require('../../models/JobTraining')
const TechnicalTraining = require('../../models/TechnicalTraining')
const Str = require('../../models/Str')
const Sip = require('../../models/Sip')
const Award = require('../../models/Award')
const Family = require('../../models/Family')
const Child = require('../../models/Child')
const SubPosition = require('../../models/SUBPosition')
const Validator = require('fastest-validator')
const { shcemaForEmployee, shcemaForGolongan, shcemaForEducationBg, shcemaForJobHistory, schemaForJobTraining, schemaForTechnicalTraining, schemaForStr, schemaForSip, schemaForAward, schemaForFamily } = require('../../shcemas/EmployeeSchema')
const db = require('../../models')
const Position = require('../../models/Position')

const v = new Validator()
const validationInputs = (shcema, data) => v.validate(data, shcema)

const KaryawanController = {
  gatALl: async (req, res) => {
    const page = new Pagination(
      parseInt(req.query.page),
      parseInt(req.query.limit),
      '/karyawan'
    )

    try {
      const { count, rows } = await Employee.findAndCountAll({
        include: [
          {
            model: JobPosition,
            include: [
              { model: SubPosition }
            ]
          }
        ],
        limit: page.limit,
        offset: page.offset,
        order: [
          ['id', 'DESC']
        ]
      })

      const responseData = page.data(count, rows)
      return res.status(200).json(response(200, 'Success', responseData))
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params

    try {
      const employee = await Employee.findOne({
        where: {
          id
        },
        include: [
          { model: JobPosition },
          { model: WorkUnit },
          { model: GolonganHistory },
          { model: JobHistory },
          { model: EducationBg },
          { model: JobTraining },
          { model: TechnicalTraining },
          { model: Str },
          { model: Sip },
          { model: Award },
          {
            model: Family,
            include: [
              { model: Child }
            ]
          }
        ]
      })

      if (!employee) {
        return res.status(404).json(response(404, 'Employee Not Found'))
      }
    } catch (error) {
      logger.error(error)
      return res.status(500).json(response(500, 'Internal Server Error'))
    }
  },

  create: async (req, res) => {
    const reqBody = req.body
    const validateEmployee = validationInputs(shcemaForEmployee, reqBody)
    const validateGolongan = reqBody.golongan_history ? validationInputs(shcemaForGolongan, reqBody) : true
    const validateEduction = reqBody.education_bg ? validationInputs(shcemaForEducationBg, reqBody) : true
    const validateJobHistory = reqBody.job_history ? validationInputs(shcemaForJobHistory, reqBody) : true
    const validateJobTraining = reqBody.job_training ? validationInputs(schemaForJobTraining, reqBody) : true
    const validateTechnicalTraining = reqBody.technical_training ? validationInputs(schemaForTechnicalTraining, reqBody) : true
    const validateStr = reqBody.str ? validationInputs(schemaForStr, reqBody) : true
    const validateSip = reqBody.sip ? validationInputs(schemaForSip, reqBody) : true
    const validateAward = reqBody.award ? validationInputs(schemaForAward, reqBody) : true
    const validateFamily = reqBody.family ? validationInputs(schemaForFamily, reqBody) : true

    const errors = []
    const errlsit = [validateEmployee, validateGolongan, validateEduction, validateJobHistory, validateJobTraining, validateTechnicalTraining, validateStr, validateSip, validateAward, validateFamily]
    errlsit.forEach((result) => {
      if (result !== true) {
        errors.push(...result)
      }
    })

    if (errors.length) {
      return res.status(400).json(response(400, 'Bad Request', errors))
    }

    const t = await db.transaction()
    try {
      const subJobPossition = await SubPosition.findOne({
        where: {
          id: reqBody.sub_position_id
        },
        include: [
          { model: Position }
        ]
      })
      if (!subJobPossition) {
        await t.rollback()
        return res.status(404).json(response(404, 'Job Position Not Found'))
      }

      const jabatan = subJobPossition.Position.name + ' - ' + subJobPossition.name
      const employee = await Employee.create(
        {
          nik: reqBody.nik,
          nip_nrp: reqBody.nip_nrp,
          nomor_seri_pegawai: reqBody.nomor_seri_pegawai,
          nama: reqBody.nama,
          gelar_depan: reqBody.gelar_depan,
          gelar_belakang: reqBody.gelar_belakang,
          kelamin: reqBody.kelamin,
          tempat_lahir: reqBody.tempat_lahir,
          tanggal_lahir: reqBody.tanggal_lahir,
          agama: reqBody.agama,
          status_pernikahan: reqBody.status_pernikahan,
          alamat: reqBody.alamat,
          email: reqBody.email,
          phone: reqBody.phone,
          tanggal_berlaku_str: reqBody.tanggal_berlaku_str,
          tanggal_berlaku_sip: reqBody.tanggal_berlaku_sip,
          tanggal_berlaku_sik: reqBody.tanggal_berlaku_sik
        }, { transaction: t })

      await JobPosition.create(
        {
          jabatan,
          Status_kepegawaian: reqBody.Status_kepegawaian,
          tmt_cpns: reqBody.tmt_cpns,
          tmt_pns: reqBody.tmt_pns,
          tanggal_mulai_tugas: reqBody.tanggal_mulai_tugas,
          tanggal_berakhir_tugas: reqBody.tanggal_berakhir_tugas,
          jenis_kepegawaian: reqBody.jenis_kepegawaian,
          gologan_terakhir: reqBody.gologan_terakhir,
          tmt_golongan: reqBody.tmt_golongan,
          masa_kerja_bulan: reqBody.masa_kerja_bulan,
          masa_kerja_tahun: reqBody.masa_kerja_tahun,
          sub_position_id: subJobPossition.id,
          employee_id: employee.id
        }, { transaction: t }
      )

      await WorkUnit.create(
        {
          pendidikan: reqBody.pendidikan,
          kode_sdmk: reqBody.kode_sdmk,
          pendidikan_tertinggi: reqBody.pendidikan_tertinggi,
          kode_sdmk2: reqBody.kode_sdmk2,
          instansi_induk: reqBody.instansi_induk,
          tempat_kerja_sekarang: reqBody.tempat_kerja_sekarang,
          unit_kerja: reqBody.unit_kerja,
          mulai_kerja: reqBody.mulai_kerja,
          kelurahan: reqBody.kelurahan,
          kecamatan: reqBody.kecamatan,
          kabupaten_kota: reqBody.kabupaten_kota,
          provinsi: reqBody.provinsi,
          employee_id: employee.id
        }, { transaction: t }
      )

      await GolonganHistory.bulkCreate(reqBody.golongan_history.map((golongan) => {
        return {
          pangkat: golongan.pangkat,
          golongan: golongan.golongan,
          tmt: golongan.tmt_golongan,
          employee_id: employee.id
        }
      }), { transaction: t })

      await JobHistory.bulkCreate(reqBody.job_history.map((jobHistory) => {
        return {
          nama_jabatan: jobHistory.nama_jabatan,
          unit_kerja: jobHistory.unit_kerja,
          struktural: jobHistory.struktural,
          eselon: jobHistory.eselon,
          employee_id: employee.id
        }
      }), { transaction: t })

      await EducationBg.bulkCreate(reqBody.education_bg.map((educationBg) => {
        return {
          jenjang_pendidikan: educationBg.jenjang_pendidikan,
          kode_program_studi: educationBg.kode_program_studi,
          kode_sekolah: educationBg.kode_sekolah,
          tahun_lulus: educationBg.tahun_lulus,
          employee_id: employee.id
        }
      }), { transaction: t })

      await JobTraining.bulkCreate(reqBody.job_training.map((jobTrainingData) => {
        return {
          nama_pelatihan: jobTrainingData.nama_pelatihan,
          kode_pelatihan: jobTrainingData.kode_pelatihan,
          tempat_pelatihan: jobTrainingData.tempat_pelatihan,
          tanggal_mulai: jobTrainingData.tanggal_mulai,
          tanggal_selesai: jobTrainingData.tanggal_selesai,
          lama_pelatihan: jobTrainingData.lama_pelatihan,
          total_jpl: jobTrainingData.total_jpl
        }
      }), { transaction: t })

      await TechnicalTraining.bulkCreate(reqBody.technical_training.map((technicalTrainingData) => {
        return {
          nama_pelatihan: technicalTrainingData.nama_pelatihan,
          kode_pelatihan: technicalTrainingData.kode_pelatihan,
          tempat_pelatihan: technicalTrainingData.tempat_pelatihan,
          tanggal_pelatihan: technicalTrainingData.tanggal_pelatihan,
          lama_pelatihan: technicalTrainingData.lama_pelatihan,
          total_jpl: technicalTrainingData.total_jpl,
          penyelenggara: technicalTrainingData.penyelenggara
        }
      }), { transaction: t })

      await Str.bulkCreate(reqBody.str.map((strData) => {
        return {
          nama_str: strData.nama_str,
          tanggal_terbit: strData.tanggal_terbit,
          employee_id: employee.id
        }
      }), { transaction: t })

      await Sip.bulkCreate(reqBody.sip.map((sipData) => {
        return {
          nama_sip: sipData.nama_sip,
          tanggal_terbit: sipData.tanggal_terbit,
          employee_id: employee.id
        }
      }))

      await Award.bulkCreate(reqBody.award.map((awardData) => {
        return {
          nama: awardData.nama,
          tahun: awardData.tahun,
          instansi: awardData.instansi,
          employee_id: employee.id
        }
      }), { transaction: t })

      await Family.create({
        nama_pasangan: reqBody.family.nama_pasangan,
        tanggal_lahir: reqBody.family.tanggal_lahir,
        pekerjaan: reqBody.family.pekerjaan,
        employee_id: employee.id,
        Child: reqBody.family.child.map((child) => {
          return {
            nama: child.nama,
            tanggal_lahir: child.tanggal_lahir,
            jenis_kelamin: child.jenis_kelamin
          }
        })
      },
      { transaction: t })

      await t.commit()

      return res.status(201).json(response(201, 'Employee Created Successfully'))
    } catch (error) {
      await t.rollback()
      logger.error(error)
      return res.status(500).json(response(500, error))
    }
  }
}

module.exports = KaryawanController
