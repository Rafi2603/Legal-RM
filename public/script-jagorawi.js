document.addEventListener('DOMContentLoaded', () => {


    // Add available years dynamically based on data (replace with actual years if needed)
    const availableYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
    const yearSelect = document.getElementById('yearSelect');
    availableYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Function to filter the table by year
    window.filterTableByYear = function() {
        const selectedYear = document.getElementById('yearSelect').value;
        const table = document.getElementById('data-table');
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const yearCell = rows[i].getElementsByTagName('td')[1]; // Assuming year is in the 2nd column (index 1)
            const year = yearCell.textContent || yearCell.innerText;
            
            if (selectedYear === "" || year === selectedYear) {
                rows[i].style.display = ""; // Show row
            } else {
                rows[i].style.display = "none"; // Hide row
            }
        }
    };



// Fungsi untuk format tanggal ke format YYYY-MM-DD
function formatTanggal(tanggal) {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan padding untuk bulan
    const day = String(date.getDate()).padStart(2, '0'); // Tambahkan padding untuk hari
    return `${day}-${month}-${year}`; // Format YYYY-MM-DD
}

    // Fetch data for Rekap Data K3 JAGORAWI
    fetch('http://localhost:3000/getdatajagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const tableBody = document.querySelector('#data-table tbody');
                tableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.no || ''}</td>
                        <td>${item.tahun || ''}</td>
                        <td>${item.bulan || ''}</td>
                        <td>${item.jumlah_karyawan_ops || ''}</td>
                        <td>${item.jumlah_karyawan_non_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_ops || ''}</td>
                        <td>${item.jumlah_hari_kerja_non_ops || ''}</td>
                        <td>${item.jumlah_jam_kerja || ''}</td>
                        <td>${item.kecelakaan_berat_ops || ''}</td>
                        <td>${item.kecelakaan_berat_non_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_ops || ''}</td>
                        <td>${item.kecelakaan_ringan_non_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_ops || ''}</td>
                        <td>${item.kecelakaan_meninggal_non_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_ops || ''}</td>
                        <td>${item.kecelakaan_near_miss_non_ops || ''}</td>
                        <td>${item.fire_accident || ''}</td>
                        <td>${item.damaged_property || ''}</td>
                        <td>${item.jumlah_hari_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_hilang_non_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_ops || ''}</td>
                        <td>${item.jumlah_hari_tanpa_hilang_non_ops || ''}</td>
                        <td>${item.lti_ops || ''}</td>
                        <td>${item.lti_non_ops || ''}</td>
                        <td>${item.man_hour_ops || ''}</td>
                        <td>${item.man_hour_non_ops || ''}</td>
                        <td>${item.fr || ''}</td>
                    `;
                    tableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Rekap Data K3
                $('#data-table').DataTable();
            } else {
                console.error('Data not found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data for Personel K3
    fetch('http://localhost:3000/getpersoneljagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const personelK3TableBody = document.querySelector('#personel-k3-table tbody');
                personelK3TableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    // Gunakan fungsi formatTanggal untuk mengubah format tanggal
                    const formattedDate = item.batas_masa_berlaku ? formatTanggal(item.batas_masa_berlaku) : '';
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.personel_k3_id || ''}</td>
                        <td>${item.nama || ''}</td>
                        <td>${item.role_personel_k3 || ''}</td>
                        <td>${formattedDate || ''}</td>
                    `;
                    personelK3TableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Personel K3
                $('#personel-k3-table').DataTable();
            } else {
                console.error('Personel K3 Data not found');
            }
        })
        .catch(error => console.error('Error fetching Personel K3 data:', error));




// Fetch data for Personel K3
fetch('http://localhost:3000/getkecelakaanjagorawi')
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Data Found') {
            const kecelakaankerjaTableBody = document.querySelector('#kecelakaan-kerja-table tbody');
            kecelakaankerjaTableBody.innerHTML = ''; // Clear existing rows

            data.showItems.forEach(item => {
                // Gunakan fungsi formatTanggal untuk mengubah format tanggal
                const formattedDate = item.tanggal ? formatTanggal(item.tanggal) : '';
                const formattedDate2 = item.perawatan_di_rs ? formatTanggal(item.perawatan_di_rs) : '';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.kecelakaan_kerja_id || ''}</td>
                    <td>${formattedDate}</td> <!-- Tanggal sudah diformat ke YYYY-MM-DD -->
                    <td>${item.nik || ''}</td>
                    <td>${item.nama || ''}</td>
                    <td>${item.jabatan || ''}</td>
                    <td>${item.ruas || ''}</td>
                    <td>${item.kronologis || ''}</td>
                    <td>${item.kategori_kecelakaan || ''}</td>
                    <td>${item.tindak_lanjut || ''}</td>
                    <td>${formattedDate2 || ''}</td>
                `;
                kecelakaankerjaTableBody.appendChild(row);
            });

            // Inisialisasi DataTables untuk tabel Personel K3
            $('#kecelakaan-kerja-table').DataTable();
        } else {
            console.error('Personel K3 Data not found');
        }
    })
    .catch(error => console.error('Error fetching Personel K3 data:', error));

            // Fetch data for Personel K3
    fetch('http://localhost:3000/getkejadianjagorawi')
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Data Found') {
                const kejadiankerjaTableBody = document.querySelector('#kejadian-kerja-table tbody');
                kejadiankerjaTableBody.innerHTML = ''; // Clear existing rows

                data.showItems.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.kejadian_darurat_id || ''}</td>
                        <td>${item.kejadian_darurat || ''}</td>
                        <td>${item.lokasi || ''}</td>
                        <td>${item.kronologi_kejadian || ''}</td>
                        <td>${item.tindak_lanjut || ''}</td>
                        <td>${item.evidence || ''}</td>
                    `;
                    kejadiankerjaTableBody.appendChild(row);
                });

                // Inisialisasi DataTables untuk tabel Personel K3
                $('#kejadian-kerja-table').DataTable();
            } else {
                console.error('Kejadian kerja K3 Data not found');
            }
        })
        .catch(error => console.error('Error fetching Personel K3 data:', error));
});
