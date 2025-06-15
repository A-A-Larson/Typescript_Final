export default interface PlantsListUI {
    "data": [
        {
            "id": number,
            "common_name": string,
            "scientific_name": string[],
            "other_name": string[],
            "default_image": {
                "image_id": number,
                "license": number,
                "license_name": string,
                "license_url": string,
                "original_url": string,
                "regular_url": string,
                "medium_url": string,
                "small_url": string,
                "thumbnail": string
            }
        },
        {
          "id": number,
          "common_name": string,
          "scientific_name": string[],
          "other_name": string[],
          "default_image": {
              "image_id": number,
              "license": number,
              "license_name": string,
              "license_url": string,
              "original_url": string,
              "regular_url": string,
              "medium_url": string,
              "small_url": string,
              "thumbnail": string
          }
      }
    ],
    "to": number,
    "per_page": number,
    "current_page": number,
    "from": number,
    "last_page": number,
    "total": number
}
