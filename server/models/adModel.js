const db = require("../config/db");

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const AdModel = {
  // ✅ Create New Ad
  createAd: async (adData, imageUrls) => {
    const {
      user_id,
      category_id,
      title,
      description,
      price,
      location,
      contact_email,
      contact_phone,
      status,
      fields,
    } = adData;

    const [result] = await db.query(
      `INSERT INTO ads 
      (user_id, category_id, title, description, price, location, contact_email, contact_phone, status, fields, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user_id,
        category_id,
        title,
        description,
        price,
        location,
        contact_email,
        contact_phone,
        status,
        JSON.stringify(fields || {}),
      ]
    );

    const ad_id = result.insertId;

    // Save all images
    if (imageUrls?.length) {
      const imageQueries = imageUrls.map((url) =>
        db.query(
          `INSERT INTO ad_images (ad_id, image_url, uploaded_at) VALUES (?, ?, NOW())`,
          [ad_id, url]
        )
      );
      await Promise.all(imageQueries);
    }

    return ad_id;
  },

  // ✅ Update Ad
  updateAd: async (id, adData, imageUrls) => {
    const {
      category_id,
      title,
      description,
      price,
      location,
      contact_email,
      contact_phone,
      status,
      fields,
    } = adData;

    const [result] = await db.query(
      `UPDATE ads 
       SET category_id=?, title=?, description=?, price=?, location=?, contact_email=?, contact_phone=?, status=?, fields=?, updated_at=NOW()
       WHERE id=?`,
      [
        category_id,
        title,
        description,
        price,
        location,
        contact_email,
        contact_phone,
        status,
        JSON.stringify(fields || {}),
        id,
      ]
    );

    // Replace images if new ones are uploaded
    if (imageUrls?.length) {
      await db.query(`DELETE FROM ad_images WHERE ad_id=?`, [id]);
      const imageQueries = imageUrls.map((url) =>
        db.query(
          `INSERT INTO ad_images (ad_id, image_url, uploaded_at) VALUES (?, ?, NOW())`,
          [id, url]
        )
      );
      await Promise.all(imageQueries);
    }

    return result.affectedRows;
  },

  // ✅ Delete Ad
  deleteAd: async (id) => {
    await db.query("DELETE FROM ad_images WHERE ad_id=?", [id]);
    const [result] = await db.query("DELETE FROM ads WHERE id=?", [id]);
    return result.affectedRows;
  },

  // ✅ Get All Ads with Filters
  getAllAds: async (filters) => {
    const {
      price_min,
      price_max,
      type, // buy/sell/rent
      location_name,
      lat,
      lng,
      nearby, // true or false
      active,
      recent,
      page = 1,
      limit = 10,
    } = filters;

    let query = `
      SELECT 
        a.*, 
        u.full_name AS user_name, 
        c.category_name AS category_name,
        GROUP_CONCAT(i.image_url) AS images
      FROM ads a
      LEFT JOIN ad_images i ON a.id = i.ad_id
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    // Price filter
    if (price_min && price_max) {
      query += " AND a.price BETWEEN ? AND ?";
      params.push(price_min, price_max);
    }

    // Buy/Sell/Rent
    if (type) {
      query += " AND JSON_EXTRACT(a.fields, '$.listing_type') = ?";
      params.push(type);
    }

    // Location name filter
    if (location_name) {
      query += " AND a.location LIKE ?";
      params.push(`%${location_name}%`);
    }

    // Active only
    if (active === "true") {
      query += " AND a.status = 'active'";
    }

    // Recently added (within 7 days)
    if (recent === "true") {
      query += " AND a.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
    }

    query += " GROUP BY a.id ORDER BY a.created_at DESC";

    const [rows] = await db.query(query, params);

    // Nearby filter (10km radius)
    let filteredRows = rows;
    if (nearby === "true" && lat && lng) {
      filteredRows = rows.filter((ad) => {
        try {
          const loc = JSON.parse(ad.location);
          if (!loc.lat || !loc.lng) return false;
          const distance = haversine(lat, lng, loc.lat, loc.lng);
          return distance <= 10;
        } catch {
          return false;
        }
      });
    }

    const start = (page - 1) * limit;
    const paginated = filteredRows.slice(start, start + Number(limit));

    return paginated.map((r) => ({
      ...r,
      images: r.images ? r.images.split(",") : [],
    }));
  },

  // ✅ Get Ads by Category
  getAdsByCategory: async (category_id, filters = {}) => {
    const {
      search_key,
      date_from,
      date_to,
      price_min,
      price_max,
      type,
      location,
      lat,
      lng,
      nearby,
      status,
      recent,
      page = 1,
      limit = 10,
    } = filters;

    console.log(type);

    let query = `
    SELECT 
      a.*, 
      u.full_name AS user_name, 
      c.category_name AS category_name,
      GROUP_CONCAT(i.image_url) AS images
    FROM ads a
    LEFT JOIN ad_images i ON a.id = i.ad_id
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.category_id = ?
  `;

    const params = [category_id];

    // Search by title
    if (search_key) {
      query += " AND a.title LIKE ?";
      params.push(`%${search_key}%`);
    }

    // Filter by date range
    if (date_from && date_to) {
      query += " AND a.created_at BETWEEN ? AND ?";
      params.push(date_from, date_to);
    }

    // Price filter
    if (price_min && price_max) {
      query += " AND a.price BETWEEN ? AND ?";
      params.push(price_min, price_max);
    }

    if (type) {
      query += `
    AND JSON_VALID(JSON_UNQUOTE(a.fields))
    AND JSON_UNQUOTE(JSON_EXTRACT(JSON_UNQUOTE(a.fields), '$.room_type')) = ?
  `;
      params.push(type);
    }

    // Location name filter
    if (location) {
      query += " AND a.location LIKE ?";
      params.push(`%${location}%`);
    }

    // Active only
    if (status === "active") {
      query += " AND a.status = 'active'";
    }

    // Recently added (within 7 days)
    if (recent === "1") {
      query += " AND a.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
    }

    // Group and order
    query += " GROUP BY a.id ORDER BY a.created_at DESC";

    const [rows] = await db.query(query, params);

    // Nearby filter (10km radius)
    let filteredRows = rows;
    if (nearby === "true" && lat && lng) {
      filteredRows = rows.filter((ad) => {
        try {
          const loc = JSON.parse(ad.location);
          if (!loc.lat || !loc.lng) return false;
          const distance = haversine(lat, lng, loc.lat, loc.lng);
          return distance <= 10;
        } catch {
          return false;
        }
      });
    }

    // Pagination
    const start = (page - 1) * limit;
    const paginated = filteredRows.slice(start, start + Number(limit));

    return paginated.map((r) => ({
      ...r,
      images: r.images ? r.images.split(",") : [],
    }));
  },

  getAdDetailsById: async (id) => {
    const [rows] = await db.query(
      ` SELECT 
          a.*, 
          u.full_name AS user_name,
          c.category_name AS category_name,
          GROUP_CONCAT(i.image_url) AS images
        FROM ads a
        LEFT JOIN ad_images i ON a.id = i.ad_id
        LEFT JOIN users u ON a.user_id = u.id
        LEFT JOIN categories c ON a.category_id = c.id
        WHERE a.id = ?
        GROUP BY a.id`,
      [id]
    );
    if (rows.length === 0) return null;

    const ad = rows[0];
    return {
      ...ad,
      images: ad.images ? ad.images.split(",") : [],
    };
  },

  getAdsByUser: async (user_id, filters = {}) => {
    const {
      search_key,
      category,
      date_from,
      date_to,
      price_min,
      price_max,
      page = 1,
      limit = 10,
    } = filters;

    let query = `
    SELECT 
      a.*, 
      u.name AS user_name, 
      c.category_name AS category_name,
      GROUP_CONCAT(i.image_url) AS images
    FROM ads a
    LEFT JOIN ad_images i ON a.id = i.ad_id
    LEFT JOIN users u ON a.user_id = u.id
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.user_id = ?`;

    const params = [user_id];

    if (search_key) {
      query += " AND a.title LIKE ?";
      params.push(`%${search_key}%`);
    }
    if (category) {
      query += " AND a.category_id = ?";
      params.push(category);
    }
    if (date_from && date_to) {
      query += " AND a.created_at BETWEEN ? AND ?";
      params.push(date_from, date_to);
    }
    if (price_min && price_max) {
      query += " AND a.price BETWEEN ? AND ?";
      params.push(price_min, price_max);
    }

    query += " GROUP BY a.id ORDER BY a.id DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [rows] = await db.query(query, params);

    return rows.map((r) => ({
      ...r,
      images: r.images ? r.images.split(",") : [],
    }));
  },
};

module.exports = AdModel;
