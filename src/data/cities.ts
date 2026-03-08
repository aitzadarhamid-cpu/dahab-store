export interface RegionData {
  region: string;
  cities: string[];
}

export const MOROCCAN_REGIONS: RegionData[] = [
  {
    region: "Tanger-Tetouan-Al Hoceima",
    cities: [
      "Tanger",
      "Tetouan",
      "Al Hoceima",
      "Chefchaouen",
      "Larache",
      "Ksar El Kebir",
      "Assilah",
      "Fnideq",
      "M'diq",
      "Martil",
      "Ouazzane",
    ],
  },
  {
    region: "Oriental",
    cities: [
      "Oujda",
      "Nador",
      "Berkane",
      "Taourirt",
      "Jerada",
      "Guercif",
      "Driouch",
      "Figuig",
      "Saida",
      "Ahfir",
    ],
  },
  {
    region: "Fes-Meknes",
    cities: [
      "Fes",
      "Meknes",
      "Sefrou",
      "Ifrane",
      "Azrou",
      "El Hajeb",
      "Moulay Idriss Zerhoun",
      "Imouzzer Kandar",
      "Boulemane",
      "Missour",
      "Taza",
    ],
  },
  {
    region: "Rabat-Sale-Kenitra",
    cities: [
      "Rabat",
      "Sale",
      "Kenitra",
      "Temara",
      "Skhirate",
      "Khemisset",
      "Tiflet",
      "Sidi Kacem",
      "Sidi Slimane",
      "Mechra Bel Ksiri",
    ],
  },
  {
    region: "Beni Mellal-Khenifra",
    cities: [
      "Beni Mellal",
      "Khouribga",
      "Khenifra",
      "Fquih Ben Salah",
      "Azilal",
      "Kasba Tadla",
      "Oued Zem",
      "Demnate",
      "Bejaad",
    ],
  },
  {
    region: "Casablanca-Settat",
    cities: [
      "Casablanca",
      "Mohammedia",
      "El Jadida",
      "Settat",
      "Berrechid",
      "Bouznika",
      "Benslimane",
      "Azemmour",
      "Sidi Bennour",
      "Ben Ahmed",
      "Mediouna",
    ],
  },
  {
    region: "Marrakech-Safi",
    cities: [
      "Marrakech",
      "Safi",
      "Essaouira",
      "El Kelaa des Sraghna",
      "Chichaoua",
      "Ben Guerir",
      "Youssoufia",
      "Tamansourt",
    ],
  },
  {
    region: "Draa-Tafilalet",
    cities: [
      "Errachidia",
      "Ouarzazate",
      "Zagora",
      "Midelt",
      "Tinghir",
      "Rissani",
      "Goulmima",
    ],
  },
  {
    region: "Souss-Massa",
    cities: [
      "Agadir",
      "Inezgane",
      "Ait Melloul",
      "Taroudannt",
      "Tiznit",
      "Tata",
      "Biougra",
      "Oulad Teima",
    ],
  },
  {
    region: "Guelmim-Oued Noun",
    cities: ["Guelmim", "Tan-Tan", "Sidi Ifni", "Assa-Zag"],
  },
  {
    region: "Laayoune-Sakia El Hamra",
    cities: ["Laayoune", "Es-Smara", "Boujdour", "Tarfaya"],
  },
  {
    region: "Dakhla-Oued Ed-Dahab",
    cities: ["Dakhla"],
  },
];

export const ALL_CITIES: string[] = MOROCCAN_REGIONS.flatMap((r) => r.cities).sort();
