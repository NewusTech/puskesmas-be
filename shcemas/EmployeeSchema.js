const shcemaForEmployee = {
  // validate for employee
  nik: { type: 'string', optional: false },
  nip_nrp: { type: 'string', optional: true },
  nomor_seri_pegawai: { type: 'string', optional: true },
  nama: { type: 'string', optional: false },
  gelar_depan: { type: 'string', optional: true },
  gelar_belakang: { type: 'string', optional: true },
  kelamin: { type: 'enum', values: ['Perempuan', 'Laki-laki'], optional: false },
  tempat_lahir: { type: 'string', optional: false },
  tanggal_lahir: { type: 'date', convert: true, optional: false },
  agama: { type: 'string', optional: false },
  status_pernikahan: { type: 'string', optional: false },
  alamat: { type: 'string', optional: false },
  email: { type: 'email', optional: false },
  phone: { type: 'string', optional: false },
  tanggal_berlaku_str: { type: 'date', convert: true, optional: true },
  tanggal_berlaku_sip: { type: 'date', convert: true, optional: true },
  tanggal_berlaku_sik: { type: 'date', convert: true, optional: true },

  // validate for job position
  sub_position_id: { type: 'number', optional: false },
  Status_kepegawaian: { type: 'string', optional: false },
  tmt_cpns: { type: 'date', convert: true, optional: true },
  tmt_pns: { type: 'date', convert: true, optional: true },
  tanggal_mulai_tugas: { type: 'date', convert: true, optional: true },
  tanggal_berakhir_tugas: { type: 'date', convert: true, optional: true },
  jenis_kepegawaian: { type: 'string', optional: false },
  gologan_terakhir: { type: 'string', optional: true },
  tmt_golongan: { type: 'date', convert: true, optional: true },
  masa_kerja_bulan: { type: 'number', optional: true },
  masa_kerja_tahun: { type: 'number', optional: true },

  // validate for work unit
  pendidikan: { type: 'string', optional: false },
  kode_sdmk: { type: 'string', optional: true },
  pendidikan_tertinggi: { type: 'string', optional: true },
  kode_sdmk2: { type: 'string', optional: true },
  instansi_induk: { type: 'string', optional: true },
  tempat_kerja_sekarang: { type: 'string', optional: true },
  unit_kerja: { type: 'string', optional: true },
  mulai_kerja: { type: 'date', convert: true, optional: true },
  kelurahan: { type: 'string', optional: false },
  kecamatan: { type: 'string', optional: false },
  kabupaten_kota: { type: 'string', optional: false },
  provinsi: { type: 'string', optional: false }
}

const shcemaForGolongan = {
  golongan_history: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        pangkat: { type: 'string', optional: false },
        golongan: { type: 'string', optional: false },
        tmt_golongan: { type: 'date', convert: true, optional: false }
      }
    }
  }
}

const shcemaForEducationBg = {
  education_bg: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        jenjang_pendidikan: { type: 'string', optional: false },
        kode_program_studi: { type: 'string', optional: false },
        kode_sekolah: { type: 'string', optional: false },
        tahun_lulus: { type: 'number', optional: false }
      }
    }
  }
}

const shcemaForJobHistory = {
  job_history: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama_jabatan: { type: 'string', optional: false },
        unit_kerja: { type: 'string', optional: true },
        struktural: { type: 'string', optional: true },
        eselon: { type: 'string', optional: true }
      }
    }
  }
}

const schemaForJobTraining = {
  job_training: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama_pelatihan: { type: 'string', optional: false },
        kode_pelatihan: { type: 'string', optional: false },
        tanggal_mulai: { type: 'date', convert: true, optional: false },
        tanggal_selesai: { type: 'date', convert: true, optional: false },
        lama_pelatihan: { type: 'number', optional: false },
        total_jpl: { type: 'number', optional: true }
      }
    }
  }
}

const schemaForTechnicalTraining = {
  technical_training: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama_pelatihan: { type: 'string', optional: false },
        kode_pelatihan: { type: 'string', optional: false },
        tempat_pelatihan: { type: 'string', optional: false },
        tanggal_pelatihan: { type: 'date', convert: true, optional: false },
        lama_pelatihan: { type: 'number', optional: false },
        total_jpl: { type: 'number', optional: true },
        penyelenggara: { type: 'string', optional: true }
      }
    }
  }
}

const schemaForStr = {
  str: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama_str: { type: 'string', optional: false },
        tanggal_terbit: { type: 'date', convert: true, optional: false }
      }
    }
  }
}

const schemaForSip = {
  sip: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama_sip: { type: 'string', optional: false },
        tanggal_terbit: { type: 'date', convert: true, optional: false }
      }
    }
  }
}

const schemaForAward = {
  award: {
    type: 'array',
    items: {
      type: 'object',
      props: {
        nama: { type: 'string', optional: false },
        tahun: { type: 'number', optional: false },
        instansi: { type: 'string', optional: false }
      }
    }
  }
}

const schemaForFamily = {
  family: {
    type: 'object',
    props: {
      nama_pasangan: { type: 'string', optional: false },
      tanggal_lahir: { type: 'date', convert: true, optional: false },
      pekerjaan: { type: 'string', optional: false },
      child: { // Changing 'anak' to 'child' to match the main code
        type: 'array',
        items: {
          type: 'object',
          props: {
            nama: { type: 'string', optional: false },
            tanggal_lahir: { type: 'date', convert: true, optional: false },
            jenis_kelamin: { type: 'string', optional: false }
          }
        }
      }
    }
  }
}

module.exports = {
  shcemaForEmployee,
  shcemaForGolongan,
  shcemaForEducationBg,
  shcemaForJobHistory,
  schemaForJobTraining,
  schemaForTechnicalTraining,
  schemaForStr,
  schemaForSip,
  schemaForAward,
  schemaForFamily
}
