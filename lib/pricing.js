// Price list shown on the website — generated from the GlamHuman pricing Google Sheet.
// Only services the website offers are included. Prices are in ₹: `mrp` = actual price, `price` = offer price.
// Mehandi prices come from the salon's mehandi rate card (no discount, no fixed duration).
// Each tab (label) is a bookable Service; its cards and options are the Sub-services in the booking form.
export const PRICING = [
  {
    id: "makeup", label: "Makeup",
    groups: [
      { name: "Bridal Makeup", items: [
        { option: "Basic", mrp: 13250, price: 11364, off: 14, duration: "3 hrs" },
        { option: "HD", mrp: 14310, price: 13500, off: 6, duration: "3 hrs" },
        { option: "Airbrush", mrp: 22790, price: 19350, off: 15, duration: "3 hrs" },
        { option: "HD + Airbrush (Celebrity Makeup)", mrp: 23214, price: 20893, off: 10, duration: "2 hrs 30 mins" },
      ] },
      { name: "Engagement & Reception Makeup", items: [
        { option: "Basic", mrp: 8479, price: 6857, off: 19, duration: "2 hrs 30 mins" },
        { option: "HD", mrp: 10599, price: 8890, off: 16, duration: "2 hrs 30 mins" },
        { option: "Airbrush", mrp: 14310, price: 12960, off: 9, duration: "2 hrs 30 mins" },
        { option: "HD + Airbrush (Celebrity Makeup)", mrp: 17726, price: 15953, off: 10, duration: "2 hrs 30 mins" },
      ] },
      { name: "Party Makeup", items: [
        { option: "Basic", mrp: 3710, price: 3154, off: 15, duration: "2 hrs" },
        { option: "HD", mrp: 4876, price: 4087, off: 16, duration: "2 hrs" },
        { option: "Airbrush", mrp: 8056, price: 6526, off: 19, duration: "2 hrs" },
        { option: "HD + Airbrush (Celebrity Makeup)", mrp: 14416, price: 12553, off: 13, duration: "2 hrs" },
      ] },
    ],
  },
  {
    id: "mehandi", label: "Mehandi",
    groups: [
      { name: "Minimal Design", items: [
        { option: "One Side", mrp: 150, price: 150, off: 0 },
        { option: "Both Sides", mrp: 300, price: 300, off: 0 },
      ] },
      { name: "Palm Length", items: [
        { option: "One Side", mrp: 200, price: 200, off: 0 },
        { option: "Both Sides", mrp: 400, price: 400, off: 0 },
      ] },
      { name: "Bangle Length", items: [
        { option: "One Side", mrp: 300, price: 300, off: 0 },
        { option: "Both Sides", mrp: 600, price: 600, off: 0 },
      ] },
      { name: "Mid Length", items: [
        { option: "One Side", mrp: 350, price: 350, off: 0 },
        { option: "Both Sides", mrp: 700, price: 700, off: 0 },
      ] },
      { name: "Elbow Length Bridal Design", items: [
        { option: "Both Hands", mrp: 3000, price: 3000, off: 0 },
      ] },
      { name: "Above Elbow Length Bridal Design", items: [
        { option: "Both Hands", mrp: 3500, price: 3500, off: 0 },
      ] },
    ],
  },
  {
    id: "facial", label: "Facial",
    groups: [
      { name: "Charcoal Facial", items: [
        { option: "VLCC", mrp: 1942, price: 1399, off: 28, duration: "60 mins" },
      ] },
      { name: "Ozone Facial", items: [
        { option: "Gold", mrp: 1175, price: 999, off: 15, duration: "60 mins" },
        { option: "White", mrp: 1410, price: 1199, off: 15, duration: "60 mins" },
      ] },
      { name: "Aroma Facial", items: [
        { option: "Detox Bamboo Charcoal", mrp: 2054, price: 1849, off: 10, duration: "60 mins" },
      ] },
      { name: "Wine Facial", items: [
        { option: "Astaberry Wine", mrp: 1589, price: 1193, off: 25, duration: "60 mins" },
        { option: "Natural Glow", mrp: 1854, price: 1299, off: 30, duration: "60 mins" },
      ] },
      { name: "Skin Tightening Facial", items: [
        { option: "VLCC", mrp: 689, price: 621, off: 10, duration: "60 mins" },
      ] },
      { name: "Bridal Glow Facial", items: [
        { option: "Aroma Magic", mrp: 957, price: 649, off: 32, duration: "45 mins" },
        { option: "Lotus", mrp: 1059, price: 899, off: 15, duration: "60 mins" },
      ] },
      { name: "Anti-Tan Facial", items: [
        { option: "VLCC", mrp: 741, price: 636, off: 14, duration: "60 mins" },
        { option: "Lotus", mrp: 954, price: 716, off: 25, duration: "60 mins" },
      ] },
      { name: "Anti-Ageing Facial", items: [
        { option: "Shahnaz", mrp: 1059, price: 848, off: 20, duration: "60 mins" },
        { option: "Lotus", mrp: 1196, price: 969, off: 19, duration: "60 mins" },
      ] },
      { name: "Party Glow Facial", items: [
        { option: "VLCC", mrp: 1590, price: 795, off: 50, duration: "60 mins" },
      ] },
      { name: "Pearl Facial", items: [
        { option: "VLCC", mrp: 847, price: 569, off: 33, duration: "60 mins" },
        { option: "Aroma Magic", mrp: 838, price: 629, off: 25, duration: "60 mins" },
        { option: "Lotus", mrp: 1535, price: 999, off: 35, duration: "60 mins" },
        { option: "Shahnaz", mrp: 1287, price: 1159, off: 10, duration: "60 mins" },
      ] },
      { name: "Diamond Facial", items: [
        { option: "VLCC", mrp: 1007, price: 899, off: 11, duration: "60 mins" },
        { option: "Lotus", mrp: 1416, price: 992, off: 30, duration: "60 mins" },
        { option: "Shahnaz", mrp: 2054, price: 1849, off: 10, duration: "60 mins" },
      ] },
      { name: "Gold Facial", items: [
        { option: "Aroma Magic", mrp: 953, price: 797, off: 16, duration: "60 mins" },
        { option: "VLCC", mrp: 1059, price: 954, off: 10, duration: "60 mins" },
        { option: "Lotus", mrp: 1059, price: 999, off: 6, duration: "60 mins" },
        { option: "Shahnaz", mrp: 1666, price: 1499, off: 10, duration: "60 mins" },
      ] },
      { name: "Fruit Facial", items: [
        { option: "VLCC", mrp: 1112, price: 688, off: 38, duration: "60 mins" },
        { option: "Shahnaz", mrp: 1218, price: 890, off: 27, duration: "60 mins" },
      ] },
    ],
  },
  {
    id: "cleanup", label: "Clean-Up",
    groups: [
      { name: "Party Glow Clean-Up", items: [
        { option: "VLCC", mrp: 635, price: 382, off: 40, duration: "45 mins" },
      ] },
      { name: "Glow Cleanup", items: [
        { option: "Aroma", mrp: 529, price: 399, off: 25, duration: "45 mins" },
      ] },
      { name: "Whitening Clean-Up", items: [
        { option: "VLCC", mrp: 403, price: 376, off: 7, duration: "40 mins" },
      ] },
      { name: "Pearl Clean-Up", items: [
        { option: "VLCC", mrp: 635, price: 499, off: 21, duration: "40 mins" },
      ] },
      { name: "Gold Clean-Up", items: [
        { option: "VLCC", mrp: 529, price: 399, off: 25, duration: "45 mins" },
        { option: "Aroma", mrp: 657, price: 499, off: 24, duration: "45 mins" },
      ] },
      { name: "Fruit Clean-Up", items: [
        { option: "VLCC", mrp: 498, price: 429, off: 14, duration: "45 mins" },
      ] },
    ],
  },
  {
    id: "detan", label: "De-Tan",
    groups: [
      { name: "Full Body", items: [
        { option: "OXY", mrp: 1684, price: 1180, off: 30, duration: "1 hr 30 mins" },
        { option: "VLCC", mrp: 1589, price: 1193, off: 25, duration: "1 hr 30 mins" },
        { option: "Raaga", mrp: 1483, price: 1336, off: 10, duration: "45 mins" },
        { option: "Ozone", mrp: 2013, price: 1753, off: 13, duration: "3 hrs" },
        { option: "O3+", mrp: 2013, price: 1773, off: 12, duration: "45 mins" },
      ] },
      { name: "Back", items: [
        { option: "VLCC", mrp: 423, price: 399, off: 6, duration: "30 mins" },
        { option: "OXY", mrp: 448, price: 399, off: 11, duration: "30 mins" },
        { option: "Raaga", mrp: 529, price: 477, off: 10, duration: "60 mins" },
        { option: "Ozone", mrp: 635, price: 541, off: 15, duration: "1 hr 10 mins" },
        { option: "O3+", mrp: 741, price: 653, off: 12, duration: "60 mins" },
      ] },
      { name: "Front", items: [
        { option: "Ozone", mrp: 599, price: 396, off: 34, duration: "12 mins" },
        { option: "VLCC", mrp: 423, price: 399, off: 6, duration: "35 mins" },
        { option: "OXY", mrp: 448, price: 399, off: 11, duration: "35 mins" },
        { option: "Raaga", mrp: 529, price: 477, off: 10, duration: "45 mins" },
        { option: "O3+", mrp: 741, price: 653, off: 12, duration: "45 mins" },
      ] },
      { name: "Full Leg", items: [
        { option: "VLCC", mrp: 582, price: 529, off: 9, duration: "45 mins" },
        { option: "OXY", mrp: 617, price: 529, off: 14, duration: "45 mins" },
        { option: "Ozone", mrp: 635, price: 539, off: 15, duration: "1 hr 30 mins" },
        { option: "Raaga", mrp: 741, price: 668, off: 10, duration: "45 mins" },
        { option: "O3+", mrp: 847, price: 738, off: 13, duration: "45 mins" },
      ] },
      { name: "Full Hand", items: [
        { option: "Ozone", mrp: 529, price: 339, off: 36, duration: "1 hr 10 mins" },
        { option: "VLCC", mrp: 423, price: 340, off: 20, duration: "30 mins" },
        { option: "OXY", mrp: 448, price: 340, off: 24, duration: "30 mins" },
        { option: "Raaga", mrp: 529, price: 462, off: 13, duration: "45 mins" },
        { option: "O3+", mrp: 741, price: 639, off: 14, duration: "45 mins" },
      ] },
      { name: "Face & Neck", items: [
        { option: "Ozone", mrp: 455, price: 349, off: 23, duration: "30 mins" },
        { option: "VLCC", mrp: 423, price: 359, off: 15, duration: "30 mins" },
        { option: "OXY", mrp: 448, price: 359, off: 20, duration: "30 mins" },
        { option: "Raaga", mrp: 476, price: 430, off: 10, duration: "45 mins" },
        { option: "O3+", mrp: 614, price: 554, off: 10, duration: "45 mins" },
      ] },
    ],
  },
  {
    id: "bleach", label: "Bleach",
    groups: [
      { name: "Face & Neck", items: [
        { option: "OXY", mrp: 530, price: 371, off: 30, duration: "25 mins" },
        { option: "VLCC", mrp: 530, price: 371, off: 30, duration: "25 mins" },
        { option: "Ozone Instant Glow", mrp: 529, price: 399, off: 25, duration: "30 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 799, price: 599, off: 25, duration: "45 mins" },
      ] },
      { name: "Full Hand", items: [
        { option: "OXY", mrp: 423, price: 399, off: 6, duration: "45 mins" },
        { option: "VLCC", mrp: 423, price: 399, off: 6, duration: "45 mins" },
        { option: "Nature's Gold", mrp: 476, price: 399, off: 16, duration: "45 mins" },
        { option: "Ozone Instant Glow", mrp: 529, price: 419, off: 21, duration: "1 hr 10 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 749, price: 599, off: 20, duration: "45 mins" },
      ] },
      { name: "Full Leg", items: [
        { option: "OXY", mrp: 529, price: 430, off: 19, duration: "45 mins" },
        { option: "VLCC", mrp: 476, price: 430, off: 10, duration: "45 mins" },
        { option: "Ozone Instant Glow", mrp: 529, price: 449, off: 15, duration: "1 hr 10 mins" },
        { option: "Nature's Gold", mrp: 599, price: 498, off: 17, duration: "45 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 749, price: 599, off: 20, duration: "45 mins" },
      ] },
      { name: "Front Bleach", items: [
        { option: "OXY", mrp: 423, price: 361, off: 15, duration: "30 mins" },
        { option: "VLCC", mrp: 423, price: 361, off: 15, duration: "30 mins" },
        { option: "Ozone Instant Glow", mrp: 529, price: 387, off: 27, duration: "1 hr 10 mins" },
        { option: "Nature's Gold", mrp: 529, price: 399, off: 25, duration: "30 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 560, price: 449, off: 20, duration: "45 mins" },
      ] },
      { name: "Back Bleach", items: [
        { option: "OXY", mrp: 462, price: 398, off: 14, duration: "30 mins" },
        { option: "VLCC", mrp: 462, price: 398, off: 14, duration: "30 mins" },
        { option: "Ozone Instant Glow", mrp: 529, price: 429, off: 19, duration: "1 hr 10 mins" },
        { option: "Nature's Gold", mrp: 635, price: 541, off: 15, duration: "30 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 749, price: 599, off: 20, duration: "45 mins" },
      ] },
      { name: "Full Body (except face & neck)", items: [
        { option: "OXY", mrp: 2120, price: 1590, off: 25, duration: "2 hrs 10 mins" },
        { option: "VLCC", mrp: 2120, price: 1590, off: 25, duration: "2 hrs 10 mins" },
        { option: "Nature's Gold", mrp: 2120, price: 1590, off: 25, duration: "2 hrs 10 mins" },
        { option: "Ozone Instant Glow", mrp: 2119, price: 1699, off: 20, duration: "3 hrs 10 mins" },
        { option: "O3+ Vitamin-C Gel Bleach", mrp: 2384, price: 1908, off: 20, duration: "45 mins" },
      ] },
    ],
  },
  {
    id: "waxing", label: "Waxing",
    groups: [
      { name: "Chin Wax", items: [
        { option: "Honey", mrp: 69, price: 69, off: 0, duration: "30 mins" },
        { option: "Chocolate", mrp: 154, price: 139, off: 10, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 172, price: 147, off: 15, duration: "30 mins" },
        { option: "Rica", mrp: 198, price: 179, off: 10, duration: "30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 198, price: 179, off: 10, duration: "30 mins" },
      ] },
      { name: "Upperlip Wax", items: [
        { option: "Honey", mrp: 105, price: 69, off: 34, duration: "30 mins" },
        { option: "Chocolate", mrp: 105, price: 69, off: 34, duration: "30 mins" },
        { option: "Rica", mrp: 105, price: 75, off: 29, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 107, price: 79, off: 26, duration: "25 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 107, price: 87, off: 19, duration: "20 mins" },
      ] },
      { name: "Side Face Wax", items: [
        { option: "Honey", mrp: 158, price: 97, off: 39, duration: "30 mins" },
        { option: "Chocolate", mrp: 185, price: 149, off: 19, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 186, price: 159, off: 15, duration: "25 mins" },
        { option: "Rica", mrp: 247, price: 199, off: 19, duration: "30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 249, price: 199, off: 20, duration: "25 mins" },
      ] },
      { name: "Full Hand Wax", items: [
        { option: "Honey", mrp: 217, price: 196, off: 10, duration: "25 mins" },
        { option: "Chocolate", mrp: 330, price: 297, off: 10, duration: "25 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 335, price: 299, off: 11, duration: "30 mins" },
        { option: "Chocolate Roll-On", mrp: 635, price: 429, off: 32, duration: "20 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 646, price: 459, off: 29, duration: "30 mins" },
        { option: "Rica", mrp: 586, price: 499, off: 15, duration: "25 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 587, price: 499, off: 15, duration: "30 mins" },
        { option: "Rica Roll-On", mrp: 847, price: 629, off: 26, duration: "30 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 861, price: 629, off: 27, duration: "30 mins" },
      ] },
      { name: "Bikini Wax", items: [
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 1307, price: 929, off: 29, duration: "30 mins" },
        { option: "Honey", mrp: 1272, price: 942, off: 26, duration: "60 mins" },
        { option: "Chocolate", mrp: 1695, price: 984, off: 42, duration: "60 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 1407, price: 999, off: 29, duration: "30 mins" },
        { option: "Rica", mrp: 2164, price: 1299, off: 40, duration: "35 mins" },
        { option: "Richelon Cube Wax – White Chocolate", mrp: 1722, price: 1498, off: 13, duration: "30 mins" },
        { option: "Brazilian Stripless", mrp: 1695, price: 1499, off: 12, duration: "60 mins" },
      ] },
      { name: "Bikini Line wax", items: [
        { option: "Honey", mrp: 297, price: 249, off: 16, duration: "30 mins" },
        { option: "Brazilian Stripless", mrp: 529, price: 329, off: 38, duration: "20 mins" },
        { option: "Rica", mrp: 511, price: 359, off: 30, duration: "20 mins" },
        { option: "Richelon Cube Wax – White Chocolate", mrp: 532, price: 399, off: 25, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 647, price: 499, off: 23, duration: "30 mins" },
        { option: "Chocolate", mrp: 1059, price: 636, off: 40, duration: "45 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 863, price: 648, off: 25, duration: "30 mins" },
      ] },
      { name: "Face Wax", items: [
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 292, price: 249, off: 15, duration: "30 mins" },
        { option: "Chocolate", mrp: 318, price: 255, off: 20, duration: "30 mins" },
        { option: "Honey", mrp: 318, price: 258, off: 19, duration: "30 mins" },
        { option: "Brazilian Stripless", mrp: 361, price: 289, off: 20, duration: "30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 350, price: 299, off: 15, duration: "30 mins" },
        { option: "Richelon Cube Wax – White Chocolate", mrp: 386, price: 329, off: 15, duration: "30 mins" },
        { option: "Rica", mrp: 473, price: 379, off: 20, duration: "25 mins" },
      ] },
      { name: "Full Body Wax", items: [
        { option: "Honey", mrp: 1696, price: 933, off: 45, duration: "1 hr 30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 1852, price: 1389, off: 25, duration: "1 hr 30 mins" },
        { option: "Chocolate", mrp: 2649, price: 1444, off: 45, duration: "1 hr 30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 1997, price: 1498, off: 25, duration: "1 hr 30 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 1821, price: 1549, off: 15, duration: "1 hr 30 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 1915, price: 1629, off: 15, duration: "1 hr 30 mins" },
        { option: "Rica", mrp: 2601, price: 1899, off: 27, duration: "3 hrs 10 mins" },
        { option: "Chocolate Roll-On", mrp: 2783, price: 1949, off: 30, duration: "3 hrs" },
        { option: "Rica Roll-On", mrp: 2561, price: 1999, off: 22, duration: "3 hrs" },
      ] },
      { name: "Full Leg Wax", items: [
        { option: "Honey", mrp: 529, price: 292, off: 45, duration: "60 mins" },
        { option: "Chocolate", mrp: 880, price: 446, off: 49, duration: "60 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 598, price: 449, off: 25, duration: "60 mins" },
        { option: "Chocolate Roll-On", mrp: 734, price: 529, off: 28, duration: "30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 705, price: 529, off: 25, duration: "60 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 732, price: 549, off: 25, duration: "60 mins" },
        { option: "Rica Roll-On", mrp: 855, price: 599, off: 30, duration: "30 mins" },
        { option: "Rica", mrp: 926, price: 649, off: 30, duration: "30 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 904, price: 679, off: 25, duration: "60 mins" },
      ] },
      { name: "Underarms Wax", items: [
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 104, price: 79, off: 24, duration: "25 mins" },
        { option: "Honey", mrp: 211, price: 98, off: 54, duration: "3 mins" },
        { option: "Chocolate", mrp: 264, price: 99, off: 63, duration: "30 mins" },
        { option: "Rica", mrp: 281, price: 169, off: 40, duration: "20 mins" },
        { option: "Richelon Cube Wax – White Chocolate", mrp: 234, price: 199, off: 15, duration: "25 mins" },
        { option: "Brazilian Stripless", mrp: 330, price: 199, off: 40, duration: "20 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 265, price: 199, off: 25, duration: "25 mins" },
      ] },
      { name: "Back Wax", items: [
        { option: "Honey", mrp: 317, price: 249, off: 21, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 478, price: 359, off: 25, duration: "25 mins" },
        { option: "Chocolate", mrp: 741, price: 394, off: 47, duration: "40 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 625, price: 469, off: 25, duration: "25 mins" },
        { option: "Rica", mrp: 712, price: 499, off: 30, duration: "15 mins" },
        { option: "Chocolate Roll-On", mrp: 786, price: 629, off: 20, duration: "20 mins" },
        { option: "Rica Roll-On", mrp: 961, price: 769, off: 20, duration: "20 mins" },
      ] },
      { name: "Stomach Wax", items: [
        { option: "Honey", mrp: 317, price: 249, off: 21, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 465, price: 349, off: 25, duration: "25 mins" },
        { option: "Chocolate", mrp: 741, price: 394, off: 47, duration: "40 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 545, price: 409, off: 25, duration: "25 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 572, price: 429, off: 25, duration: "25 mins" },
        { option: "Rica", mrp: 597, price: 479, off: 20, duration: "20 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 691, price: 519, off: 25, duration: "25 mins" },
        { option: "Rica Roll-On", mrp: 832, price: 599, off: 28, duration: "20 mins" },
        { option: "Chocolate Roll-On", mrp: 811, price: 649, off: 20, duration: "20 mins" },
      ] },
      { name: "Half Leg Wax", items: [
        { option: "Honey", mrp: 317, price: 264, off: 17, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 350, price: 299, off: 15, duration: "25 mins" },
        { option: "Chocolate", mrp: 582, price: 321, off: 45, duration: "45 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 434, price: 369, off: 15, duration: "25 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 457, price: 389, off: 15, duration: "25 mins" },
        { option: "Rica", mrp: 532, price: 399, off: 25, duration: "20 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 504, price: 429, off: 15, duration: "25 mins" },
        { option: "Rica Roll-On", mrp: 623, price: 499, off: 20, duration: "20 mins" },
      ] },
      { name: "Half Hand Wax", items: [
        { option: "Honey", mrp: 264, price: 96, off: 64, duration: "30 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 210, price: 179, off: 15, duration: "25 mins" },
        { option: "Chocolate", mrp: 476, price: 197, off: 59, duration: "30 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 281, price: 239, off: 15, duration: "25 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 340, price: 289, off: 15, duration: "25 mins" },
        { option: "Rica", mrp: 374, price: 299, off: 20, duration: "20 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 374, price: 319, off: 15, duration: "25 mins" },
        { option: "Rica Roll-On", mrp: 498, price: 399, off: 20, duration: "20 mins" },
      ] },
      { name: "Full Hands + Underarms Waxing", items: [
        { option: "Honey", mrp: 250, price: 245, off: 2, duration: "60 mins" },
        { option: "Richelon Pro Wax – Aloe Vera", mrp: 457, price: 389, off: 15, duration: "60 mins" },
        { option: "Chocolate", mrp: 450, price: 396, off: 12, duration: "60 mins" },
        { option: "Richelon Pro Wax – White Chocolate", mrp: 539, price: 459, off: 15, duration: "60 mins" },
        { option: "Richelon Aloe Vera Roll-On", mrp: 587, price: 499, off: 15, duration: "60 mins" },
        { option: "Richelon White Chocolate Roll-On", mrp: 668, price: 569, off: 15, duration: "60 mins" },
        { option: "Chocolate Roll-On", mrp: 749, price: 599, off: 20, duration: "50 mins" },
        { option: "Rica", mrp: 836, price: 669, off: 20, duration: "60 mins" },
        { option: "Rica Roll-On", mrp: 1040, price: 729, off: 30, duration: "60 mins" },
      ] },
    ],
  },
  {
    id: "threading", label: "Threading",
    groups: [
      { name: "Threading", items: [
        { option: "Full Face", mrp: 211, price: 149, off: 29, duration: "30 mins" },
        { option: "Side Locks", mrp: 64, price: 52, off: 19, duration: "10 mins" },
        { option: "Forehead", mrp: 32, price: 21, off: 34, duration: "10 mins" },
        { option: "Chin", mrp: 42, price: 31, off: 26, duration: "10 mins" },
        { option: "Upper Lip", mrp: 32, price: 21, off: 34, duration: "20 mins" },
        { option: "Eyebrow", mrp: 99, price: 49, off: 51, duration: "20 mins" },
      ] },
    ],
  },
  {
    id: "haircut", label: "Hair Cut",
    groups: [
      { name: "Shape Hair Cut", items: [
        { option: "U-Shape", mrp: 297, price: 259, off: 13, duration: "45 mins" },
        { option: "V-Shape", mrp: 315, price: 269, off: 15, duration: "45 mins" },
      ] },
      { name: "Styling Hair Cut", items: [
        { option: "Layer Cut", mrp: 365, price: 329, off: 10, duration: "30 mins" },
        { option: "Step Cut", mrp: 433, price: 391, off: 10, duration: "30 mins" },
        { option: "Feather Cut", mrp: 443, price: 399, off: 10, duration: "30 mins" },
      ] },
      { name: "Hair Trimming", items: [
        { option: "Hair Trimming", mrp: 317, price: 175, off: 45, duration: "30 mins" },
        { option: "Girl Baby Cut", mrp: 236, price: 189, off: 20, duration: "20 mins" },
        { option: "With Lotus Gold Facial", mrp: 1590, price: 1276, off: 20, duration: "1 hr 40 mins" },
      ] },
      { name: "Reverse Graduation Hair Cut", items: [
        { option: "Graduation Cut", mrp: 685, price: 446, off: 35, duration: "40 mins" },
        { option: "With Lotus Gold Facial", mrp: 1483, price: 1189, off: 20, duration: "1 hr 40 mins" },
      ] },
      { name: "Curls & Waves", items: [
        { option: "Curls & Waves", mrp: 855, price: 599, off: 30, duration: "25 mins" },
      ] },
    ],
  },
  {
    id: "haircolour", label: "Hair Colour",
    groups: [
      { name: "Global INOA Colour", items: [
        { option: "Root Touch-Up", mrp: 1264, price: 999, off: 21, duration: "60 mins" },
        { option: "Up to Shoulder", mrp: 2194, price: 1799, off: 18, duration: "60 mins" },
        { option: "Up to Elbows", mrp: 2769, price: 2299, off: 17, duration: "60 mins" },
        { option: "Up to Waist", mrp: 3233, price: 2749, off: 15, duration: "60 mins" },
      ] },
      { name: "Global Colour + Highlights", items: [
        { option: "Up to Elbows", mrp: 6761, price: 4599, off: 32, duration: "2 hrs 50 mins" },
        { option: "Up to Waist", mrp: 7939, price: 5399, off: 32, duration: "2 hrs" },
      ] },
      { name: "Global Highlights", items: [
        { option: "Up to Elbows", mrp: 4998, price: 2999, off: 40, duration: "2 hrs" },
        { option: "Up to Waist", mrp: 6347, price: 3999, off: 37, duration: "2 hrs" },
      ] },
      { name: "Hair Colour Application", items: [
        { option: "Up to Shoulder", mrp: 317, price: 303, off: 4, duration: "30 mins" },
        { option: "Below Shoulder", mrp: 423, price: 382, off: 10, duration: "40 mins" },
        { option: "Below Waist", mrp: 529, price: 451, off: 15, duration: "60 mins" },
      ] },
      { name: "Henna Application", items: [
        { option: "Up to Shoulder", mrp: 530, price: 220, off: 58, duration: "35 mins" },
        { option: "Below Shoulder", mrp: 636, price: 318, off: 50, duration: "40 mins" },
        { option: "Below Waist", mrp: 848, price: 594, off: 30, duration: "60 mins" },
      ] },
    ],
  },
  {
    id: "hairspa", label: "Hair Spa",
    groups: [
      { name: "Hair Spa Up to Shoulder", items: [
        { option: "Streax", mrp: 1059, price: 636, off: 40, duration: "60 mins" },
        { option: "L'Oréal", mrp: 1059, price: 827, off: 22, duration: "60 mins" },
      ] },
      { name: "Hair Spa Below Shoulder", items: [
        { option: "Streax", mrp: 1748, price: 1225, off: 30, duration: "60 mins" },
        { option: "L'Oréal", mrp: 2055, price: 1583, off: 23, duration: "60 mins" },
      ] },
      { name: "Hair Spa Below Waist", items: [
        { option: "Streax", mrp: 2119, price: 1527, off: 28, duration: "60 mins" },
        { option: "L'Oréal", mrp: 2119, price: 1773, off: 16, duration: "60 mins" },
      ] },
    ],
  },
];
