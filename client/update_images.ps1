$carImageMap = @{
    "1" = "/images/cars/1_kia_picanto.jpg.webp";
    "2" = "/images/cars/2_peugeot_208.jpg.webp";
    "3" = "/images/cars/3-dacia_sandero.jpg.webp";
    "4" = "/images/cars/4_dacia_logan_1_2_laureate.jpg.webp";
    "5" = "/images/cars/5_renault_clio_4_1_5.jpg.webp";
    "6" = "/images/cars/6_fiat_tipo_1_4.jpg.webp";
    "7" = "/images/cars/7_dacia_duster_1_5_4x2.jpg.webp";
    "8" = "/images/cars/8_nissan_qashqai_1_6.jpg.webp";
    "9" = "/images/cars/9_skoda_superb_2_0.jpg.webp";
    "10" = "/images/cars/10_audi_a_6_2_0.jpg.webp";
    "11" = "/images/cars/11_mercedes_benz_benz_gle_2_9.jpg.webp";
    "12" = "/images/cars/12_renault_megane_1_5.jpg.webp";
    "13" = "/images/cars/13_citroen_c_4_1_6.jpg.webp";
    "14" = "/images/cars/14_seat_arona_1_0.jpg.webp";
    "15" = "/images/cars/15_peugeot_508_active_bva.jpg.webp";
    "16" = "/images/cars/16_toyota_prado_3_0.jpg.webp"
}

foreach ($id in $carImageMap.Keys) {
    $imageUrl = $carImageMap[$id]
    $body = @{ imageUrl = $imageUrl } | ConvertTo-Json
    
    Write-Host "Updating Car $id with $imageUrl..."
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/cars/$id" -Method PUT -Body $body -ContentType "application/json"
        Write-Host "Success: $($response.StatusCode)"
    } catch {
        Write-Host "Error updating car $id : $_"
    }
}
