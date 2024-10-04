CREATE TYPE user_role AS ENUM (
    'admin',
    'user'
);

CREATE TYPE profesi AS ENUM (
    'Ahli K3 Umum',
    'Ahli K3 Konstruksi',
    'Auditor K3',
    'Dokter Hiperkes',
    'Paramedis'
);

CREATE TYPE MonthEnum AS ENUM (
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
);


CREATE TABLE personel_k3 (
    personel_k3_id SERIAL PRIMARY KEY,           
    nama VARCHAR(100),     
    role_personel_k3 VARCHAR(100),      
    batas_masa_berlaku DATE 
);

CREATE TABLE kecelakaan_kerja (
    kecelakaan_kerja_id SERIAL PRIMARY KEY,
    Tanggal DATE,
    NIK VARCHAR(20),
    Nama VARCHAR(100),
    Jabatan VARCHAR(50),
    Ruas VARCHAR(50),
    Kronologis TEXT,
    Kategori_Kecelakaan VARCHAR(50),
    Tindak_Lanjut TEXT,
    Perawatan_di_RS DATE
);

CREATE TABLE kejadian_darurat (
    kejadian_darurat_id SERIAL PRIMARY KEY,
    Kejadian_Darurat VARCHAR(100),
    Lokasi VARCHAR(100),
    Kronologi_Kejadian TEXT,
    Tindak_Lanjut TEXT
);


CREATE TABLE rekap_data_k3 (
    no SERIAL PRIMARY KEY,
    bulan monthenum,
    jumlah_karyawan_ops INT,
    jumlah_karyawan_non_ops INT,
    jumlah_hari_kerja_ops INT,
    jumlah_hari_kerja_non_ops INT,
    jumlah_jam_kerja INT,
    kecelakaan_berat_ops INT,
    kecelakaan_berat_non_ops INT,
    kecelakaan_ringan_ops INT,
    kecelakaan_ringan_non_ops INT,
    kecelakaan_meninggal_ops INT,
    kecelakaan_meninggal_non_ops INT,
    kecelakaan_near_miss_ops INT,
    kecelakaan_near_miss_non_ops INT,
    fire_accident INT,
    damaged_property INT,
    jumlah_hari_hilang_ops INT,
    jumlah_hari_hilang_non_ops INT,
    jumlah_hari_tanpa_hilang_ops INT,
    jumlah_hari_tanpa_hilang_non_ops INT,
    lti_ops INT,
    lti_non_ops INT,
    man_hour_ops INT,
    man_hour_non_ops INT
    fr INT
);


CREATE TABLE akun_ruas (
    ruas_id SERIAL PRIMARY KEY,
    ruas VARCHAR(100),
    pass_ruas TEXT
);


CREATE TABLE struktur_organisasi_jagorawi (
    struktur_id SERIAL PRIMARY KEY  ,
    nama VARCHAR(100) ,
    jabatan VARCHAR(50) 
);
















