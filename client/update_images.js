const http = require('http');

// Map of car ID to image filename
const carImageMap = {
    1: "/images/cars/1_kia_picanto.jpg.webp",
    2: "/images/cars/2_peugeot_208.jpg.webp",
    3: "/images/cars/3-dacia_sandero.jpg.webp",
    4: "/images/cars/4_dacia_logan_1_2_laureate.jpg.webp",
    5: "/images/cars/5_renault_clio_4_1_5.jpg.webp",
    6: "/images/cars/6_fiat_tipo_1_4.jpg.webp",
    7: "/images/cars/7_dacia_duster_1_5_4x2.jpg.webp",
    8: "/images/cars/8_nissan_qashqai_1_6.jpg.webp",
    9: "/images/cars/9_skoda_superb_2_0.jpg.webp",
    10: "/images/cars/10_audi_a_6_2_0.jpg.webp",
    11: "/images/cars/11_mercedes_benz_benz_gle_2_9.jpg.webp",
    12: "/images/cars/12_renault_megane_1_5.jpg.webp",
    13: "/images/cars/13_citroen_c_4_1_6.jpg.webp",
    14: "/images/cars/14_seat_arona_1_0.jpg.webp",
    15: "/images/cars/15_peugeot_508_active_bva.jpg.webp",
    16: "/images/cars/16_toyota_prado_3_0.jpg.webp"
};

const updateCar = (id, imageUrl) => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            imageUrl: imageUrl
        });

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: `/api/cars/${id}`, // Try endpoint with ID param
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(`✅ Updated Car ${id}: ${imageUrl}`);
                    resolve(responseData);
                } else {
                    // If PUT fails, maybe we need to use a different method or endpoint?
                    // But based on routes, PUT /:id should works ideally with admin auth
                    // Since I don't have auth token easily, I'll leverage the fact that
                    // in development mode maybe auth is disabled or I can try another way.
                    // Wait, the routes said: router.put("/:id", authenticate, authorize("admin")...
                    // Without a token this will fail.

                    console.error(`❌ Failed to update Car ${id}. Status: ${res.statusCode}. Response: ${responseData}`);
                    resolve(null); // Resolve anyway to continue loop
                }
            });
        });

        req.on('error', (error) => {
            console.error(`Error updating car ${id}:`, error);
            resolve(null);
        });

        req.write(data);
        req.end();
    });
};

async function runUpdates() {
    console.log("Starting database updates...");

    // Note: This script assumes we can update without auth token. 
    // If auth is strictly enforced, this will fail with 401/403.
    // In that case, we might need to use a MongoDB direct update.

    for (const [id, imageUrl] of Object.entries(carImageMap)) {
        await updateCar(id, imageUrl);
    }

    console.log("Finished updates.");
}

runUpdates();
